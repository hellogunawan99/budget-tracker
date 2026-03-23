import { B as BudgetService } from "../../../../chunks/queries.js";
import { fail } from "@sveltejs/kit";
const DEFAULT_USER_ID = 1;
const load = async ({ locals }) => {
  const userId = locals.user?.id || DEFAULT_USER_ID;
  try {
    const budgetService = new BudgetService();
    const savingsGoals = await budgetService.getSavingsGoalsWithAccumulatedProgress(userId);
    const totalAccumulatedSavings = await budgetService.getTotalAccumulatedSavings(userId);
    const budgets = await budgetService.getAllBudgets(userId);
    console.log("DEBUG - User budgets:", budgets);
    console.log("DEBUG - Total accumulated savings:", totalAccumulatedSavings);
    console.log("LOAD SAVINGS GOALS - userId:", userId, "goals count:", savingsGoals?.length);
    if (savingsGoals?.length > 0) {
      console.log("DEBUG - First goal progress:", {
        title: savingsGoals[0].title,
        target_amount: savingsGoals[0].target_amount,
        actualProgress: savingsGoals[0].actualProgress,
        progressPercentage: savingsGoals[0].progressPercentage
      });
    }
    return {
      savingsGoals,
      totalAccumulatedSavings
    };
  } catch (error) {
    console.error("Error loading savings goals:", error);
    return {
      error: "Failed to load savings goals"
    };
  }
};
const actions = {
  create: async ({ request, locals }) => {
    try {
      const budgetService = new BudgetService();
      const data = await request.formData();
      const userId = locals.user?.id || DEFAULT_USER_ID;
      const title = data.get("title");
      const targetAmountStr = data.get("targetAmount");
      const targetAmount = parseFloat(targetAmountStr);
      const deadline = data.get("deadline");
      console.log("CREATE SAVINGS GOAL - Form data received:", { title, targetAmountStr, targetAmount, deadline });
      console.log("  title type:", typeof title, "title length:", title?.length);
      console.log("  targetAmountStr type:", typeof targetAmountStr, "value:", targetAmountStr);
      if (!title?.trim() || !targetAmountStr?.trim() || isNaN(targetAmount) || targetAmount <= 0) {
        console.warn("Validation failed:", {
          title: `"${title}"`,
          titleTrimmed: `"${title?.trim()}"`,
          targetAmountStr: `"${targetAmountStr}"`,
          targetAmountStrTrimmed: `"${targetAmountStr?.trim()}"`,
          targetAmount,
          titleExists: !!title?.trim(),
          targetAmountStrExists: !!targetAmountStr?.trim(),
          targetAmountValid: !isNaN(targetAmount),
          targetAmountPositive: targetAmount > 0
        });
        return fail(400, {
          error: "Title and a valid target amount are required",
          title,
          targetAmount: isNaN(targetAmount) ? "" : targetAmount.toString(),
          deadline
        });
      }
      console.log("Creating savings goal with:", { userId, title, targetAmount, deadline });
      const goalId = await budgetService.createSavingsGoal(
        userId,
        title,
        targetAmount,
        deadline || void 0
      );
      console.log("Savings goal created with ID:", goalId);
      return { success: true };
    } catch (error) {
      console.error("Error creating savings goal:", error);
      console.error("Error stack:", error instanceof Error ? error.stack : "unknown");
      return fail(500, { error: "Failed to create savings goal" });
    }
  },
  delete: async ({ request }) => {
    try {
      const budgetService = new BudgetService();
      const data = await request.formData();
      const id = parseInt(data.get("id"));
      if (!id) {
        return fail(400, { error: "ID is required" });
      }
      await budgetService.deleteSavingsGoal(id);
      return { success: true };
    } catch (error) {
      console.error("Error deleting savings goal:", error);
      return fail(500, { error: "Failed to delete savings goal" });
    }
  },
  update: async ({ request }) => {
    try {
      const budgetService = new BudgetService();
      const data = await request.formData();
      const id = parseInt(data.get("id"));
      const title = data.get("title");
      const targetAmountStr = data.get("targetAmount");
      const targetAmount = parseFloat(targetAmountStr);
      const deadline = data.get("deadline");
      if (!id || !title || !targetAmountStr || isNaN(targetAmount) || targetAmount <= 0) {
        return fail(400, {
          error: "ID, title and a valid target amount are required",
          id,
          title,
          targetAmount: isNaN(targetAmount) ? "" : targetAmount.toString(),
          deadline
        });
      }
      await budgetService.updateSavingsGoal(id, title, targetAmount, deadline || void 0);
      return { success: true };
    } catch (error) {
      console.error("Error updating savings goal:", error);
      return fail(500, { error: "Failed to update savings goal" });
    }
  }
};
export {
  actions,
  load
};
