import * as server from '../entries/pages/(app)/budget/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/budget/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/budget/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.BRuJOcWf.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/gzsJLoAv.js","_app/immutable/chunks/EyY2Qe4w.js","_app/immutable/chunks/BpIlfRRV.js","_app/immutable/chunks/4eF5hKyW.js","_app/immutable/chunks/wEJ3cds_.js","_app/immutable/chunks/DCLTBedR.js","_app/immutable/chunks/Dpa4i0wj.js","_app/immutable/chunks/DdMW9lmt.js","_app/immutable/chunks/DM_qtgBz.js","_app/immutable/chunks/ut9W1y5t.js","_app/immutable/chunks/fy_2tMX8.js","_app/immutable/chunks/BVJJ4f57.js","_app/immutable/chunks/DXgxfkXT.js","_app/immutable/chunks/BZuN3xt8.js","_app/immutable/chunks/VaSqBtMh.js","_app/immutable/chunks/OGZIn3SQ.js","_app/immutable/chunks/7FXa3mcv.js"];
export const stylesheets = [];
export const fonts = [];
