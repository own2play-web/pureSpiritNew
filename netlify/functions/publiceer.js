exports.handler = async (event, context) => {
  // Alleen ingelogde (Netlify Identity) gebruikers mogen dev naar main
  // publiceren. Netlify vult context.clientContext.user alleen als de
  // request een geldig Identity-JWT meestuurt (Authorization: Bearer ...) —
  // zie publiceer.astro, dat token haalt via netlifyIdentity user.jwt().
  if (!context.clientContext || !context.clientContext.user) {
    return { statusCode: 401, body: JSON.stringify({ fout: 'Niet ingelogd. Log in via /admin/ om te publiceren.' }) };
  }

  const token = process.env.GITHUB_TOKEN;
  const owner = 'own2play-web';
  const repo  = 'pureSpiritNew';

  if (!token) {
    return { statusCode: 500, body: JSON.stringify({ fout: 'GITHUB_TOKEN niet ingesteld' }) };
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
