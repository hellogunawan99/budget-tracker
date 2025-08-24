<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import type { ExpenseCategory } from '$lib/database/db.js';

	export let categories: ExpenseCategory[] = [];
	export let loading: boolean = false;
	export let submitText: string = 'Add Expense';

	let form = {
		categoryId: '',
		amount: '',
		description: '',
		expenseDate: new Date().toISOString().split('T')[0]
	};

	const dispatch = createEventDispatcher();

	function handleSubmit() {
		if (!form.categoryId || !form.amount || !form.expenseDate) return;

		dispatch('submit', {
			categoryId: parseInt(form.categoryId),
			amount: parseFloat(form.amount),
			description: form.description,
			expenseDate: form.expenseDate
		});

		form = {
			categoryId: '',
			amount: '',
			description: '',
			expenseDate: new Date().toISOString().split('T')[0]
		};
	}

	$: categoryOptions = categories.map(cat => ({
		value: cat.id.toString(),
		label: cat.name
	}));
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-4">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<Select
			label="Category"
			bind:value={form.categoryId}
			options={categoryOptions}
			required
			placeholder="Select a category"
		/>
		
		<Input
			label="Amount"
			type="number"
			step="0.01"
			min="0"
			bind:value={form.amount}
			placeholder="0.00"
			required
		/>
	</div>
	
	<Input
		label="Date"
		type="date"
		bind:value={form.expenseDate}
		required
	/>
	
	<Input
		label="Description (Optional)"
		bind:value={form.description}
		placeholder="What was this expense for?"
	/>
	
	<div class="flex justify-end">
		<Button type="submit" {loading}>{submitText}</Button>
	</div>
</form>