<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { formatCurrency, formatDate, getMonthName } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import ExpenseForm from '$lib/components/ExpenseForm.svelte';
	import BudgetStatus from '$lib/components/BudgetStatus.svelte';
	import { Calendar, Edit, Trash2, Save, Receipt } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	let editingExpense: any = null;
	let loading = false;

	$: categoryOptions = data.categories?.map(cat => ({
		value: cat.id.toString(),
		label: cat.name
	})) || [];

	async function addExpense(event: CustomEvent) {
		if (!data.budget) return;

		loading = true;
		try {
			const response = await fetch('/api/actual-expenses', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					budgetId: data.budget.id,
					...event.detail
				})
			});

			if (response.ok) {
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	async function updateExpense() {
		if (!editingExpense) return;

		loading = true;
		try {
			const response = await fetch('/api/actual-expenses', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editingExpense)
			});

			if (response.ok) {
				editingExpense = null;
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	async function deleteExpense(id: number) {
		if (!confirm('Are you sure you want to delete this expense?')) return;

		loading = true;
		try {
			const response = await fetch('/api/actual-expenses', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});

			if (response.ok) {
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	function startEditing(expense: any) {
		editingExpense = { ...expense };
	}

	function cancelEditing() {
		editingExpense = null;
	}

	function groupExpensesByDate(expenses: any[]) {
		const grouped: { [key: string]: any[] } = {};
		
		expenses.forEach(expense => {
			const date = expense.expense_date;
			if (!grouped[date]) {
				grouped[date] = [];
			}
			grouped[date].push(expense);
		});
		
		return Object.entries(grouped)
			.sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
			.map(([date, expenses]) => ({ date, expenses }));
	}

	$: groupedExpenses = data.actualExpenses ? groupExpensesByDate(data.actualExpenses) : [];
</script>

<svelte:head>
	<title>Expenses - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">
			Expenses - {getMonthName(data.currentMonth || 1)} {data.currentYear}
		</h1>
		<p class="text-gray-500 mt-1">Track your daily expenses and monitor your spending</p>
	</div>

	{#if data.error}
		<Card title="Error">
			<p class="text-danger-600">{data.error}</p>
		</Card>
	{:else if !data.budget}
		<div class="text-center py-12">
			<Calendar class="w-16 h-16 mx-auto text-gray-400 mb-4" />
			<h3 class="text-lg font-medium text-gray-900 mb-2">No Budget Found</h3>
			<p class="text-gray-500 mb-6">You need to set up a budget before you can track expenses.</p>
			<Button href="/budget">Set Up Budget</Button>
		</div>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Add New Expense -->
			<Card title="Add New Expense">
				<ExpenseForm
					categories={data.categories}
					{loading}
					on:submit={addExpense}
				/>
			</Card>

			<!-- Budget Status -->
			{#if data.budgetSummary}
				<BudgetStatus 
					remaining={data.budgetSummary.remainingBudget}
					total={data.budgetSummary.salary}
				/>
			{/if}
		</div>

		<!-- Expenses List -->
		<Card title="Your Expenses" subtitle="All recorded expenses for this month">
			{#if data.actualExpenses?.length > 0}
				<div class="space-y-6">
					{#each groupedExpenses as group}
						<div>
							<h4 class="text-sm font-medium text-gray-500 mb-3 flex items-center">
								<Calendar class="w-4 h-4 mr-2" />
								{formatDate(group.date)}
							</h4>
							
							<div class="space-y-3 ml-6">
								{#each group.expenses as expense}
									<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
										{#if editingExpense && editingExpense.id === expense.id}
											<div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
												<Select
													bind:value={editingExpense.category_id}
													options={categoryOptions}
													required
												/>
												<Input
													type="number"
													step="0.01"
													bind:value={editingExpense.amount}
													required
												/>
												<Input
													type="date"
													bind:value={editingExpense.expense_date}
													required
												/>
												<Input
													bind:value={editingExpense.description}
													placeholder="Description"
												/>
											</div>
											<div class="ml-4 flex space-x-2">
												<Button size="sm" on:click={updateExpense} {loading}>
													<Save class="w-4 h-4" />
												</Button>
												<Button size="sm" variant="secondary" on:click={cancelEditing}>
													Cancel
												</Button>
											</div>
										{:else}
											<div class="flex-1 flex items-center space-x-4">
												<div 
													class="w-3 h-3 rounded-full flex-shrink-0"
													style="background-color: {expense.category_color}"
												></div>
												<div class="flex-1 min-w-0">
													<p class="font-medium text-gray-900">{expense.category_name}</p>
													<p class="text-sm text-gray-500 truncate">
														{expense.description || 'No description'}
													</p>
												</div>
												{#if expense.receipt_path}
													<Receipt class="w-4 h-4 text-gray-400" />
												{/if}
											</div>
											<div class="flex items-center space-x-4">
												<span class="font-semibold text-gray-900">{formatCurrency(expense.amount)}</span>
												<div class="flex space-x-2">
													<Button size="sm" variant="secondary" on:click={() => startEditing(expense)}>
														<Edit class="w-4 h-4" />
													</Button>
													<Button size="sm" variant="danger" on:click={() => deleteExpense(expense.id)}>
														<Trash2 class="w-4 h-4" />
													</Button>
												</div>
											</div>
										{/if}
									</div>
								{/each}
								
								<!-- Daily total -->
								<div class="ml-4 pt-2 border-t border-gray-200">
									<div class="flex justify-between text-sm">
										<span class="text-gray-500">Daily total:</span>
										<span class="font-semibold text-gray-900">
											{formatCurrency(group.expenses.reduce((sum, exp) => sum + exp.amount, 0))}
										</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Monthly Summary -->
				{#if data.budgetSummary}
					<div class="mt-6 pt-6 border-t border-gray-200">
						<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
							<div class="text-center">
								<p class="text-sm text-gray-500">Total Spent</p>
								<p class="text-2xl font-bold text-gray-900">{formatCurrency(data.budgetSummary.totalActual)}</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-500">Budget Remaining</p>
								<p class="text-2xl font-bold {data.budgetSummary.remainingBudget >= 0 ? 'text-success-600' : 'text-danger-600'}">
									{formatCurrency(data.budgetSummary.remainingBudget)}
								</p>
							</div>
							<div class="text-center">
								<p class="text-sm text-gray-500">Total Expenses</p>
								<p class="text-2xl font-bold text-gray-900">{data.actualExpenses.length}</p>
							</div>
						</div>
					</div>
				{/if}
			{:else}
				<div class="text-center py-12">
					<Receipt class="w-16 h-16 mx-auto text-gray-400 mb-4" />
					<h3 class="text-lg font-medium text-gray-900 mb-2">No Expenses Yet</h3>
					<p class="text-gray-500">Start tracking your expenses by adding your first expense above.</p>
				</div>
			{/if}
		</Card>
	{/if}
</div>