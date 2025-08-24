// @ts-nocheck
import { BudgetService } from '$lib/database/queries.js';
import { getCurrentMonth, getCurrentYear } from '$lib/utils/date.js';
import type { PageServerLoad } from './$types.js';

const DEFAULT_USER_ID = 1;

export const load = async () => {
	try {
		const budgetService = new BudgetService();
		
		const currentMonth = getCurrentMonth();
		const currentYear = getCurrentYear();
		
		const budget = await budgetService.getBudget(DEFAULT_USER_ID, currentMonth, currentYear);
		const categories = await budgetService.getExpenseCategories();
		
		let actualExpenses: any[] = [];
		let budgetSummary = null;
		
		if (budget) {
			actualExpenses = await budgetService.getActualExpenses(budget.id);
			budgetSummary = await budgetService.getBudgetSummary(budget.id);
		}
		
		return {
			budget,
			categories,
			actualExpenses,
			budgetSummary,
			currentMonth,
			currentYear
		};
	} catch (error) {
		console.error('Error loading expenses data:', error);
		return {
			error: 'Failed to load expenses data'
		};
	}
};;null as any as PageServerLoad;