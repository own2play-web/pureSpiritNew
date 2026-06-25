declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"diensten": {
"bachbloesemtherapie.md": {
	id: "bachbloesemtherapie.md";
  slug: "bachbloesemtherapie";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
"begeleiding-hsp.md": {
	id: "begeleiding-hsp.md";
  slug: "begeleiding-hsp";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
"coaching.md": {
	id: "coaching.md";
  slug: "coaching";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
"meditatie.md": {
	id: "meditatie.md";
  slug: "meditatie";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
"persoonlijke-groei.md": {
	id: "persoonlijke-groei.md";
  slug: "persoonlijke-groei";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
};
"nieuws": {
"229.md": {
	id: "229.md";
  slug: "229";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"adventkalender.md": {
	id: "adventkalender.md";
  slug: "adventkalender";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"afspraken-weer-in-de-praktijk-mogelijk.md": {
	id: "afspraken-weer-in-de-praktijk-mogelijk.md";
  slug: "afspraken-weer-in-de-praktijk-mogelijk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"angelspirit-beurs.md": {
	id: "angelspirit-beurs.md";
  slug: "angelspirit-beurs";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"artikel-regio-oss.md": {
	id: "artikel-regio-oss.md";
  slug: "artikel-regio-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"bachbloesems-als-hulpmiddel-bij-vele-klachten.md": {
	id: "bachbloesems-als-hulpmiddel-bij-vele-klachten.md";
  slug: "bachbloesems-als-hulpmiddel-bij-vele-klachten";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"bachbloesems-bij-examenstress.md": {
	id: "bachbloesems-bij-examenstress.md";
  slug: "bachbloesems-bij-examenstress";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"bachbloesemtherapie-heel-geschikt-bij-hsp.md": {
	id: "bachbloesemtherapie-heel-geschikt-bij-hsp.md";
  slug: "bachbloesemtherapie-heel-geschikt-bij-hsp";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"bachbloesemtherapie-zeer-geschikt-voor-hooggevoelige-mensen-hsp-en-hsk.md": {
	id: "bachbloesemtherapie-zeer-geschikt-voor-hooggevoelige-mensen-hsp-en-hsk.md";
  slug: "bachbloesemtherapie-zeer-geschikt-voor-hooggevoelige-mensen-hsp-en-hsk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss-2.md": {
	id: "beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss-2.md";
  slug: "beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss.md": {
	id: "beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss.md";
  slug: "beter-omgaan-met-prikkels-leuke-workshop-voor-hspers-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"corona-en-bachbloesems.md": {
	id: "corona-en-bachbloesems.md";
  slug: "corona-en-bachbloesems";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"corona-virus-2.md": {
	id: "corona-virus-2.md";
  slug: "corona-virus-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"corona-virus.md": {
	id: "corona-virus.md";
  slug: "corona-virus";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"cursus-persoonlijke-ontwikkeling-weer-van-start.md": {
	id: "cursus-persoonlijke-ontwikkeling-weer-van-start.md";
  slug: "cursus-persoonlijke-ontwikkeling-weer-van-start";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"cursus-rust-in-je-hoofd-voor-kinderen-nog-een-paar-plekjes-vrij.md": {
	id: "cursus-rust-in-je-hoofd-voor-kinderen-nog-een-paar-plekjes-vrij.md";
  slug: "cursus-rust-in-je-hoofd-voor-kinderen-nog-een-paar-plekjes-vrij";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"cursus-rust-in-je-hoofd-voor-kinderen.md": {
	id: "cursus-rust-in-je-hoofd-voor-kinderen.md";
  slug: "cursus-rust-in-je-hoofd-voor-kinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"cursusnet-succes.md": {
	id: "cursusnet-succes.md";
  slug: "cursusnet-succes";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"data-meditatielessen-goede-doel.md": {
	id: "data-meditatielessen-goede-doel.md";
  slug: "data-meditatielessen-goede-doel";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"dit-jaar-nieuw-meditatie-voor-jong-volwassenen.md": {
	id: "dit-jaar-nieuw-meditatie-voor-jong-volwassenen.md";
  slug: "dit-jaar-nieuw-meditatie-voor-jong-volwassenen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"een-extra-workshop-in-oss-omgaan-met-nieuwetijdskinderen.md": {
	id: "een-extra-workshop-in-oss-omgaan-met-nieuwetijdskinderen.md";
  slug: "een-extra-workshop-in-oss-omgaan-met-nieuwetijdskinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"eer-zijn-nog-een-paar-plekjes-op-de-meditatielessen-voor-het-goede-doel.md": {
	id: "eer-zijn-nog-een-paar-plekjes-op-de-meditatielessen-voor-het-goede-doel.md";
  slug: "eer-zijn-nog-een-paar-plekjes-op-de-meditatielessen-voor-het-goede-doel";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-bachbloesems-2025.md": {
	id: "examenstress-bachbloesems-2025.md";
  slug: "examenstress-bachbloesems-2025";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-bachbloesems-2026.md": {
	id: "examenstress-bachbloesems-2026.md";
  slug: "examenstress-bachbloesems-2026";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-bachbloesems-helpen-op-natuurlijke-wijze.md": {
	id: "examenstress-bachbloesems-helpen-op-natuurlijke-wijze.md";
  slug: "examenstress-bachbloesems-helpen-op-natuurlijke-wijze";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-denk-eens-aan-bachbloesems-2.md": {
	id: "examenstress-denk-eens-aan-bachbloesems-2.md";
  slug: "examenstress-denk-eens-aan-bachbloesems-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-denk-eens-aan-bachbloesems-3.md": {
	id: "examenstress-denk-eens-aan-bachbloesems-3.md";
  slug: "examenstress-denk-eens-aan-bachbloesems-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-denk-eens-aan-bachbloesems-4.md": {
	id: "examenstress-denk-eens-aan-bachbloesems-4.md";
  slug: "examenstress-denk-eens-aan-bachbloesems-4";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"examenstress-denk-eens-aan-bachbloesems.md": {
	id: "examenstress-denk-eens-aan-bachbloesems.md";
  slug: "examenstress-denk-eens-aan-bachbloesems";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"extra-gratis-proefles-meditatie.md": {
	id: "extra-gratis-proefles-meditatie.md";
  slug: "extra-gratis-proefles-meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"extra-gratis-thema-avond-hoogsensitief-kind.md": {
	id: "extra-gratis-thema-avond-hoogsensitief-kind.md";
  slug: "extra-gratis-thema-avond-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"extra-infobijeenkomst-hoogsensitief-kind.md": {
	id: "extra-infobijeenkomst-hoogsensitief-kind.md";
  slug: "extra-infobijeenkomst-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"fijne-feestdagen.md": {
	id: "fijne-feestdagen.md";
  slug: "fijne-feestdagen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"fijne-kerstdagen.md": {
	id: "fijne-kerstdagen.md";
  slug: "fijne-kerstdagen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-van-de-maand-april-2012.md": {
	id: "gebed-van-de-maand-april-2012.md";
  slug: "gebed-van-de-maand-april-2012";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-van-de-maand-februari-2012.md": {
	id: "gebed-van-de-maand-februari-2012.md";
  slug: "gebed-van-de-maand-februari-2012";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-van-de-maand-januari-2012.md": {
	id: "gebed-van-de-maand-januari-2012.md";
  slug: "gebed-van-de-maand-januari-2012";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-van-de-maand-maart-2012.md": {
	id: "gebed-van-de-maand-maart-2012.md";
  slug: "gebed-van-de-maand-maart-2012";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-van-de-maand.md": {
	id: "gebed-van-de-maand.md";
  slug: "gebed-van-de-maand";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gebed-zomer-2012.md": {
	id: "gebed-zomer-2012.md";
  slug: "gebed-zomer-2012";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gelukkig-nieuwjaar.md": {
	id: "gelukkig-nieuwjaar.md";
  slug: "gelukkig-nieuwjaar";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-kindermeditatie-oss.md": {
	id: "gratis-proefles-kindermeditatie-oss.md";
  slug: "gratis-proefles-kindermeditatie-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-in-oss-2.md": {
	id: "gratis-proefles-meditatie-in-oss-2.md";
  slug: "gratis-proefles-meditatie-in-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-in-oss-3.md": {
	id: "gratis-proefles-meditatie-in-oss-3.md";
  slug: "gratis-proefles-meditatie-in-oss-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-in-oss-4.md": {
	id: "gratis-proefles-meditatie-in-oss-4.md";
  slug: "gratis-proefles-meditatie-in-oss-4";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-in-oss.md": {
	id: "gratis-proefles-meditatie-in-oss.md";
  slug: "gratis-proefles-meditatie-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-oss.md": {
	id: "gratis-proefles-meditatie-oss.md";
  slug: "gratis-proefles-meditatie-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie-voor-iedereen-oss.md": {
	id: "gratis-proefles-meditatie-voor-iedereen-oss.md";
  slug: "gratis-proefles-meditatie-voor-iedereen-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-proefles-meditatie.md": {
	id: "gratis-proefles-meditatie.md";
  slug: "gratis-proefles-meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-thema-avond-hoogsensitief-kind-2.md": {
	id: "gratis-thema-avond-hoogsensitief-kind-2.md";
  slug: "gratis-thema-avond-hoogsensitief-kind-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-thema-avond-hoogsensitief-kind-3.md": {
	id: "gratis-thema-avond-hoogsensitief-kind-3.md";
  slug: "gratis-thema-avond-hoogsensitief-kind-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-thema-avond-hoogsensitief-kind.md": {
	id: "gratis-thema-avond-hoogsensitief-kind.md";
  slug: "gratis-thema-avond-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-workshop-hsp-voor-onderwijs.md": {
	id: "gratis-workshop-hsp-voor-onderwijs.md";
  slug: "gratis-workshop-hsp-voor-onderwijs";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"gratis-workshop.md": {
	id: "gratis-workshop.md";
  slug: "gratis-workshop";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"heeft-je-kind-moeite-om-weer-te-wennen-op-school-denk-dan-eens-aan-bachbloesems.md": {
	id: "heeft-je-kind-moeite-om-weer-te-wennen-op-school-denk-dan-eens-aan-bachbloesems.md";
  slug: "heeft-je-kind-moeite-om-weer-te-wennen-op-school-denk-dan-eens-aan-bachbloesems";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"heeft-jouw-kind-problemen-met-weer-naar-school-gaan-nieuw-ritme-spannend-nieuwe-klas-of-overgang-naar-voortgezet-onderwijs-bachbloesems-helpen.md": {
	id: "heeft-jouw-kind-problemen-met-weer-naar-school-gaan-nieuw-ritme-spannend-nieuwe-klas-of-overgang-naar-voortgezet-onderwijs-bachbloesems-helpen.md";
  slug: "heeft-jouw-kind-problemen-met-weer-naar-school-gaan-nieuw-ritme-spannend-nieuwe-klas-of-overgang-naar-voortgezet-onderwijs-bachbloesems-helpen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"herfstvakantie.md": {
	id: "herfstvakantie.md";
  slug: "herfstvakantie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"in-de-meivakantie-is-de-praktijk-gesloten.md": {
	id: "in-de-meivakantie-is-de-praktijk-gesloten.md";
  slug: "in-de-meivakantie-is-de-praktijk-gesloten";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"in-ontwikkeling.md": {
	id: "in-ontwikkeling.md";
  slug: "in-ontwikkeling";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"infobijeenkomst-hoogsensitief-kind.md": {
	id: "infobijeenkomst-hoogsensitief-kind.md";
  slug: "infobijeenkomst-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"informatiebijeenkomst-hoogsensitief-kind.md": {
	id: "informatiebijeenkomst-hoogsensitief-kind.md";
  slug: "informatiebijeenkomst-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"inschrijven-cursussen-oss-start-deze-week.md": {
	id: "inschrijven-cursussen-oss-start-deze-week.md";
  slug: "inschrijven-cursussen-oss-start-deze-week";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"internationale-vrouwendag-in-oss.md": {
	id: "internationale-vrouwendag-in-oss.md";
  slug: "internationale-vrouwendag-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kind-wennen-school-2024.md": {
	id: "kind-wennen-school-2024.md";
  slug: "kind-wennen-school-2024";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindercursussen-2013.md": {
	id: "kindercursussen-2013.md";
  slug: "kindercursussen-2013";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-in-oss-weer-van-start.md": {
	id: "kindermeditatie-in-oss-weer-van-start.md";
  slug: "kindermeditatie-in-oss-weer-van-start";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-in-oss.md": {
	id: "kindermeditatie-in-oss.md";
  slug: "kindermeditatie-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-oss-2.md": {
	id: "kindermeditatie-oss-2.md";
  slug: "kindermeditatie-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-oss-3.md": {
	id: "kindermeditatie-oss-3.md";
  slug: "kindermeditatie-oss-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-oss.md": {
	id: "kindermeditatie-oss.md";
  slug: "kindermeditatie-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie-weer-van-start.md": {
	id: "kindermeditatie-weer-van-start.md";
  slug: "kindermeditatie-weer-van-start";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"kindermeditatie.md": {
	id: "kindermeditatie.md";
  slug: "kindermeditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"laat-je-intuitie-weer-je-kompas-zijn-2.md": {
	id: "laat-je-intuitie-weer-je-kompas-zijn-2.md";
  slug: "laat-je-intuitie-weer-je-kompas-zijn-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"laat-je-intuitie-weer-je-kompas-zijn.md": {
	id: "laat-je-intuitie-weer-je-kompas-zijn.md";
  slug: "laat-je-intuitie-weer-je-kompas-zijn";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"les-meditatie-in-summerschool.md": {
	id: "les-meditatie-in-summerschool.md";
  slug: "les-meditatie-in-summerschool";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk.md": {
	id: "lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk.md";
  slug: "lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hooggevoeligheid-hsp-in-oss.md": {
	id: "lezing-hooggevoeligheid-hsp-in-oss.md";
  slug: "lezing-hooggevoeligheid-hsp-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitief-kind-speciaal-voor-de-mensen-op-de-wachtlijst.md": {
	id: "lezing-hoogsensitief-kind-speciaal-voor-de-mensen-op-de-wachtlijst.md";
  slug: "lezing-hoogsensitief-kind-speciaal-voor-de-mensen-op-de-wachtlijst";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitief-kind-uden.md": {
	id: "lezing-hoogsensitief-kind-uden.md";
  slug: "lezing-hoogsensitief-kind-uden";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitief-kind-veghel.md": {
	id: "lezing-hoogsensitief-kind-veghel.md";
  slug: "lezing-hoogsensitief-kind-veghel";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitief-kind.md": {
	id: "lezing-hoogsensitief-kind.md";
  slug: "lezing-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitieve-kinderen-in-veghel.md": {
	id: "lezing-hoogsensitieve-kinderen-in-veghel.md";
  slug: "lezing-hoogsensitieve-kinderen-in-veghel";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-hoogsensitieve-kinderen.md": {
	id: "lezing-hoogsensitieve-kinderen.md";
  slug: "lezing-hoogsensitieve-kinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-in-oss-over-hooggevoelige-kinderen-hsphsk.md": {
	id: "lezing-in-oss-over-hooggevoelige-kinderen-hsphsk.md";
  slug: "lezing-in-oss-over-hooggevoelige-kinderen-hsphsk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-kinderdagverblijf.md": {
	id: "lezing-kinderdagverblijf.md";
  slug: "lezing-kinderdagverblijf";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-oss-hooggevoeligheid-een-last-of-een-mooi-geschenk.md": {
	id: "lezing-oss-hooggevoeligheid-een-last-of-een-mooi-geschenk.md";
  slug: "lezing-oss-hooggevoeligheid-een-last-of-een-mooi-geschenk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-oss-hsp-een-last-of-een-mooi-geschenk.md": {
	id: "lezing-oss-hsp-een-last-of-een-mooi-geschenk.md";
  slug: "lezing-oss-hsp-een-last-of-een-mooi-geschenk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"lezing-over-hooggevoeligheid.md": {
	id: "lezing-over-hooggevoeligheid.md";
  slug: "lezing-over-hooggevoeligheid";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"link-artikel-regio-oss.md": {
	id: "link-artikel-regio-oss.md";
  slug: "link-artikel-regio-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"medicatie-of-meditatie.md": {
	id: "medicatie-of-meditatie.md";
  slug: "medicatie-of-meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-cursus-weer-van-start-in-oss.md": {
	id: "meditatie-cursus-weer-van-start-in-oss.md";
  slug: "meditatie-cursus-weer-van-start-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-extra-start-2024-november.md": {
	id: "meditatie-extra-start-2024-november.md";
  slug: "meditatie-extra-start-2024-november";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-extra-start-2025-januari.md": {
	id: "meditatie-extra-start-2025-januari.md";
  slug: "meditatie-extra-start-2025-januari";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-extra-wer-van-start-in-oss.md": {
	id: "meditatie-extra-wer-van-start-in-oss.md";
  slug: "meditatie-extra-wer-van-start-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-geeft-rust-in-je-hoofd-voor-jongeren-met-hsp-heel-geschikt.md": {
	id: "meditatie-geeft-rust-in-je-hoofd-voor-jongeren-met-hsp-heel-geschikt.md";
  slug: "meditatie-geeft-rust-in-je-hoofd-voor-jongeren-met-hsp-heel-geschikt";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-jongeren-2024-oktober.md": {
	id: "meditatie-jongeren-2024-oktober.md";
  slug: "meditatie-jongeren-2024-oktober";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-jongeren-in-oss.md": {
	id: "meditatie-jongeren-in-oss.md";
  slug: "meditatie-jongeren-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-jongeren-oss-2.md": {
	id: "meditatie-jongeren-oss-2.md";
  slug: "meditatie-jongeren-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-jongeren-oss-3.md": {
	id: "meditatie-jongeren-oss-3.md";
  slug: "meditatie-jongeren-oss-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-jongeren-oss.md": {
	id: "meditatie-jongeren-oss.md";
  slug: "meditatie-jongeren-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-les-via-skype.md": {
	id: "meditatie-les-via-skype.md";
  slug: "meditatie-les-via-skype";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-lessen-in-oss.md": {
	id: "meditatie-lessen-in-oss.md";
  slug: "meditatie-lessen-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-oss.md": {
	id: "meditatie-oss.md";
  slug: "meditatie-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-het-goede-doel.md": {
	id: "meditatie-voor-het-goede-doel.md";
  slug: "meditatie-voor-het-goede-doel";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-jongeren-12-16-jaar-in-oss.md": {
	id: "meditatie-voor-jongeren-12-16-jaar-in-oss.md";
  slug: "meditatie-voor-jongeren-12-16-jaar-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-jongeren-start-weer-in-oss-meer-rust-in-je-hoofd.md": {
	id: "meditatie-voor-jongeren-start-weer-in-oss-meer-rust-in-je-hoofd.md";
  slug: "meditatie-voor-jongeren-start-weer-in-oss-meer-rust-in-je-hoofd";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-jongeren-weer-van-start-in-oss.md": {
	id: "meditatie-voor-jongeren-weer-van-start-in-oss.md";
  slug: "meditatie-voor-jongeren-weer-van-start-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-jongeren.md": {
	id: "meditatie-voor-jongeren.md";
  slug: "meditatie-voor-jongeren";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-kinderen-hsp.md": {
	id: "meditatie-voor-kinderen-hsp.md";
  slug: "meditatie-voor-kinderen-hsp";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-kinderen-oss.md": {
	id: "meditatie-voor-kinderen-oss.md";
  slug: "meditatie-voor-kinderen-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie-voor-kinderen-van-7-tot-12-jaar-in-oss.md": {
	id: "meditatie-voor-kinderen-van-7-tot-12-jaar-in-oss.md";
  slug: "meditatie-voor-kinderen-van-7-tot-12-jaar-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatie.md": {
	id: "meditatie.md";
  slug: "meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatiecursus-jong-volwassenen-2025.md": {
	id: "meditatiecursus-jong-volwassenen-2025.md";
  slug: "meditatiecursus-jong-volwassenen-2025";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatiecursus-van-start-in-oss.md": {
	id: "meditatiecursus-van-start-in-oss.md";
  slug: "meditatiecursus-van-start-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatieles-in-oss-start-weer.md": {
	id: "meditatieles-in-oss-start-weer.md";
  slug: "meditatieles-in-oss-start-weer";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatielessen-in-oss.md": {
	id: "meditatielessen-in-oss.md";
  slug: "meditatielessen-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meditatielessen-oss.md": {
	id: "meditatielessen-oss.md";
  slug: "meditatielessen-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meer-rust-in-je-hoofd-jongeren.md": {
	id: "meer-rust-in-je-hoofd-jongeren.md";
  slug: "meer-rust-in-je-hoofd-jongeren";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"meer-rust-in-je-hoofd-meditatie-voor-jongeren-start-weer-in-oss.md": {
	id: "meer-rust-in-je-hoofd-meditatie-voor-jongeren-start-weer-in-oss.md";
  slug: "meer-rust-in-je-hoofd-meditatie-voor-jongeren-start-weer-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuw-cursusprogramma-2022-2023.md": {
	id: "nieuw-cursusprogramma-2022-2023.md";
  slug: "nieuw-cursusprogramma-2022-2023";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuw-cursusprogramma.md": {
	id: "nieuw-cursusprogramma.md";
  slug: "nieuw-cursusprogramma";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuw-lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk.md": {
	id: "nieuw-lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk.md";
  slug: "nieuw-lezing-hooggevoeligheid-een-last-of-een-mooi-geschenk";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuw-meditatie-jong-volwassenen.md": {
	id: "nieuw-meditatie-jong-volwassenen.md";
  slug: "nieuw-meditatie-jong-volwassenen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuwe-groepen-van-start-meditatie-jongeren-in-oss.md": {
	id: "nieuwe-groepen-van-start-meditatie-jongeren-in-oss.md";
  slug: "nieuwe-groepen-van-start-meditatie-jongeren-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuwe-meditatie-groep-van-start-in-oss.md": {
	id: "nieuwe-meditatie-groep-van-start-in-oss.md";
  slug: "nieuwe-meditatie-groep-van-start-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuwe-programma-klaar.md": {
	id: "nieuwe-programma-klaar.md";
  slug: "nieuwe-programma-klaar";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"nieuwe-tijd-kindermeditatie.md": {
	id: "nieuwe-tijd-kindermeditatie.md";
  slug: "nieuwe-tijd-kindermeditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"persoonlijke-ontwikkeling-oss.md": {
	id: "persoonlijke-ontwikkeling-oss.md";
  slug: "persoonlijke-ontwikkeling-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"praktijk-gesloten-ivm-kerst-en-nieuwjaar.md": {
	id: "praktijk-gesloten-ivm-kerst-en-nieuwjaar.md";
  slug: "praktijk-gesloten-ivm-kerst-en-nieuwjaar";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"praktijk-gesloten-ivm-vakantie.md": {
	id: "praktijk-gesloten-ivm-vakantie.md";
  slug: "praktijk-gesloten-ivm-vakantie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"praktijk-gesloten-van-29-juni-tot-7-juli.md": {
	id: "praktijk-gesloten-van-29-juni-tot-7-juli.md";
  slug: "praktijk-gesloten-van-29-juni-tot-7-juli";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"probleem-antwoordapparaat.md": {
	id: "probleem-antwoordapparaat.md";
  slug: "probleem-antwoordapparaat";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"proefles-meditatie-jongeren.md": {
	id: "proefles-meditatie-jongeren.md";
  slug: "proefles-meditatie-jongeren";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"programma-2021-2022.md": {
	id: "programma-2021-2022.md";
  slug: "programma-2021-2022";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"pure-spirit-is-tijdens-de-zomervakantie-open.md": {
	id: "pure-spirit-is-tijdens-de-zomervakantie-open.md";
  slug: "pure-spirit-is-tijdens-de-zomervakantie-open";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"rust-in-je-hoofd-meditatiecursus-voor-jong-volwassenen.md": {
	id: "rust-in-je-hoofd-meditatiecursus-voor-jong-volwassenen.md";
  slug: "rust-in-je-hoofd-meditatiecursus-voor-jong-volwassenen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"spiritueel-festivalzijn.md": {
	id: "spiritueel-festivalzijn.md";
  slug: "spiritueel-festivalzijn";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-cursus-meditatie-voor-jongeren-in-oss.md": {
	id: "start-cursus-meditatie-voor-jongeren-in-oss.md";
  slug: "start-cursus-meditatie-voor-jongeren-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-cursus-persoonlijke-ontwikkeling-in-oss.md": {
	id: "start-cursus-persoonlijke-ontwikkeling-in-oss.md";
  slug: "start-cursus-persoonlijke-ontwikkeling-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-cursus-persoonlijke-ontwikkeling-met-meditatie-in-oss.md": {
	id: "start-cursus-persoonlijke-ontwikkeling-met-meditatie-in-oss.md";
  slug: "start-cursus-persoonlijke-ontwikkeling-met-meditatie-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-cursus-persoonlijke-ontwikkeling-met-meditatie.md": {
	id: "start-cursus-persoonlijke-ontwikkeling-met-meditatie.md";
  slug: "start-cursus-persoonlijke-ontwikkeling-met-meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-heel-veel-nieuwe-meditatiegroepen-voor-kinderen-jongeren-en-volwassenen.md": {
	id: "start-heel-veel-nieuwe-meditatiegroepen-voor-kinderen-jongeren-en-volwassenen.md";
  slug: "start-heel-veel-nieuwe-meditatiegroepen-voor-kinderen-jongeren-en-volwassenen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-kindermeditatie-in-oss.md": {
	id: "start-kindermeditatie-in-oss.md";
  slug: "start-kindermeditatie-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-kindermeditatie.md": {
	id: "start-kindermeditatie.md";
  slug: "start-kindermeditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-meditatie-extra-cursus-in-oss-2.md": {
	id: "start-meditatie-extra-cursus-in-oss-2.md";
  slug: "start-meditatie-extra-cursus-in-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-meditatie-extra-cursus-in-oss.md": {
	id: "start-meditatie-extra-cursus-in-oss.md";
  slug: "start-meditatie-extra-cursus-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-meditatie-voor-iedereen-in-oss.md": {
	id: "start-meditatie-voor-iedereen-in-oss.md";
  slug: "start-meditatie-voor-iedereen-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-nieuwe-groep-meditatie-in-oss-2.md": {
	id: "start-nieuwe-groep-meditatie-in-oss-2.md";
  slug: "start-nieuwe-groep-meditatie-in-oss-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-nieuwe-groep-meditatie-in-oss.md": {
	id: "start-nieuwe-groep-meditatie-in-oss.md";
  slug: "start-nieuwe-groep-meditatie-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-nieuwe-groepen-meditatie-oss.md": {
	id: "start-nieuwe-groepen-meditatie-oss.md";
  slug: "start-nieuwe-groepen-meditatie-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-nieuwe-meditatie-cursussen-in-oss.md": {
	id: "start-nieuwe-meditatie-cursussen-in-oss.md";
  slug: "start-nieuwe-meditatie-cursussen-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"start-nieuwe-meditatie-groep-in-oss.md": {
	id: "start-nieuwe-meditatie-groep-in-oss.md";
  slug: "start-nieuwe-meditatie-groep-in-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-leuke-losse-meditatie-lessen.md": {
	id: "summerschool-leuke-losse-meditatie-lessen.md";
  slug: "summerschool-leuke-losse-meditatie-lessen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie-2.md": {
	id: "summerschool-meditatie-2.md";
  slug: "summerschool-meditatie-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie-2024.md": {
	id: "summerschool-meditatie-2024.md";
  slug: "summerschool-meditatie-2024";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie-2025.md": {
	id: "summerschool-meditatie-2025.md";
  slug: "summerschool-meditatie-2025";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie-3.md": {
	id: "summerschool-meditatie-3.md";
  slug: "summerschool-meditatie-3";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie-les.md": {
	id: "summerschool-meditatie-les.md";
  slug: "summerschool-meditatie-les";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool-meditatie.md": {
	id: "summerschool-meditatie.md";
  slug: "summerschool-meditatie";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"summerschool.md": {
	id: "summerschool.md";
  slug: "summerschool";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"tarieven.md": {
	id: "tarieven.md";
  slug: "tarieven";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"technische-storing-daardoor-nieuwsberichten-weg-van-juni-2013-tot-maart-2014.md": {
	id: "technische-storing-daardoor-nieuwsberichten-weg-van-juni-2013-tot-maart-2014.md";
  slug: "technische-storing-daardoor-nieuwsberichten-weg-van-juni-2013-tot-maart-2014";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"thema-avond-hoogsensitief-kind.md": {
	id: "thema-avond-hoogsensitief-kind.md";
  slug: "thema-avond-hoogsensitief-kind";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"tweede-gratis-proefles-meditatie-voor-kinderen.md": {
	id: "tweede-gratis-proefles-meditatie-voor-kinderen.md";
  slug: "tweede-gratis-proefles-meditatie-voor-kinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"vrolijk-pasen-2.md": {
	id: "vrolijk-pasen-2.md";
  slug: "vrolijk-pasen-2";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"vrolijk-pasen.md": {
	id: "vrolijk-pasen.md";
  slug: "vrolijk-pasen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"we-gaan-weer-van-start.md": {
	id: "we-gaan-weer-van-start.md";
  slug: "we-gaan-weer-van-start";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-naar-school-bachbloesems-2025.md": {
	id: "weer-naar-school-bachbloesems-2025.md";
  slug: "weer-naar-school-bachbloesems-2025";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-naar-school-bachbloesems-helpen.md": {
	id: "weer-naar-school-bachbloesems-helpen.md";
  slug: "weer-naar-school-bachbloesems-helpen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-naar-school-bachbloesems-kunnen-helpen.md": {
	id: "weer-naar-school-bachbloesems-kunnen-helpen.md";
  slug: "weer-naar-school-bachbloesems-kunnen-helpen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-naar-school-moeilijk-voor-hoog-gevoelige-kinderen.md": {
	id: "weer-naar-school-moeilijk-voor-hoog-gevoelige-kinderen.md";
  slug: "weer-naar-school-moeilijk-voor-hoog-gevoelige-kinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-nieuwe-activiteiten.md": {
	id: "weer-nieuwe-activiteiten.md";
  slug: "weer-nieuwe-activiteiten";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"weer-van-start.md": {
	id: "weer-van-start.md";
  slug: "weer-van-start";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"wij-zijn-tijdens-de-zomervakantie-geopend.md": {
	id: "wij-zijn-tijdens-de-zomervakantie-geopend.md";
  slug: "wij-zijn-tijdens-de-zomervakantie-geopend";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"wil-je-eens-proberen-of-meditatie-iets-voor-jou-is-dan-is-deze-summerschool-les-echt-iets-voor-jou.md": {
	id: "wil-je-eens-proberen-of-meditatie-iets-voor-jou-is-dan-is-deze-summerschool-les-echt-iets-voor-jou.md";
  slug: "wil-je-eens-proberen-of-meditatie-iets-voor-jou-is-dan-is-deze-summerschool-les-echt-iets-voor-jou";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"workshop-beter-omgaan-met-prikkels-oss.md": {
	id: "workshop-beter-omgaan-met-prikkels-oss.md";
  slug: "workshop-beter-omgaan-met-prikkels-oss";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"workshop-beter-omgaan-met-prikkels.md": {
	id: "workshop-beter-omgaan-met-prikkels.md";
  slug: "workshop-beter-omgaan-met-prikkels";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"workshop-omgaan-met-nieuwetijdskinderen.md": {
	id: "workshop-omgaan-met-nieuwetijdskinderen.md";
  slug: "workshop-omgaan-met-nieuwetijdskinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"workshop-onderwijs-thema-hoogsensitieve-kinderen.md": {
	id: "workshop-onderwijs-thema-hoogsensitieve-kinderen.md";
  slug: "workshop-onderwijs-thema-hoogsensitieve-kinderen";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"zomervakantie-2016.md": {
	id: "zomervakantie-2016.md";
  slug: "zomervakantie-2016";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"zomervakantie-pure-spirit.md": {
	id: "zomervakantie-pure-spirit.md";
  slug: "zomervakantie-pure-spirit";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
"zorg-voor-een-goede-weerstand.md": {
	id: "zorg-voor-een-goede-weerstand.md";
  slug: "zorg-voor-een-goede-weerstand";
  body: string;
  collection: "nieuws";
  data: InferEntrySchema<"nieuws">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
