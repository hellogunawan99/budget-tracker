<script lang="ts">
	export let label: string = '';
	export let value: string | number = '';
	export let options: { value: string | number; label: string }[] = [];
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let error: string = '';
	export let id: string = '';
	export let placeholder: string = 'Select an option';
</script>

<div class="space-y-1">
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-700">
			{label}
			{#if required}<span class="text-red-500">*</span>{/if}
		</label>
	{/if}
	
	<select
		bind:value
		{id}
		{required}
		{disabled}
		class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500 {error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}"
		on:change
		on:blur
		on:focus
	>
		<option value="" disabled>{placeholder}</option>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	
	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}
</div>