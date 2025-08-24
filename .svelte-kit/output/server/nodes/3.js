import * as server from '../entries/pages/(app)/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/(app)/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.sNNvZ_Fg.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/gzsJLoAv.js","_app/immutable/chunks/EyY2Qe4w.js","_app/immutable/chunks/BpIlfRRV.js","_app/immutable/chunks/4eF5hKyW.js","_app/immutable/chunks/wEJ3cds_.js","_app/immutable/chunks/DCLTBedR.js","_app/immutable/chunks/BdCZeLkR.js","_app/immutable/chunks/DXgxfkXT.js","_app/immutable/chunks/BZuN3xt8.js","_app/immutable/chunks/DM_qtgBz.js","_app/immutable/chunks/VaSqBtMh.js","_app/immutable/chunks/B_IaCO09.js","_app/immutable/chunks/fy_2tMX8.js","_app/immutable/chunks/BVJJ4f57.js","_app/immutable/chunks/DdMW9lmt.js","_app/immutable/chunks/CRv3yRHf.js","_app/immutable/chunks/OGZIn3SQ.js","_app/immutable/chunks/CJjhGTn_.js"];
export const stylesheets = [];
export const fonts = [];
