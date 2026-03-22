<script lang="ts">
	import { formatCurrency, getMonthName } from '$lib/utils/date.js';
	import Chart from '$lib/components/Chart.svelte';
	import { BarChart3, TrendingUp, TrendingDown, PieChart, DollarSign, Target, PiggyBank, ArrowUp, ArrowDown, AlertCircle, CheckCircle, TrendingUp as TrendingUpIcon } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	$: categoryChartData = (data.categoryBreakdown || []).length > 0 ? {
		labels: (data.categoryBreakdown || []).map(item => item.category_name),
		datasets: [{
			data: (data.categoryBreakdown || []).map(item => item.actual),
			backgroundColor: (data.categoryBreakdown || []).map(item => item.category_color),
			borderWidth: 0,
			hoverOffset: 4
		}]
	} : null;

	$: comparisonChartData = (data.categoryBreakdown || []).length > 0 ? {
		labels: (data.categoryBreakdown || []).map(item => item.category_name),
		datasets: [
			{
				label: 'Planned',
				data: (data.categoryBreakdown || []).map(item => item.planned),
				backgroundColor: 'rgba(31, 41, 55, 0.8)',
				borderRadius: 6
			},
			{
				label: 'Actual',
				data: (data.categoryBreakdown || []).map(item => item.actual),
				backgroundColor: 'rgba(107, 114, 128, 0.8)',
				borderRadius: 6
			}
		]
	} : null;

	$: trendsChartData = (data.trends || []).length > 0 ? {
		labels: (data.trends || []).map(item => `${getMonthName(Number(item.month))}`),
		datasets: [
			{
				label: 'Income',
				data: (data.trends || []).map(item => item.income),
				borderColor: '#1f2937',
				backgroundColor: 'rgba(31, 41, 55, 0.1)',
				fill: true,
				tension: 0.4
			},
			{
				label: 'Expenses',
				data: (data.trends || []).map(item => item.expenses),
				borderColor: '#6b7280',
				backgroundColor: 'rgba(107, 114, 128, 0.1)',
				fill: true,
				tension: 0.4
			},
			{
				label: 'Savings',
				data: (data.trends || []).map(item => item.savings),
				borderColor: '#059669',
				backgroundColor: 'rgba(5, 150, 105, 0.1)',
				fill: true,
				tension: 0.4
			}
		]
	} : null;

	$: averageSpending = data.trends && data.trends.length > 0
		? data.trends.reduce((sum, trend) => sum + trend.expenses, 0) / data.trends.length
		: 0;

	$: averageSavings = data.trends && data.trends.length > 0
		? data.trends.reduce((sum, trend) => sum + trend.savings, 0) / data.trends.length
		: 0;

	$: currentMonthSpending = data.budgetSummary?.totalActual || 0;
	$: currentMonthSavings = data.budgetSummary ? data.budgetSummary.salary - data.budgetSummary.totalActual : 0;
	$: budgetUsedPercent = data.budgetSummary ? (data.budgetSummary.totalActual / data.budgetSummary.salary) * 100 : 0;

	$: spendingTrend = currentMonthSpending > averageSpending ? 'up' : 'down';
	$: savingsTrend = currentMonthSavings > averageSavings ? 'up' : 'down';

	$: topSpendingCategories = data.categoryBreakdown
		?.filter(item => item.actual > 0)
		.sort((a, b) => b.actual - a.actual)
		.slice(0, 5) || [];
</script>

<svelte:head>
	<title>Analytics - Budget Tracker</title>
</svelte:head>

<div class="analytics-page">
	<!-- Header -->
	<div class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<BarChart3 />
			</div>
			<div>
				<h1>Analytics & Insights</h1>
				<p>Analyze your spending patterns and financial trends</p>
			</div>
		</div>
	</div>

	{#if data.error}
		<div class="error-banner">
			<div class="error-icon">
				<AlertCircle />
			</div>
			<div>
				<h3>Unable to Load Analytics</h3>
				<p>{data.error}</p>
			</div>
		</div>
	{:else}
		<!-- Stats Grid -->
		<div class="stats-grid">
			<div class="stat-card">
				<div class="stat-icon spent">
					<DollarSign />
				</div>
				<div class="stat-content">
					<span class="stat-label">This Month Spending</span>
					<span class="stat-value">{formatCurrency(currentMonthSpending)}</span>
					<div class="stat-trend" class:up={spendingTrend === 'up'} class:down={spendingTrend === 'down'}>
						{#if spendingTrend === 'up'}
							<ArrowUp class="w-3 h-3" />
							<span>+{formatCurrency(Math.abs(currentMonthSpending - averageSpending))} vs avg</span>
						{:else}
							<ArrowDown class="w-3 h-3" />
							<span>{formatCurrency(Math.abs(currentMonthSpending - averageSpending))} below avg</span>
						{/if}
					</div>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon savings">
					<PiggyBank />
				</div>
				<div class="stat-content">
					<span class="stat-label">This Month Savings</span>
					<span class="stat-value success">{formatCurrency(currentMonthSavings)}</span>
					<div class="stat-trend" class:up={savingsTrend === 'up'} class:down={savingsTrend === 'down'}>
						{#if savingsTrend === 'up'}
							<ArrowUp class="w-3 h-3" />
							<span>+{formatCurrency(Math.abs(currentMonthSavings - averageSavings))} vs avg</span>
						{:else}
							<ArrowDown class="w-3 h-3" />
							<span>{formatCurrency(Math.abs(currentMonthSavings - averageSavings))} below avg</span>
						{/if}
					</div>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon total">
					<Target />
				</div>
				<div class="stat-content">
					<span class="stat-label">Total Accumulated</span>
					<span class="stat-value">{formatCurrency(data.totalAccumulatedSavings || 0)}</span>
					<span class="stat-sub">All-time savings</span>
				</div>
			</div>

			<div class="stat-card">
				<div class="stat-icon budget">
					<PieChart />
				</div>
				<div class="stat-content">
					<span class="stat-label">Budget Used</span>
					<span class="stat-value" class:over={budgetUsedPercent > 90} class:warning={budgetUsedPercent > 75 && budgetUsedPercent <= 90}>
						{budgetUsedPercent.toFixed(0)}%
					</span>
					<span class="stat-sub">of monthly budget</span>
				</div>
			</div>
		</div>

		<!-- Charts Row -->
		<div class="charts-grid">
			<!-- Spending Distribution -->
			{#if categoryChartData}
				<div class="chart-card">
					<div class="chart-header">
						<h2>Spending Distribution</h2>
						<p>Where your money goes this month</p>
					</div>
					<div class="chart-container">
						<Chart type="doughnut" data={categoryChartData} height={280} />
					</div>
					<div class="category-list">
						{#each (data.categoryBreakdown || []).slice(0, 5) as cat}
							<div class="category-item">
								<div class="category-color" style="background-color: {cat.category_color}"></div>
								<span class="category-name">{cat.category_name}</span>
								<span class="category-value">{formatCurrency(cat.actual)}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Budget vs Actual -->
			{#if comparisonChartData}
				<div class="chart-card">
					<div class="chart-header">
						<h2>Budget vs Actual</h2>
						<p>Planned vs real spending by category</p>
					</div>
					<div class="chart-container">
						<Chart
							type="bar"
							data={comparisonChartData}
							height={280}
							options={{
								responsive: true,
								plugins: {
									legend: {
										position: 'top'
									}
								},
								scales: {
									x: {
										beginAtZero: true,
										grid: {
											display: false
										}
									},
									y: {
										beginAtZero: true,
										ticks: {
											callback: function(value: number) {
												return '$' + value.toLocaleString();
											}
										}
									}
								}
							}}
						/>
					</div>
				</div>
			{/if}
		</div>

		<!-- Monthly Trends -->
		{#if trendsChartData}
			<div class="trends-card">
				<div class="chart-header">
					<h2>Monthly Trends</h2>
					<p>Income, expenses, and savings over time</p>
				</div>
				<div class="trends-chart">
					<Chart
						type="line"
						data={trendsChartData}
						height={320}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: 'top'
								}
							},
							scales: {
								x: {
									beginAtZero: true,
									grid: {
										display: false
									}
								},
								y: {
									beginAtZero: true,
									ticks: {
										callback: function(value: number) {
											return '$' + value.toLocaleString();
										}
									}
								}
							}
						}}
					/>
				</div>
			</div>
		{/if}

		<!-- Top Categories & Insights -->
		<div class="bottom-grid">
			<!-- Top Spending Categories -->
			{#if topSpendingCategories.length > 0}
				<div class="categories-card">
					<div class="chart-header">
						<h2>Top Spending Categories</h2>
						<p>Your biggest expenses this month</p>
					</div>
					<div class="categories-list">
						{#each topSpendingCategories as category, index}
							{@const percent = (category.actual / currentMonthSpending) * 100}
							{@const diff = category.actual - category.planned}
							<div class="category-row">
								<div class="rank">#{index + 1}</div>
								<div class="cat-info">
									<div class="cat-color" style="background-color: {category.category_color}"></div>
									<div>
										<span class="cat-name">{category.category_name}</span>
										<span class="cat-percent">{percent.toFixed(1)}% of total</span>
									</div>
								</div>
								<div class="cat-values">
									<span class="cat-amount">{formatCurrency(category.actual)}</span>
									{#if category.planned > 0}
										<span class="cat-diff" class:over={diff > 0} class:under={diff <= 0}>
											{diff > 0 ? '+' : ''}{formatCurrency(diff)} vs plan
										</span>
									{/if}
								</div>
							</div>
							<div class="cat-bar-track">
								<div
									class="cat-bar-fill"
									style="width: {percent}%; background-color: {category.category_color}"
								></div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Insights -->
			<div class="insights-card">
				<div class="chart-header">
					<h2>Insights & Recommendations</h2>
				</div>
				<div class="insights-list">
					{#if data.budgetSummary}
						{#if data.budgetSummary.remainingBudget < 0}
							<div class="insight-item danger">
								<div class="insight-icon">
									<AlertCircle />
								</div>
								<div class="insight-content">
									<h4>Over Budget</h4>
									<p>You're {formatCurrency(Math.abs(data.budgetSummary.remainingBudget))} over budget. Consider reducing spending in top categories.</p>
								</div>
							</div>
						{:else if data.budgetSummary.remainingBudget < data.budgetSummary.salary * 0.1}
							<div class="insight-item warning">
								<div class="insight-icon">
									<AlertCircle />
								</div>
								<div class="insight-content">
									<h4>Budget Alert</h4>
									<p>Only {formatCurrency(data.budgetSummary.remainingBudget)} left. Track expenses carefully.</p>
								</div>
							</div>
						{:else}
							<div class="insight-item success">
								<div class="insight-icon">
									<CheckCircle />
								</div>
								<div class="insight-content">
									<h4>On Track</h4>
									<p>You have {formatCurrency(data.budgetSummary.remainingBudget)} remaining. Great job!</p>
								</div>
							</div>
						{/if}
					{/if}

					{#if currentMonthSpending > averageSpending && averageSpending > 0}
						<div class="insight-item info">
							<div class="insight-icon">
								<TrendingUpIcon />
							</div>
							<div class="insight-content">
								<h4>Spending Spike</h4>
								<p>+{formatCurrency(currentMonthSpending - averageSpending)} vs your 6-month average.</p>
							</div>
						</div>
					{/if}

					{#if topSpendingCategories.length > 0 && topSpendingCategories[0].actual > currentMonthSpending * 0.4}
						<div class="insight-item info">
							<div class="insight-icon">
								<Target />
							</div>
							<div class="insight-content">
								<h4>High Concentration</h4>
								<p>{topSpendingCategories[0].category_name} is {((topSpendingCategories[0].actual / currentMonthSpending) * 100).toFixed(1)}% of spending. Consider diversifying.</p>
							</div>
						</div>
					{/if}

					<div class="insight-item savings">
						<div class="insight-icon">
							<PiggyBank />
						</div>
						<div class="insight-content">
							<h4>Accumulated Savings</h4>
							<p>You have <strong>{formatCurrency(data.totalAccumulatedSavings || 0)}</strong> total saved across all months. Use it for your savings goals!</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.analytics-page {
		padding: 1.5rem;
		max-width: 1400px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
		margin-bottom: 2rem;
	}

	.header-content {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.header-icon {
		width: 56px;
		height: 56px;
		background: #1f2937;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.header-icon :global(svg) {
		width: 28px;
		height: 28px;
	}

	.header-content h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0;
	}

	.header-content p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0.25rem 0 0 0;
	}

	/* Error Banner */
	.error-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 1rem;
	}

	.error-icon {
		width: 48px;
		height: 48px;
		background: #fee2e2;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #dc2626;
	}

	.error-banner h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #991b1b;
		margin: 0;
	}

	.error-banner p {
		font-size: 0.875rem;
		color: #dc2626;
		margin: 0.25rem 0 0 0;
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

	.stat-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.stat-icon.spent {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-icon.savings {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-icon.total {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-icon.budget {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.stat-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1.375rem;
		font-weight: 700;
		color: #1f2937;
	}

	.stat-value.success {
		color: #059669;
	}

	.stat-value.over {
		color: #dc2626;
	}

	.stat-value.warning {
		color: #d97706;
	}

	.stat-trend {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.6875rem;
		font-weight: 500;
	}

	.stat-trend.up {
		color: #dc2626;
	}

	.stat-trend.down {
		color: #059669;
	}

	.stat-sub {
		font-size: 0.6875rem;
		color: #9ca3af;
	}

	/* Charts Grid */
	.charts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.chart-card,
	.trends-card,
	.categories-card,
	.insights-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
	}

	.chart-header {
		margin-bottom: 1.25rem;
	}

	.chart-header h2 {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.chart-header p {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0.25rem 0 0 0;
	}

	.chart-container {
		display: flex;
		justify-content: center;
	}

	/* Category List */
	.category-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 1rem;
	}

	.category-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.category-color {
		width: 12px;
		height: 12px;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.category-name {
		flex: 1;
		font-size: 0.875rem;
		color: #374151;
	}

	.category-value {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
	}

	/* Trends Card */
	.trends-card {
		margin-bottom: 1.5rem;
	}

	.trends-chart {
		margin-top: 1rem;
	}

	/* Bottom Grid */
	.bottom-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	/* Categories Card */
	.categories-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.category-row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.rank {
		font-size: 0.75rem;
		font-weight: 700;
		color: #9ca3af;
		width: 24px;
	}

	.cat-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		flex: 1;
		min-width: 0;
	}

	.cat-color {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.cat-info > div {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.cat-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
	}

	.cat-percent {
		font-size: 0.6875rem;
		color: #9ca3af;
	}

	.cat-values {
		text-align: right;
	}

	.cat-amount {
		font-size: 0.875rem;
		font-weight: 700;
		color: #1f2937;
		display: block;
	}

	.cat-diff {
		font-size: 0.6875rem;
	}

	.cat-diff.over {
		color: #dc2626;
	}

	.cat-diff.under {
		color: #059669;
	}

	.cat-bar-track {
		height: 6px;
		background: #f3f4f6;
		border-radius: 9999px;
		overflow: hidden;
		margin-top: 0.25rem;
	}

	.cat-bar-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.3s ease;
	}

	/* Insights Card */
	.insights-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.insight-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		border-radius: 0.75rem;
	}

	.insight-item.danger {
		background: #fef2f2;
		border: 1px solid #fecaca;
	}

	.insight-item.warning {
		background: #fef3c7;
		border: 1px solid #fde68a;
	}

	.insight-item.success {
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
	}

	.insight-item.info {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
	}

	.insight-item.savings {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
	}

	.insight-icon {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.insight-item.danger .insight-icon {
		background: #fee2e2;
		color: #dc2626;
	}

	.insight-item.warning .insight-icon {
		background: #fef3c7;
		color: #d97706;
	}

	.insight-item.success .insight-icon {
		background: #d1fae5;
		color: #059669;
	}

	.insight-item.info .insight-icon {
		background: #f3f4f6;
		color: #1f2937;
	}

	.insight-item.savings .insight-icon {
		background: #f3f4f6;
		color: #1f2937;
	}

	.insight-icon :global(svg) {
		width: 18px;
		height: 18px;
	}

	.insight-content h4 {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.insight-item.danger .insight-content h4 {
		color: #991b1b;
	}

	.insight-item.warning .insight-content h4 {
		color: #92400e;
	}

	.insight-item.success .insight-content h4 {
		color: #166534;
	}

	.insight-item.info .insight-content h4 {
		color: #1f2937;
	}

	.insight-item.savings .insight-content h4 {
		color: #1f2937;
	}

	.insight-content p {
		font-size: 0.8125rem;
		color: #374151;
		margin: 0.25rem 0 0 0;
		line-height: 1.5;
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 1024px) {
		.charts-grid,
		.bottom-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.analytics-page {
			padding: 1rem;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
