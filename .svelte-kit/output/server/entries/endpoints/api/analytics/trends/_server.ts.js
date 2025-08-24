import { json } from "@sveltejs/kit";
import { B as BudgetService } from "../../../../../chunks/queries.js";
const budgetService = new BudgetService();
const DEFAULT_USER_ID = 1;
const GET = async ({ url }) => {
  try {
    const months = Number(url.searchParams.get("months")) || 12;
    const trends = await budgetService.getMonthlyTrends(DEFAULT_USER_ID, months);
    return json(trends);
  } catch (error) {
    console.error("Error fetching trends:", error);
    return json({ error: "Failed to fetch trends" }, { status: 500 });
  }
};
export {
  GET
};
