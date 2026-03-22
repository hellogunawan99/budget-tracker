<script lang="ts">
	import { page } from "$app/stores";
	import {
		Home,
		TrendingUp,
		PlusCircle,
		BarChart3,
		Target,
		Settings,
		LogOut,
		Menu,
		X,
		PiggyBank
	} from "lucide-svelte";

	let mobileMenuOpen = false;

	const navigation = [
		{ name: "Dashboard", href: "/", icon: Home },
		{ name: "Budget Planning", href: "/budget", icon: TrendingUp },
		{ name: "Add Expense", href: "/expenses", icon: PlusCircle },
		{ name: "Savings Goals", href: "/savings-goals", icon: Target },
		{ name: "Analytics", href: "/analytics", icon: BarChart3 },
		{ name: "Settings", href: "/settings", icon: Settings }
	];

	$: currentPath = $page.url.pathname;

	async function handleLogout() {
		try {
			await fetch("/api/auth/logout", {
				method: "POST",
				credentials: "include"
			});
			window.location.href = "/";
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function isActive(href: string): boolean {
		if (href === "/") {
			return currentPath === "/";
		}
		return currentPath.startsWith(href);
	}
</script>

<svelte:head>
	<title>Budget Tracker</title>
</svelte:head>

<svelte:body class:mobile-menu-open={mobileMenuOpen} />

<!-- Mobile Top Header -->
<header class="mobile-header">
	<div class="mobile-header-content">
		<div class="mobile-brand">
			<div class="mobile-logo">
				<PiggyBank />
			</div>
			<span class="mobile-title">Budget Tracker</span>
		</div>
		<button
			on:click={toggleMobileMenu}
			class="menu-toggle"
			aria-label="Toggle navigation menu"
		>
			{#if mobileMenuOpen}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>
	</div>
</header>

<!-- Mobile Sidebar Backdrop -->
{#if mobileMenuOpen}
	<div
		class="mobile-backdrop"
		on:click={closeMobileMenu}
		on:keydown={(e) => e.key === "Escape" && closeMobileMenu()}
		role="button"
		tabindex="0"
		aria-label="Close sidebar"
	></div>
{/if}

<!-- Sidebar -->
<aside class="sidebar" class:sidebar-open={mobileMenuOpen}>
	<!-- Sidebar Header -->
	<div class="sidebar-header">
		<div class="brand">
			<div class="logo">
				<PiggyBank />
			</div>
			<div class="brand-text">
				<span class="brand-name">Budget Tracker</span>
				<span class="brand-tagline">Smart Finance</span>
			</div>
		</div>
		<button
			on:click={closeMobileMenu}
			class="close-sidebar-btn"
			aria-label="Close menu"
		>
			<X />
		</button>
	</div>

	<!-- Navigation -->
	<nav class="sidebar-nav">
		<div class="nav-section">
			<span class="nav-section-title">Menu</span>
			{#each navigation as item (item.name)}
				<a
					href={item.href}
					on:click={closeMobileMenu}
					class="nav-item"
					class:active={isActive(item.href)}
				>
					<div class="nav-icon-wrapper">
						<svelte:component this={item.icon} />
					</div>
					<span class="nav-label">{item.name}</span>
					{#if isActive(item.href)}
						<div class="active-indicator"></div>
					{/if}
				</a>
			{/each}
		</div>
	</nav>

	<!-- Sidebar Footer -->
	<div class="sidebar-footer">
		<button
			on:click={() => { handleLogout(); closeMobileMenu(); }}
			class="logout-btn"
		>
			<div class="logout-icon">
				<LogOut />
			</div>
			<span>Logout</span>
		</button>
	</div>
</aside>

<!-- Main Content -->
<main class="main-content">
	<slot />
</main>

<style>
	/* Mobile header */
	.mobile-header {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 30;
		background: white;
		border-bottom: 1px solid #e5e7eb;
	}

	.mobile-header-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem;
	}

	.mobile-brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.mobile-logo {
		width: 36px;
		height: 36px;
		background: #1f2937;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.mobile-logo :global(svg) {
		width: 20px;
		height: 20px;
	}

	.mobile-title {
		font-size: 1rem;
		font-weight: 700;
		color: #1f2937;
	}

	.menu-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 0.5rem;
		color: #4b5563;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.menu-toggle:hover {
		background: #f3f4f6;
	}

	.menu-toggle :global(svg) {
		width: 24px;
		height: 24px;
	}

	.menu-toggle:focus {
		outline: 2px solid #1f2937;
		outline-offset: 2px;
	}

	/* Mobile backdrop */
	.mobile-backdrop {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: rgba(0, 0, 0, 0.5);
	}

	/* Body scroll lock */
	:global(body.mobile-menu-open) {
		overflow: hidden;
		touch-action: none;
	}

	/* Sidebar */
	.sidebar {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 280px;
		z-index: 50;
		background: white;
		display: flex;
		flex-direction: column;
		transform: translateX(-100%);
		transition: transform 0.3s ease-in-out;
	}

	/* Sidebar header */
	.sidebar-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.25rem 1.25rem;
		border-bottom: 1px solid #e5e7eb;
		background: #1f2937;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.logo {
		width: 44px;
		height: 44px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.logo :global(svg) {
		width: 24px;
		height: 24px;
	}

	.brand-text {
		display: flex;
		flex-direction: column;
	}

	.brand-name {
		font-size: 1rem;
		font-weight: 700;
		color: white;
	}

	.brand-tagline {
		font-size: 0.6875rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.close-sidebar-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 0.5rem;
		color: white;
		background: rgba(255, 255, 255, 0.2);
		border: none;
		cursor: pointer;
		transition: all 0.2s;
	}

	.close-sidebar-btn:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	.close-sidebar-btn :global(svg) {
		width: 20px;
		height: 20px;
	}

	/* Sidebar navigation */
	.sidebar-nav {
		flex: 1;
		padding: 1rem 0;
		overflow-y: auto;
	}

	.nav-section {
		padding: 0 0.75rem;
	}

	.nav-section-title {
		display: block;
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #9ca3af;
		padding: 0 0.5rem;
		margin-bottom: 0.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		margin-bottom: 0.25rem;
		border-radius: 0.75rem;
		color: #4b5563;
		text-decoration: none;
		min-height: 48px;
		transition: all 0.2s;
		position: relative;
	}

	.nav-item:hover {
		background: #f9fafb;
	}

	.nav-item.active {
		background: #f3f4f6;
	}

	.nav-icon-wrapper {
		width: 40px;
		height: 40px;
		border-radius: 0.625rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f3f4f6;
		color: #6b7280;
		transition: all 0.2s;
	}

	.nav-item:hover .nav-icon-wrapper {
		background: #e5e7eb;
	}

	.nav-item.active .nav-icon-wrapper {
		background: #1f2937;
		color: white;
	}

	.nav-icon-wrapper :global(svg) {
		width: 20px;
		height: 20px;
	}

	.nav-label {
		flex: 1;
		font-size: 0.9375rem;
		font-weight: 500;
	}

	.nav-item.active .nav-label {
		color: #1f2937;
		font-weight: 600;
	}

	.active-indicator {
		position: absolute;
		right: 1rem;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #1f2937;
	}

	/* Sidebar footer */
	.sidebar-footer {
		padding: 1rem;
		border-top: 1px solid #e5e7eb;
	}

	.logout-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		padding: 0.875rem 1rem;
		border-radius: 0.75rem;
		color: #dc2626;
		background: transparent;
		border: none;
		cursor: pointer;
		min-height: 48px;
		transition: all 0.2s;
	}

	.logout-btn:hover {
		background: #fef2f2;
	}

	.logout-icon {
		width: 40px;
		height: 40px;
		border-radius: 0.625rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fef2f2;
		color: #dc2626;
	}

	.logout-btn:hover .logout-icon {
		background: #fee2e2;
	}

	.logout-icon :global(svg) {
		width: 20px;
		height: 20px;
	}

	.logout-btn span {
		font-size: 0.9375rem;
		font-weight: 500;
	}

	/* Main content */
	.main-content {
		padding-top: 4rem;
		min-height: 100vh;
		background: #f9fafb;
	}

	/* Mobile: sidebar visible only when open class is added */
	@media (max-width: 767px) {
		.sidebar.sidebar-open {
			transform: translateX(0);
		}
	}

	/* Desktop styles */
	@media (min-width: 768px) {
		.mobile-header {
			display: none;
		}

		.sidebar {
			transform: translateX(0);
		}

		.close-sidebar-btn {
			display: none;
		}

		.main-content {
			margin-left: 280px;
			padding-top: 0;
		}
	}
</style>
