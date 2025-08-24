<script lang="ts">
	export let label: string = '';
	export let name: string = '';
	export let type: string = 'text';
	export let value: string | number = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let error: string = '';
	export let id: string = '';
	export let step: string = '';
	export let min: string = '';

	let inputElement: HTMLInputElement;

	export function focus() {
		inputElement?.focus();
	}
</script>

<div class="space-y-1">
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-700">
			{label}
			{#if required}<span class="text-red-500">*</span>{/if}
		</label>
	{/if}
	
	<input
		bind:this={inputElement}
		bind:value
		{name}
		{type}
		{id}
		{placeholder}
		{required}
		{disabled}
		{step}
		{min}
		class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 {error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}"
		on:blur
		on:focus
		on:input
		on:change
	/>
	
	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}
</div>