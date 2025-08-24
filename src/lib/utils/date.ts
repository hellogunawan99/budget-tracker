export function formatDate(date: string | Date): string {
	const d = new Date(date);
	return d.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR'
	}).format(amount);
}

export function getCurrentMonth(): number {
	return new Date().getMonth() + 1;
}

export function getCurrentYear(): number {
	return new Date().getFullYear();
}

export function getMonthName(month: number): string {
	const months = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];
	return months[month - 1];
}

export function isPayday(): boolean {
	const today = new Date();
	return today.getDate() >= 25;
}

export function getNextPayday(): Date {
	const today = new Date();
	const currentMonth = today.getMonth();
	const currentYear = today.getFullYear();
	
	if (today.getDate() >= 25) {
		return new Date(currentYear, currentMonth + 1, 25);
	} else {
		return new Date(currentYear, currentMonth, 25);
	}
}

export function getDaysUntilPayday(): number {
	const today = new Date();
	const nextPayday = getNextPayday();
	const diffTime = nextPayday.getTime() - today.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getBudgetStatus(remaining: number, total: number): 'good' | 'warning' | 'danger' {
	const percentage = (remaining / total) * 100;
	
	if (percentage > 20) return 'good';
	if (percentage > 5) return 'warning';
	return 'danger';
}