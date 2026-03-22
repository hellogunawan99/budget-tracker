<script lang="ts">
	import { formatCurrency, formatDate, getMonthName, getDaysUntilPayday, isPayday } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import BudgetStatus from '$lib/components/BudgetStatus.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import { TrendingUp, TrendingDown, Calendar, Target, Plus, ArrowRight, PiggyBank, Receipt, TrendingUp as TrendingUpIcon } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	$: hasBudget = !!data.budget;
	$: daysUntilPayday = getDaysUntilPayday();
	$: isCurrentPayday = isPayday();

	// Get greeting based on time of day
	function getGreeting() {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 18) return 'Good afternoon';
		return 'Good evening';
	}

	$: categoryChartData = (data.categoryBreakdown || []).length > 0 ? {
		labels: (data.categoryBreakdown || []).map(item => item.category_name),
		datasets: [{
			data: (data.categoryBreakdown || []).map(item => item.actual),
			backgroundColor: (data.categoryBreakdown || []).map(item => item.category_color),
			borderWidth: 0,
			hoverOffset: 4
		}]
	} : null;

	$: summaryStats = data.budgetSummary ? [
		{
			title: 'Monthly Income',
			value: formatCurrency(data.budgetSummary.salary),
			subtitle: 'Gross salary',
			icon: TrendingUp
		},
		{
			title: 'Total Spent',
			value: formatCurrency(data.budgetSummary.totalActual),
			subtitle: 'This month',
			icon: TrendingDown
		},
		{
			title: 'Remaining',
			value: formatCurrency(data.budgetSummary.remainingBudget),
			subtitle: data.budgetSummary.remainingBudget > 0 ? 'Left to spend' : 'Over budget',
			icon: Target
		},
		{
			title: 'Savings',
			value: formatCurrency(data.totalAccumulatedSavings || 0),
			subtitle: 'All-time surplus',
			icon: PiggyBank
		}
	] : [];

	$: budgetProgress = data.budgetSummary && data.budgetSummary.salary > 0
		? Math.min(100, (data.budgetSummary.totalActual / data.budgetSummary.salary) * 100)
		: 0;

	$: savingsGoalsCount = (data.savingsGoals || []).length;
	$: completedGoals = (data.savingsGoals || []).filter(g => (g.progressPercentage || 0) >= 100).length;
</script>

<svelte:head>
	<title>Dashboard - Budget Tracker</title>
</svelte:head>

<div class="dashboard">
	{#if data.error}
		<div class="error-container">
			<Card>
				<div class="error-content">
					<div class="error-icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<line x1="12" y1="8" x2="12" y2="12"/>
							<line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
					</div>
					<h2>Unable to Load Dashboard</h2>
					<p>{data.error}</p>
					<Button href="/budget">Set Up Budget</Button>
				</div>
			</Card>
		</div>
	{:else if !hasBudget}
		<div class="empty-state">
			<div class="empty-card">
				<div class="empty-icon">
					<Calendar />
				</div>
				<h2>Welcome to Budget Tracker</h2>
				<p>Create your first budget to start managing your finances effectively.</p>
				<Button href="/budget" size="lg">
					<Plus class="w-5 h-5" />
					Create Your First Budget
				</Button>
			</div>
		</div>
	{:else}
		<!-- Header Section -->
		<div class="dashboard-header">
			<div class="header-content">
				<div class="greeting-section">
					<h1 class="greeting">{getGreeting()}</h1>
					<p class="date-display">
						{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
					</p>
				</div>
				<div class="header-actions">
					<Button href="/expenses" variant="secondary">
						<Plus class="w-4 h-4" />
						Add Expense
					</Button>
					<Button href="/budget">
						View Budget
					</Button>
				</div>
			</div>

			<!-- Payday Banner -->
			{#if isCurrentPayday}
				<div class="payday-banner">
					<div class="payday-content">
						<Receipt />
						<span>It's payday! Time to review your budget and track expenses.</span>
					</div>
					<Button href="/expenses" size="sm" variant="secondary">Add Expense</Button>
				</div>
			{:else}
				<div class="countdown-banner">
					<div class="countdown-content">
						<Calendar />
						<span>{daysUntilPayday} days until payday</span>
					</div>
					<span class="payday-date">{getMonthName(data.currentMonth ?? 1)} 25th</span>
				</div>
			{/if}
		</div>

		<!-- Stats Grid -->
		<div class="stats-grid">
			{#each summaryStats as stat (stat.title)}
				<div class="stat-card">
					<div class="stat-icon">
						<svelte:component this={stat.icon} />
					</div>
					<div class="stat-content">
						<p class="stat-title">{stat.title}</p>
						<p class="stat-value">{stat.value}</p>
						<p class="stat-subtitle">{stat.subtitle}</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Main Content Grid -->
		<div class="main-grid">
			<!-- Budget Overview Card -->
			<div class="budget-overview-card">
				<div class="card-header">
					<div>
						<h2 class="card-title">{getMonthName(data.currentMonth ?? 1)} Budget</h2>
						<p class="card-subtitle">Your spending progress this month</p>
					</div>
					<div class="budget-badge" class:over-budget={budgetProgress > 90} class:warning={budgetProgress > 75 && budgetProgress <= 90}>
						{budgetProgress.toFixed(0)}% spent
					</div>
				</div>

				{#if data.budgetSummary}
					<div class="budget-progress-section">
						<div class="budget-amounts">
							<div class="spent-amount">
								<span class="amount-label">Spent</span>
								<span class="amount-value danger">{formatCurrency(data.budgetSummary.totalActual)}</span>
							</div>
							<div class="remaining-amount">
								<span class="amount-label">Remaining</span>
								<span class="amount-value" class:success={data.budgetSummary.remainingBudget > 0} class:danger={data.budgetSummary.remainingBudget <= 0}>
									{formatCurrency(Math.max(0, data.budgetSummary.remainingBudget))}
								</span>
							</div>
						</div>

						<div class="progress-bar-container">
							<div class="progress-bar-bg">
								<div
									class="progress-bar-fill"
									class:success={budgetProgress < 75}
									class:warning={budgetProgress >= 75 && budgetProgress < 90}
									class:danger={budgetProgress >= 90}
									style="width: {Math.min(100, budgetProgress)}%"
								></div>
							</div>
							<div class="progress-labels">
								<span>0%</span>
								<span class="budget-marker" style="left: {Math.min(100, budgetProgress)}%">{formatCurrency(data.budgetSummary.salary)}</span>
							</div>
						</div>
					</div>
				{/if}

				<div class="card-actions">
					<Button href="/budget" variant="secondary" size="sm">
						Manage Budget
						<ArrowRight class="w-4 h-4" />
					</Button>
				</div>
			</div>

			<!-- Spending Chart Card -->
			{#if categoryChartData}
				<div class="chart-card">
					<div class="card-header">
						<div>
							<h2 class="card-title">Spending by Category</h2>
							<p class="card-subtitle">Where your money goes</p>
						</div>
					</div>
					<div class="chart-container">
						<Chart type="doughnut" data={categoryChartData} height={220} />
					</div>
					<div class="category-legend">
						{#each (data.categoryBreakdown || []).slice(0, 5) as cat}
							<div class="legend-item">
								<span class="legend-color" style="background-color: {cat.category_color}"></span>
								<span class="legend-label">{cat.category_name}</span>
								<span class="legend-value">{formatCurrency(cat.actual)}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		<!-- Secondary Grid -->
		<div class="secondary-grid">
			<!-- Recent Expenses -->
			<div class="expenses-card">
				<div class="card-header">
					<div>
						<h2 class="card-title">Recent Expenses</h2>
						<p class="card-subtitle">Your latest transactions</p>
					</div>
					<Button href="/expenses" variant="ghost" size="sm">
						View All
						<ArrowRight class="w-4 h-4" />
					</Button>
				</div>

				{#if (data.recentExpenses || []).length > 0}
					<div class="expenses-list">
						{#each data.recentExpenses || [] as expense (expense.id)}
							<div class="expense-item">
								<div class="expense-category" style="background-color: {expense.category_color}20; color: {expense.category_color}">
									{expense.category_name.charAt(0)}
								</div>
								<div class="expense-details">
									<p class="expense-category-name">{expense.category_name}</p>
									<p class="expense-description">{expense.description || 'No description'}</p>
								</div>
								<div class="expense-meta">
									<p class="expense-amount">{formatCurrency(expense.amount)}</p>
									<p class="expense-date">{formatDate(expense.expense_date)}</p>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty-list">
						<Receipt class="w-10 h-10 text-gray-300" />
						<p>No expenses recorded yet</p>
					</div>
				{/if}
			</div>

			<!-- Savings Goals -->
			<div class="savings-card">
				<div class="card-header">
					<div>
						<h2 class="card-title">Savings Goals</h2>
						<p class="card-subtitle">{completedGoals} of {savingsGoalsCount} goals achieved</p>
					</div>
					<Button href="/savings-goals" variant="ghost" size="sm">
						View All
						<ArrowRight class="w-4 h-4" />
					</Button>
				</div>

				{#if (data.savingsGoals || []).length > 0}
					<div class="goals-list">
						{#each data.savingsGoals || [] as goal (goal.id)}
							<div class="goal-item">
								<div class="goal-header">
									<div class="goal-info">
										<h4 class="goal-title">{goal.title}</h4>
										<p class="goal-deadline">
											{#if goal.deadline}
												Due {formatDate(goal.deadline)}
											{:else}
												No deadline
											{/if}
										</p>
									</div>
									<div class="goal-amounts">
										<span class="goal-actual">{formatCurrency(goal.actualProgress || 0)}</span>
										<span class="goal-target">/ {formatCurrency(goal.target_amount)}</span>
									</div>
								</div>
								<div class="goal-progress">
									<div class="progress-track">
										<div
											class="progress-fill"
											class:completed={(goal.progressPercentage || 0) >= 100}
											style="width: {Math.min(100, goal.progressPercentage || 0)}%"
										></div>
									</div>
									<span class="progress-percent">{(goal.progressPercentage || 0).toFixed(0)}%</span>
								</div>
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty-list">
						<PiggyBank class="w-10 h-10 text-gray-300" />
						<p>No savings goals yet</p>
						<Button href="/savings-goals" variant="secondary" size="sm">Create Goal</Button>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.dashboard {
		padding: 1.5rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Header Section */
	.dashboard-header {
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.greeting-section {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.greeting {
		font-size: 1.75rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0;
	}

	.date-display {
		font-size: 0.9375rem;
		color: #6b7280;
		margin: 0;
	}

	.header-actions {
		display: flex;
		gap: 0.75rem;
	}

	/* Banner Styles */
	.payday-banner,
	.countdown-banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.25rem;
		border-radius: 1rem;
		margin-bottom: 1rem;
	}

	.payday-banner {
		background: #1f2937;
		color: white;
	}

	.countdown-banner {
		background: white;
		border: 1px solid #e5e7eb;
		color: #374151;
	}

	.payday-content,
	.countdown-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-weight: 500;
	}

	.payday-date,
	.countdown-banner .payday-date {
		font-size: 0.875rem;
		color: #6b7280;
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		display: flex;
		gap: 1rem;
		transition: all 0.2s;
	}

	.stat-card:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.stat-title {
		font-size: 0.6875rem;
		font-weight: 600;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.stat-value {
		font-size: 1.375rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0;
	}

	.stat-subtitle {
		font-size: 0.75rem;
		color: #9ca3af;
		margin: 0;
	}

	/* Main Grid */
	.main-grid {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.budget-overview-card,
	.chart-card,
	.expenses-card,
	.savings-card {
		background: white;
		border-radius: 1rem;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.25rem;
	}

	.card-title {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.card-subtitle {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0.25rem 0 0 0;
	}

	/* Budget Progress */
	.budget-badge {
		padding: 0.375rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		background: #f3f4f6;
		color: #1f2937;
	}

	.budget-badge.warning {
		background: #fef3c7;
		color: #92400e;
	}

	.budget-badge.over-budget {
		background: #fee2e2;
		color: #991b1b;
	}

	.budget-progress-section {
		margin-bottom: 1.25rem;
	}

	.budget-amounts {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.spent-amount,
	.remaining-amount {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.amount-label {
		font-size: 0.75rem;
		color: #6b7280;
	}

	.amount-value {
		font-size: 1.25rem;
		font-weight: 700;
	}

	.amount-value.success {
		color: #059669;
	}

	.amount-value.danger {
		color: #dc2626;
	}

	.progress-bar-container {
		position: relative;
	}

	.progress-bar-bg {
		height: 12px;
		background: #f3f4f6;
		border-radius: 9999px;
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.5s ease;
	}

	.progress-bar-fill.success {
		background: #059669;
	}

	.progress-bar-fill.warning {
		background: #d97706;
	}

	.progress-bar-fill.danger {
		background: #dc2626;
	}

	.progress-labels {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.budget-marker {
		position: absolute;
		transform: translateX(-50%);
		top: -1.25rem;
		font-weight: 600;
		color: #374151;
	}

	.card-actions {
		display: flex;
		justify-content: flex-start;
	}

	/* Chart */
	.chart-container {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.category-legend {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.legend-label {
		flex: 1;
		font-size: 0.8125rem;
		color: #374151;
	}

	.legend-value {
		font-size: 0.8125rem;
		font-weight: 600;
		color: #1f2937;
	}

	/* Secondary Grid */
	.secondary-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	/* Expenses List */
	.expenses-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.expense-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.875rem;
		background: #f9fafb;
		border-radius: 0.75rem;
		transition: background 0.2s;
	}

	.expense-item:hover {
		background: #f3f4f6;
	}

	.expense-category {
		width: 40px;
		height: 40px;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.expense-details {
		flex: 1;
		min-width: 0;
	}

	.expense-category-name {
		font-weight: 600;
		color: #1f2937;
		margin: 0;
		font-size: 0.875rem;
	}

	.expense-description {
		font-size: 0.75rem;
		color: #6b7280;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.expense-meta {
		text-align: right;
	}

	.expense-amount {
		font-weight: 700;
		color: #1f2937;
		margin: 0;
		font-size: 0.9375rem;
	}

	.expense-date {
		font-size: 0.6875rem;
		color: #9ca3af;
		margin: 0;
	}

	/* Goals List */
	.goals-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.goal-item {
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.75rem;
	}

	.goal-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.75rem;
	}

	.goal-title {
		font-weight: 600;
		color: #1f2937;
		margin: 0;
		font-size: 0.875rem;
	}

	.goal-deadline {
		font-size: 0.75rem;
		color: #6b7280;
		margin: 0.25rem 0 0 0;
	}

	.goal-amounts {
		text-align: right;
	}

	.goal-actual {
		font-weight: 700;
		color: #1f2937;
	}

	.goal-target {
		font-size: 0.75rem;
		color: #9ca3af;
	}

	.goal-progress {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.progress-track {
		flex: 1;
		height: 8px;
		background: #e5e7eb;
		border-radius: 9999px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: #1f2937;
		border-radius: 9999px;
		transition: width 0.5s ease;
	}

	.progress-fill.completed {
		background: #059669;
	}

	.progress-percent {
		font-size: 0.75rem;
		font-weight: 600;
		color: #6b7280;
		min-width: 2.5rem;
		text-align: right;
	}

	/* Empty State */
	.empty-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		color: #9ca3af;
		text-align: center;
	}

	.empty-list p {
		margin: 0.75rem 0;
	}

	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
	}

	.empty-card {
		text-align: center;
		max-width: 400px;
		padding: 3rem;
	}

	.empty-icon {
		width: 80px;
		height: 80px;
		margin: 0 auto 1.5rem;
		background: #f3f4f6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9ca3af;
	}

	.empty-icon :global(svg) {
		width: 40px;
		height: 40px;
	}

	.empty-card h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0 0 0.75rem 0;
	}

	.empty-card p {
		color: #6b7280;
		margin: 0 0 1.5rem 0;
	}

	.error-container {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 60vh;
	}

	.error-content {
		text-align: center;
		max-width: 400px;
	}

	.error-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 1.5rem;
		background: #fee2e2;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #dc2626;
	}

	.error-icon svg {
		width: 32px;
		height: 32px;
	}

	.error-content h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.error-content p {
		color: #6b7280;
		margin: 0 0 1.5rem 0;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.main-grid,
		.secondary-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 1rem;
		}

		.header-content {
			flex-direction: column;
			gap: 1rem;
		}

		.header-actions {
			width: 100%;
		}

		.header-actions :global(button) {
			flex: 1;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.greeting {
			font-size: 1.5rem;
		}
	}
</style>
