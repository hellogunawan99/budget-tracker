import { g as getDatabase } from "./db.js";
class BudgetService {
  db = getDatabase();
  getDatabase() {
    return this.db;
  }
  async createUser(name, email) {
    const result = await this.db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
    return result.lastID;
  }
  async getUser(id) {
    return await this.db.get("SELECT * FROM users WHERE id = ?", [id]);
  }
  async getUserByEmail(email) {
    return await this.db.get("SELECT * FROM users WHERE email = ?", [email]);
  }
  async getExpenseCategories() {
    return await this.db.all("SELECT * FROM expense_categories ORDER BY name");
  }
  async createBudget(userId, month, year, salary) {
    const result = await this.db.run(
      "INSERT OR REPLACE INTO budgets (user_id, month, year, salary, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
      [userId, month, year, salary]
    );
    return result.lastID;
  }
  async getBudget(userId, month, year) {
    return await this.db.get(
      "SELECT * FROM budgets WHERE user_id = ? AND month = ? AND year = ?",
      [userId, month, year]
    );
  }
  async getCurrentBudget(userId) {
    const now = /* @__PURE__ */ new Date();
    return await this.getBudget(userId, now.getMonth() + 1, now.getFullYear());
  }
  async addPlannedExpense(budgetId, categoryId, amount, description = "") {
    const result = await this.db.run(
      "INSERT INTO planned_expenses (budget_id, category_id, amount, description) VALUES (?, ?, ?, ?)",
      [budgetId, categoryId, amount, description]
    );
    return result.lastID;
  }
  async getPlannedExpenses(budgetId) {
    return await this.db.all(
      `SELECT pe.*, ec.name as category_name, ec.color as category_color
			 FROM planned_expenses pe
			 JOIN expense_categories ec ON pe.category_id = ec.id
			 WHERE pe.budget_id = ?
			 ORDER BY ec.name`,
      [budgetId]
    );
  }
  async updatePlannedExpense(id, categoryId, amount, description = "") {
    await this.db.run(
      "UPDATE planned_expenses SET category_id = ?, amount = ?, description = ? WHERE id = ?",
      [categoryId, amount, description, id]
    );
  }
  async deletePlannedExpense(id) {
    await this.db.run("DELETE FROM planned_expenses WHERE id = ?", [id]);
  }
  async addActualExpense(budgetId, categoryId, amount, description = "", expenseDate, receiptPath = null) {
    const result = await this.db.run(
      "INSERT INTO actual_expenses (budget_id, category_id, amount, description, expense_date, receipt_path) VALUES (?, ?, ?, ?, ?, ?)",
      [budgetId, categoryId, amount, description, expenseDate, receiptPath]
    );
    return result.lastID;
  }
  async getActualExpenses(budgetId) {
    return await this.db.all(
      `SELECT ae.*, ec.name as category_name, ec.color as category_color
			 FROM actual_expenses ae
			 JOIN expense_categories ec ON ae.category_id = ec.id
			 WHERE ae.budget_id = ?
			 ORDER BY ae.expense_date DESC`,
      [budgetId]
    );
  }
  async updateActualExpense(id, categoryId, amount, description = "", expenseDate, receiptPath = null) {
    await this.db.run(
      "UPDATE actual_expenses SET category_id = ?, amount = ?, description = ?, expense_date = ?, receipt_path = ? WHERE id = ?",
      [categoryId, amount, description, expenseDate, receiptPath, id]
    );
  }
  async deleteActualExpense(id) {
    await this.db.run("DELETE FROM actual_expenses WHERE id = ?", [id]);
  }
  async getBudgetSummary(budgetId) {
    const budget = await this.db.get("SELECT * FROM budgets WHERE id = ?", [budgetId]);
    if (!budget) throw new Error("Budget not found");
    const plannedSum = await this.db.get(
      "SELECT COALESCE(SUM(amount), 0) as total FROM planned_expenses WHERE budget_id = ?",
      [budgetId]
    );
    const actualSum = await this.db.get(
      "SELECT COALESCE(SUM(amount), 0) as total FROM actual_expenses WHERE budget_id = ?",
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
  async getSpendingByCategory(budgetId) {
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
  async createSavingsGoal(userId, title, targetAmount, deadline) {
    const result = await this.db.run(
      "INSERT INTO savings_goals (user_id, title, target_amount, deadline) VALUES (?, ?, ?, ?)",
      [userId, title, targetAmount, deadline || null]
    );
    return result.lastID;
  }
  async getSavingsGoals(userId) {
    return await this.db.all(
      "SELECT * FROM savings_goals WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );
  }
  async updateSavingsGoalProgress(id, currentAmount) {
    await this.db.run(
      "UPDATE savings_goals SET current_amount = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [currentAmount, id]
    );
  }
  async deleteSavingsGoal(id) {
    await this.db.run("DELETE FROM savings_goals WHERE id = ?", [id]);
  }
  async getMonthlyTrends(userId, months = 12) {
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
}
export {
  BudgetService as B
};
