<script lang="ts">
	import { formatCurrency, getMonthName } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import { BarChart3, TrendingUp, TrendingDown, PieChart } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	$: categoryChartData = data.categoryBreakdown?.length > 0 ? {
		labels: data.categoryBreakdown.map(item => item.category_name),
		datasets: [{
			label: 'Actual Spending',
			data: data.categoryBreakdown.map(item => item.actual),
			backgroundColor: data.categoryBreakdown.map(item => item.category_color),
			borderWidth: 2,
			borderColor: '#ffffff'
		}]
	} : null;

	$: comparisonChartData = data.categoryBreakdown?.length > 0 ? {
		labels: data.categoryBreakdown.map(item => item.category_name),
		datasets: [
			{
				label: 'Planned',
				data: data.categoryBreakdown.map(item => item.planned),
				backgroundColor: 'rgba(59, 130, 246, 0.8)',
				borderColor: 'rgb(59, 130, 246)',
				borderWidth: 1
			},
			{
				label: 'Actual',
				data: data.categoryBreakdown.map(item => item.actual),
				backgroundColor: 'rgba(16, 185, 129, 0.8)',
				borderColor: 'rgb(16, 185, 129)',
				borderWidth: 1
			}
		]
	} : null;

	$: trendsChartData = data.trends?.length > 0 ? {
		labels: data.trends.map(item => `${getMonthName(item.month)} ${item.year}`),
		datasets: [
			{
				label: 'Income',
				data: data.trends.map(item => item.income),
				borderColor: 'rgb(34, 197, 94)',
				backgroundColor: 'rgba(34, 197, 94, 0.1)',
				fill: true,
				tension: 0.4
			},
			{
				label: 'Expenses',
				data: data.trends.map(item => item.expenses),
				borderColor: 'rgb(239, 68, 68)',
				backgroundColor: 'rgba(239, 68, 68, 0.1)',
				fill: true,
				tension: 0.4
			},
			{
				label: 'Savings',
				data: data.trends.map(item => item.savings),
				borderColor: 'rgb(59, 130, 246)',
				backgroundColor: 'rgba(59, 130, 246, 0.1)',
				fill: true,
				tension: 0.4
			}
		]
	} : null;

	$: averageSpending = data.trends?.length > 0 
		? data.trends.reduce((sum, trend) => sum + trend.expenses, 0) / data.trends.length 
		: 0;

	$: averageSavings = data.trends?.length > 0 
		? data.trends.reduce((sum, trend) => sum + trend.savings, 0) / data.trends.length 
		: 0;

	$: currentMonthSpending = data.budgetSummary?.totalActual || 0;
	$: currentMonthSavings = data.budgetSummary ? data.budgetSummary.salary - data.budgetSummary.totalActual : 0;

	$: spendingTrend = currentMonthSpending > averageSpending ? 'up' : 'down';
	$: savingsTrend = currentMonthSavings > averageSavings ? 'up' : 'down';

	$: topSpendingCategories = data.categoryBreakdown
		?.filter(item => item.actual > 0)
		.sort((a, b) => b.actual - a.actual)
		.slice(0, 3) || [];
</script>

<svelte:head>
	<title>Analytics - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
		<p class="text-gray-500 mt-1">Analyze your spending patterns and financial trends</p>
	</div>

	{#if data.error}
		<Card title="Error">
			<p class="text-danger-600">{data.error}</p>
		</Card>
	{:else}
		<!-- Key Metrics -->
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			<Card>
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
							<BarChart3 class="w-5 h-5 text-primary-600" />
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">This Month</p>
						<p class="text-2xl font-bold text-gray-900">{formatCurrency(currentMonthSpending)}</p>
						<p class="text-xs flex items-center {spendingTrend === 'up' ? 'text-danger-600' : 'text-success-600'}">
							<svelte:component 
								this={spendingTrend === 'up' ? TrendingUp : TrendingDown} 
								class="w-3 h-3 mr-1" 
							/>
							vs {formatCurrency(averageSpending)} avg
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-success-100 rounded-lg flex items-center justify-center">
							<TrendingUp class="w-5 h-5 text-success-600" />
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">This Month Savings</p>
						<p class="text-2xl font-bold text-gray-900">{formatCurrency(currentMonthSavings)}</p>
						<p class="text-xs flex items-center {savingsTrend === 'up' ? 'text-success-600' : 'text-danger-600'}">
							<svelte:component 
								this={savingsTrend === 'up' ? TrendingUp : TrendingDown} 
								class="w-3 h-3 mr-1" 
							/>
							vs {formatCurrency(averageSavings)} avg
						</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
							<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
							</svg>
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Total Accumulated</p>
						<p class="text-2xl font-bold text-gray-900">{formatCurrency(data.totalAccumulatedSavings || 0)}</p>
						<p class="text-xs text-gray-500">All-time savings</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center">
							<PieChart class="w-5 h-5 text-warning-600" />
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Categories</p>
						<p class="text-2xl font-bold text-gray-900">{data.categoryBreakdown?.length || 0}</p>
						<p class="text-xs text-gray-500">with spending</p>
					</div>
				</div>
			</Card>

			<Card>
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<div class="w-8 h-8 bg-danger-100 rounded-lg flex items-center justify-center">
							<TrendingDown class="w-5 h-5 text-danger-600" />
						</div>
					</div>
					<div class="ml-4">
						<p class="text-sm font-medium text-gray-500">Budget Used</p>
						<p class="text-2xl font-bold text-gray-900">
							{data.budgetSummary ? Math.round((data.budgetSummary.totalActual / data.budgetSummary.salary) * 100) : 0}%
						</p>
						<p class="text-xs text-gray-500">of monthly budget</p>
					</div>
				</div>
			</Card>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Spending by Category (Doughnut) -->
			{#if categoryChartData}
				<Card title="Spending Distribution" subtitle="Current month breakdown">
					<Chart type="doughnut" data={categoryChartData} height={300} />
				</Card>
			{/if}

			<!-- Plan vs Actual Comparison -->
			{#if comparisonChartData}
				<Card title="Budget vs Actual" subtitle="Planned vs actual spending by category">
					<Chart 
						type="bar" 
						data={comparisonChartData} 
						height={300}
						options={{
							responsive: true,
							plugins: {
								legend: {
									position: 'top'
								}
							},
							scales: {
								x: {
									beginAtZero: true
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
				</Card>
			{/if}
		</div>

		<!-- Monthly Trends -->
		{#if trendsChartData}
			<Card title="Monthly Trends" subtitle="Income, expenses, and savings over time">
				<Chart 
					type="line" 
					data={trendsChartData} 
					height={350}
					options={{
						responsive: true,
						plugins: {
							legend: {
								position: 'top'
							}
						},
						scales: {
							x: {
								beginAtZero: true
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
			</Card>
		{/if}

		<!-- Top Spending Categories -->
		{#if topSpendingCategories.length > 0}
			<Card title="Top Spending Categories" subtitle="Your biggest expense categories this month">
				<div class="space-y-4">
					{#each topSpendingCategories as category, index}
						<div class="flex items-center justify-between">
							<div class="flex items-center space-x-3">
								<div class="text-lg font-bold text-gray-400">#{index + 1}</div>
								<div 
									class="w-4 h-4 rounded-full"
									style="background-color: {category.category_color}"
								></div>
								<div>
									<p class="font-medium text-gray-900">{category.category_name}</p>
									<p class="text-sm text-gray-500">
										{((category.actual / currentMonthSpending) * 100).toFixed(1)}% of total spending
									</p>
								</div>
							</div>
							<div class="text-right">
								<p class="font-bold text-gray-900">{formatCurrency(category.actual)}</p>
								{#if category.planned > 0}
									<p class="text-xs {category.actual > category.planned ? 'text-danger-600' : 'text-success-600'}">
										{category.actual > category.planned ? 'Over' : 'Under'} budget by {formatCurrency(Math.abs(category.actual - category.planned))}
									</p>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</Card>
		{/if}

		<!-- Insights -->
		<Card title="Insights & Recommendations">
			<div class="space-y-4">
				{#if data.budgetSummary}
					{#if data.budgetSummary.remainingBudget < 0}
						<div class="p-4 bg-danger-50 border border-danger-200 rounded-lg">
							<p class="text-danger-800 font-medium">⚠️ You're over budget by {formatCurrency(Math.abs(data.budgetSummary.remainingBudget))}</p>
							<p class="text-danger-700 text-sm mt-1">Consider reducing spending in your top categories or adjusting your budget.</p>
						</div>
					{:else if data.budgetSummary.remainingBudget < data.budgetSummary.salary * 0.1}
						<div class="p-4 bg-warning-50 border border-warning-200 rounded-lg">
							<p class="text-warning-800 font-medium">💡 You're close to your budget limit</p>
							<p class="text-warning-700 text-sm mt-1">You have {formatCurrency(data.budgetSummary.remainingBudget)} remaining. Consider tracking expenses more carefully.</p>
						</div>
					{:else}
						<div class="p-4 bg-success-50 border border-success-200 rounded-lg">
							<p class="text-success-800 font-medium">✅ You're doing well with your budget!</p>
							<p class="text-success-700 text-sm mt-1">You have {formatCurrency(data.budgetSummary.remainingBudget)} remaining this month.</p>
						</div>
					{/if}
				{/if}

				{#if currentMonthSpending > averageSpending && averageSpending > 0}
					<div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
						<p class="text-blue-800 font-medium">📈 Higher spending this month</p>
						<p class="text-blue-700 text-sm mt-1">You're spending {formatCurrency(currentMonthSpending - averageSpending)} more than your 6-month average.</p>
					</div>
				{/if}

				{#if topSpendingCategories.length > 0 && topSpendingCategories[0].actual > currentMonthSpending * 0.4}
					<div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
						<p class="text-purple-800 font-medium">🎯 Consider diversifying expenses</p>
						<p class="text-purple-700 text-sm mt-1">{topSpendingCategories[0].category_name} represents {((topSpendingCategories[0].actual / currentMonthSpending) * 100).toFixed(1)}% of your spending. Consider if this balance is right for your goals.</p>
					</div>
				{/if}

				<div class="p-4 bg-green-50 border border-green-200 rounded-lg">
					<p class="text-green-800 font-medium">💰 Your Accumulated Savings</p>
					<div class="text-green-700 text-sm mt-1">
						<p>You have <strong>{formatCurrency(data.totalAccumulatedSavings || 0)}</strong> in total accumulated savings from all your budget surpluses.</p>
						<p class="text-xs mt-1">This represents all the money you've saved by staying under budget across all months. You can use this for your savings goals!</p>
					</div>
				</div>

				{#if data.savingsGoals && data.savingsGoals.length > 0}
					{#each data.savingsGoals.filter(goal => goal.recommendation) as goal}
						{#if goal.recommendation}
							<div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
								<p class="text-indigo-800 font-medium">💰 Savings Goal: {goal.title}</p>
								<div class="text-indigo-700 text-sm mt-1 space-y-1">
									<p>Target: {formatCurrency(goal.target_amount)} by {new Date(goal.deadline).toLocaleDateString()}</p>
									<p>Progress: {formatCurrency(goal.actualProgress || 0)} / {formatCurrency(goal.target_amount)} ({(goal.progressPercentage || 0).toFixed(1)}%)</p>
									<p>
										{#if goal.recommendation.monthsRemaining > 0}
											<strong>
												{#if goal.recommendation.isAchievable}
													✅ You need to save {formatCurrency(goal.recommendation.monthlyTarget)} monthly to reach this goal
												{:else}
													⚠️ You need to save {formatCurrency(goal.recommendation.monthlyTarget)} monthly, but your current monthly savings is only {formatCurrency(goal.recommendation.currentMonthlySavings)}
												{/if}
											</strong>
											{#if !goal.recommendation.isAchievable}
												<br><span class="text-xs">Consider extending the deadline or reducing other expenses by {formatCurrency(goal.recommendation.monthlyTarget - goal.recommendation.currentMonthlySavings)} monthly</span>
											{/if}
										{:else}
											<strong class="text-red-600">⚠️ This goal's deadline has passed or is due this month</strong>
										{/if}
									</p>
									{#if goal.progressPercentage >= 100}
										<p class="text-xs border-t pt-2 mt-2 text-green-600 font-medium">
											🎉 <strong>Goal achieved!</strong> Your accumulated savings cover this target.
										</p>
									{/if}
								</div>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</Card>
	{/if}
</div>