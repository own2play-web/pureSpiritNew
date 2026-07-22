const jwt = require('jsonwebtoken');

// GitHub App-authenticatie i.p.v. een fine-grained personal access token —
// die laatste liep steeds na (te) korte tijd af en moest handmatig ververst
// worden. Een installation access token wordt hier telkens opnieuw en
// automatisch opgehaald (geldig ~1 uur, nooit handmatig te verlengen); alleen
// de App's private key hoeft (zelden) vervangen te worden, niet dit token.
// De private key staat als base64 in de env var i.p.v. de rauwe PEM-tekst —
// sommige UI's (waaronder Netlify's "secret, per context"-invoerveld) lijken
// meerdere regels in één waarde niet betrouwbaar te bewaren, wat de PEM
// onherkenbaar maakt. Base64 is altijd één regel, dus daar is dat probleem
// niet. Blijft ook rauwe PEM (met "-----BEGIN") accepteren voor het geval
// iemand het toch zo instelt.
function leesPrivateKey() {
  const raw = process.env.GITHUB_APP_PRIVATE_KEY || '';
  if (raw.includes('BEGIN')) return raw.replace(/\\n/g, '\n');
  return Buffer.from(raw, 'base64').toString('utf8');
}

async function haalInstallationToken() {
  const appId          = process.env.GITHUB_APP_ID;
  const privateKey     = leesPrivateKey();
  const installationId = process.env.GITHUB_APP_INSTALLATION_ID;

  if (!appId || !privateKey || !installationId) {
    throw new Error('GitHub App niet correct ingesteld (GITHUB_APP_ID / GITHUB_APP_PRIVATE_KEY / GITHUB_APP_INSTALLATION_ID ontbreekt)');
  }

  const nu = Math.floor(Date.now() / 1000);
  const appJwt = jwt.sign(
    { iat: nu - 60, exp: nu + 600, iss: appId }, // max 10 min geldig, iat 60s terug voor klok-drift
    privateKey,
    { algorithm: 'RS256' }
  );

  const res = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${appJwt}`,
      Accept: 'application/vnd.github+json',
      'User-Agent': 'PureSpirit-Deploy',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Kon geen installation token ophalen: ${err}`);
  }

  const { token } = await res.json();
  return token;
}

exports.handler = async (event, context) => {
  // Alleen ingelogde (Netlify Identity) gebruikers mogen dev naar main
  // publiceren. Netlify vult context.clientContext.user alleen als de
  // request een geldig Identity-JWT meestuurt (Authorization: Bearer ...) —
  // zie publiceer.astro, dat token haalt via netlifyIdentity user.jwt().
  if (!context.clientContext || !context.clientContext.user) {
    return { statusCode: 401, body: JSON.stringify({ fout: 'Niet ingelogd. Log in via /admin/ om te publiceren.' }) };
  }

  const owner = 'own2play-web';
  const repo  = 'pureSpiritNew';

  let token;
  try {
    token = await haalInstallationToken();
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ fout: e.message }) };
  }

  // Haal de huidige SHA van dev op
  const devRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/ref/heads/dev`, {
    headers: { Authorization: `Bearer ${token}`, 'User-Agent': 'PureSpirit-Deploy' },
  });

  if (!devRes.ok) {
    const err = await devRes.text();
    return { statusCode: 500, body: JSON.stringify({ fout: 'Kon dev branch niet ophalen', detail: err }) };
  }

  const { object } = await devRes.json();
  const devSha = object.sha;

  // Update main naar dezelfde SHA (fast-forward merge)
  const updateRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'PureSpirit-Deploy',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sha: devSha, force: false }),
  });

  if (!updateRes.ok) {
    const err = await updateRes.text();
    return { statusCode: 500, body: JSON.stringify({ fout: 'Merge mislukt', detail: err }) };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true, bericht: 'Website wordt gepubliceerd!' }),
  };
};
