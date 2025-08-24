import { json } from "@sveltejs/kit";
import { B as BudgetService } from "../../../../../../chunks/queries.js";
const budgetService = new BudgetService();
const GET = async ({ params }) => {
  try {
    const budgetId = parseInt(params.id);
    if (isNaN(budgetId)) {
      return json({ error: "Invalid budget ID" }, { status: 400 });
    }
    const summary = await budgetService.getBudgetSummary(budgetId);
    const categoryBreakdown = await budgetService.getSpendingByCategory(budgetId);
    return json({ summary, categoryBreakdown });
  } catch (error) {
    console.error("Error fetching budget summary:", error);
    return json({ error: "Failed to fetch budget summary" }, { status: 500 });
  }
};
export {
  GET
};
