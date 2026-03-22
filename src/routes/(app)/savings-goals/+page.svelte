<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrency } from '$lib/utils/date.js';
	import Button from '$lib/components/Button.svelte';
	import { Plus, Target, Calendar, DollarSign, TrendingUp, Trash2, X, Check, PiggyBank, Award, Clock, ArrowRight } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types.js';

	export let data: PageData;
	export let form: ActionData;

	let showCreateForm = false;
	let editingGoal: number | null = null;
	let editFormData = {
		id: 0,
		title: '',
		targetAmount: '',
		deadline: ''
	};

	function toggleCreateForm() {
		showCreateForm = !showCreateForm;
	}

	function startEditing(goal: any) {
		editingGoal = goal.id;
		editFormData = {
			id: goal.id,
			title: goal.title,
			targetAmount: goal.target_amount.toString(),
			deadline: goal.deadline ? goal.deadline.split('T')[0] : ''
		};
	}

	function cancelEditing() {
		editingGoal = null;
		editFormData = {
			id: 0,
			title: '',
			targetAmount: '',
			deadline: ''
		};
	}

	$: fullyFundedGoals = data.savingsGoals?.filter(goal => (goal.progressPercentage || 0) >= 100).length || 0;
	$: partiallyFundedGoals = data.savingsGoals?.filter(goal => (goal.progressPercentage || 0) > 0 && (goal.progressPercentage || 0) < 100).length || 0;
	$: totalGoals = data.savingsGoals?.length || 0;

	function getProgressColor(percentage: number): string {
		if (percentage >= 100) return 'completed';
		if (percentage >= 75) return 'excellent';
		if (percentage >= 50) return 'good';
		if (percentage >= 25) return 'fair';
		return 'low';
	}

	function getDaysRemaining(deadline: string | null): number | null {
		if (!deadline) return null;
		const today = new Date();
		const deadlineDate = new Date(deadline);
		const diff = deadlineDate.getTime() - today.getTime();
		return Math.ceil(diff / (1000 * 60 * 60 * 24));
	}
</script>

<svelte:head>
	<title>Savings Goals - Budget Tracker</title>
</svelte:head>

<div class="savings-page">
	<!-- Header -->
	<div class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<PiggyBank />
			</div>
			<div>
				<h1>Savings Goals</h1>
				<p>Track your progress towards financial milestones</p>
			</div>
		</div>
		<Button on:click={toggleCreateForm}>
			<Plus class="w-4 h-4" />
			New Goal
		</Button>
	</div>

	{#if form?.error}
		<div class="error-banner">
			<div class="error-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<div>
				<h3>Error</h3>
				<p>{form.error}</p>
			</div>
		</div>
	{/if}

	{#if form?.success}
		<div class="success-banner">
			<div class="success-icon">
				<Check />
			</div>
			<div>
				<h3>Success</h3>
				<p>Action completed successfully!</p>
			</div>
		</div>
	{/if}

	{#if !data.error}
		<!-- Overview Cards -->
		<div class="overview-grid">
			<div class="overview-card total-card">
				<div class="card-accent"></div>
				<div class="card-content">
					<div class="card-icon">
						<DollarSign />
					</div>
					<div class="card-details">
						<span class="card-label">Total Accumulated</span>
						<span class="card-value">{formatCurrency(data.totalAccumulatedSavings || 0)}</span>
					</div>
				</div>
			</div>

			<div class="overview-card achieved-card">
				<div class="card-accent"></div>
				<div class="card-content">
					<div class="card-icon achieved">
						<Award />
					</div>
					<div class="card-details">
						<span class="card-label">Goals Achieved</span>
						<span class="card-value">{fullyFundedGoals} <span class="card-sub">of {totalGoals}</span></span>
					</div>
				</div>
			</div>

			<div class="overview-card progress-card">
				<div class="card-accent"></div>
				<div class="card-content">
					<div class="card-icon progress">
						<TrendingUp />
					</div>
					<div class="card-details">
						<span class="card-label">In Progress</span>
						<span class="card-value">{partiallyFundedGoals}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Tip Banner -->
		<div class="tip-banner">
			<div class="tip-icon">
				<TrendingUp />
			</div>
			<p>Each goal shows progress based on your total accumulated savings. You can achieve multiple goals with the same savings!</p>
		</div>
	{/if}

	{#if data.error}
		<div class="error-card">
			<div class="error-icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
			</div>
			<h3>Unable to Load Savings Goals</h3>
			<p>{data.error}</p>
		</div>
	{:else}
		<!-- Create New Goal Form -->
		{#if showCreateForm}
			<div class="create-form-card">
				<div class="form-header">
					<h3>Create New Savings Goal</h3>
					<button class="close-btn" on:click={toggleCreateForm}>
						<X class="w-5 h-5" />
					</button>
				</div>
				<form method="POST" action="?/create" use:enhance on:submit={() => showCreateForm = false}>
					<div class="form-grid">
						<div class="form-group full-width">
							<label for="title">Goal Title</label>
							<input
								id="title"
								name="title"
								type="text"
								placeholder="e.g., Emergency Fund, New Car, Vacation"
								required
								class="form-input"
							/>
						</div>
						<div class="form-group">
							<label for="targetAmount">Target Amount</label>
							<div class="amount-input-wrapper">
								<span class="currency-symbol">$</span>
								<input
									id="targetAmount"
									name="targetAmount"
									type="number"
									step="0.01"
									min="0"
									placeholder="0.00"
									required
									class="amount-input"
								/>
							</div>
						</div>
						<div class="form-group">
							<label for="deadline">Target Date (Optional)</label>
							<input
								id="deadline"
								name="deadline"
								type="date"
								class="form-input"
							/>
						</div>
					</div>
					<div class="form-actions">
						<Button type="button" variant="secondary" on:click={toggleCreateForm}>
							Cancel
						</Button>
						<Button type="submit">
							<Plus class="w-4 h-4" />
							Create Goal
						</Button>
					</div>
				</form>
			</div>
		{/if}

		<!-- Goals List -->
		{#if data.savingsGoals && data.savingsGoals.length > 0}
			<div class="goals-grid">
				{#each data.savingsGoals as goal (goal.id)}
					{@const progressPercentage = goal.progressPercentage || 0}
					{@const progressColor = getProgressColor(progressPercentage)}
					{@const daysRemaining = getDaysRemaining(goal.deadline)}
					<div class="goal-card" class:completed={progressPercentage >= 100}>
						<!-- Goal Header -->
						<div class="goal-header">
							<div class="goal-icon" class:completed={progressPercentage >= 100}>
								<Target />
							</div>
							<div class="goal-title-area">
								<h3>{goal.title}</h3>
								{#if goal.deadline}
									<p class="goal-deadline">
										<Calendar class="w-3 h-3" />
										{#if daysRemaining !== null}
											{#if daysRemaining < 0}
												<span class="overdue">Deadline passed</span>
											{:else if daysRemaining === 0}
												<span class="today">Due today</span>
											{:else}
												<span>{daysRemaining} days left</span>
											{/if}
										{/if}
									</p>
								{/if}
							</div>
							<div class="goal-actions">
								<button class="action-btn" on:click={() => startEditing(goal)} title="Edit">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
									</svg>
								</button>
								<form method="POST" action="?/delete" use:enhance class="delete-form">
									<input type="hidden" name="id" value={goal.id} />
									<button
										type="submit"
										class="action-btn delete"
										title="Delete"
										on:click={(e) => {
											if (!confirm('Are you sure you want to delete this goal?')) {
												e.preventDefault();
											}
										}}
									>
										<Trash2 class="w-4 h-4" />
									</button>
								</form>
							</div>
						</div>

						<!-- Edit Form -->
						{#if editingGoal === goal.id}
							<div class="edit-form">
								<form method="POST" action="?/update" use:enhance on:submit={cancelEditing}>
									<input type="hidden" name="id" value={editFormData.id} />
									<div class="edit-grid">
										<input
											type="text"
											name="title"
											bind:value={editFormData.title}
											required
											class="form-input"
										/>
										<input
											type="number"
											name="targetAmount"
											step="0.01"
											min="0"
											bind:value={editFormData.targetAmount}
											required
											class="form-input"
										/>
										<input
											type="date"
											name="deadline"
											bind:value={editFormData.deadline}
											class="form-input"
										/>
									</div>
									<div class="edit-actions">
										<Button type="submit" size="sm">
											<Check class="w-4 h-4" />
											Save
										</Button>
										<Button type="button" size="sm" variant="secondary" on:click={cancelEditing}>
											Cancel
										</Button>
									</div>
								</form>
							</div>
						{/if}

						<!-- Progress Section -->
						<div class="goal-progress">
							<div class="progress-amounts">
								<span class="current-amount">{formatCurrency(goal.actualProgress || 0)}</span>
								<span class="target-amount">of {formatCurrency(goal.target_amount)}</span>
							</div>
							<div class="progress-bar-track">
								<div
									class="progress-bar-fill {progressColor}"
									style="width: {Math.min(100, progressPercentage)}%"
								></div>
							</div>
							<div class="progress-percentage">
								<span class="percent">{progressPercentage.toFixed(1)}%</span>
								{#if progressPercentage >= 100}
									<span class="achieved-badge">
										<Award class="w-3 h-3" />
										Achieved!
									</span>
								{/if}
							</div>
						</div>

						<!-- Info Section -->
						<div class="goal-info">
							<div class="info-item">
								<DollarSign class="w-4 h-4" />
								<span>Auto-funded from savings</span>
							</div>
						</div>

						<!-- Recommendation -->
						{#if goal.recommendation}
							<div class="recommendation">
								<div class="rec-header">
									<TrendingUp class="w-4 h-4" />
									<span>Recommendation</span>
								</div>
								{#if goal.recommendation.monthsRemaining > 0}
									<p class="rec-content">
										{#if goal.recommendation.isAchievable}
											<span class="rec-good">On track!</span>
											Save {formatCurrency(goal.recommendation.monthlyTarget)}/month to reach your goal.
										{:else}
											<span class="rec-warning">Challenge ahead:</span>
											You need {formatCurrency(goal.recommendation.monthlyTarget)}/month, but have {formatCurrency(goal.recommendation.currentMonthlySavings)} available.
										{/if}
									</p>
									<p class="rec-meta">
										<Clock class="w-3 h-3" />
										{goal.recommendation.monthsRemaining} months remaining
									</p>
								{:else}
									<p class="rec-content rec-danger">
										<span class="rec-warning">⚠️</span>
										This goal's deadline has passed
									</p>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty-state">
				<div class="empty-card">
					<div class="empty-icon">
						<PiggyBank />
					</div>
					<h2>No Savings Goals Yet</h2>
					<p>Start building your financial future by setting your first savings goal.</p>
					<Button on:click={toggleCreateForm}>
						<Plus class="w-4 h-4" />
						Create Your First Goal
					</Button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.savings-page {
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

	/* Error/Success Banners */
	.error-banner,
	.success-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem;
		border-radius: 1rem;
		margin-bottom: 1.5rem;
	}

	.error-banner {
		background: #fef2f2;
		border: 1px solid #fecaca;
	}

	.success-banner {
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
	}

	.error-icon,
	.success-icon {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.error-icon {
		background: #fee2e2;
		color: #dc2626;
	}

	.success-icon {
		background: #d1fae5;
		color: #059669;
	}

	.error-banner h3,
	.success-banner h3 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
	}

	.error-banner h3 {
		color: #991b1b;
	}

	.success-banner h3 {
		color: #166534;
	}

	.error-banner p,
	.success-banner p {
		font-size: 0.875rem;
		margin: 0.25rem 0 0 0;
	}

	.error-banner p {
		color: #dc2626;
	}

	.success-banner p {
		color: #15803d;
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

	.total-card .card-accent {
		background: #1f2937;
	}

	.achieved-card .card-accent {
		background: #6b7280;
	}

	.progress-card .card-accent {
		background: #1f2937;
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
		background: #f3f4f6;
		color: #1f2937;
	}

	.card-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.card-icon.achieved {
		background: #f3f4f6;
		color: #1f2937;
	}

	.card-icon.progress {
		background: #f3f4f6;
		color: #1f2937;
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

	.card-sub {
		font-size: 0.875rem;
		font-weight: 400;
		color: #9ca3af;
	}

	/* Tip Banner */
	.tip-banner {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.25rem;
		background: #f3f4f6;
		border-radius: 1rem;
		margin-bottom: 1.5rem;
	}

	.tip-icon {
		width: 40px;
		height: 40px;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1f2937;
		flex-shrink: 0;
	}

	.tip-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.tip-banner p {
		font-size: 0.875rem;
		color: #374151;
		margin: 0;
	}

	/* Create Form */
	.create-form-card {
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

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group.full-width {
		grid-column: 1 / -1;
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
	}

	.form-input {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.625rem;
		font-size: 0.9375rem;
		transition: all 0.2s;
	}

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
	}

	/* Goals Grid */
	.goals-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.goal-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
		transition: all 0.2s;
	}

	.goal-card:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.goal-card.completed {
		border-color: #bbf7d0;
		background: linear-gradient(to bottom, #f0fdf4, white);
	}

	.goal-header {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	.goal-icon {
		width: 48px;
		height: 48px;
		background: #f3f4f6;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #1f2937;
		flex-shrink: 0;
	}

	.goal-icon.completed {
		background: #f3f4f6;
		color: #059669;
	}

	.goal-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.goal-title-area {
		flex: 1;
		min-width: 0;
	}

	.goal-title-area h3 {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0;
	}

	.goal-deadline {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: #6b7280;
		margin: 0.375rem 0 0 0;
	}

	.goal-deadline .overdue {
		color: #dc2626;
	}

	.goal-deadline .today {
		color: #d97706;
	}

	.goal-actions {
		display: flex;
		gap: 0.5rem;
	}

	.action-btn {
		padding: 0.5rem;
		background: #f3f4f6;
		border: none;
		border-radius: 0.5rem;
		color: #6b7280;
		cursor: pointer;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background: #e5e7eb;
		color: #374151;
	}

	.action-btn.delete:hover {
		background: #fee2e2;
		color: #dc2626;
	}

	.action-btn :global(svg) {
		width: 16px;
		height: 16px;
	}

	.delete-form {
		display: inline;
	}

	/* Edit Form */
	.edit-form {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.edit-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.edit-form .form-input {
		padding: 0.625rem 0.875rem;
		font-size: 0.875rem;
	}

	.edit-actions {
		display: flex;
		gap: 0.5rem;
	}

	/* Progress */
	.goal-progress {
		margin-bottom: 1rem;
	}

	.progress-amounts {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.current-amount {
		font-size: 1.25rem;
		font-weight: 700;
		color: #1f2937;
	}

	.target-amount {
		font-size: 0.875rem;
		color: #6b7280;
	}

	.progress-bar-track {
		height: 12px;
		background: #f3f4f6;
		border-radius: 9999px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.progress-bar-fill {
		height: 100%;
		border-radius: 9999px;
		transition: width 0.5s ease;
	}

	.progress-bar-fill.low {
		background: #9ca3af;
	}

	.progress-bar-fill.fair {
		background: #6b7280;
	}

	.progress-bar-fill.good {
		background: #d97706;
	}

	.progress-bar-fill.excellent {
		background: #1f2937;
	}

	.progress-bar-fill.completed {
		background: #059669;
	}

	.progress-percentage {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.percent {
		font-size: 0.875rem;
		font-weight: 600;
		color: #374151;
	}

	.achieved-badge {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #059669;
	}

	/* Info Section */
	.goal-info {
		border-top: 1px solid #e5e7eb;
		padding-top: 1rem;
		margin-bottom: 1rem;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: #6b7280;
	}

	.info-item :global(svg) {
		color: #9ca3af;
	}

	/* Recommendation */
	.recommendation {
		background: #f3f4f6;
		border: 1px solid #d1d5db;
		border-radius: 0.75rem;
		padding: 1rem;
	}

	.rec-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		font-weight: 600;
		color: #1f2937;
		margin-bottom: 0.5rem;
	}

	.rec-content {
		font-size: 0.8125rem;
		color: #374151;
		margin: 0;
		line-height: 1.5;
	}

	.rec-good {
		color: #059669;
		font-weight: 500;
	}

	.rec-warning {
		color: #d97706;
		font-weight: 500;
	}

	.rec-danger {
		color: #dc2626;
	}

	.rec-meta {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		color: #6b7280;
		margin: 0.5rem 0 0 0;
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

	/* Error Card */
	.error-card {
		background: white;
		border-radius: 1rem;
		padding: 2rem;
		border: 1px solid #e5e7eb;
		text-align: center;
	}

	.error-card .error-icon {
		width: 64px;
		height: 64px;
		margin: 0 auto 1rem;
		background: #fee2e2;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #dc2626;
	}

	.error-card h3 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.error-card p {
		color: #6b7280;
		margin: 0;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.goals-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.savings-page {
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

		.form-grid {
			grid-template-columns: 1fr;
		}

		.edit-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
