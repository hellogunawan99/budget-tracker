import { B as BudgetService } from "../../../../chunks/queries.js";
import { c as getCurrentMonth, d as getCurrentYear } from "../../../../chunks/date.js";
const DEFAULT_USER_ID = 1;
const load = async () => {
  try {
    const budgetService = new BudgetService();
    const currentMonth = getCurrentMonth();
    const currentYear = getCurrentYear();
    const budget = await budgetService.getBudget(DEFAULT_USER_ID, currentMonth, currentYear);
    const categories = await budgetService.getExpenseCategories();
    let plannedExpenses = [];
    let budgetSummary = null;
    if (budget) {
      plannedExpenses = await budgetService.getPlannedExpenses(budget.id);
      budgetSummary = await budgetService.getBudgetSummary(budget.id);
    }
    return {
      budget,
      categories,
      plannedExpenses,
      budgetSummary,
      currentMonth,
      currentYear
    };
  } catch (error) {
    console.error("Error loading budget data:", error);
    return {
      error: "Failed to load budget data"
    };
  }
};
export {
  load
};
