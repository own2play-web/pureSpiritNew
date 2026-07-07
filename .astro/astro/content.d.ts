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
"prive-consult.md": {
	id: "prive-consult.md";
  slug: "prive-consult";
  body: string;
  collection: "diensten";
  data: InferEntrySchema<"diensten">
} & { render(): Render[".md"] };
};
"ervaringen": {
"ervaring-001.md": {
	id: "ervaring-001.md";
  slug: "ervaring-001";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-002.md": {
	id: "ervaring-002.md";
  slug: "ervaring-002";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-003.md": {
	id: "ervaring-003.md";
  slug: "ervaring-003";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-004.md": {
	id: "ervaring-004.md";
  slug: "ervaring-004";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-005.md": {
	id: "ervaring-005.md";
  slug: "ervaring-005";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-006.md": {
	id: "ervaring-006.md";
  slug: "ervaring-006";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-007.md": {
	id: "ervaring-007.md";
  slug: "ervaring-007";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-008.md": {
	id: "ervaring-008.md";
  slug: "ervaring-008";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-009.md": {
	id: "ervaring-009.md";
  slug: "ervaring-009";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-010.md": {
	id: "ervaring-010.md";
  slug: "ervaring-010";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-011.md": {
	id: "ervaring-011.md";
  slug: "ervaring-011";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-012.md": {
	id: "ervaring-012.md";
  slug: "ervaring-012";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-013.md": {
	id: "ervaring-013.md";
  slug: "ervaring-013";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-014.md": {
	id: "ervaring-014.md";
  slug: "ervaring-014";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-015.md": {
	id: "ervaring-015.md";
  slug: "ervaring-015";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-016.md": {
	id: "ervaring-016.md";
  slug: "ervaring-016";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-017.md": {
	id: "ervaring-017.md";
  slug: "ervaring-017";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-018.md": {
	id: "ervaring-018.md";
  slug: "ervaring-018";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-019.md": {
	id: "ervaring-019.md";
  slug: "ervaring-019";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-020.md": {
	id: "ervaring-020.md";
  slug: "ervaring-020";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-021.md": {
	id: "ervaring-021.md";
  slug: "ervaring-021";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-022.md": {
	id: "ervaring-022.md";
  slug: "ervaring-022";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-023.md": {
	id: "ervaring-023.md";
  slug: "ervaring-023";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-024.md": {
	id: "ervaring-024.md";
  slug: "ervaring-024";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-025.md": {
	id: "ervaring-025.md";
  slug: "ervaring-025";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-026.md": {
	id: "ervaring-026.md";
  slug: "ervaring-026";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-027.md": {
	id: "ervaring-027.md";
  slug: "ervaring-027";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-028.md": {
	id: "ervaring-028.md";
  slug: "ervaring-028";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-029.md": {
	id: "ervaring-029.md";
  slug: "ervaring-029";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-030.md": {
	id: "ervaring-030.md";
  slug: "ervaring-030";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-031.md": {
	id: "ervaring-031.md";
  slug: "ervaring-031";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-032.md": {
	id: "ervaring-032.md";
  slug: "ervaring-032";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-033.md": {
	id: "ervaring-033.md";
  slug: "ervaring-033";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-034.md": {
	id: "ervaring-034.md";
  slug: "ervaring-034";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-035.md": {
	id: "ervaring-035.md";
  slug: "ervaring-035";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-036.md": {
	id: "ervaring-036.md";
  slug: "ervaring-036";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-037.md": {
	id: "ervaring-037.md";
  slug: "ervaring-037";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-038.md": {
	id: "ervaring-038.md";
  slug: "ervaring-038";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-039.md": {
	id: "ervaring-039.md";
  slug: "ervaring-039";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-040.md": {
	id: "ervaring-040.md";
  slug: "ervaring-040";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-041.md": {
	id: "ervaring-041.md";
  slug: "ervaring-041";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-042.md": {
	id: "ervaring-042.md";
  slug: "ervaring-042";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-043.md": {
	id: "ervaring-043.md";
  slug: "ervaring-043";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-044.md": {
	id: "ervaring-044.md";
  slug: "ervaring-044";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-045.md": {
	id: "ervaring-045.md";
  slug: "ervaring-045";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-046.md": {
	id: "ervaring-046.md";
  slug: "ervaring-046";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-047.md": {
	id: "ervaring-047.md";
  slug: "ervaring-047";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-048.md": {
	id: "ervaring-048.md";
  slug: "ervaring-048";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-049.md": {
	id: "ervaring-049.md";
  slug: "ervaring-049";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-050.md": {
	id: "ervaring-050.md";
  slug: "ervaring-050";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-051.md": {
	id: "ervaring-051.md";
  slug: "ervaring-051";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-052.md": {
	id: "ervaring-052.md";
  slug: "ervaring-052";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-053.md": {
	id: "ervaring-053.md";
  slug: "ervaring-053";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-054.md": {
	id: "ervaring-054.md";
  slug: "ervaring-054";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-055.md": {
	id: "ervaring-055.md";
  slug: "ervaring-055";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-056.md": {
	id: "ervaring-056.md";
  slug: "ervaring-056";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-057.md": {
	id: "ervaring-057.md";
  slug: "ervaring-057";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-058.md": {
	id: "ervaring-058.md";
  slug: "ervaring-058";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-059.md": {
	id: "ervaring-059.md";
  slug: "ervaring-059";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-060.md": {
	id: "ervaring-060.md";
  slug: "ervaring-060";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-061.md": {
	id: "ervaring-061.md";
  slug: "ervaring-061";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-062.md": {
	id: "ervaring-062.md";
  slug: "ervaring-062";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-063.md": {
	id: "ervaring-063.md";
  slug: "ervaring-063";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-064.md": {
	id: "ervaring-064.md";
  slug: "ervaring-064";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-065.md": {
	id: "ervaring-065.md";
  slug: "ervaring-065";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-066.md": {
	id: "ervaring-066.md";
  slug: "ervaring-066";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-067.md": {
	id: "ervaring-067.md";
  slug: "ervaring-067";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-068.md": {
	id: "ervaring-068.md";
  slug: "ervaring-068";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-069.md": {
	id: "ervaring-069.md";
  slug: "ervaring-069";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-070.md": {
	id: "ervaring-070.md";
  slug: "ervaring-070";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-071.md": {
	id: "ervaring-071.md";
  slug: "ervaring-071";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-072.md": {
	id: "ervaring-072.md";
  slug: "ervaring-072";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-073.md": {
	id: "ervaring-073.md";
  slug: "ervaring-073";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-074.md": {
	id: "ervaring-074.md";
  slug: "ervaring-074";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-075.md": {
	id: "ervaring-075.md";
  slug: "ervaring-075";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-076.md": {
	id: "ervaring-076.md";
  slug: "ervaring-076";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-077.md": {
	id: "ervaring-077.md";
  slug: "ervaring-077";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-078.md": {
	id: "ervaring-078.md";
  slug: "ervaring-078";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-079.md": {
	id: "ervaring-079.md";
  slug: "ervaring-079";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-080.md": {
	id: "ervaring-080.md";
  slug: "ervaring-080";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-081.md": {
	id: "ervaring-081.md";
  slug: "ervaring-081";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-082.md": {
	id: "ervaring-082.md";
  slug: "ervaring-082";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-083.md": {
	id: "ervaring-083.md";
  slug: "ervaring-083";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-084.md": {
	id: "ervaring-084.md";
  slug: "ervaring-084";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-085.md": {
	id: "ervaring-085.md";
  slug: "ervaring-085";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-086.md": {
	id: "ervaring-086.md";
  slug: "ervaring-086";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-087.md": {
	id: "ervaring-087.md";
  slug: "ervaring-087";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-088.md": {
	id: "ervaring-088.md";
  slug: "ervaring-088";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-089.md": {
	id: "ervaring-089.md";
  slug: "ervaring-089";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-090.md": {
	id: "ervaring-090.md";
  slug: "ervaring-090";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-091.md": {
	id: "ervaring-091.md";
  slug: "ervaring-091";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-092.md": {
	id: "ervaring-092.md";
  slug: "ervaring-092";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-093.md": {
	id: "ervaring-093.md";
  slug: "ervaring-093";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-094.md": {
	id: "ervaring-094.md";
  slug: "ervaring-094";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-095.md": {
	id: "ervaring-095.md";
  slug: "ervaring-095";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-096.md": {
	id: "ervaring-096.md";
  slug: "ervaring-096";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-097.md": {
	id: "ervaring-097.md";
  slug: "ervaring-097";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-098.md": {
	id: "ervaring-098.md";
  slug: "ervaring-098";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-099.md": {
	id: "ervaring-099.md";
  slug: "ervaring-099";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-100.md": {
	id: "ervaring-100.md";
  slug: "ervaring-100";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-101.md": {
	id: "ervaring-101.md";
  slug: "ervaring-101";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-102.md": {
	id: "ervaring-102.md";
  slug: "ervaring-102";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-103.md": {
	id: "ervaring-103.md";
  slug: "ervaring-103";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-104.md": {
	id: "ervaring-104.md";
  slug: "ervaring-104";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-105.md": {
	id: "ervaring-105.md";
  slug: "ervaring-105";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-106.md": {
	id: "ervaring-106.md";
  slug: "ervaring-106";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-107.md": {
	id: "ervaring-107.md";
  slug: "ervaring-107";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-108.md": {
	id: "ervaring-108.md";
  slug: "ervaring-108";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-109.md": {
	id: "ervaring-109.md";
  slug: "ervaring-109";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-110.md": {
	id: "ervaring-110.md";
  slug: "ervaring-110";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-111.md": {
	id: "ervaring-111.md";
  slug: "ervaring-111";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-112.md": {
	id: "ervaring-112.md";
  slug: "ervaring-112";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-113.md": {
	id: "ervaring-113.md";
  slug: "ervaring-113";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-114.md": {
	id: "ervaring-114.md";
  slug: "ervaring-114";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-115.md": {
	id: "ervaring-115.md";
  slug: "ervaring-115";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-116.md": {
	id: "ervaring-116.md";
  slug: "ervaring-116";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-117.md": {
	id: "ervaring-117.md";
  slug: "ervaring-117";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-118.md": {
	id: "ervaring-118.md";
  slug: "ervaring-118";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-119.md": {
	id: "ervaring-119.md";
  slug: "ervaring-119";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-120.md": {
	id: "ervaring-120.md";
  slug: "ervaring-120";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-121.md": {
	id: "ervaring-121.md";
  slug: "ervaring-121";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-122.md": {
	id: "ervaring-122.md";
  slug: "ervaring-122";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-123.md": {
	id: "ervaring-123.md";
  slug: "ervaring-123";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-124.md": {
	id: "ervaring-124.md";
  slug: "ervaring-124";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-125.md": {
	id: "ervaring-125.md";
  slug: "ervaring-125";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-126.md": {
	id: "ervaring-126.md";
  slug: "ervaring-126";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-127.md": {
	id: "ervaring-127.md";
  slug: "ervaring-127";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-128.md": {
	id: "ervaring-128.md";
  slug: "ervaring-128";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-129.md": {
	id: "ervaring-129.md";
  slug: "ervaring-129";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-130.md": {
	id: "ervaring-130.md";
  slug: "ervaring-130";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-131.md": {
	id: "ervaring-131.md";
  slug: "ervaring-131";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-132.md": {
	id: "ervaring-132.md";
  slug: "ervaring-132";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-133.md": {
	id: "ervaring-133.md";
  slug: "ervaring-133";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-134.md": {
	id: "ervaring-134.md";
  slug: "ervaring-134";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-135.md": {
	id: "ervaring-135.md";
  slug: "ervaring-135";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-136.md": {
	id: "ervaring-136.md";
  slug: "ervaring-136";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-137.md": {
	id: "ervaring-137.md";
  slug: "ervaring-137";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-138.md": {
	id: "ervaring-138.md";
  slug: "ervaring-138";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-139.md": {
	id: "ervaring-139.md";
  slug: "ervaring-139";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-140.md": {
	id: "ervaring-140.md";
  slug: "ervaring-140";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-141.md": {
	id: "ervaring-141.md";
  slug: "ervaring-141";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-142.md": {
	id: "ervaring-142.md";
  slug: "ervaring-142";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-143.md": {
	id: "ervaring-143.md";
  slug: "ervaring-143";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-144.md": {
	id: "ervaring-144.md";
  slug: "ervaring-144";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-145.md": {
	id: "ervaring-145.md";
  slug: "ervaring-145";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-146.md": {
	id: "ervaring-146.md";
  slug: "ervaring-146";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-147.md": {
	id: "ervaring-147.md";
  slug: "ervaring-147";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-148.md": {
	id: "ervaring-148.md";
  slug: "ervaring-148";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-149.md": {
	id: "ervaring-149.md";
  slug: "ervaring-149";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-150.md": {
	id: "ervaring-150.md";
  slug: "ervaring-150";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-151.md": {
	id: "ervaring-151.md";
  slug: "ervaring-151";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-152.md": {
	id: "ervaring-152.md";
  slug: "ervaring-152";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-153.md": {
	id: "ervaring-153.md";
  slug: "ervaring-153";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-154.md": {
	id: "ervaring-154.md";
  slug: "ervaring-154";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-155.md": {
	id: "ervaring-155.md";
  slug: "ervaring-155";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-156.md": {
	id: "ervaring-156.md";
  slug: "ervaring-156";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-157.md": {
	id: "ervaring-157.md";
  slug: "ervaring-157";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-158.md": {
	id: "ervaring-158.md";
  slug: "ervaring-158";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-159.md": {
	id: "ervaring-159.md";
  slug: "ervaring-159";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-160.md": {
	id: "ervaring-160.md";
  slug: "ervaring-160";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-161.md": {
	id: "ervaring-161.md";
  slug: "ervaring-161";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-162.md": {
	id: "ervaring-162.md";
  slug: "ervaring-162";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-163.md": {
	id: "ervaring-163.md";
  slug: "ervaring-163";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-164.md": {
	id: "ervaring-164.md";
  slug: "ervaring-164";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-165.md": {
	id: "ervaring-165.md";
  slug: "ervaring-165";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-166.md": {
	id: "ervaring-166.md";
  slug: "ervaring-166";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-167.md": {
	id: "ervaring-167.md";
  slug: "ervaring-167";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-168.md": {
	id: "ervaring-168.md";
  slug: "ervaring-168";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-169.md": {
	id: "ervaring-169.md";
  slug: "ervaring-169";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-170.md": {
	id: "ervaring-170.md";
  slug: "ervaring-170";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-171.md": {
	id: "ervaring-171.md";
  slug: "ervaring-171";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-172.md": {
	id: "ervaring-172.md";
  slug: "ervaring-172";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-173.md": {
	id: "ervaring-173.md";
  slug: "ervaring-173";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-174.md": {
	id: "ervaring-174.md";
  slug: "ervaring-174";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-175.md": {
	id: "ervaring-175.md";
  slug: "ervaring-175";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-176.md": {
	id: "ervaring-176.md";
  slug: "ervaring-176";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-177.md": {
	id: "ervaring-177.md";
  slug: "ervaring-177";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-178.md": {
	id: "ervaring-178.md";
  slug: "ervaring-178";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-179.md": {
	id: "ervaring-179.md";
  slug: "ervaring-179";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-180.md": {
	id: "ervaring-180.md";
  slug: "ervaring-180";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-181.md": {
	id: "ervaring-181.md";
  slug: "ervaring-181";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-182.md": {
	id: "ervaring-182.md";
  slug: "ervaring-182";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-183.md": {
	id: "ervaring-183.md";
  slug: "ervaring-183";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-184.md": {
	id: "ervaring-184.md";
  slug: "ervaring-184";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
"ervaring-185.md": {
	id: "ervaring-185.md";
  slug: "ervaring-185";
  body: string;
  collection: "ervaringen";
  data: InferEntrySchema<"ervaringen">
} & { render(): Render[".md"] };
};
"meditatie": {
"eenvoudig-leren-mediteren.md": {
	id: "eenvoudig-leren-mediteren.md";
  slug: "eenvoudig-leren-mediteren";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
} & { render(): Render[".md"] };
"meditatie-extra.md": {
	id: "meditatie-extra.md";
  slug: "meditatie-extra";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
} & { render(): Render[".md"] };
"meditatie-voor-iedereen.md": {
	id: "meditatie-voor-iedereen.md";
  slug: "meditatie-voor-iedereen";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
} & { render(): Render[".md"] };
"meditatie-voor-jong-volwassenen.md": {
	id: "meditatie-voor-jong-volwassenen.md";
  slug: "meditatie-voor-jong-volwassenen";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
} & { render(): Render[".md"] };
"meditatie-voor-jongeren.md": {
	id: "meditatie-voor-jongeren.md";
  slug: "meditatie-voor-jongeren";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
} & { render(): Render[".md"] };
"meditatie-voor-kinderen.md": {
	id: "meditatie-voor-kinderen.md";
  slug: "meditatie-voor-kinderen";
  body: string;
  collection: "meditatie";
  data: InferEntrySchema<"meditatie">
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
"workshops": {
"ben-ik-hsp.md": {
	id: "ben-ik-hsp.md";
  slug: "ben-ik-hsp";
  body: string;
  collection: "workshops";
  data: InferEntrySchema<"workshops">
} & { render(): Render[".md"] };
"beter-omgaan-met-prikkels.md": {
	id: "beter-omgaan-met-prikkels.md";
  slug: "beter-omgaan-met-prikkels";
  body: string;
  collection: "workshops";
  data: InferEntrySchema<"workshops">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
