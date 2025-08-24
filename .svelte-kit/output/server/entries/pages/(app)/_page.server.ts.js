import { i as initDatabase } from "../../../chunks/db.js";
import { B as BudgetService } from "../../../chunks/queries.js";
import { c as getCurrentMonth, d as getCurrentYear } from "../../../chunks/date.js";
const DEFAULT_USER_ID = 1;
const load = async () => {
  try {
    await initDatabase();
    const budgetService = new BudgetService();
    let user = await budgetService.getUserByEmail("user@example.com");
    if (!user) {
      await budgetService.createUser("Default User", "user@example.com");
      user = await budgetService.getUserByEmail("user@example.com");
    }
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    let budget = await budgetService.getBudget(DEFAULT_USER_ID, currentMonth, currentYear);
    let budgetSummary = null;
    let categoryBreakdown = [];
    let recentExpenses = [];
    let savingsGoals = [];
    if (budget) {
      budgetSummary = await budgetService.getBudgetSummary(budget.id);
      categoryBreakdown = await budgetService.getSpendingByCategory(budget.id);
      recentExpenses = await budgetService.getActualExpenses(budget.id);
    }
    savingsGoals = await budgetService.getSavingsGoals(DEFAULT_USER_ID);
    return {
      user,
      budget,
      budgetSummary,
      categoryBreakdown,
      recentExpenses: recentExpenses.slice(0, 5),
      savingsGoals,
      currentMonth,
      currentYear
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return {
      error: "Failed to load dashboard data"
    };
  }
};
export {
  load
};
