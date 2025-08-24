import { B as BudgetService } from "../../../../chunks/queries.js";
import { c as getCurrentMonth, d as getCurrentYear } from "../../../../chunks/date.js";
const DEFAULT_USER_ID = 1;
const load = async () => {
  try {
    const budgetService = new BudgetService();
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    const budget = await budgetService.getBudget(DEFAULT_USER_ID, currentMonth, currentYear);
    const trends = await budgetService.getMonthlyTrends(DEFAULT_USER_ID, 6);
    let budgetSummary = null;
    let categoryBreakdown = [];
    if (budget) {
      budgetSummary = await budgetService.getBudgetSummary(budget.id);
      categoryBreakdown = await budgetService.getSpendingByCategory(budget.id);
    }
    return {
      budget,
      budgetSummary,
      categoryBreakdown,
      trends,
      currentMonth,
      currentYear
    };
  } catch (error) {
    console.error("Error loading analytics data:", error);
    return {
      error: "Failed to load analytics data"
    };
  }
};
export {
  load
};
