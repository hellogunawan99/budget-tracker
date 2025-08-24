import { getDatabase, type Budget, type ExpenseCategory, type PlannedExpense, type ActualExpense, type SavingsGoal, type User } from './db.js';

export class BudgetService {
	private db = getDatabase();

	getDatabase() {
		return this.db;
	}

	async createUser(name: string, email: string): Promise<number> {
		const result = await this.db.run(
			'INSERT INTO users (name, email) VALUES (?, ?)',
			[name, email]
		);
		return result.lastID!;
	}

	async getUser(id: number): Promise<User | undefined> {
		return await this.db.get<User>('SELECT * FROM users WHERE id = ?', [id]);
	}

	async getUserByEmail(email: string): Promise<User | undefined> {
		return await this.db.get<User>('SELECT * FROM users WHERE email = ?', [email]);
	}

	async getExpenseCategories(): Promise<ExpenseCategory[]> {
		return await this.db.all<ExpenseCategory>('SELECT * FROM expense_categories ORDER BY name');
	}

	async createBudget(userId: number, month: number, year: number, salary: number): Promise<number> {
		const result = await this.db.run(
			'INSERT OR REPLACE INTO budgets (user_id, month, year, salary, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
			[userId, month, year, salary]
		);
		return result.lastID!;
	}

	async getBudget(userId: number, month: number, year: number): Promise<Budget | undefined> {
		return await this.db.get<Budget>(
			'SELECT * FROM budgets WHERE user_id = ? AND month = ? AND year = ?',
			[userId, month, year]
		);
	}

	async getCurrentBudget(userId: number): Promise<Budget | undefined> {
		const now = new Date();
		return await this.getBudget(userId, now.getMonth() + 1, now.getFullYear());
	}

	async addPlannedExpense(budgetId: number, categoryId: number, amount: number, description: string = ''): Promise<number> {
		const result = await this.db.run(
			'INSERT INTO planned_expenses (budget_id, category_id, amount, description) VALUES (?, ?, ?, ?)',
			[budgetId, categoryId, amount, description]
		);
		return result.lastID!;
	}

	async getPlannedExpenses(budgetId: number): Promise<(PlannedExpense & { category_name: string; category_color: string })[]> {
		return await this.db.all(
			`SELECT pe.*, ec.name as category_name, ec.color as category_color
			 FROM planned_expenses pe
			 JOIN expense_categories ec ON pe.category_id = ec.id
			 WHERE pe.budget_id = ?
			 ORDER BY ec.name`,
			[budgetId]
		);
	}

	async updatePlannedExpense(id: number, categoryId: number, amount: number, description: string = ''): Promise<void> {
		await this.db.run(
			'UPDATE planned_expenses SET category_id = ?, amount = ?, description = ? WHERE id = ?',
			[categoryId, amount, description, id]
		);
	}

	async deletePlannedExpense(id: number): Promise<void> {
		await this.db.run('DELETE FROM planned_expenses WHERE id = ?', [id]);
	}

	async addActualExpense(
		budgetId: number,
		categoryId: number,
		amount: number,
		description: string = '',
		expenseDate: string,
		receiptPath: string | null = null
	): Promise<number> {
		const result = await this.db.run(
			'INSERT INTO actual_expenses (budget_id, category_id, amount, description, expense_date, receipt_path) VALUES (?, ?, ?, ?, ?, ?)',
			[budgetId, categoryId, amount, description, expenseDate, receiptPath]
		);
		return result.lastID!;
	}

	async getActualExpenses(budgetId: number): Promise<(ActualExpense & { category_name: string; category_color: string })[]> {
		return await this.db.all(
			`SELECT ae.*, ec.name as category_name, ec.color as category_color
			 FROM actual_expenses ae
			 JOIN expense_categories ec ON ae.category_id = ec.id
			 WHERE ae.budget_id = ?
			 ORDER BY ae.expense_date DESC`,
			[budgetId]
		);
	}

	async updateActualExpense(
		id: number,
		categoryId: number,
		amount: number,
		description: string = '',
		expenseDate: string,
		receiptPath: string | null = null
	): Promise<void> {
		await this.db.run(
			'UPDATE actual_expenses SET category_id = ?, amount = ?, description = ?, expense_date = ?, receipt_path = ? WHERE id = ?',
			[categoryId, amount, description, expenseDate, receiptPath, id]
		);
	}

	async deleteActualExpense(id: number): Promise<void> {
		await this.db.run('DELETE FROM actual_expenses WHERE id = ?', [id]);
	}

	async getBudgetSummary(budgetId: number): Promise<{
		salary: number;
		totalPlanned: number;
		totalActual: number;
		remainingBudget: number;
		plannedRemaining: number;
	}> {
		const budget = await this.db.get<Budget>('SELECT * FROM budgets WHERE id = ?', [budgetId]);
		if (!budget) throw new Error('Budget not found');

		const plannedSum = await this.db.get<{ total: number }>(
			'SELECT COALESCE(SUM(amount), 0) as total FROM planned_expenses WHERE budget_id = ?',
			[budgetId]
		);

		const actualSum = await this.db.get<{ total: number }>(
			'SELECT COALESCE(SUM(amount), 0) as total FROM actual_expenses WHERE budget_id = ?',
			[budgetId]
		);

		const salary = budget.salary;
		const totalPlanned = plannedSum?.total || 0;
		const totalActual = actualSum?.total || 0;

		return {
			salary,
			totalPlanned,
			totalActual,
			remainingBudget: salary - totalActual,
			plannedRemaining: salary - totalPlanned
		};
	}

	async getSpendingByCategory(budgetId: number): Promise<{ category_name: string; category_color: string; planned: number; actual: number }[]> {
		return await this.db.all(
			`SELECT 
				ec.name as category_name,
				ec.color as category_color,
				COALESCE(p.planned_amount, 0) as planned,
				COALESCE(a.actual_amount, 0) as actual
			FROM expense_categories ec
			LEFT JOIN (
				SELECT category_id, SUM(amount) as planned_amount
				FROM planned_expenses
				WHERE budget_id = ?
				GROUP BY category_id
			) p ON ec.id = p.category_id
			LEFT JOIN (
				SELECT category_id, SUM(amount) as actual_amount
				FROM actual_expenses
				WHERE budget_id = ?
				GROUP BY category_id
			) a ON ec.id = a.category_id
			WHERE p.planned_amount > 0 OR a.actual_amount > 0
			ORDER BY ec.name`,
			[budgetId, budgetId]
		);
	}

	async createSavingsGoal(userId: number, title: string, targetAmount: number, deadline?: string): Promise<number> {
		const result = await this.db.run(
			'INSERT INTO savings_goals (user_id, title, target_amount, deadline) VALUES (?, ?, ?, ?)',
			[userId, title, targetAmount, deadline || null]
		);
		return result.lastID!;
	}

	async getSavingsGoals(userId: number): Promise<SavingsGoal[]> {
		return await this.db.all<SavingsGoal>(
			'SELECT * FROM savings_goals WHERE user_id = ? ORDER BY created_at DESC',
			[userId]
		);
	}


	async updateSavingsGoal(id: number, title: string, targetAmount: number, deadline?: string): Promise<void> {
		await this.db.run(
			'UPDATE savings_goals SET title = ?, target_amount = ?, deadline = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
			[title, targetAmount, deadline || null, id]
		);
	}

	async deleteSavingsGoal(id: number): Promise<void> {
		await this.db.run('DELETE FROM savings_goals WHERE id = ?', [id]);
	}


	async getMonthlyTrends(userId: number, months: number = 12): Promise<{
		month: string;
		year: number;
		income: number;
		expenses: number;
		savings: number;
	}[]> {
		return await this.db.all(
			`SELECT 
				b.month,
				b.year,
				b.salary as income,
				COALESCE(ae_sum.total_expenses, 0) as expenses,
				b.salary - COALESCE(ae_sum.total_expenses, 0) as savings
			FROM budgets b
			LEFT JOIN (
				SELECT budget_id, SUM(amount) as total_expenses
				FROM actual_expenses
				GROUP BY budget_id
			) ae_sum ON b.id = ae_sum.budget_id
			WHERE b.user_id = ?
			ORDER BY b.year DESC, b.month DESC
			LIMIT ?`,
			[userId, months]
		);
	}

	async getTotalAccumulatedSavings(userId: number): Promise<number> {
		const result = await this.db.get<{ total: number }>(
			`SELECT 
				COALESCE(SUM(b.salary - COALESCE(ae_sum.total_expenses, 0)), 0) as total
			FROM budgets b
			LEFT JOIN (
				SELECT budget_id, SUM(amount) as total_expenses
				FROM actual_expenses
				GROUP BY budget_id
			) ae_sum ON b.id = ae_sum.budget_id
			WHERE b.user_id = ?`,
			[userId]
		);
		return result?.total || 0;
	}

	async getAccumulatedSavingsByMonth(userId: number): Promise<{
		month: string;
		year: number;
		monthlyAmount: number;
		cumulativeTotal: number;
	}[]> {
		const trends = await this.getMonthlyTrends(userId, 24);
		let cumulativeTotal = 0;
		
		return trends.reverse().map(trend => {
			cumulativeTotal += trend.savings;
			return {
				month: trend.month,
				year: trend.year,
				monthlyAmount: trend.savings,
				cumulativeTotal
			};
		}).reverse();
	}

	async calculateSavingsGoalRecommendation(goalId: number): Promise<{
		monthsRemaining: number;
		amountRemaining: number;
		monthlyTarget: number;
		isAchievable: boolean;
		currentMonthlySavings: number;
	} | null> {
		const goal = await this.db.get<SavingsGoal>('SELECT * FROM savings_goals WHERE id = ?', [goalId]);
		if (!goal || !goal.deadline) return null;

		const now = new Date();
		const deadline = new Date(goal.deadline);
		const monthsRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30));
		
		if (monthsRemaining <= 0) return null;

		const amountRemaining = goal.target_amount - goal.current_amount;
		const monthlyTarget = amountRemaining / monthsRemaining;

		const currentBudget = await this.getCurrentBudget(goal.user_id);
		let currentMonthlySavings = 0;
		
		if (currentBudget) {
			const summary = await this.getBudgetSummary(currentBudget.id);
			currentMonthlySavings = summary.remainingBudget;
		}

		const isAchievable = currentMonthlySavings >= monthlyTarget;

		return {
			monthsRemaining,
			amountRemaining,
			monthlyTarget,
			isAchievable,
			currentMonthlySavings
		};
	}


	async getSavingsGoalsWithAccumulatedProgress(userId: number): Promise<(SavingsGoal & {
		actualProgress: number;
		progressPercentage: number;
		recommendation?: {
			monthsRemaining: number;
			amountRemaining: number;
			monthlyTarget: number;
			isAchievable: boolean;
			currentMonthlySavings: number;
		};
	})[]> {
		const goals = await this.getSavingsGoals(userId);
		const totalAccumulated = await this.getTotalAccumulatedSavings(userId);
		const goalsWithProgress = [];

		for (const goal of goals) {
			const actualProgress = Math.min(totalAccumulated, goal.target_amount);
			const progressPercentage = (actualProgress / goal.target_amount) * 100;

			const recommendation = await this.calculateSavingsGoalRecommendation(goal.id);
			
			goalsWithProgress.push({
				...goal,
				actualProgress,
				progressPercentage,
				recommendation: recommendation || undefined
			});
		}

		return goalsWithProgress;
	}

	async getSavingsGoalsWithRecommendations(userId: number): Promise<(SavingsGoal & {
		recommendation?: {
			monthsRemaining: number;
			amountRemaining: number;
			monthlyTarget: number;
			isAchievable: boolean;
			currentMonthlySavings: number;
		};
	})[]> {
		// Keep this for backward compatibility
		return await this.getSavingsGoalsWithAccumulatedProgress(userId);
	}
}