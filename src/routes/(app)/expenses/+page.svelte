<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { formatCurrency, formatDate, getMonthName } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Calendar, Edit, Trash2, Save, Receipt, Plus, X, Check, TrendingDown, Wallet, Filter, Search } from 'lucide-svelte';
	import type { PageData } from './$types.js';

	export let data: PageData;

	let form = {
		categoryId: '',
		amount: '',
		description: '',
		expenseDate: new Date().toISOString().split('T')[0]
	};

	let editingExpense: any = null;
	let loading = false;
	let showAddForm = false;
	let searchQuery = '';
	let filterCategory = '';

	$: categoryOptions = data.categories?.map(cat => ({
		value: cat.id.toString(),
		label: cat.name,
		color: cat.color
	})) || [];

	$: filteredExpenses = (data.actualExpenses || []).filter(exp => {
		const matchesSearch = !searchQuery ||
			exp.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(exp.description || '').toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = !filterCategory || exp.category_id.toString() === filterCategory;
		return matchesSearch && matchesCategory;
	});

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

	$: groupedExpenses = groupExpensesByDate(filteredExpenses);

	$: totalSpent = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
	$: expenseCount = filteredExpenses.length;

	async function addExpense() {
		if (!data.budget || !form.categoryId || !form.amount || !form.expenseDate) return;

		loading = true;
		try {
			const response = await fetch('/api/actual-expenses', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					budgetId: data.budget.id,
					categoryId: parseInt(form.categoryId),
					amount: parseFloat(form.amount),
					description: form.description,
					expenseDate: form.expenseDate
				})
			});

			if (response.ok) {
				form = {
					categoryId: '',
					amount: '',
					description: '',
					expenseDate: new Date().toISOString().split('T')[0]
				};
				showAddForm = false;
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

	function formatGroupDate(dateStr: string) {
		const date = new Date(dateStr);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		if (date.toDateString() === today.toDateString()) {
			return 'Today';
		} else if (date.toDateString() === yesterday.toDateString()) {
			return 'Yesterday';
		}
		return formatDate(dateStr);
	}
</script>

<svelte:head>
	<title>Expenses - Budget Tracker</title>
</svelte:head>

<div class="expenses-page">
	<!-- Header -->
	<div class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<Receipt />
			</div>
			<div>
				<h1>{getMonthName(data.currentMonth || 1)} {data.currentYear} Expenses</h1>
				<p>Track and manage your spending</p>
			</div>
		</div>
		{#if data.budget}
			<Button on:click={() => showAddForm = true}>
				<Plus class="w-4 h-4" />
				Add Expense
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
				<h3>Unable to Load Expenses</h3>
				<p>{data.error}</p>
			</div>
		</div>
	{:else if !data.budget}
		<div class="empty-state">
			<div class="empty-card">
				<div class="empty-icon">
					<Wallet />
				</div>
				<h2>No Budget Set Up</h2>
				<p>You need to set up a budget before tracking expenses.</p>
				<Button href="/budget">Set Up Budget</Button>
			</div>
		</div>
	{:else}
		<!-- Stats Row -->
		<div class="stats-row">
			<div class="stat-card">
				<div class="stat-icon spent">
					<TrendingDown />
				</div>
				<div class="stat-content">
					<span class="stat-label">Total Spent</span>
					<span class="stat-value">{formatCurrency(totalSpent)}</span>
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon count">
					<Receipt />
				</div>
				<div class="stat-content">
					<span class="stat-label">Transactions</span>
					<span class="stat-value">{expenseCount}</span>
				</div>
			</div>
			<div class="stat-card">
				<div class="stat-icon remaining">
					<Wallet />
				</div>
				<div class="stat-content">
					<span class="stat-label">Remaining Budget</span>
					<span class="stat-value" class:success={data.budgetSummary?.remainingBudget >= 0} class:danger={data.budgetSummary?.remainingBudget < 0}>
						{formatCurrency(data.budgetSummary?.remainingBudget || 0)}
					</span>
				</div>
			</div>
		</div>

		<!-- Add Expense Form -->
		{#if showAddForm}
			<div class="add-form-card">
				<div class="form-header">
					<h3>Add New Expense</h3>
					<button class="close-btn" on:click={() => { showAddForm = false; }}>
						<X class="w-5 h-5" />
					</button>
				</div>
				<form on:submit|preventDefault={addExpense} class="expense-form">
					<div class="form-row">
						<div class="form-group">
							<label for="category">Category</label>
							<select
								id="category"
								bind:value={form.categoryId}
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
									bind:value={form.amount}
									placeholder="0.00"
									required
									class="amount-input"
								/>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group">
							<label for="date">Date</label>
							<input
								id="date"
								type="date"
								bind:value={form.expenseDate}
								required
								class="form-input"
							/>
						</div>
						<div class="form-group">
							<label for="desc">Description</label>
							<input
								id="desc"
								type="text"
								bind:value={form.description}
								placeholder="What was this for?"
								class="form-input"
							/>
						</div>
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
		{/if}

		<!-- Filters -->
		<div class="filters-bar">
			<div class="search-box">
				<Search class="w-4 h-4" />
				<input
					type="text"
					placeholder="Search expenses..."
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
			<div class="filter-box">
				<Filter class="w-4 h-4" />
				<select bind:value={filterCategory} class="filter-select">
					<option value="">All Categories</option>
					{#each categoryOptions as cat}
						<option value={cat.value}>{cat.label}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Expenses List -->
		<div class="expenses-section">
			{#if groupedExpenses.length > 0}
				<div class="expenses-timeline">
					{#each groupedExpenses as group (group.date)}
						<div class="day-group">
							<div class="day-header">
								<span class="day-date">{formatGroupDate(group.date)}</span>
								<span class="day-total">{formatCurrency(group.expenses.reduce((sum, exp) => sum + Number(exp.amount), 0))}</span>
							</div>
							<div class="day-expenses">
								{#each group.expenses as expense (expense.id)}
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
												<div class="edit-row">
													<input
														type="date"
														bind:value={editingExpense.expense_date}
														class="form-input"
													/>
													<input
														type="text"
														bind:value={editingExpense.description}
														placeholder="Description"
														class="form-input"
													/>
												</div>
												<div class="edit-actions">
													<Button size="sm" on:click={updateExpense} {loading}>
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
											<div class="expense-actions">
												<button class="action-btn edit" on:click={() => startEditing(expense)}>
													<Edit class="w-4 h-4" />
												</button>
												<button class="action-btn delete" on:click={() => deleteExpense(expense.id)}>
													<Trash2 class="w-4 h-4" />
												</button>
											</div>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-list">
					<div class="empty-icon">
						<Receipt />
					</div>
					<h3>No expenses found</h3>
					<p>
						{#if searchQuery || filterCategory}
							Try adjusting your search or filter
						{:else}
							Start tracking by adding your first expense
						{/if}
					</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.expenses-page {
		padding: 1.5rem;
		max-width: 1000px;
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

	/* Empty State */
	.empty-state {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
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

	/* Stats Row */
	.stats-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.stat-card {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
		border: 1px solid #e5e7eb;
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.stat-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.stat-icon.spent {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-icon.count {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-icon.remaining {
		background: #f3f4f6;
		color: #1f2937;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: #6b7280;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.stat-value.success {
		color: #059669;
	}

	.stat-value.danger {
		color: #dc2626;
	}

	/* Add Form */
	.add-form-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
		margin-bottom: 1.5rem;
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

	/* Filters */
	.filters-bar {
		display: flex;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	.search-box,
	.filter-box {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.75rem;
		flex: 1;
	}

	.search-box :global(svg),
	.filter-box :global(svg) {
		color: #9ca3af;
		flex-shrink: 0;
	}

	.search-input,
	.filter-select {
		flex: 1;
		border: none;
		background: transparent;
		font-size: 0.875rem;
		color: #374151;
		outline: none;
	}

	.search-input::placeholder {
		color: #9ca3af;
	}

	/* Expenses Section */
	.expenses-section {
		background: white;
		border-radius: 1rem;
		border: 1px solid #e5e7eb;
		padding: 1.5rem;
	}

	.expenses-timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.day-group {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.day-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.day-date {
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
	}

	.day-total {
		font-size: 0.875rem;
		font-weight: 600;
		color: #6b7280;
	}

	.day-expenses {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
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

	/* Edit Form */
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

	/* Empty List */
	.empty-list {
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

	.empty-list h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #374151;
		margin: 0 0 0.5rem 0;
	}

	.empty-list p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.expenses-page {
			padding: 1rem;
		}

		.stats-row {
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

		.edit-row {
			grid-template-columns: 1fr;
		}

		.filters-bar {
			flex-direction: column;
		}

		.expense-item {
			flex-wrap: wrap;
		}
	}
</style>
