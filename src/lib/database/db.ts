import sqlite3 from 'sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface Database {
	run(sql: string, params?: any[]): Promise<sqlite3.RunResult>;
	get<T = any>(sql: string, params?: any[]): Promise<T | undefined>;
	all<T = any>(sql: string, params?: any[]): Promise<T[]>;
	close(): Promise<void>;
}

class SQLiteDatabase implements Database {
	private db: sqlite3.Database;

	constructor(dbPath: string) {
		this.db = new sqlite3.Database(dbPath);
		this.db.run('PRAGMA foreign_keys = ON');
	}

	run(sql: string, params: any[] = []): Promise<sqlite3.RunResult> {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, function(err) {
				if (err) reject(err);
				else resolve(this as any);
			});
		});
	}

	get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
		return new Promise((resolve, reject) => {
			this.db.get(sql, params, (err, row) => {
				if (err) reject(err);
				else resolve(row as T);
			});
		});
	}

	all<T = any>(sql: string, params: any[] = []): Promise<T[]> {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err, rows) => {
				if (err) reject(err);
				else resolve(rows as T[]);
			});
		});
	}

	close(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.close((err) => {
				if (err) reject(err);
				else resolve();
			});
		});
	}
}

let dbInstance: Database | null = null;

export function getDatabase(): Database {
	if (!dbInstance) {
		const dbPath = join(process.cwd(), 'database', 'budget_tracker.db');
		dbInstance = new SQLiteDatabase(dbPath);
	}
	return dbInstance;
}

export async function initDatabase(): Promise<void> {
	const db = getDatabase();
	
	try {
		const schemaPath = join(process.cwd(), 'src', 'lib', 'database', 'schema.sql');
		const schema = readFileSync(schemaPath, 'utf-8');
		
		// Split schema into table creation and data insertion parts
		const parts = schema.split('-- Insert default expense categories');
		
		// First, create all tables
		if (parts[0]) {
			const tableStatements = parts[0].split(';').filter(stmt => stmt.trim() && !stmt.trim().startsWith('--'));
			for (const statement of tableStatements) {
				await db.run(statement.trim());
			}
		}
		
		// Then, check if categories already exist before inserting
		const existingCategories = await db.get('SELECT COUNT(*) as count FROM expense_categories WHERE is_default = 1');
		
		if (!existingCategories || existingCategories.count === 0) {
			// Insert default categories only if none exist
			const defaultCategories = [
				['Housing & Rent', '#EF4444', 'home', 1],
				['Utilities', '#F59E0B', 'zap', 1],
				['Transportation', '#3B82F6', 'car', 1],
				['Food & Groceries', '#10B981', 'utensils', 1],
				['Healthcare', '#EC4899', 'heart', 1],
				['Insurance', '#8B5CF6', 'shield', 1],
				['Entertainment', '#F97316', 'music', 1],
				['Shopping', '#06B6D4', 'shopping-bag', 1],
				['Education', '#6366F1', 'book-open', 1],
				['Savings', '#22C55E', 'piggy-bank', 1],
				['Debt Payment', '#DC2626', 'credit-card', 1],
				['Other', '#6B7280', 'tag', 1]
			];
			
			for (const [name, color, icon, isDefault] of defaultCategories) {
				try {
					await db.run(
						'INSERT OR IGNORE INTO expense_categories (name, color, icon, is_default) VALUES (?, ?, ?, ?)',
						[name, color, icon, isDefault]
					);
				} catch (error) {
					// Ignore duplicate key errors
					if (!error.message.includes('UNIQUE constraint failed')) {
						throw error;
					}
				}
			}
			
			console.log('Default expense categories inserted');
		}
		
		// Remove unused columns (migration for cleanup)
		try {
			// Create a new table without the unused columns
			await db.run(`
				CREATE TABLE IF NOT EXISTS savings_goals_new (
					id INTEGER PRIMARY KEY AUTOINCREMENT,
					user_id INTEGER NOT NULL,
					title TEXT NOT NULL,
					target_amount DECIMAL(10,2) NOT NULL,
					deadline DATE,
					created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
					FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
				)
			`);
			
			// Copy data from old table to new table
			await db.run(`
				INSERT OR IGNORE INTO savings_goals_new (id, user_id, title, target_amount, deadline, created_at, updated_at)
				SELECT id, user_id, title, target_amount, deadline, created_at, updated_at
				FROM savings_goals
			`);
			
			// Drop the old table
			await db.run('DROP TABLE IF EXISTS savings_goals_old');
			await db.run('ALTER TABLE savings_goals RENAME TO savings_goals_old');
			
			// Rename the new table
			await db.run('ALTER TABLE savings_goals_new RENAME TO savings_goals');
			
			// Drop the old table
			await db.run('DROP TABLE IF EXISTS savings_goals_old');
		} catch (error) {
			// Migration already done or failed, ignore
			console.log('Savings goals table migration skipped:', error.message);
		}
		
		// Create indexes
		const indexStatements = [
			'CREATE INDEX IF NOT EXISTS idx_budgets_user_date ON budgets(user_id, year, month)',
			'CREATE INDEX IF NOT EXISTS idx_planned_expenses_budget ON planned_expenses(budget_id)',
			'CREATE INDEX IF NOT EXISTS idx_actual_expenses_budget ON actual_expenses(budget_id)',
			'CREATE INDEX IF NOT EXISTS idx_actual_expenses_date ON actual_expenses(expense_date)',
			'CREATE INDEX IF NOT EXISTS idx_savings_goals_user ON savings_goals(user_id)'
		];
		
		for (const statement of indexStatements) {
			await db.run(statement);
		}
		
		console.log('Database initialized successfully');
	} catch (error) {
		console.error('Error initializing database:', error);
		throw error;
	}
}

export interface User {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export interface ExpenseCategory {
	id: number;
	name: string;
	color: string;
	icon: string;
	is_default: boolean;
	created_at: string;
}

export interface Budget {
	id: number;
	user_id: number;
	month: number;
	year: number;
	salary: number;
	created_at: string;
	updated_at: string;
}

export interface PlannedExpense {
	id: number;
	budget_id: number;
	category_id: number;
	amount: number;
	description: string;
	created_at: string;
}

export interface ActualExpense {
	id: number;
	budget_id: number;
	category_id: number;
	amount: number;
	description: string;
	expense_date: string;
	receipt_path: string | null;
	created_at: string;
}

export interface SavingsGoal {
	id: number;
	user_id: number;
	title: string;
	target_amount: number;
	deadline: string | null;
	created_at: string;
	updated_at: string;
}