<script lang="ts">
	import { formatCurrency, formatDate, getMonthName, getDaysUntilPayday, isPayday } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import BudgetStatus from '$lib/components/BudgetStatus.svelte';
	import Chart from '$lib/components/Chart.svelte';
	import { TrendingUp, TrendingDown, Calendar, Target, Plus } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	$: hasBudget = !!data.budget;
	$: daysUntilPayday = getDaysUntilPayday();
	$: isCurrentPayday = isPayday();

	$: categoryChartData = data.categoryBreakdown?.length > 0 ? {
		labels: data.categoryBreakdown.map(item => item.category_name),
		datasets: [{
			data: data.categoryBreakdown.map(item => item.actual),
			backgroundColor: data.categoryBreakdown.map(item => item.category_color),
			borderWidth: 2,
			borderColor: '#ffffff'
		}]
	} : null;

	$: summaryStats = data.budgetSummary ? [
		{
			title: 'Monthly Income',
			value: formatCurrency(data.budgetSummary.salary),
			icon: TrendingUp,
			color: 'text-success-600'
		},
		{
			title: 'Total Spent',
			value: formatCurrency(data.budgetSummary.totalActual),
			icon: TrendingDown,
			color: 'text-danger-600'
		},
		{
			title: 'This Month Remaining',
			value: formatCurrency(data.budgetSummary.remainingBudget),
			icon: Target,
			color: data.budgetSummary.remainingBudget > 0 ? 'text-success-600' : 'text-danger-600'
		}
	] : [];

	$: accumulatedSavingsStat = {
		title: 'Total Accumulated Savings',
		value: formatCurrency(data.totalAccumulatedSavings || 0),
		icon: Target,
		color: 'text-blue-600'
	};
</script>

<svelte:head>
	<title>Dashboard - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">
				Dashboard - {getMonthName(data.currentMonth)} {data.currentYear}
			</h1>
			<p class="text-gray-500 mt-1">
				{#if isCurrentPayday}
					It's payday! Time to track your expenses.
				{:else}
					{daysUntilPayday} days until payday ({getMonthName(data.currentMonth)} 25th)
				{/if}
			</p>
		</div>
		
		{#if !hasBudget}
			<Button href="/budget">
				<Plus class="w-4 h-4 mr-2" />
				Create Budget
			</Button>
		{/if}
	</div>

	{#if data.error}
		<Card title="Error">
			<p class="text-danger-600">{data.error}</p>
		</Card>
	{:else if !hasBudget}
		<div class="text-center py-12">
			<Calendar class="w-16 h-16 mx-auto text-gray-400 mb-4" />
			<h3 class="text-lg font-medium text-gray-900 mb-2">No Budget Set Up</h3>
			<p class="text-gray-500 mb-6">Create your monthly budget to start tracking your finances.</p>
			<Button href="/budget">Set Up Budget</Button>
		</div>
	{:else}
		<!-- Summary Cards -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each summaryStats as stat}
				<Card>
					<div class="flex items-center">
						<div class="flex-shrink-0">
							<div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
								<svelte:component this={stat.icon} class="w-5 h-5 {stat.color}" />
							</div>
						</div>
						<div class="ml-4">
							<p class="text-sm font-medium text-gray-500">{stat.title}</p>
							<p class="text-2xl font-bold {stat.color}">{stat.value}</p>
						</div>
					</div>
				</Card>
			{/each}
			
			<!-- Accumulated Savings Card -->
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
						<p class="text-sm font-medium text-gray-500">{accumulatedSavingsStat.title}</p>
						<p class="text-2xl font-bold {accumulatedSavingsStat.color}">{accumulatedSavingsStat.value}</p>
						<p class="text-xs text-gray-500 mt-1">All-time budget surplus</p>
					</div>
				</div>
			</Card>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Budget Status -->
			{#if data.budgetSummary}
				<BudgetStatus 
					remaining={data.budgetSummary.remainingBudget}
					total={data.budgetSummary.salary}
				/>
			{/if}

			<!-- Spending by Category Chart -->
			{#if categoryChartData}
				<Card title="Spending by Category">
					<Chart type="doughnut" data={categoryChartData} height={250} />
				</Card>
			{/if}
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Recent Expenses -->
			<Card title="Recent Expenses" subtitle="Last 5 transactions">
				{#if data.recentExpenses?.length > 0}
					<div class="space-y-3">
						{#each data.recentExpenses as expense}
							<div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div>
									<p class="font-medium text-gray-900">{expense.category_name}</p>
									<p class="text-sm text-gray-500">
										{expense.description || 'No description'} • {formatDate(expense.expense_date)}
									</p>
								</div>
								<p class="font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
							</div>
						{/each}
					</div>
					<div class="mt-4">
						<Button href="/expenses" variant="secondary" size="sm">View All Expenses</Button>
					</div>
				{:else}
					<p class="text-gray-500 text-center py-6">No expenses recorded yet.</p>
				{/if}
			</Card>

			<!-- Savings Goals -->
			<Card title="Savings Goals">
				{#if data.savingsGoals?.length > 0}
					<div class="space-y-4">
						{#each data.savingsGoals as goal}
							<div class="p-4 border border-gray-200 rounded-lg">
								<div class="flex items-center justify-between mb-2">
									<h4 class="font-medium text-gray-900">{goal.title}</h4>
									<span class="text-sm text-gray-500">
										{formatCurrency(goal.actualProgress || 0)} / {formatCurrency(goal.target_amount)}
									</span>
								</div>
								<div class="w-full bg-gray-200 rounded-full h-2">
									<div 
										class="bg-primary-600 h-2 rounded-full transition-all duration-300"
										style="width: {Math.min(100, goal.progressPercentage || 0)}%"
									></div>
								</div>
								<p class="text-xs text-gray-500 mt-1">
									{(goal.progressPercentage || 0).toFixed(1)}% complete
									{#if goal.deadline} • Due {formatDate(goal.deadline)}{/if}
								</p>
								{#if goal.progressPercentage >= 100}
									<p class="text-xs text-green-600 mt-1 font-medium">🎉 Goal achieved!</p>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-gray-500 text-center py-6">No savings goals set.</p>
				{/if}
			</Card>
		</div>
	{/if}
</div>