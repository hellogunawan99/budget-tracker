import { B as BudgetService } from "../../../../../chunks/queries.js";
const DEFAULT_USER_ID = 1;
async function GET() {
  try {
    const budgetService = new BudgetService();
    const budgets = await budgetService.getDatabase().all(
      "SELECT * FROM budgets WHERE user_id = ? ORDER BY year DESC, month DESC",
      [DEFAULT_USER_ID]
    );
    let csvContent = "Type,Date,Category,Amount,Description,Budget Month,Budget Year\n";
    for (const budget of budgets) {
      const actualExpenses = await budgetService.getActualExpenses(budget.id);
      for (const expense of actualExpenses) {
        csvContent += `Expense,${expense.expense_date},"${expense.category_name}",${expense.amount},"${expense.description || ""}",${budget.month},${budget.year}
`;
      }
      const plannedExpenses = await budgetService.getPlannedExpenses(budget.id);
      for (const expense of plannedExpenses) {
        csvContent += `Planned,${budget.created_at.split(" ")[0]},"${expense.category_name}",${expense.amount},"${expense.description || ""}",${budget.month},${budget.year}
`;
      }
    }
    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="budget-tracker-export-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv"`
      }
    });
  } catch (error) {
    console.error("Export failed:", error);
    return new Response(JSON.stringify({ error: "Export failed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
export {
  GET
};
