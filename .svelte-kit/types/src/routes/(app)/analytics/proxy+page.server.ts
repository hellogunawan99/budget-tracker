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
		const trends = await budgetService.getMonthlyTrends(DEFAULT_USER_ID, 6);
		const savingsGoals = await budgetService.getSavingsGoalsWithAccumulatedProgress(DEFAULT_USER_ID);
		const totalAccumulatedSavings = await budgetService.getTotalAccumulatedSavings(DEFAULT_USER_ID);
		const accumulatedSavingsByMonth = await budgetService.getAccumulatedSavingsByMonth(DEFAULT_USER_ID);
		
		let budgetSummary = null;
		let categoryBreakdown: any[] = [];
		
		if (budget) {
			budgetSummary = await budgetService.getBudgetSummary(budget.id);
			categoryBreakdown = await budgetService.getSpendingByCategory(budget.id);
		}
		
		return {
			budget,
			budgetSummary,
			categoryBreakdown,
			trends,
			savingsGoals,
			totalAccumulatedSavings,
			accumulatedSavingsByMonth,
			currentMonth,
			currentYear
		};
	} catch (error) {
		console.error('Error loading analytics data:', error);
		return {
			error: 'Failed to load analytics data'
		};
	}
};;null as any as PageServerLoad;