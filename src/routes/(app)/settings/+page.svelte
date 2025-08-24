<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import { Download, Upload, Trash2, Settings as SettingsIcon } from 'lucide-svelte';

	async function exportData() {
		try {
			const response = await fetch('/api/export/csv');
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `budget-tracker-export-${new Date().toISOString().split('T')[0]}.csv`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Export failed:', error);
			alert('Failed to export data. Please try again.');
		}
	}

	function clearData() {
		if (confirm('Are you sure you want to clear all your data? This action cannot be undone.')) {
			alert('Data clearing functionality would be implemented here.');
		}
	}
</script>

<svelte:head>
	<title>Settings - Budget Tracker</title>
</svelte:head>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold text-gray-900">Settings</h1>
		<p class="text-gray-500 mt-1">Manage your budget tracker preferences and data</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Data Management -->
		<Card title="Data Management" subtitle="Export or manage your financial data">
			<div class="space-y-4">
				<div>
					<h4 class="font-medium text-gray-900 mb-2">Export Data</h4>
					<p class="text-sm text-gray-600 mb-4">Download your budget and expense data as a CSV file.</p>
					<Button on:click={exportData}>
						<Download class="w-4 h-4 mr-2" />
						Export to CSV
					</Button>
				</div>
				
				<hr class="border-gray-200">
				
				<div>
					<h4 class="font-medium text-gray-900 mb-2">Clear All Data</h4>
					<p class="text-sm text-gray-600 mb-4">Remove all your budget and expense data. This action cannot be undone.</p>
					<Button variant="danger" on:click={clearData}>
						<Trash2 class="w-4 h-4 mr-2" />
						Clear All Data
					</Button>
				</div>
			</div>
		</Card>

		<!-- App Information -->
		<Card title="About Budget Tracker" subtitle="Application information and help">
			<div class="space-y-4">
				<div>
					<h4 class="font-medium text-gray-900">Version</h4>
					<p class="text-sm text-gray-600">Budget Tracker v1.0.0</p>
				</div>
				
				<div>
					<h4 class="font-medium text-gray-900">Features</h4>
					<ul class="text-sm text-gray-600 space-y-1">
						<li>• Monthly budget planning</li>
						<li>• Daily expense tracking</li>
						<li>• Visual analytics and charts</li>
						<li>• Savings goal tracking</li>
						<li>• Data export capabilities</li>
					</ul>
				</div>
				
				<div>
					<h4 class="font-medium text-gray-900">Support</h4>
					<p class="text-sm text-gray-600">For help or questions, please refer to the user guide or contact support.</p>
				</div>
			</div>
		</Card>
	</div>

	<!-- Quick Stats -->
	<Card title="Quick Stats" subtitle="Overview of your data">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<div class="text-center p-4 bg-gray-50 rounded-lg">
				<div class="text-2xl font-bold text-gray-900">1</div>
				<div class="text-sm text-gray-600">Active Budgets</div>
			</div>
			<div class="text-center p-4 bg-gray-50 rounded-lg">
				<div class="text-2xl font-bold text-gray-900">12</div>
				<div class="text-sm text-gray-600">Categories</div>
			</div>
			<div class="text-center p-4 bg-gray-50 rounded-lg">
				<div class="text-2xl font-bold text-gray-900">0</div>
				<div class="text-sm text-gray-600">Expenses</div>
			</div>
			<div class="text-center p-4 bg-gray-50 rounded-lg">
				<div class="text-2xl font-bold text-gray-900">0</div>
				<div class="text-sm text-gray-600">Savings Goals</div>
			</div>
		</div>
	</Card>
</div>