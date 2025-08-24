
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(app)" | "/" | "/(app)/analytics" | "/api" | "/api/actual-expenses" | "/api/analytics" | "/api/analytics/trends" | "/api/budget" | "/api/budget/[id]" | "/api/budget/[id]/summary" | "/api/categories" | "/api/export" | "/api/export/csv" | "/api/planned-expenses" | "/api/savings-goals" | "/(app)/budget" | "/(app)/expenses" | "/(app)/savings-goals" | "/(app)/settings";
		RouteParams(): {
			"/api/budget/[id]": { id: string };
			"/api/budget/[id]/summary": { id: string }
		};
		LayoutParams(): {
			"/(app)": Record<string, never>;
			"/": { id?: string };
			"/(app)/analytics": Record<string, never>;
			"/api": { id?: string };
			"/api/actual-expenses": Record<string, never>;
			"/api/analytics": Record<string, never>;
			"/api/analytics/trends": Record<string, never>;
			"/api/budget": { id?: string };
			"/api/budget/[id]": { id: string };
			"/api/budget/[id]/summary": { id: string };
			"/api/categories": Record<string, never>;
			"/api/export": Record<string, never>;
			"/api/export/csv": Record<string, never>;
			"/api/planned-expenses": Record<string, never>;
			"/api/savings-goals": Record<string, never>;
			"/(app)/budget": Record<string, never>;
			"/(app)/expenses": Record<string, never>;
			"/(app)/savings-goals": Record<string, never>;
			"/(app)/settings": Record<string, never>
		};
		Pathname(): "/" | "/analytics" | "/analytics/" | "/api" | "/api/" | "/api/actual-expenses" | "/api/actual-expenses/" | "/api/analytics" | "/api/analytics/" | "/api/analytics/trends" | "/api/analytics/trends/" | "/api/budget" | "/api/budget/" | `/api/budget/${string}` & {} | `/api/budget/${string}/` & {} | `/api/budget/${string}/summary` & {} | `/api/budget/${string}/summary/` & {} | "/api/categories" | "/api/categories/" | "/api/export" | "/api/export/" | "/api/export/csv" | "/api/export/csv/" | "/api/planned-expenses" | "/api/planned-expenses/" | "/api/savings-goals" | "/api/savings-goals/" | "/budget" | "/budget/" | "/expenses" | "/expenses/" | "/savings-goals" | "/savings-goals/" | "/settings" | "/settings/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.png" | string & {};
	}
}