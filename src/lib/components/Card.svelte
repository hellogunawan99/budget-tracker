<script lang="ts">
	export let title: string = '';
	export let subtitle: string = '';
	export let padding: boolean = true;
	export let hover: boolean = false;
</script>

<div 
	class="bg-white rounded-xl shadow-sm border border-gray-100 {hover ? 'hover:shadow-md transition-shadow duration-200' : ''} {padding ? 'p-6' : ''}"
>
	{#if title || subtitle}
		<div class="mb-4">
			{#if title}
				<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
			{/if}
			{#if subtitle}
				<p class="text-sm text-gray-500 mt-1">{subtitle}</p>
			{/if}
		</div>
	{/if}
	
	<slot />
</div>