import { z } from "zod";
const CreateBudgetSchema = z.object({
  month: z.coerce.number().int().min(1).max(12),
  year: z.coerce.number().int().min(2020).max(2100),
  salary: z.coerce.number().positive("Salary must be greater than 0")
});
z.object({
  salary: z.coerce.number().positive("Salary must be greater than 0")
});
const CreatePlannedExpenseSchema = z.object({
  budgetId: z.coerce.number().positive("Budget ID is required"),
  categoryId: z.coerce.number().positive("Category ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().optional()
});
const UpdatePlannedExpenseSchema = z.object({
  id: z.coerce.number().positive("ID is required"),
  categoryId: z.coerce.number().positive("Category ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().optional()
});
const DeletePlannedExpenseSchema = z.object({
  id: z.coerce.number().positive("ID is required")
});
const CreateActualExpenseSchema = z.object({
  budgetId: z.coerce.number().positive("Budget ID is required"),
  categoryId: z.coerce.number().positive("Category ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  expenseDate: z.coerce.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  receiptPath: z.string().optional().nullable()
});
const UpdateActualExpenseSchema = z.object({
  id: z.coerce.number().positive("ID is required"),
  categoryId: z.coerce.number().positive("Category ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  description: z.string().optional(),
  expenseDate: z.coerce.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  receiptPath: z.string().optional().nullable()
});
const DeleteActualExpenseSchema = z.object({
  id: z.coerce.number().positive("ID is required")
});
const CreateSavingsGoalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  targetAmount: z.coerce.number().positive("Target amount must be greater than 0"),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional()
});
z.object({
  id: z.coerce.number().positive("ID is required"),
  title: z.string().min(1, "Title is required"),
  targetAmount: z.coerce.number().positive("Target amount must be greater than 0"),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format").optional()
});
const UpdateSavingsGoalProgressSchema = z.object({
  id: z.coerce.number().positive("ID is required"),
  currentAmount: z.coerce.number().positive("Current amount must be greater than 0")
});
const DeleteSavingsGoalSchema = z.object({
  id: z.coerce.number().positive("ID is required")
});
const ExportQuerySchema = z.object({
  months: z.coerce.number().positive("Months must be greater than 0").max(24).default(12)
});
export {
  CreateActualExpenseSchema as C,
  DeleteActualExpenseSchema as D,
  ExportQuerySchema as E,
  UpdateActualExpenseSchema as U,
  CreateBudgetSchema as a,
  CreatePlannedExpenseSchema as b,
  UpdatePlannedExpenseSchema as c,
  DeletePlannedExpenseSchema as d,
  CreateSavingsGoalSchema as e,
  UpdateSavingsGoalProgressSchema as f,
  DeleteSavingsGoalSchema as g
};
