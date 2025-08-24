export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.BA9x0PVT.js",app:"_app/immutable/entry/app.BHiPRx2D.js",imports:["_app/immutable/entry/start.BA9x0PVT.js","_app/immutable/chunks/ut9W1y5t.js","_app/immutable/chunks/fy_2tMX8.js","_app/immutable/chunks/EyY2Qe4w.js","_app/immutable/chunks/BpIlfRRV.js","_app/immutable/chunks/BVJJ4f57.js","_app/immutable/entry/app.BHiPRx2D.js","_app/immutable/chunks/EyY2Qe4w.js","_app/immutable/chunks/BpIlfRRV.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/fy_2tMX8.js","_app/immutable/chunks/BVJJ4f57.js","_app/immutable/chunks/4eF5hKyW.js","_app/immutable/chunks/BdCZeLkR.js","_app/immutable/chunks/DdMW9lmt.js","_app/immutable/chunks/DCLTBedR.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/(app)/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/api/actual-expenses",
				pattern: /^\/api\/actual-expenses\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/actual-expenses/_server.ts.js'))
			},
			{
				id: "/api/analytics/trends",
				pattern: /^\/api\/analytics\/trends\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/analytics/trends/_server.ts.js'))
			},
			{
				id: "/api/budget",
				pattern: /^\/api\/budget\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/budget/_server.ts.js'))
			},
			{
				id: "/api/budget/[id]/summary",
				pattern: /^\/api\/budget\/([^/]+?)\/summary\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/budget/_id_/summary/_server.ts.js'))
			},
			{
				id: "/api/categories",
				pattern: /^\/api\/categories\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/categories/_server.ts.js'))
			},
			{
				id: "/api/export/csv",
				pattern: /^\/api\/export\/csv\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/export/csv/_server.ts.js'))
			},
			{
				id: "/api/planned-expenses",
				pattern: /^\/api\/planned-expenses\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/planned-expenses/_server.ts.js'))
			},
			{
				id: "/api/savings-goals",
				pattern: /^\/api\/savings-goals\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/savings-goals/_server.ts.js'))
			},
			{
				id: "/(app)/budget",
				pattern: /^\/budget\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/(app)/expenses",
				pattern: /^\/expenses\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
