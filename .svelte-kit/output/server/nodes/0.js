

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Yq7FYR0n.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/EyY2Qe4w.js","_app/immutable/chunks/BVJJ4f57.js"];
export const stylesheets = [];
export const fonts = [];
