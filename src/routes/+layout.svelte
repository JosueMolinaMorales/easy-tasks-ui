<script>
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		DarkMode,
		Button,
		Modal,
		Label,
		Input,
		Checkbox,
		Footer,
		FooterCopyright,
		FooterLink,
		FooterLinkGroup
	} from 'flowbite-svelte';
	import '../app.css';
	import NavContainer from 'flowbite-svelte/NavContainer.svelte';

	$: activeUrl = $page.url.pathname;
	let activeClass =
		'text-white bg-green-700 md:bg-transparent md:text-green-700 md:dark:text-white dark:bg-green-600 md:dark:bg-transparent';
	let nonActiveClass =
		'text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
	let defaultModal = false;
	let openSignUp = false;
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
			<Button size="sm" on:click={() => (defaultModal = true)}>Login/Sign Up</Button>
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
<Modal size="xs" class="w-full" bind:open={defaultModal} autoclose outsideclose>
	<form class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign In To Easy Tasks!</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input type="email" name="email" placeholder="johndoe@email.com" required />
		</Label>
		<Label class="space-y-2">
			<span>Password</span>
			<Input type="password" name="password" placeholder="••••••" required />
		</Label>
		<div class="flex items-start">
			<Checkbox>Remember Me</Checkbox>
			<a href="/" class="text-primary-700 dark:text-primary-500 ms-auto text-sm hover:underline">
				Lost password?
			</a>
		</div>
		<Button type="submit" class="w-full1">Login to your account</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <button
				class="text-primary-700 dark:text-primary-500 hover:underline"
				on:click={() => (openSignUp = true)}
				tabindex="-1"
			>
				Create account
			</button>
		</div>
		<div>
			<div class="inline-flex w-full items-center justify-center">
				<hr class="mx-2 my-2 h-1 w-36 rounded border-0 bg-gray-100 md:my-6 dark:bg-gray-700" />
				<p class="text-sm text-gray-900 dark:text-gray-400">or login with</p>
				<hr class="mx-2 my-2 h-1 w-36 rounded border-0 bg-gray-100 md:my-6 dark:bg-gray-700" />
			</div>
			<div class="w- flex justify-evenly">
				<img src="google_icon.png" width="30px" height="30px" alt="Google Icon" />
				<img src="github.png" width="30px" height="30px" alt="Github Icon" />
				<img src="facebook_logo.png" width="30px" height="30px" alt="Facebook Icon" />
			</div>
		</div>
	</form>
</Modal>
<Modal size="md" class="w-full" bind:open={openSignUp} autoclose outsideclose>
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign Up</h3>
	<form>
		<div class=" grid grid-cols-2 grid-rows-3 gap-3">
			<Label class="space-y-2">
				<span>First Name</span>
				<Input type="text" name="firstname" placeholder="john" required />
			</Label>
			<Label class="space-y-2">
				<span>Last Name</span>
				<Input type="text" name="lastname" placeholder="doe" required />
			</Label>
			<Label class="space-y-2">
				<span>Email</span>
				<Input type="email" name="email" placeholder="johndoe@gmail.com" required />
			</Label>
			<Label class="space-y-2">
				<span>Username</span>
				<Input type="text" name="username" placeholder="jdoe" required />
			</Label>
			<Label class="space-y-2">
				<span>Password</span>
				<Input type="password" name="password" placeholder="••••••" required />
			</Label>
			<Label class="space-y-2">
				<span>Confirm Password</span>
				<Input type="password" name="confirm_password" placeholder="••••••" required />
			</Label>
		</div>
		<Button type="submit" class="mt-5 w-full">Create Account</Button>
	</form>
	<div>
		<div class="inline-flex w-full items-center justify-center">
			<hr class="mx-2 my-2 h-1 w-48 rounded border-0 bg-gray-100 md:my-6 dark:bg-gray-700" />
			<p class="text-sm text-gray-900 dark:text-gray-400">or sign up with</p>
			<hr class="mx-2 my-2 h-1 w-48 rounded border-0 bg-gray-100 md:my-6 dark:bg-gray-700" />
		</div>
		<div class="w- flex justify-evenly">
			<img src="google_icon.png" width="30px" height="30px" alt="Google Icon" />
			<img src="github.png" width="30px" height="30px" alt="Github Icon" />
			<img src="facebook_logo.png" width="30px" height="30px" alt="Facebook Icon" />
		</div>
	</div>
</Modal>
<slot></slot>
<Footer>
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterCopyright href="/" by="Flowbite™" year={2022} />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
		>
			<FooterLink href="/">About</FooterLink>
			<FooterLink href="/">Privacy Policy</FooterLink>
			<FooterLink href="/">Licensing</FooterLink>
			<FooterLink href="/">Contact</FooterLink>
		</FooterLinkGroup>
	</div>
</Footer>
