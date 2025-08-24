-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Expense categories table
CREATE TABLE IF NOT EXISTS expense_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL DEFAULT '#6B7280',
    icon TEXT DEFAULT 'tag',
    is_default BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Monthly budgets table
CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, month, year)
);

-- Planned expenses table
CREATE TABLE IF NOT EXISTS planned_expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    budget_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES expense_categories(id) ON DELETE RESTRICT
);

-- Actual expenses table
CREATE TABLE IF NOT EXISTS actual_expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    budget_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL DEFAULT CURRENT_DATE,
    receipt_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (budget_id) REFERENCES budgets(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES expense_categories(id) ON DELETE RESTRICT
);

-- Savings goals table
CREATE TABLE IF NOT EXISTS savings_goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    target_amount DECIMAL(10,2) NOT NULL,
    deadline DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert default expense categories
INSERT OR IGNORE INTO expense_categories (name, color, icon, is_default) VALUES
('Housing & Rent', '#EF4444', 'home', true),
('Utilities', '#F59E0B', 'zap', true),
('Transportation', '#3B82F6', 'car', true),
('Food & Groceries', '#10B981', 'utensils', true),
('Healthcare', '#EC4899', 'heart', true),
('Insurance', '#8B5CF6', 'shield', true),
('Entertainment', '#F97316', 'music', true),
('Shopping', '#06B6D4', 'shopping-bag', true),
('Education', '#6366F1', 'book-open', true),
('Savings', '#22C55E', 'piggy-bank', true),
('Debt Payment', '#DC2626', 'credit-card', true),
('Other', '#6B7280', 'tag', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_budgets_user_date ON budgets(user_id, year, month);
CREATE INDEX IF NOT EXISTS idx_planned_expenses_budget ON planned_expenses(budget_id);
CREATE INDEX IF NOT EXISTS idx_actual_expenses_budget ON actual_expenses(budget_id);
CREATE INDEX IF NOT EXISTS idx_actual_expenses_date ON actual_expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_savings_goals_user ON savings_goals(user_id);