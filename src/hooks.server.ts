import { initDatabase } from '$lib/database/db.js';
import type { Handle } from '@sveltejs/kit';

let dbInitialized = false;

export const handle: Handle = async ({ event, resolve }) => {
	if (!dbInitialized) {
		try {
			await initDatabase();
			dbInitialized = true;
			console.log('Database initialized successfully');
		} catch (error) {
			console.error('Failed to initialize database:', error);
		}
	}

	return resolve(event);
};