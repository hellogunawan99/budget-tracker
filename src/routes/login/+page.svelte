<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { PiggyBank } from "lucide-svelte";

	let showLogin = true;
	let email = "";
	let password = "";
	let name = "";
	let error = "";
	let loading = false;
	let showPassword = false;

	async function handleSubmit() {
		error = "";
		loading = true;

		try {
			const endpoint = showLogin ? "/api/auth/login" : "/api/auth/register";
			const body = showLogin
				? { email, password }
				: { email, password, name };

			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
				credentials: "include"
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.error || "Authentication failed";
				return;
			}

			goto("/");
		} catch (e) {
			error = "Network error. Please try again.";
		} finally {
			loading = false;
		}
	}

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

<svelte:head>
	<title>{showLogin ? "Sign In" : "Create Account"} - Budget Tracker</title>
</svelte:head>

<div class="auth-container">
	<div class="auth-card">
		<!-- Logo/Brand section -->
		<div class="brand-section">
			<div class="logo">
				<PiggyBank size={32} />
			</div>
			<h1 class="brand-name">Budget Tracker</h1>
			<p class="brand-tagline">Manage your finances with ease</p>
		</div>

		<!-- Form section -->
		<div class="form-section">
			<div class="form-header">
				<h2>{showLogin ? "Welcome back" : "Create your account"}</h2>
				<p>{showLogin ? "Sign in to continue" : "Get started for free"}</p>
			</div>

			<form on:submit|preventDefault={handleSubmit} class="auth-form">
				{#if !showLogin}
					<div class="form-group">
						<label for="name">Full Name</label>
						<input
							id="name"
							type="text"
							bind:value={name}
							required
							placeholder="John Doe"
						/>
					</div>
				{/if}

				<div class="form-group">
					<label for="email">Email</label>
					<input
						id="email"
						type="email"
						bind:value={email}
						required
						placeholder="you@example.com"
					/>
				</div>

				<div class="form-group">
					<label for="password">Password</label>
					<div class="password-wrapper">
						<input
							id="password"
							type={showPassword ? "text" : "password"}
							bind:value={password}
							required
							minlength="8"
							placeholder="Min. 8 characters"
						/>
						<button type="button" class="password-toggle" on:click={togglePassword}>
							{#if showPassword}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
									<line x1="1" y1="1" x2="23" y2="23"/>
								</svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
									<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-8z"/>
									<circle cx="12" cy="12" r="3"/>
								</svg>
							{/if}
						</button>
					</div>
				</div>

				{#if error}
					<div class="error-message">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<circle cx="12" cy="12" r="10"/>
							<line x1="12" y1="8" x2="12" y2="12"/>
							<line x1="12" y1="16" x2="12.01" y2="16"/>
						</svg>
						{error}
					</div>
				{/if}

				<button type="submit" disabled={loading} class="submit-btn">
					{#if loading}
						<span class="spinner"></span>
						Processing...
					{:else}
						{showLogin ? "Sign In" : "Create Account"}
					{/if}
				</button>
			</form>

			<div class="form-footer">
				<p>
					{showLogin ? "Don't have an account?" : "Already have an account?"}
					<button
						type="button"
						on:click={() => { showLogin = !showLogin; error = ""; }}
					>
						{showLogin ? "Sign up" : "Sign in"}
					</button>
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.auth-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background: #f8f9fa;
	}

	.auth-card {
		background: white;
		border-radius: 1rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
		width: 100%;
		max-width: 380px;
		overflow: hidden;
	}

	.brand-section {
		padding: 2rem 2rem 1.5rem;
		text-align: center;
		border-bottom: 1px solid #e5e7eb;
	}

	.logo {
		width: 56px;
		height: 56px;
		margin: 0 auto 0.75rem;
		background: #1f2937;
		border-radius: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.brand-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: #111827;
		margin: 0 0 0.25rem;
	}

	.brand-tagline {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	.form-section {
		padding: 1.5rem 2rem 2rem;
	}

	.form-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.form-header h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
		margin: 0 0 0.25rem;
	}

	.form-header p {
		font-size: 0.875rem;
		color: #6b7280;
		margin: 0;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}

	.form-group label {
		font-size: 0.8125rem;
		font-weight: 500;
		color: #374151;
	}

	.form-group input {
		width: 100%;
		padding: 0.625rem 0.875rem;
		border: 1px solid #d1d5db;
		border-radius: 0.5rem;
		font-size: 0.9375rem;
		color: #111827;
		transition: border-color 0.2s, box-shadow 0.2s;
		box-sizing: border-box;
	}

	.form-group input:focus {
		outline: none;
		border-color: #1f2937;
		box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
	}

	.form-group input::placeholder {
		color: #9ca3af;
	}

	.password-wrapper {
		position: relative;
	}

	.password-wrapper input {
		padding-right: 2.5rem;
	}

	.password-toggle {
		position: absolute;
		right: 0.75rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		color: #9ca3af;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.password-toggle:hover {
		color: #6b7280;
	}

	.error-message {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.625rem 0.75rem;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 0.5rem;
		color: #dc2626;
		font-size: 0.8125rem;
	}

	.submit-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		width: 100%;
		padding: 0.75rem 1rem;
		background: #1f2937;
		color: white;
		border: none;
		border-radius: 0.5rem;
		font-size: 0.9375rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-top: 0.5rem;
	}

	.submit-btn:hover:not(:disabled) {
		background: #111827;
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.form-footer {
		margin-top: 1.25rem;
		text-align: center;
	}

	.form-footer p {
		font-size: 0.8125rem;
		color: #6b7280;
		margin: 0;
	}

	.form-footer button {
		background: none;
		border: none;
		color: #1f2937;
		font-weight: 600;
		cursor: pointer;
		padding: 0;
		font-size: 0.8125rem;
	}

	.form-footer button:hover {
		text-decoration: underline;
	}

	@media (max-width: 480px) {
		.auth-card {
			border-radius: 0.75rem;
		}

		.brand-section {
			padding: 1.5rem 1.25rem 1.25rem;
		}

		.form-section {
			padding: 1.25rem;
		}
	}
</style>
