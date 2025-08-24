import { json } from "@sveltejs/kit";
import { B as BudgetService } from "../../../../chunks/queries.js";
const budgetService = new BudgetService();
const DEFAULT_USER_ID = 1;
const GET = async ({ url }) => {
  try {
    const month = Number(url.searchParams.get("month"));
    const year = Number(url.searchParams.get("year"));
    if (!month || !year) {
      const budget2 = await budgetService.getCurrentBudget(DEFAULT_USER_ID);
      if (!budget2) {
        return json({ error: "No current budget found" }, { status: 404 });
      }
      const summary2 = await budgetService.getBudgetSummary(budget2.id);
      return json({ budget: budget2, summary: summary2 });
    }
    const budget = await budgetService.getBudget(DEFAULT_USER_ID, month, year);
    if (!budget) {
      return json({ error: "Budget not found" }, { status: 404 });
    }
    const summary = await budgetService.getBudgetSummary(budget.id);
    return json({ budget, summary });
  } catch (error) {
    console.error("Error fetching budget:", error);
    return json({ error: "Failed to fetch budget" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const { month, year, salary } = await request.json();
    if (!month || !year || !salary) {
      return json({ error: "Month, year, and salary are required" }, { status: 400 });
    }
    const budgetId = await budgetService.createBudget(DEFAULT_USER_ID, month, year, salary);
    const budget = await budgetService.getBudget(DEFAULT_USER_ID, month, year);
    return json({ budget, id: budgetId });
  } catch (error) {
    console.error("Error creating budget:", error);
    return json({ error: "Failed to create budget" }, { status: 500 });
  }
};
export {
  GET,
  POST
};
