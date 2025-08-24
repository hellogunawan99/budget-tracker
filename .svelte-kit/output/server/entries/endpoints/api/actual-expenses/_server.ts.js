import { json } from "@sveltejs/kit";
import { B as BudgetService } from "../../../../chunks/queries.js";
const budgetService = new BudgetService();
const GET = async ({ url }) => {
  try {
    const budgetId = Number(url.searchParams.get("budgetId"));
    if (!budgetId) {
      return json({ error: "Budget ID is required" }, { status: 400 });
    }
    const expenses = await budgetService.getActualExpenses(budgetId);
    return json(expenses);
  } catch (error) {
    console.error("Error fetching actual expenses:", error);
    return json({ error: "Failed to fetch actual expenses" }, { status: 500 });
  }
};
const POST = async ({ request }) => {
  try {
    const { budgetId, categoryId, amount, description, expenseDate, receiptPath } = await request.json();
    if (!budgetId || !categoryId || !amount || !expenseDate) {
      return json({ error: "Budget ID, category ID, amount, and expense date are required" }, { status: 400 });
    }
    const id = await budgetService.addActualExpense(
      budgetId,
      categoryId,
      amount,
      description || "",
      expenseDate,
      receiptPath || null
    );
    return json({ id, success: true });
  } catch (error) {
    console.error("Error creating actual expense:", error);
    return json({ error: "Failed to create actual expense" }, { status: 500 });
  }
};
const PUT = async ({ request }) => {
  try {
    const { id, categoryId, amount, description, expenseDate, receiptPath } = await request.json();
    if (!id || !categoryId || !amount || !expenseDate) {
      return json({ error: "ID, category ID, amount, and expense date are required" }, { status: 400 });
    }
    await budgetService.updateActualExpense(
      id,
      categoryId,
      amount,
      description || "",
      expenseDate,
      receiptPath || null
    );
    return json({ success: true });
  } catch (error) {
    console.error("Error updating actual expense:", error);
    return json({ error: "Failed to update actual expense" }, { status: 500 });
  }
};
const DELETE = async ({ request }) => {
  try {
    const { id } = await request.json();
    if (!id) {
      return json({ error: "ID is required" }, { status: 400 });
    }
    await budgetService.deleteActualExpense(id);
    return json({ success: true });
  } catch (error) {
    console.error("Error deleting actual expense:", error);
    return json({ error: "Failed to delete actual expense" }, { status: 500 });
  }
};
export {
  DELETE,
  GET,
  POST,
  PUT
};
