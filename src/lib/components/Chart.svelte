<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, registerables } from 'chart.js';

	export let type: 'doughnut' | 'bar' | 'line' = 'doughnut';
	export let data: any;
	export let options: any = {};
	export let height: number = 300;

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		Chart.register(...registerables);
		createChart();
		
		return () => {
			if (chart) {
				chart.destroy();
			}
		};
	});

	$: if (chart && data) {
		updateChart();
	}

	function createChart() {
		if (!canvas || !data) return;

		const defaultOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					position: type === 'doughnut' ? 'bottom' : 'top'
				}
			}
		};

		chart = new Chart(canvas, {
			type,
			data,
			options: { ...defaultOptions, ...options }
		});
	}

	function updateChart() {
		if (!chart) return;
		
		chart.data = data;
		chart.update();
	}
</script>

<div style="height: {height}px; position: relative;">
	<canvas bind:this={canvas}></canvas>
</div>