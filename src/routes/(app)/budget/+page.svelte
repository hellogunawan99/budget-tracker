<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { formatCurrency, getMonthName } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Plus, Edit, Trash2, Save, X, Wallet, Target, PieChart, ArrowUpCircle, ArrowDownCircle, Check, TrendingUp } from 'lucide-svelte';
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
	let showAddForm = false;

	$: categoryOptions = data.categories?.map(cat => ({
		value: cat.id.toString(),
		label: cat.name,
		color: cat.color
	})) || [];

	$: totalPlanned = data.plannedExpenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
	$: remaining = (data.budget?.salary || 0) - totalPlanned;
	$: spentPercentage = data.budget?.salary ? Math.min(100, (totalPlanned / data.budget.salary) * 100) : 0;

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
				showAddForm = false;
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

<div class="budget-page">
	<!-- Header -->
	<div class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<PieChart />
			</div>
			<div>
				<h1>{getMonthName(data.currentMonth || 1)} {data.currentYear} Budget</h1>
				<p>Plan your monthly income and expenses</p>
			</div>
		</div>
		{#if !data.budget}
			<Button on:click={() => document.getElementById('salary-input')?.focus()} variant="primary">
				<Wallet class="w-4 h-4" />
				Set Up Budget
			</Button>
		{/if}
	</div>

	{#if data.error}
		<div class="error-banner">
			<div class="error-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<div>
				<h3>Unable to Load Budget</h3>
				<p>{data.error}</p>
			</div>
		</div>
	{:else}
		<!-- Budget Overview Cards -->
		<div class="overview-grid">
			<!-- Salary Card -->
			<div class="overview-card income-card">
				<div class="card-accent income-accent"></div>
				<div class="card-content">
					<div class="card-icon income-icon">
						<ArrowUpCircle />
					</div>
					<div class="card-details">
						<span class="card-label">Monthly Income</span>
						{#if data.budget}
							<span class="card-value">{formatCurrency(data.budget.salary)}</span>
						{:else}
							<form on:submit|preventDefault={createOrUpdateBudget} class="salary-form">
								<input
									id="salary-input"
									type="number"
									step="0.01"
									min="0"
									bind:value={budgetForm.salary}
									placeholder="Enter salary"
									class="salary-input"
									required
								/>
								<button type="submit" class="salary-btn" disabled={loading}>
									{loading ? 'Saving...' : 'Set'}
								</button>
							</form>
						{/if}
					</div>
				</div>
				{#if data.budget}
					<button class="edit-salary-btn" on:click={() => { editingExpense = { editingSalary: true, salary: data.budget?.salary }; }}>
						<Edit class="w-4 h-4" />
					</button>
				{/if}
			</div>

			<!-- Planned Expenses Card -->
			<div class="overview-card expenses-card">
				<div class="card-accent expenses-accent"></div>
				<div class="card-content">
					<div class="card-icon expenses-icon">
						<ArrowDownCircle />
					</div>
					<div class="card-details">
						<span class="card-label">Total Planned</span>
						<span class="card-value">{formatCurrency(totalPlanned)}</span>
					</div>
				</div>
				<div class="expense-count">{data.plannedExpenses?.length || 0} categories</div>
			</div>

			<!-- Remaining Card -->
			<div class="overview-card remaining-card" class:over-budget={remaining < 0}>
				<div class="card-accent" class:remaining-accent={remaining >= 0} class:negative-accent={remaining < 0}></div>
				<div class="card-content">
					<div class="card-icon" class:remaining-icon={remaining >= 0} class:negative-icon={remaining < 0}>
						<Target />
					</div>
					<div class="card-details">
						<span class="card-label">{remaining >= 0 ? 'Remaining Budget' : 'Over Budget'}</span>
						<span class="card-value" class:success={remaining >= 0} class:danger={remaining < 0}>
							{formatCurrency(Math.abs(remaining))}
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Progress Bar -->
		{#if data.budget}
			<div class="budget-progress-card">
				<div class="progress-header">
					<span class="progress-label">Budget Allocation</span>
					<span class="progress-percentage">{spentPercentage.toFixed(0)}%</span>
				</div>
				<div class="progress-track">
					<div
						class="progress-fill"
						class:good={spentPercentage < 75}
						class:warning={spentPercentage >= 75 && spentPercentage < 90}
						class:danger={spentPercentage >= 90}
						style="width: {Math.min(100, spentPercentage)}%"
					></div>
				</div>
				<div class="progress-labels">
					<span>0%</span>
					<span class="budget-limit">{formatCurrency(data.budget.salary)}</span>
				</div>
			</div>
		{/if}

		<!-- Main Content -->
		{#if data.budget}
			<!-- Add Expense Section -->
			<div class="add-expense-section">
				{#if showAddForm}
					<div class="add-form-card">
						<div class="form-header">
							<h3>Add Planned Expense</h3>
							<button class="close-btn" on:click={() => { showAddForm = false; expenseForm = { categoryId: '', amount: '', description: '' }; }}>
								<X class="w-5 h-5" />
							</button>
						</div>
						<form on:submit|preventDefault={addPlannedExpense} class="expense-form">
							<div class="form-row">
								<div class="form-group">
									<label for="category">Category</label>
									<select
										id="category"
										bind:value={expenseForm.categoryId}
										required
										class="form-select"
									>
										<option value="">Select category</option>
										{#each categoryOptions as cat}
											<option value={cat.value}>{cat.label}</option>
										{/each}
									</select>
								</div>
								<div class="form-group">
									<label for="amount">Amount</label>
									<div class="amount-input-wrapper">
										<span class="currency-symbol">$</span>
										<input
											id="amount"
											type="number"
											step="0.01"
											min="0"
											bind:value={expenseForm.amount}
											placeholder="0.00"
											required
											class="amount-input"
										/>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label for="description">Description (Optional)</label>
								<input
									id="description"
									type="text"
									bind:value={expenseForm.description}
									placeholder="What is this expense for?"
									class="form-input"
								/>
							</div>
							<div class="form-actions">
								<Button type="button" variant="secondary" on:click={() => { showAddForm = false; }}>
									Cancel
								</Button>
								<Button type="submit" {loading}>
									<Plus class="w-4 h-4" />
									Add Expense
								</Button>
							</div>
						</form>
					</div>
				{:else}
					<button class="add-expense-trigger" on:click={() => showAddForm = true}>
						<div class="trigger-icon">
							<Plus />
						</div>
						<span>Add a new planned expense</span>
					</button>
				{/if}
			</div>

			<!-- Expenses List -->
			<div class="expenses-section">
				<div class="section-header">
					<h2>Planned Expenses</h2>
					<span class="expense-badge">{data.plannedExpenses?.length || 0} items</span>
				</div>

				{#if data.plannedExpenses?.length > 0}
					<div class="expenses-list">
						{#each data.plannedExpenses as expense (expense.id)}
							<div class="expense-item" class:editing={editingExpense?.id === expense.id}>
								{#if editingExpense?.id === expense.id}
									<!-- Edit Mode -->
									<div class="edit-form">
										<div class="edit-row">
											<select
												bind:value={editingExpense.category_id}
												class="form-select"
											>
												{#each categoryOptions as cat}
													<option value={cat.value}>{cat.label}</option>
												{/each}
											</select>
											<div class="amount-input-wrapper">
												<span class="currency-symbol">$</span>
												<input
													type="number"
													step="0.01"
													bind:value={editingExpense.amount}
													class="amount-input"
												/>
											</div>
										</div>
										<input
											type="text"
											bind:value={editingExpense.description}
											placeholder="Description"
											class="form-input"
										/>
										<div class="edit-actions">
											<Button size="sm" on:click={updatePlannedExpense} {loading}>
												<Check class="w-4 h-4" />
												Save
											</Button>
											<Button size="sm" variant="secondary" on:click={cancelEditing}>
												Cancel
											</Button>
										</div>
									</div>
								{:else}
									<!-- View Mode -->
									<div class="expense-color" style="background-color: {expense.category_color}"></div>
									<div class="expense-info">
										<h4>{expense.category_name}</h4>
										<p>{expense.description || 'No description'}</p>
									</div>
									<div class="expense-amount">
										{formatCurrency(expense.amount)}
									</div>
									<div class="expense-percentage">
										{((Number(expense.amount) / data.budget.salary) * 100).toFixed(1)}%
									</div>
									<div class="expense-actions">
										<button class="action-btn edit" on:click={() => startEditing(expense)}>
											<Edit class="w-4 h-4" />
										</button>
										<button class="action-btn delete" on:click={() => deletePlannedExpense(expense.id)}>
											<Trash2 class="w-4 h-4" />
										</button>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				{:else}
					<div class="empty-state">
						<div class="empty-icon">
							<Wallet />
						</div>
						<h3>No planned expenses yet</h3>
						<p>Start by adding your expected monthly expenses</p>
					</div>
				{/if}
			</div>

			<!-- Summary Cards -->
			<div class="summary-section">
				<div class="summary-card">
					<div class="summary-header">
						<TrendingUp class="w-5 h-5" />
						<h3>Budget Summary</h3>
					</div>
					<div class="summary-content">
						<div class="summary-row">
							<span class="summary-label">Monthly Income</span>
							<span class="summary-value success">{formatCurrency(data.budget.salary)}</span>
						</div>
						<div class="summary-row">
							<span class="summary-label">Total Planned Expenses</span>
							<span class="summary-value danger">-{formatCurrency(totalPlanned)}</span>
						</div>
						<div class="summary-divider"></div>
						<div class="summary-row total">
							<span class="summary-label">{remaining >= 0 ? 'Remaining Budget' : 'Over Budget'}</span>
							<span class="summary-value" class:success={remaining >= 0} class:danger={remaining < 0}>
								{formatCurrency(Math.abs(remaining))}
							</span>
						</div>
					</div>
				</div>

				<div class="category-breakdown">
					<h3>Spending by Category</h3>
					{#if data.plannedExpenses?.length > 0}
						<div class="category-list">
							{#each data.plannedExpenses as expense}
								<div class="category-item">
									<div class="category-color" style="background-color: {expense.category_color}"></div>
									<span class="category-name">{expense.category_name}</span>
									<div class="category-bar-wrapper">
										<div
											class="category-bar"
											style="width: {(Number(expense.amount) / data.budget.salary) * 100}%; background-color: {expense.category_color}"
										></div>
									</div>
									<span class="category-amount">{formatCurrency(expense.amount)}</span>
								</div>
							{/each}
						</div>
					{:else}
						<p class="no-data">No expenses to display</p>
					{/if}
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.budget-page {
		padding: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		margin-bottom: 1.5rem;
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
		flex-shrink: 0;
	}

	.error-icon svg {
		width: 24px;
		height: 24px;
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

	/* Overview Grid */
	.overview-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.overview-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		position: relative;
		overflow: hidden;
	}

	.card-accent {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
	}

	.income-accent {
		background: #1f2937;
	}

	.expenses-accent {
		background: #6b7280;
	}

	.remaining-accent {
		background: #1f2937;
	}

	.negative-accent {
		background: #dc2626;
	}

	.card-content {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
	}

	.card-icon {
		width: 48px;
		height: 48px;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.card-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.income-icon {
		background: #f3f4f6;
		color: #1f2937;
	}

	.expenses-icon {
		background: #f3f4f6;
		color: #1f2937;
	}

	.remaining-icon {
		background: #f3f4f6;
		color: #1f2937;
	}

	.negative-icon {
		background: #f3f4f6;
		color: #dc2626;
	}

	.card-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.card-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.card-value {
		font-size: 1.5rem;
		font-weight: 700;
		color: #1f2937;
	}

	.card-value.success {
		color: #059669;
	}

	.card-value.danger {
		color: #dc2626;
	}

	.salary-form {
		display: flex;
		gap: 0.5rem;
	}

	.salary-input {
		width: 120px;
		padding: 0.5rem 0.75rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		font-size: 0.875rem;
	}

	.salary-input:focus {
		outline: none;
		border-color: #1f2937;
		box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
	}

	.salary-btn {
		padding: 0.5rem 1rem;
		background: #1f2937;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.salary-btn:hover {
		opacity: 0.9;
	}

	.edit-salary-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.5rem;
		background: #f3f4f6;
		border: none;
		border-radius: 0.5rem;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.edit-salary-btn:hover {
		background: #e5e7eb;
		color: #374151;
	}

	.expense-count {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	/* Progress Card */
	.budget-progress-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		margin-bottom: 1.5rem;
	}

	.progress-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.75rem;
	}

	.progress-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.progress-percentage {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
	}

	.progress-track {
		height: 12px;
		background: #f3f4f6;
		border-radius: 9999px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.5s ease;
	}

	.progress-fill.good {
		background: #1f2937;
	}

	.progress-fill.warning {
		background: #d97706;
	}

	.progress-fill.danger {
		background: #dc2626;
	}

	.progress-labels {
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
		font-size: 0.75rem;
		color: #9ca3af;
	}

	/* Add Expense Section */
	.add-expense-section {
		margin-bottom: 1.5rem;
	}

	.add-expense-trigger {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 1.25rem;
		background: white;
		border: 2px dashed #e5e7eb;
		border-radius: 1rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.add-expense-trigger:hover {
		border-color: #1f2937;
		background: #fafafa;
	}

	.trigger-icon {
		width: 48px;
		height: 48px;
		background: #1f2937;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.trigger-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.add-expense-trigger span {
		font-size: 0.9375rem;
		font-weight: 500;
		color: #374151;
	}

	.add-form-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
	}

	.form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
	}

	.form-header h3 {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.close-btn {
		padding: 0.5rem;
		background: #f3f4f6;
		border: none;
		border-radius: 0.5rem;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-btn:hover {
		background: #e5e7eb;
		color: #374151;
	}

	.expense-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-select,
	.form-input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.625rem;
		font-size: 0.9375rem;
		transition: all 0.2s;
	}

	.form-select:focus,
	.form-input:focus {
		outline: none;
		border-color: #1f2937;
		box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
	}

	.amount-input-wrapper {
		position: relative;
	}

	.currency-symbol {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: #9ca3af;
		font-weight: 500;
	}

	.amount-input {
		width: 100%;
		padding: 0.75rem 1rem 0.75rem 2rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.625rem;
		font-size: 0.9375rem;
		transition: all 0.2s;
	}

	.amount-input:focus {
		outline: none;
		border-color: #1f2937;
		box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
	}

	.form-actions {
		display: flex;
		justify-content: flex-end;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	/* Expenses Section */
	.expenses-section {
		background: white;
		border-radius: 1rem;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.25rem;
	}

	.section-header h2 {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.expense-badge {
		padding: 0.375rem 0.75rem;
		background: #f3f4f6;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 500;
		color: #6b7280;
	}

	.expenses-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.expense-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: #f9fafb;
		border-radius: 0.75rem;
		transition: all 0.2s;
	}

	.expense-item:hover {
		background: #f3f4f6;
	}

	.expense-item.editing {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
	}

	.expense-color {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.expense-info {
		flex: 1;
		min-width: 0;
	}

	.expense-info h4 {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.expense-info p {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0.25rem 0 0 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.expense-amount {
		font-size: 1rem;
		font-weight: 700;
		color: #1f2937;
	}

	.expense-percentage {
		font-size: 0.75rem;
		font-weight: 500;
		color: #9ca3af;
		min-width: 3rem;
		text-align: right;
	}

	.expense-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		padding: 0.5rem;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-btn:hover {
		border-color: #d1d5db;
	}

	.action-btn.edit:hover {
		color: #1f2937;
	}

	.action-btn.delete:hover {
		color: #dc2626;
		border-color: #fecaca;
		background: #fef2f2;
	}

	.edit-form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.edit-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
	}

	.edit-actions {
		display: flex;
		gap: 0.5rem;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: 3rem 1.5rem;
	}

	.empty-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 1rem;
		background: #f3f4f6;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #9ca3af;
	}

	.empty-icon :global(svg) {
		width: 32px;
		height: 32px;
	}

	.empty-state h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
		margin: 0 0 0.5rem 0;
	}

	.empty-state p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	/* Summary Section */
	.summary-section {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: 1.5rem;
	}

	.summary-card,
	.category-breakdown {
		background: white;
		border-radius: 1rem;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
	}

	.summary-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.25rem;
		color: #1f2937;
	}

	.summary-header h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.summary-label {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.summary-value {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
	}

	.summary-value.success {
		color: #059669;
	}

	.summary-value.danger {
		color: #dc2626;
	}

	.summary-divider {
		height: 1px;
		background: #e5e7eb;
		margin: 0.5rem 0;
	}

	.summary-row.total {
		padding-top: 0.5rem;
	}

	.summary-row.total .summary-label {
		font-weight: 600;
		color: #374151;
	}

	.summary-row.total .summary-value {
		font-size: 1.25rem;
	}

	.category-breakdown h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 1.25rem 0;
	}

	.category-list {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.category-item {
		display: grid;
		grid-template-columns: 12px 1fr auto auto;
		gap: 0.75rem;
		align-items: center;
	}

	.category-color {
		width: 12px;
		height: 12px;
		border-radius: 4px;
	}

	.category-name {
		font-size: 0.875rem;
		color: #374151;
	}

	.category-bar-wrapper {
		width: 80px;
		height: 8px;
		background: #f3f4f6;
		border-radius: 9999px;
		overflow: hidden;
	}

	.category-bar {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.3s ease;
	}

	.category-amount {
		font-size: 0.875rem;
		font-weight: 600;
		color: #1f2937;
		min-width: 70px;
		text-align: right;
	}

	.no-data {
		font-size: 0.875rem;
		color: #9ca3af;
		text-align: center;
		padding: 2rem;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.summary-section {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.budget-page {
			padding: 1rem;
		}

		.overview-grid {
			grid-template-columns: 1fr;
		}

		.page-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.expense-item {
			flex-wrap: wrap;
		}

		.expense-percentage {
			display: none;
		}

		.edit-row {
			grid-template-columns: 1fr;
		}
	}
</style>
