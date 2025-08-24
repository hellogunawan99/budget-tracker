import { json } from '@sveltejs/kit';
import { BudgetService } from '$lib/database/queries.js';

const budgetService = new BudgetService();

export async function GET() {
	try {
		const categories = await budgetService.getExpenseCategories();
		return json(categories);
	} catch (error) {
		console.error('Error fetching categories:', error);
		return json({ error: 'Failed to fetch categories' }, { status: 500 });
	}
}