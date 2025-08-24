# Monthly Budget Tracker

A professional monthly budget tracking web application built with SvelteKit and SQLite3. This application helps users plan their monthly budgets, track expenses, and analyze spending patterns with insightful charts and analytics.

## Features

### 🏦 Budget Planning (Pre-Payday)
- Set up monthly income and salary
- Plan expenses across different categories
- Calculate projected remaining balance
- Visual budget status indicators

### 💰 Expense Tracking (Post-Payday)
- Quick daily expense entry
- Categorize expenses with color-coded categories
- Real-time balance calculation
- Edit and manage expenses

### 📊 Dashboard & Analytics
- Monthly overview with visual charts
- Spending trends and patterns
- Category-wise expense breakdown
- Budget vs actual comparison
- Financial insights and recommendations

### 🎯 Smart Features
- Professional responsive design
- 12 pre-defined expense categories
- Data export to CSV
- Real-time budget health indicators
- Month-to-month trend analysis

## Tech Stack

- **Frontend**: SvelteKit, Tailwind CSS
- **Backend**: SvelteKit Server-Side Rendering
- **Database**: SQLite3
- **Charts**: Chart.js
- **Icons**: Lucide Svelte
- **Type Safety**: TypeScript

## Quick Start

### Option 1: Docker (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hellogunawan99/budget-tracker.git
   cd budget-tracker
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   Navigate to `http://localhost:3000`

#### Docker Commands
```bash
# Start the application
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f budget-tracker

# Rebuild after code changes
docker-compose up -d --build

# Remove everything including data
docker-compose down -v
```

### Option 2: Local Development

#### Prerequisites
- Node.js (v16 or higher)
- npm

#### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd budget-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create database directory**
   ```bash
   mkdir -p database
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
budget-tracker/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable UI components
│   │   ├── database/           # Database schema and queries
│   │   └── utils/              # Utility functions
│   ├── routes/
│   │   ├── api/                # API endpoints
│   │   └── (app)/              # Application pages
│   ├── app.html                # HTML template
│   ├── app.css                 # Global styles
│   └── hooks.server.ts         # Server hooks
├── static/                     # Static assets
├── database/                   # SQLite database files
└── uploads/                    # Receipt uploads (future)
```

## Usage

### 1. Set Up Your Budget
1. Navigate to "Budget Planning"
2. Enter your monthly salary
3. Add planned expenses by category
4. Review your projected remaining balance

### 2. Track Daily Expenses
1. Go to "Add Expense"
2. Select a category
3. Enter amount and description
4. Choose the expense date
5. Submit to track against your budget

### 3. Analyze Your Spending
1. Visit the "Analytics" page
2. Review spending trends
3. Compare planned vs actual expenses
4. Get personalized insights

### 4. Export Your Data
1. Go to "Settings"
2. Click "Export to CSV"
3. Download your financial data

## Database Schema

The application uses SQLite with the following main tables:

- **users**: User information
- **budgets**: Monthly budget records
- **expense_categories**: Predefined expense categories
- **planned_expenses**: Budget planning data
- **actual_expenses**: Real expense tracking
- **savings_goals**: Future savings tracking

## Key Features Explained

### Budget Status Indicators
- 🟢 **Good**: >20% budget remaining
- 🟡 **Warning**: 5-20% budget remaining  
- 🔴 **Danger**: <5% budget remaining or over budget

### Pre-built Categories
- Housing & Rent
- Utilities
- Transportation
- Food & Groceries
- Healthcare
- Insurance
- Entertainment
- Shopping
- Education
- Savings
- Debt Payment
- Other

### Charts & Analytics
- **Doughnut Chart**: Spending distribution by category
- **Bar Chart**: Planned vs actual comparison
- **Line Chart**: Monthly trends over time
- **Progress Bars**: Budget utilization

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Type check
npm run check:watch  # Type check in watch mode
```

### Adding New Features

The application is built with modularity in mind:

1. **Components**: Add reusable components to `src/lib/components/`
2. **API Routes**: Create new endpoints in `src/routes/api/`
3. **Database**: Extend queries in `src/lib/database/queries.ts`
4. **Pages**: Add new pages under `src/routes/(app)/`

## Security & Performance

- SQL injection prevention through parameterized queries
- Input validation on both client and server
- Foreign key constraints for data integrity
- Efficient database indexing
- Responsive design for all device sizes

## Future Enhancements

- Receipt photo upload and storage
- Multiple user support
- Savings goal tracking with deadlines
- Budget templates
- Email notifications
- Mobile app (PWA capabilities already included)
- Data backup and restore

## Troubleshooting

### Common Issues

1. **Database not initializing**
   - Ensure the `database/` directory exists
   - Check file permissions

2. **Build errors with Tailwind**
   - Verify `@tailwindcss/postcss` is installed
   - Check PostCSS configuration

3. **TypeScript errors**
   - Run `npm run check` to identify issues
   - Ensure all dependencies are properly typed

## License

This project is licensed under the ISC License.

## Support

For questions, issues, or feature requests, please refer to the project documentation or create an issue in the project repository.

---

**Note**: This application is designed for personal financial management. Always backup your data and use secure practices when handling financial information.