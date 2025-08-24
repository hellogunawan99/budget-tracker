<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { formatCurrency, getMonthName } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Select from '$lib/components/Select.svelte';
	import BudgetStatus from '$lib/components/BudgetStatus.svelte';
	import { Plus, Edit, Trash2, Save } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	let budgetForm = {
		salary: data.budget?.salary || ''
	};

	let expenseForm = {
		categoryId: '',
		amount: '',
		description: ''
	};

	let editingExpense: any = null;
	let loading = false;

	$: categoryOptions = data.categories?.map(cat => ({
		value: cat.id.toString(),
		label: cat.name
	})) || [];

	async function createOrUpdateBudget() {
		if (!budgetForm.salary) return;

		loading = true;
		try {
			const response = await fetch('/api/budget', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					month: data.currentMonth,
					year: data.currentYear,
					salary: parseFloat(budgetForm.salary.toString())
				})
			});

			if (response.ok) {
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	async function addPlannedExpense() {
		if (!expenseForm.categoryId || !expenseForm.amount || !data.budget) return;

		loading = true;
		try {
			const response = await fetch('/api/planned-expenses', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					budgetId: data.budget.id,
					categoryId: parseInt(expenseForm.categoryId),
					amount: parseFloat(expenseForm.amount),
					description: expenseForm.description
				})
			});

			if (response.ok) {
				expenseForm = { categoryId: '', amount: '', description: '' };
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	async function updatePlannedExpense() {
		if (!editingExpense) return;

		loading = true;
		try {
			const response = await fetch('/api/planned-expenses', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					id: editingExpense.id,
					categoryId: editingExpense.category_id,
					amount: parseFloat(editingExpense.amount),
					description: editingExpense.description
				})
			});

			if (response.ok) {
				editingExpense = null;
				await invalidateAll();
			}
		} finally {
			loading = false;
		}
	}

	async function deletePlannedExpense(id: number) {
		if (!confirm('Are you sure you want to delete this planned expense?')) return;

		loading = true;
		try {
			const response = await fetch('/api/planned-expenses', {
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
</script>

<svelte:head>
	<title>Budget Planning - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">
			Budget Planning - {getMonthName(data.currentMonth || 1)} {data.currentYear}
		</h1>
		<p class="text-gray-500 mt-1">Set up your monthly income and planned expenses</p>
	</div>

	{#if data.error}
		<Card title="Error">
			<p class="text-danger-600">{data.error}</p>
		</Card>
	{:else}
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Budget Setup -->
			<Card title="Monthly Income">
				<form on:submit|preventDefault={createOrUpdateBudget} class="space-y-4">
					<Input
						label="Monthly Salary"
						type="number"
						step="0.01"
						min="0"
						bind:value={budgetForm.salary}
						placeholder="Enter your monthly income"
						required
					/>
					
					<Button type="submit" {loading}>
						{data.budget ? 'Update' : 'Create'} Budget
					</Button>
				</form>
			</Card>

			<!-- Budget Status -->
			{#if data.budgetSummary}
				<BudgetStatus 
					remaining={data.budgetSummary.plannedRemaining}
					total={data.budgetSummary.salary}
					title="Planned Budget Status"
				/>
			{/if}
		</div>

		{#if data.budget}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<!-- Add Planned Expense -->
				<Card title="Add Planned Expense">
					<form on:submit|preventDefault={addPlannedExpense} class="space-y-4">
						<Select
							label="Category"
							bind:value={expenseForm.categoryId}
							options={categoryOptions}
							required
							placeholder="Select a category"
						/>
						
						<Input
							label="Amount"
							type="number"
							step="0.01"
							min="0"
							bind:value={expenseForm.amount}
							placeholder="0.00"
							required
						/>
						
						<Input
							label="Description (Optional)"
							bind:value={expenseForm.description}
							placeholder="What is this expense for?"
						/>
						
						<Button type="submit" {loading}>
							<Plus class="w-4 h-4 mr-2" />
							Add Expense
						</Button>
					</form>
				</Card>

				<!-- Budget Summary -->
				<Card title="Budget Summary">
					{#if data.budgetSummary}
						<div class="space-y-4">
							<div class="flex justify-between">
								<span class="text-gray-600">Monthly Income:</span>
								<span class="font-semibold">{formatCurrency(data.budgetSummary.salary)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Planned Expenses:</span>
								<span class="font-semibold">{formatCurrency(data.budgetSummary.totalPlanned)}</span>
							</div>
							<hr>
							<div class="flex justify-between text-lg font-bold">
								<span>Remaining:</span>
								<span class="{data.budgetSummary.plannedRemaining >= 0 ? 'text-success-600' : 'text-danger-600'}">
									{formatCurrency(data.budgetSummary.plannedRemaining)}
								</span>
							</div>
						</div>
					{/if}
				</Card>
			</div>

			<!-- Planned Expenses List -->
			<Card title="Planned Expenses" subtitle="Your expected monthly expenses">
				{#if data.plannedExpenses?.length > 0}
					<div class="space-y-3">
						{#each data.plannedExpenses as expense}
							<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
								{#if editingExpense && editingExpense.id === expense.id}
									<div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
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
											bind:value={editingExpense.description}
											placeholder="Description"
										/>
									</div>
									<div class="ml-4 flex space-x-2">
										<Button size="sm" on:click={updatePlannedExpense} {loading}>
											<Save class="w-4 h-4" />
										</Button>
										<Button size="sm" variant="secondary" on:click={cancelEditing}>
											Cancel
										</Button>
									</div>
								{:else}
									<div class="flex-1">
										<div class="flex items-center space-x-3">
											<div 
												class="w-3 h-3 rounded-full"
												style="background-color: {expense.category_color}"
											></div>
											<div>
												<p class="font-medium text-gray-900">{expense.category_name}</p>
												<p class="text-sm text-gray-500">{expense.description || 'No description'}</p>
											</div>
										</div>
									</div>
									<div class="flex items-center space-x-4">
										<span class="font-semibold text-gray-900">{formatCurrency(expense.amount)}</span>
										<div class="flex space-x-2">
											<Button size="sm" variant="secondary" on:click={() => startEditing(expense)}>
												<Edit class="w-4 h-4" />
											</Button>
											<Button size="sm" variant="danger" on:click={() => deletePlannedExpense(expense.id)}>
												<Trash2 class="w-4 h-4" />
											</Button>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<p class="text-gray-500 text-center py-8">No planned expenses yet. Add some above to get started.</p>
				{/if}
			</Card>
		{/if}
	{/if}
</div>