<script lang="ts">
	import { page } from '$app/stores';
	import { Home, TrendingUp, PlusCircle, BarChart3, Target, Settings } from 'lucide-svelte';

	const navigation = [
		{ name: 'Dashboard', href: '/', icon: Home },
		{ name: 'Budget Planning', href: '/budget', icon: TrendingUp },
		{ name: 'Add Expense', href: '/expenses', icon: PlusCircle },
		{ name: 'Savings Goals', href: '/savings-goals', icon: Target },
		{ name: 'Analytics', href: '/analytics', icon: BarChart3 },
		{ name: 'Settings', href: '/settings', icon: Settings }
	];

	$: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="bg-white shadow-sm border-b border-gray-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<div class="flex items-center">
					<div class="flex-shrink-0">
						<h1 class="text-xl font-bold text-blue-600">Budget Tracker</h1>
					</div>
					<div class="hidden md:ml-10 md:flex md:space-x-8">
						{#each navigation as item}
							<a
								href={item.href}
								class="inline-flex items-center px-1 pt-1 text-sm font-medium {currentPath === item.href
									? 'text-blue-600 border-b-2 border-blue-600'
									: 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
							>
								<svelte:component this={item.icon} class="w-4 h-4 mr-2" />
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<div class="md:hidden">
			<div class="pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
				{#each navigation as item}
					<a
						href={item.href}
						class="flex items-center px-4 py-2 text-base font-medium {currentPath === item.href
							? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600'
							: 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}"
					>
						<svelte:component this={item.icon} class="w-5 h-5 mr-3" />
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	</nav>

	<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
		<slot />
	</main>
</div>