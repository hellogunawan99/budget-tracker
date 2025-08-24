import { json } from "@sveltejs/kit";
import { B as BudgetService } from "../../../../chunks/queries.js";
const budgetService = new BudgetService();
const DEFAULT_USER_ID = 1;
const GET = async () => {
  try {
    const goals = await budgetService.getSavingsGoals(DEFAULT_USER_ID);
    return json(goals);
  } catch (error) {
    console.error("Error fetching savings goals:", error);
    return json({ error: "Failed to fetch savings goals" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const { title, targetAmount, deadline } = await request.json();
    if (!title || !targetAmount) {
      return json({ error: "Title and target amount are required" }, { status: 400 });
    }
    const id = await budgetService.createSavingsGoal(DEFAULT_USER_ID, title, targetAmount, deadline);
    return json({ id, success: true });
  } catch (error) {
    console.error("Error creating savings goal:", error);
    return json({ error: "Failed to create savings goal" }, { status: 500 });
  }
};
const PUT = async ({ request }) => {
  try {
    const { id, currentAmount } = await request.json();
    if (!id || currentAmount === void 0) {
      return json({ error: "ID and current amount are required" }, { status: 400 });
    }
    await budgetService.updateSavingsGoalProgress(id, currentAmount);
    return json({ success: true });
  } catch (error) {
    console.error("Error updating savings goal:", error);
    return json({ error: "Failed to update savings goal" }, { status: 500 });
  }
};
const DELETE = async ({ request }) => {
  try {
    const { id } = await request.json();
    if (!id) {
      return json({ error: "ID is required" }, { status: 400 });
    }
    await budgetService.deleteSavingsGoal(id);
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting savings goal:", error);
    return json({ error: "Failed to delete savings goal" }, { status: 500 });
  }
};
export {
  DELETE,
  GET,
  POST,
  PUT
};
