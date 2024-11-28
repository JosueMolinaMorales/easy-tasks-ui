<script lang="ts">
	import { Card, Badge } from 'flowbite-svelte';
	import { gravatarUrl, token, user } from '../stores';
	import type { ColorVariant } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { Task } from '../stores';
	let tasks: Task[] = [];

	let isLoggedIn = false;

	onMount(async () => {
		// Check the session cookie
		const cookies = document.cookie.split('; ').reduce((acc: { [key: string]: string }, cookie) => {
			const [key, value] = cookie.split('=');
			acc[key] = value;
			return acc;
		}, {});

		if (cookies['auth-session']) {
			console.log('[DEBUG] AUTH SESSION EXISTS');
			isLoggedIn = true;
			const res = await fetch('http://localhost:3000/auth/user', {
				headers: {
					'Access-Control-Allow-Origin': '*'
				},
				credentials: 'include'
			});
			const profile = await res.json();
			console.log('[DEBUG] PROFILE FROM /auth/users: ', profile);

			$user = profile;
			console.log('[DEBUG} profile picture: ', profile.picture.trim());
			gravatarUrl.set(profile.picture.trim());
		}

		console.log('[DEBUG] onMount');
		// TODO: Fetch tasks from API
		const res = await fetch('http://localhost:3000/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		});

		if (res.status == 200) {
			const data = await res.json();
			console.log('[DEBUG] data: ', data);
			tasks = data;
			console.log('[DEBUG] tasks: ', tasks);
		}
	});

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
		{#if tasks.length > 0}
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
			<p class="mb-4 text-xl font-medium text-gray-900 dark:text-white">No Tasks!</p>
		{/if}
	{:else}
		<p class="mb-4 text-xl font-medium text-gray-900 dark:text-white">You are not logged in.</p>
	{/if}
</div>
