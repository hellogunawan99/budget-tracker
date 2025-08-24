import { json } from '@sveltejs/kit';
import { BudgetService } from '$lib/database/queries.js';
import type { RequestHandler } from './$types.js';

const budgetService = new BudgetService();

export const GET: RequestHandler = async ({ url }) => {
	try {
		const budgetId = Number(url.searchParams.get('budgetId'));
		
		if (!budgetId) {
			return json({ error: 'Budget ID is required' }, { status: 400 });
		}

		const expenses = await budgetService.getPlannedExpenses(budgetId);
		return json(expenses);
	} catch (error) {
		console.error('Error fetching planned expenses:', error);
		return json({ error: 'Failed to fetch planned expenses' }, { status: 500 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { budgetId, categoryId, amount, description } = await request.json();

		if (!budgetId || !categoryId || !amount) {
			return json({ error: 'Budget ID, category ID, and amount are required' }, { status: 400 });
		}

		const id = await budgetService.addPlannedExpense(budgetId, categoryId, amount, description || '');
		return json({ id, success: true });
	} catch (error) {
		console.error('Error creating planned expense:', error);
		return json({ error: 'Failed to create planned expense' }, { status: 500 });
	}
};

export const PUT: RequestHandler = async ({ request }) => {
	try {
		const { id, categoryId, amount, description } = await request.json();

		if (!id || !categoryId || !amount) {
			return json({ error: 'ID, category ID, and amount are required' }, { status: 400 });
		}

		await budgetService.updatePlannedExpense(id, categoryId, amount, description || '');
		return json({ success: true });
	} catch (error) {
		console.error('Error updating planned expense:', error);
		return json({ error: 'Failed to update planned expense' }, { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		const { id } = await request.json();

		if (!id) {
			return json({ error: 'ID is required' }, { status: 400 });
		}

		await budgetService.deletePlannedExpense(id);
		return json({ success: true });
	} catch (error) {
		console.error('Error deleting planned expense:', error);
		return json({ error: 'Failed to delete planned expense' }, { status: 500 });
	}
};