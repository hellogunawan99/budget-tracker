<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Settings, Download, Trash2, Database, Info, Shield, HelpCircle, FileText, CheckCircle, AlertTriangle } from 'lucide-svelte';

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

<div class="settings-page">
	<!-- Header -->
	<div class="page-header">
		<div class="header-content">
			<div class="header-icon">
				<Settings />
			</div>
			<div>
				<h1>Settings</h1>
				<p>Manage your budget tracker preferences and data</p>
			</div>
		</div>
	</div>

	<!-- Data Management Section -->
	<div class="section-header">
		<h2>Data Management</h2>
		<p>Export or manage your financial data</p>
	</div>

	<div class="data-grid">
		<!-- Export Card -->
		<div class="data-card">
			<div class="data-icon export">
				<Download />
			</div>
			<div class="data-content">
				<h3>Export to CSV</h3>
				<p>Download your budget and expense data as a CSV file for backup or analysis.</p>
				<Button on:click={exportData}>
					<Download class="w-4 h-4" />
					Export Data
				</Button>
			</div>
		</div>

		<!-- Clear Data Card -->
		<div class="data-card danger">
			<div class="data-icon clear">
				<Trash2 />
			</div>
			<div class="data-content">
				<h3>Clear All Data</h3>
				<p>Remove all your budget and expense data. This action cannot be undone.</p>
				<Button variant="danger" on:click={clearData}>
					<Trash2 class="w-4 h-4" />
					Clear All Data
				</Button>
			</div>
		</div>
	</div>

	<!-- About Section -->
	<div class="section-header">
		<h2>About</h2>
		<p>Application information and documentation</p>
	</div>

	<div class="about-grid">
		<!-- App Info Card -->
		<div class="about-card">
			<div class="about-icon">
				<Info />
			</div>
			<div class="about-content">
				<h3>Budget Tracker</h3>
				<span class="version-badge">v1.0.0</span>
				<p>A comprehensive financial management application to help you track expenses, plan budgets, and achieve savings goals.</p>
			</div>
		</div>

		<!-- Features Card -->
		<div class="about-card">
			<div class="about-icon features">
				<CheckCircle />
			</div>
			<div class="about-content">
				<h3>Features</h3>
				<ul class="features-list">
					<li>
						<CheckCircle class="w-4 h-4" />
						Monthly budget planning
					</li>
					<li>
						<CheckCircle class="w-4 h-4" />
						Daily expense tracking
					</li>
					<li>
						<CheckCircle class="w-4 h-4" />
						Visual analytics and charts
					</li>
					<li>
						<CheckCircle class="w-4 h-4" />
						Savings goal tracking
					</li>
					<li>
						<CheckCircle class="w-4 h-4" />
						Data export capabilities
					</li>
				</ul>
			</div>
		</div>

		<!-- Help Card -->
		<div class="about-card">
			<div class="about-icon help">
				<HelpCircle />
			</div>
			<div class="about-content">
				<h3>Help & Support</h3>
				<p>Need assistance? Here's how you can get help:</p>
				<ul class="help-list">
					<li>
						<FileText class="w-4 h-4" />
						Check the user guide for detailed instructions
					</li>
					<li>
						<Shield class="w-4 h-4" />
						Your data is stored securely and never shared
					</li>
				</ul>
			</div>
		</div>
	</div>

	<!-- Security Notice -->
	<div class="security-notice">
		<div class="security-icon">
			<Shield />
		</div>
		<div class="security-content">
			<h4>Your Data is Secure</h4>
			<p>All your financial data is stored locally on your device. We use industry-standard security practices to protect your information.</p>
		</div>
	</div>
</div>

<style>
	.settings-page {
		padding: 1.5rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
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

	/* Section Header */
	.section-header {
		margin-bottom: 1rem;
	}

	.section-header h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.25rem 0;
	}

	.section-header p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	/* Data Grid */
	.data-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.data-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
		display: flex;
		gap: 1.25rem;
		transition: all 0.2s;
	}

	.data-card:hover {
		border-color: #d1d5db;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.data-card.danger {
		border-color: #fecaca;
	}

	.data-card.danger:hover {
		border-color: #fca5a5;
		box-shadow: 0 4px 12px rgba(239, 68, 68, 0.1);
	}

	.data-icon {
		width: 56px;
		height: 56px;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.data-icon :global(svg) {
		width: 28px;
		height: 28px;
	}

	.data-icon.export {
		background: #f3f4f6;
		color: #1f2937;
	}

	.data-icon.clear {
		background: #f3f4f6;
		color: #dc2626;
	}

	.data-content {
		flex: 1;
	}

	.data-content h3 {
		font-size: 1.0625rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.data-content p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0 0 1rem 0;
		line-height: 1.5;
	}

	/* About Grid */
	.about-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.about-card {
		background: white;
		border-radius: 1rem;
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
	}

	.about-icon {
		width: 48px;
		height: 48px;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		background: #f3f4f6;
		color: #1f2937;
	}

	.about-icon :global(svg) {
		width: 24px;
		height: 24px;
	}

	.about-icon.features {
		background: #f3f4f6;
		color: #1f2937;
	}

	.about-icon.help {
		background: #f3f4f6;
		color: #1f2937;
	}

	.about-content h3 {
		font-size: 1rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.about-content p {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0;
		line-height: 1.6;
	}

	.version-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: #e0e7ff;
		color: #4f46e5;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
		margin-bottom: 0.75rem;
	}

	.features-list,
	.help-list {
		list-style: none;
		padding: 0;
		margin: 0.75rem 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.features-list li,
	.help-list li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.8125rem;
		color: #374151;
	}

	.features-list li :global(svg) {
		color: #1f2937;
		flex-shrink: 0;
	}

	.help-list li :global(svg) {
		color: #6b7280;
		flex-shrink: 0;
	}

	/* Security Notice */
	.security-notice {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
		padding: 1.25rem;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: 1rem;
	}

	.security-icon {
		width: 40px;
		height: 40px;
		background: #d1fae5;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #059669;
		flex-shrink: 0;
	}

	.security-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.security-content h4 {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #166534;
		margin: 0 0 0.25rem 0;
	}

	.security-content p {
		font-size: 0.8125rem;
		color: #15803d;
		margin: 0;
		line-height: 1.5;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.settings-page {
			padding: 1rem;
		}

		.data-grid {
			grid-template-columns: 1fr;
		}

		.data-card {
			flex-direction: column;
		}
	}
</style>
