<script lang="ts">
	import { Card, Badge } from 'flowbite-svelte';
	import { token, user } from '../../stores';
	import type { ColorVariant } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { Task } from '../../stores';
	let tasks: Task[] = [];

	onMount(async () => {
		console.log('[DEBUG] onMount');
		// TODO: Fetch tasks from API
		const bearerToken = $token;
		const res = await fetch('http://localhost:3000/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearerToken}`
			}
		});

		if (res.status == 200) {
			const data = await res.json();
			console.log('[DEBUG] data: ', data);
			tasks = data;
			console.log('[DEBUG] tasks: ', tasks);
		}
	});

	let isLoggedIn = false;
	user.subscribe((value) => {
		console.log('[DEBUG] value: ', value);
		console.log('[DEBUG] isLoggedIn: ', Object.keys(value).length > 0);
		isLoggedIn = Object.keys(value).length > 0;
	});

	let priorites: { [key: string]: ColorVariant } = {
		low: 'dark',
		medium: 'yellow',
		high: 'red'
	};
</script>

<div class="container mx-auto h-screen">
	{#if isLoggedIn}
		<div class="grid grid-cols-3">
			{#each tasks as task}
				<Card class="flex-column m-4 flex justify-evenly">
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h1>
					<p class="mtb-4 text-gray-300 dark:text-white">{task.description}</p>
					<div class="mt-4 flex">
						<Badge color={priorites[task.priority.toString()]}>{task.priority}</Badge>
					</div>
				</Card>
			{/each}
		</div>
	{:else}
		<p class="mb-4 text-xl font-medium text-gray-900 dark:text-white">You are not logged in.</p>
	{/if}
</div>
