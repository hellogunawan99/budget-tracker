import { initDatabase } from '$lib/database/db.js';
import { BudgetService } from '$lib/database/queries.js';
import { getCurrentMonth, getCurrentYear } from '$lib/utils/date.js';
import type { PageServerLoad } from './$types.js';

const DEFAULT_USER_ID = 1;

export const load: PageServerLoad = async () => {
	try {
		await initDatabase();
		
		const budgetService = new BudgetService();
		
		let user = await budgetService.getUserByEmail('user@example.com');
		if (!user) {
			await budgetService.createUser('Default User', 'user@example.com');
			user = await budgetService.getUserByEmail('user@example.com');
		}
		
		const currentMonth = getCurrentMonth();
		const currentYear = getCurrentYear();
		
		let budget = await budgetService.getBudget(DEFAULT_USER_ID, currentMonth, currentYear);
		let budgetSummary = null;
		let categoryBreakdown: any[] = [];
		let recentExpenses: any[] = [];
		let savingsGoals: any[] = [];
		
		if (budget) {
			budgetSummary = await budgetService.getBudgetSummary(budget.id);
			categoryBreakdown = await budgetService.getSpendingByCategory(budget.id);
			recentExpenses = await budgetService.getActualExpenses(budget.id);
		}
		
		savingsGoals = await budgetService.getSavingsGoals(DEFAULT_USER_ID);
		const totalAccumulatedSavings = await budgetService.getTotalAccumulatedSavings(DEFAULT_USER_ID);
		
		return {
			user,
			budget,
			budgetSummary,
			categoryBreakdown,
			recentExpenses: recentExpenses.slice(0, 5),
			savingsGoals,
			totalAccumulatedSavings,
			currentMonth,
			currentYear
		};
	} catch (error) {
		console.error('Error loading dashboard data:', error);
		return {
			error: 'Failed to load dashboard data'
		};
	}
};