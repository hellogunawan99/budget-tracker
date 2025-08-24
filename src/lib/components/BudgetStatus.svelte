<script lang="ts">
	import { formatCurrency, getBudgetStatus } from '$lib/utils/date.js';
	
	export let remaining: number;
	export let total: number;
	export let title: string = 'Budget Status';

	$: status = getBudgetStatus(remaining, total);
	$: percentage = total > 0 ? Math.max(0, (remaining / total) * 100) : 0;
	
	$: statusClasses = {
		good: 'budget-status-good',
		warning: 'budget-status-warning', 
		danger: 'budget-status-danger'
	}[status];
</script>

<div class="card">
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
		<div class="px-3 py-1 rounded-full text-sm font-medium {statusClasses}">
			{#if status === 'good'}Good{:else if status === 'warning'}Warning{:else}Over Budget{/if}
		</div>
	</div>
	
	<div class="space-y-3">
		<div class="flex justify-between text-sm">
			<span class="text-gray-500">Remaining</span>
			<span class="font-semibold text-gray-900">{formatCurrency(remaining)}</span>
		</div>
		
		<div class="w-full bg-gray-200 rounded-full h-3">
			<div 
				class="h-3 rounded-full transition-all duration-300 {status === 'good' ? 'bg-success-500' : status === 'warning' ? 'bg-warning-500' : 'bg-danger-500'}"
				style="width: {Math.min(100, percentage)}%"
			></div>
		</div>
		
		<div class="flex justify-between text-sm text-gray-500">
			<span>0%</span>
			<span>{percentage.toFixed(1)}%</span>
			<span>100%</span>
		</div>
	</div>
</div>