import { BudgetService } from '$lib/database/queries.js';
import type { PageServerLoad, Actions } from './$types.js';
import { fail, redirect } from '@sveltejs/kit';

const DEFAULT_USER_ID = 1;

export const load: PageServerLoad = async () => {
	try {
		const budgetService = new BudgetService();
		const savingsGoals = await budgetService.getSavingsGoalsWithAccumulatedProgress(DEFAULT_USER_ID);
		const totalAccumulatedSavings = await budgetService.getTotalAccumulatedSavings(DEFAULT_USER_ID);
		
		return {
			savingsGoals,
			totalAccumulatedSavings
		};
	} catch (error) {
		console.error('Error loading savings goals:', error);
		return {
			error: 'Failed to load savings goals'
		};
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		try {
			const budgetService = new BudgetService();
			const data = await request.formData();
			
			const title = data.get('title') as string;
			const targetAmountStr = data.get('targetAmount') as string;
			const targetAmount = parseFloat(targetAmountStr);
			const deadline = data.get('deadline') as string;
			
			console.log('Form data received:', { title, targetAmountStr, targetAmount, deadline });
			console.log('Raw form data:', Object.fromEntries(data.entries()));
			
			if (!title?.trim() || !targetAmountStr?.trim() || isNaN(targetAmount) || targetAmount <= 0) {
				console.log('Validation failed:', { 
					title: `"${title}"`,
					titleTrimmed: `"${title?.trim()}"`,
					targetAmountStr: `"${targetAmountStr}"`,
					targetAmountStrTrimmed: `"${targetAmountStr?.trim()}"`,
					targetAmount,
					titleExists: !!title?.trim(), 
					targetAmountStrExists: !!targetAmountStr?.trim(), 
					targetAmountValid: !isNaN(targetAmount),
					targetAmountPositive: targetAmount > 0
				});
				return fail(400, {
					error: 'Title and a valid target amount are required',
					title,
					targetAmount: isNaN(targetAmount) ? '' : targetAmount.toString(),
					deadline
				});
			}
			
			await budgetService.createSavingsGoal(DEFAULT_USER_ID, title, targetAmount, deadline || undefined);
			
			return { success: true };
		} catch (error) {
			console.error('Error creating savings goal:', error);
			return fail(500, { error: 'Failed to create savings goal' });
		}
	},
	
	
	delete: async ({ request }) => {
		try {
			const budgetService = new BudgetService();
			const data = await request.formData();
			
			const id = parseInt(data.get('id') as string);
			
			if (!id) {
				return fail(400, { error: 'ID is required' });
			}
			
			await budgetService.deleteSavingsGoal(id);
			
			return { success: true };
		} catch (error) {
			console.error('Error deleting savings goal:', error);
			return fail(500, { error: 'Failed to delete savings goal' });
		}
	},

	update: async ({ request }) => {
		try {
			const budgetService = new BudgetService();
			const data = await request.formData();
			
			const id = parseInt(data.get('id') as string);
			const title = data.get('title') as string;
			const targetAmountStr = data.get('targetAmount') as string;
			const targetAmount = parseFloat(targetAmountStr);
			const deadline = data.get('deadline') as string;
			
			if (!id || !title || !targetAmountStr || isNaN(targetAmount) || targetAmount <= 0) {
				return fail(400, {
					error: 'ID, title and a valid target amount are required',
					id,
					title,
					targetAmount: isNaN(targetAmount) ? '' : targetAmount.toString(),
					deadline
				});
			}
			
			await budgetService.updateSavingsGoal(id, title, targetAmount, deadline || undefined);
			
			return { success: true };
		} catch (error) {
			console.error('Error updating savings goal:', error);
			return fail(500, { error: 'Failed to update savings goal' });
		}
	},

};