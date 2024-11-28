<script lang="ts">
	import {
		Navbar,
		NavBrand,
		Avatar,
		Dropdown,
		DropdownItem,
		Button,
		DarkMode,
		NavHamburger,
		NavUl,
		NavLi
	} from 'flowbite-svelte';
	import NavContainer from 'flowbite-svelte/NavContainer.svelte';
	import { gravatarUrl, token, user } from '../../stores';
	import { page } from '$app/stores';
	import type { User } from '../../stores';

	$: activeUrl = $page.url.pathname;
	$: gravUrl = $gravatarUrl;

	function signOut() {
		console.log('[DEBUG] Signing out');
		user.set({} as User);
		token.set('');
		gravatarUrl.set('');
	}

	async function onAuthClick() {
		console.log('[DEBUG] CALLING LOGIN ROUTE');
		window.location.href = 'http://localhost:3000/auth/login';
	}

	let activeClass =
		'text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<Navbar class="mb-4">
	<NavContainer>
		<NavBrand href="/">
			<img src="/8_1sasa11.jpg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
				>Easy Tasks</span
			>
		</NavBrand>
		<div class="flex md:order-2">
			{#if $gravatarUrl}
				<Avatar src={gravUrl} class="cursor-pointer" rounded />
				<Dropdown>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem>
					<DropdownItem on:click={signOut}>Sign out</DropdownItem>
				</Dropdown>
			{:else}
				<Button size="sm" on:click={onAuthClick}>Login/Sign Up</Button>
			{/if}
			<DarkMode />
			<NavHamburger />
		</div>
		<NavUl class="order-1" {activeUrl} {activeClass} {nonActiveClass}>
			<NavLi href="/home">Home</NavLi>
			<NavLi href="/about">About</NavLi>
			<NavLi href="/docs/components/navbar">Navbar</NavLi>
			<NavLi href="/pricing">Pricing</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</NavContainer>
</Navbar>
