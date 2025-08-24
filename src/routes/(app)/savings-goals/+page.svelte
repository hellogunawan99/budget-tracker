<script lang="ts">
	import { enhance } from '$app/forms';
	import { formatCurrency } from '$lib/utils/date.js';
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Plus, Target, Calendar, DollarSign, TrendingUp, Trash2 } from 'lucide-svelte';
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

	function getProgressPercentage(current: number, target: number): number {
		return Math.min((current / target) * 100, 100);
	}

	$: fullyFundedGoals = data.savingsGoals?.filter(goal => (goal.progressPercentage || 0) >= 100).length || 0;
	$: partiallyFundedGoals = data.savingsGoals?.filter(goal => (goal.progressPercentage || 0) > 0 && (goal.progressPercentage || 0) < 100).length || 0;

	function getProgressColor(percentage: number): string {
		if (percentage >= 100) return 'bg-green-500';
		if (percentage >= 75) return 'bg-blue-500';
		if (percentage >= 50) return 'bg-yellow-500';
		return 'bg-gray-400';
	}
</script>

<svelte:head>
	<title>Savings Goals - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Savings Goals</h1>
			<p class="text-gray-500 mt-1">Set and track your financial savings targets</p>
		</div>
		<Button on:click={toggleCreateForm} class="inline-flex items-center">
			<Plus class="w-4 h-4 mr-2" />
			New Goal
		</Button>
	</div>

	{#if form?.error}
		<Card>
			<p class="text-red-600">{form.error}</p>
		</Card>
	{/if}

	{#if form?.success}
		<Card>
			<p class="text-green-600">Action completed successfully!</p>
		</Card>
	{/if}

	<!-- Accumulated Savings Overview -->
	{#if !data.error}
		<Card title="Your Accumulated Savings Overview">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div class="text-center p-4 bg-blue-50 rounded-lg">
					<p class="text-sm text-blue-600 font-medium">Total Accumulated</p>
					<p class="text-2xl font-bold text-blue-900">{formatCurrency(data.totalAccumulatedSavings || 0)}</p>
				</div>
				<div class="text-center p-4 bg-green-50 rounded-lg">
					<p class="text-sm text-green-600 font-medium">Fully Funded Goals</p>
					<p class="text-2xl font-bold text-green-900">{fullyFundedGoals}</p>
				</div>
				<div class="text-center p-4 bg-yellow-50 rounded-lg">
					<p class="text-sm text-yellow-600 font-medium">Partially Funded</p>
					<p class="text-2xl font-bold text-yellow-900">{partiallyFundedGoals}</p>
				</div>
			</div>
			<p class="text-sm text-gray-600 mt-3">
				💡 Each goal shows progress based on your total accumulated savings. You can achieve multiple goals with the same savings!
			</p>
		</Card>
	{/if}

	{#if data.error}
		<Card title="Error">
			<p class="text-red-600">{data.error}</p>
		</Card>
	{:else}
		<!-- Create New Goal Form -->
		{#if showCreateForm}
			<Card title="Create New Savings Goal">
				<form 
					method="POST" 
					action="?/create"
				>
					<div class="grid grid-cols-1 gap-4">
						<Input
							label="Goal Title"
							id="title"
							name="title"
							type="text"
							placeholder="e.g., Emergency Fund, New Car, Vacation"
							required
						/>
						
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Input
								label="Target Amount"
								id="targetAmount"
								name="targetAmount"
								type="number"
								step="0.01"
								min="0"
								placeholder="0.00"
								required
							/>
							
							<Input
								label="Target Date (Optional)"
								id="deadline"
								name="deadline"
								type="date"
							/>
						</div>
						
						<div class="flex gap-2">
							<Button type="submit" variant="primary">Create Goal</Button>
							<Button type="button" on:click={toggleCreateForm}>Cancel</Button>
						</div>
					</div>
				</form>
			</Card>
		{/if}

		<!-- Savings Goals List -->
		{#if data.savingsGoals && data.savingsGoals.length > 0}
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{#each data.savingsGoals as goal}
					{@const progressPercentage = goal.progressPercentage || 0}
					<Card>
						<div class="space-y-4">
							<!-- Goal Header -->
							<div class="flex items-center justify-between">
								<div class="flex items-center space-x-3">
									<div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
										<Target class="w-5 h-5 text-blue-600" />
									</div>
									<div>
										<h3 class="font-semibold text-gray-900">{goal.title}</h3>
										{#if goal.deadline}
											<p class="text-sm text-gray-500 flex items-center">
												<Calendar class="w-4 h-4 mr-1" />
												Target: {new Date(goal.deadline).toLocaleDateString()}
											</p>
										{/if}
									</div>
								</div>
								<div class="flex items-center gap-2">
									<button 
										type="button"
										class="text-blue-500 hover:text-blue-700 p-1"
										on:click={() => startEditing(goal)}
										title="Edit goal"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
										</svg>
									</button>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={goal.id} />
										<button 
											type="submit" 
											class="text-red-500 hover:text-red-700 p-1"
											on:click={(e) => {
												if (!confirm('Are you sure you want to delete this goal?')) {
													e.preventDefault();
												}
											}}
											title="Delete goal"
										>
											<Trash2 class="w-4 h-4" />
										</button>
									</form>
								</div>
							</div>

							<!-- Edit Form -->
							{#if editingGoal === goal.id}
								<div class="border border-blue-200 bg-blue-50 p-4 rounded-lg">
									<form method="POST" action="?/update" use:enhance on:submit={cancelEditing}>
										<input type="hidden" name="id" value={editFormData.id} />
										<div class="space-y-3">
											<Input
												label="Goal Title"
												id="edit-title-{goal.id}"
												name="title"
												type="text"
												bind:value={editFormData.title}
												required
											/>
											<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
												<Input
													label="Target Amount"
													id="edit-amount-{goal.id}"
													name="targetAmount"
													type="number"
													step="0.01"
													min="0"
													bind:value={editFormData.targetAmount}
													required
												/>
												<Input
													label="Target Date (Optional)"
													id="edit-deadline-{goal.id}"
													name="deadline"
													type="date"
													bind:value={editFormData.deadline}
												/>
											</div>
											<div class="flex gap-2">
												<Button type="submit" size="sm" variant="primary">Save Changes</Button>
												<Button type="button" size="sm" variant="outline" on:click={cancelEditing}>Cancel</Button>
											</div>
										</div>
									</form>
								</div>
							{/if}

							<!-- Progress Bar -->
							<div class="space-y-2">
								<div class="flex justify-between text-sm">
									<span class="text-gray-600">Progress</span>
									<span class="font-medium">{progressPercentage.toFixed(1)}%</span>
								</div>
								<div class="w-full bg-gray-200 rounded-full h-3">
									<div 
										class="h-3 rounded-full transition-all duration-300 {getProgressColor(progressPercentage)}"
										style="width: {progressPercentage}%"
									></div>
								</div>
								<div class="flex justify-between text-sm text-gray-600">
									<span>{formatCurrency(goal.actualProgress || 0)}</span>
									<span>{formatCurrency(goal.target_amount)}</span>
								</div>
							</div>

							<!-- Auto-Progress Info -->
							<div class="border-t pt-3">
								<div class="flex items-center space-x-2 text-sm text-gray-600">
									<DollarSign class="w-4 h-4" />
									<span>Auto-funded from accumulated savings</span>
								</div>
								{#if progressPercentage >= 100}
									<p class="text-sm text-green-600 font-medium mt-2">🎉 Goal achieved! You have enough accumulated savings.</p>
								{:else}
									<p class="text-sm text-blue-600 mt-2">Keep saving each month to reach this goal faster!</p>
								{/if}
							</div>

							<!-- Recommendations -->
							{#if goal.recommendation}
								<div class="border-t pt-3">
									<div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
										<div class="flex items-center space-x-2 mb-2">
											<TrendingUp class="w-4 h-4 text-blue-600" />
											<span class="font-medium text-blue-800">Recommendation</span>
										</div>
										{#if goal.recommendation.monthsRemaining > 0}
											<p class="text-sm text-blue-700">
												{#if goal.recommendation.isAchievable}
													<span class="text-green-700">✅ On track!</span> Save {formatCurrency(goal.recommendation.monthlyTarget)} monthly to reach your goal.
												{:else}
													<span class="text-orange-700">⚠️ Challenge ahead:</span> You need {formatCurrency(goal.recommendation.monthlyTarget)} monthly, but you currently have {formatCurrency(goal.recommendation.currentMonthlySavings)} available.
													<br><span class="text-xs">Consider reducing expenses by {formatCurrency(goal.recommendation.monthlyTarget - goal.recommendation.currentMonthlySavings)} monthly.</span>
												{/if}
											</p>
											<p class="text-xs text-blue-600 mt-1">
												{goal.recommendation.monthsRemaining} months remaining • {formatCurrency(goal.recommendation.amountRemaining)} to go
											</p>
										{:else}
											<p class="text-sm text-red-700">
												⚠️ This goal's deadline has passed or is due this month
											</p>
										{/if}
									</div>
								</div>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		{:else}
			<Card>
				<div class="text-center py-12">
					<Target class="w-16 h-16 text-gray-400 mx-auto mb-4" />
					<h3 class="text-lg font-medium text-gray-900 mb-2">No Savings Goals Yet</h3>
					<p class="text-gray-500 mb-4">Start building your financial future by setting your first savings goal.</p>
					<Button on:click={toggleCreateForm} class="inline-flex items-center">
						<Plus class="w-4 h-4 mr-2" />
						Create Your First Goal
					</Button>
				</div>
			</Card>
		{/if}
	{/if}
</div>