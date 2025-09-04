import sqlite3 from 'sqlite3';
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure database directory exists
const dbDir = join(dirname(__dirname), 'database');
if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
}

const dbPath = join(dbDir, 'budget_tracker.db');
console.log('Database path:', dbPath);

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err);
        process.exit(1);
    }
    console.log('Connected to database');
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Read schema file
const schemaPath = join(dirname(__dirname), 'src', 'lib', 'database', 'schema.sql');
const schema = readFileSync(schemaPath, 'utf-8');

// Parse schema into separate sections
const lines = schema.split('\n');
const tableStatements = [];
const insertStatements = [];
const indexStatements = [];

let currentStatement = '';
let inInsertSection = false;
let inIndexSection = false;

lines.forEach(line => {
    if (line.includes('-- Insert default expense categories')) {
        inInsertSection = true;
    }
    if (line.includes('-- Create indexes')) {
        inInsertSection = false;
        inIndexSection = true;
    }
    
    if (!line.startsWith('--')) {
        currentStatement += line + '\n';
        
        if (line.includes(';')) {
            const stmt = currentStatement.trim();
            if (stmt) {
                if (inIndexSection) {
                    indexStatements.push(stmt);
                } else if (inInsertSection) {
                    insertStatements.push(stmt);
                } else if (stmt.startsWith('CREATE TABLE')) {
                    tableStatements.push(stmt);
                }
            }
            currentStatement = '';
        }
    }
});

// Execute statements in sequence
async function executeStatements() {
    const runStatement = (stmt) => {
        return new Promise((resolve, reject) => {
            db.run(stmt, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };
    
    try {
        // Create tables first
        console.log('Creating tables...');
        for (const stmt of tableStatements) {
            try {
                await runStatement(stmt);
                const tableName = stmt.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
                if (tableName) {
                    console.log(`✓ Created table: ${tableName}`);
                }
            } catch (err) {
                console.error('Error creating table:', err.message);
            }
        }
        
        // Insert default data
        console.log('\nInserting default data...');
        for (const stmt of insertStatements) {
            try {
                await runStatement(stmt);
                console.log('✓ Inserted default expense categories');
            } catch (err) {
                if (!err.message.includes('UNIQUE constraint failed')) {
                    console.error('Error inserting data:', err.message);
                }
            }
        }
        
        // Create indexes
        console.log('\nCreating indexes...');
        for (const stmt of indexStatements) {
            try {
                await runStatement(stmt);
                const indexName = stmt.match(/CREATE INDEX IF NOT EXISTS (\w+)/)?.[1];
                if (indexName) {
                    console.log(`✓ Created index: ${indexName}`);
                }
            } catch (err) {
                console.error('Error creating index:', err.message);
            }
        }
        
        // Verify tables
        const tables = await new Promise((resolve, reject) => {
            db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
        
        console.log('\nTables in database:');
        tables.forEach(table => console.log(`  - ${table.name}`));
        
        // Verify categories
        const categories = await new Promise((resolve, reject) => {
            db.all("SELECT COUNT(*) as count FROM expense_categories", (err, rows) => {
                if (err) reject(err);
                else resolve(rows[0]);
            });
        });
        
        console.log(`\n✓ ${categories.count} expense categories in database`);
        
    } catch (err) {
        console.error('Fatal error:', err);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('Error closing database:', err);
            } else {
                console.log('\n✅ Database initialization complete!');
            }
        });
    }
}

executeStatements();
