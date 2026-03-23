// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
	// Check if user is authenticated
	if (!locals.user) {
		throw redirect(302, "/login");
	}

	return {
		authenticated: true,
		user: locals.user
	};
};
