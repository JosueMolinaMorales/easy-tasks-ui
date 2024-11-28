<script lang="ts">
	import { Button, Modal, Label, Input, Checkbox } from 'flowbite-svelte';
	import '../app.css';
	import { gravatarUrl, token, user } from '../stores';
	import Navbar from '$lib/components/navbar.svelte';
	import SpeedDial from '$lib/components/speed-dial.svelte';
	import Footer from '$lib/components/footer.svelte';

	let email = '';
	let password = '';
	async function login() {
		console.log('[DEBUG] Logging in');
		try {
			const response = await fetch('http://localhost:3000/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					password
				})
			});

			if (response.status == 200) {
				const res = await response.json();
				console.log('[DEBUG] Setting user in store');
				console.log('[DEBUG] res.user: ', res.user);
				$user = res.user;
				defaultModal = false;
				token.set(res.token);
				gravatarUrl.set(res.gravatar_url);
			}
		} catch (error) {
			console.error(error);
		}
	}

	let username = '';
	let firstname = '';
	let lastname = '';
	async function register() {
		// TODO
		const signUp = {
			email: email,
			username: username,
			password: password,
			firstname: firstname,
			lastname: lastname
		};
		const response = await fetch('http://localhost:3000/auth/users', {
			method: 'POST',
			body: JSON.stringify(signUp)
		});

		if (response.status == 201) {
			const res = await response.json();
			console.log('[DEBUG] Setting user in store: ', res.user);
			user.set(res.user);
			token.set(res.token);
			gravatarUrl.set(res.gravatar_url);
		} else {
			console.log('[ERROR] FAILED REGISTRATION');
			console.log(response);
		}

		openSignUp = false;
	}

	let defaultModal = false;
	let openSignUp = false;
</script>

<Navbar></Navbar>

<Modal size="xs" class="w-full" bind:open={defaultModal} autoclose={false} outsideclose>
	<form on:submit|preventDefault={login} class="flex flex-col space-y-6">
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign In To Easy Tasks!</h3>
		<Label class="space-y-2">
			<span>Email</span>
			<Input
				type="email"
				name="email"
				placeholder="johndoe@email.com"
				bind:value={email}
				required
			/>
		</Label>
		<Label class="space-y-2">
			<span>Password</span>
			<Input type="password" name="password" placeholder="••••••" required bind:value={password} />
		</Label>
		<div class="flex items-start">
			<Checkbox>Remember Me</Checkbox>
			<a href="/" class="ms-auto text-sm text-primary-700 hover:underline dark:text-primary-500">
				Lost password?
			</a>
		</div>
		<Button type="submit" class="w-full1">Login to your account</Button>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <button
				class="text-primary-700 hover:underline dark:text-primary-500"
				on:click={() => {
					openSignUp = true;
					defaultModal = false;
				}}
				tabindex="-1"
			>
				Create account
			</button>
		</div>
		<div>
			<div class="inline-flex w-full items-center justify-center">
				<hr class="mx-2 my-2 h-1 w-36 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-6" />
				<p class="text-sm text-gray-900 dark:text-gray-400">or login with</p>
				<hr class="mx-2 my-2 h-1 w-36 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-6" />
			</div>
			<div class="w- flex justify-evenly">
				<img src="google_icon.png" width="30px" height="30px" alt="Google Icon" />
				<img src="github.png" width="30px" height="30px" alt="Github Icon" />
				<img src="facebook_logo.png" width="30px" height="30px" alt="Facebook Icon" />
			</div>
		</div>
	</form>
</Modal>
<Modal size="md" class="w-full" bind:open={openSignUp} autoclose={false} outsideclose>
	<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign Up</h3>
	<form on:submit|preventDefault={register}>
		<div class=" grid grid-cols-2 grid-rows-3 gap-3">
			<Label class="space-y-2">
				<span>First Name</span>
				<Input type="text" name="firstname" placeholder="john" bind:value={firstname} required />
			</Label>
			<Label class="space-y-2">
				<span>Last Name</span>
				<Input type="text" name="lastname" placeholder="doe" bind:value={lastname} required />
			</Label>
			<Label class="space-y-2">
				<span>Email</span>
				<Input
					type="email"
					name="email"
					placeholder="johndoe@gmail.com"
					bind:value={email}
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Username</span>
				<Input type="text" name="username" placeholder="jdoe" bind:value={username} required />
			</Label>
			<Label class="space-y-2">
				<span>Password</span>
				<Input
					type="password"
					name="password"
					placeholder="••••••"
					bind:value={password}
					required
				/>
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
			<hr class="mx-2 my-2 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-6" />
			<p class="text-sm text-gray-900 dark:text-gray-400">or sign up with</p>
			<hr class="mx-2 my-2 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-6" />
		</div>
		<div class="w- flex justify-evenly">
			<img src="google_icon.png" width="30px" height="30px" alt="Google Icon" />
			<img src="github.png" width="30px" height="30px" alt="Github Icon" />
			<img src="facebook_logo.png" width="30px" height="30px" alt="Facebook Icon" />
		</div>
	</div>
</Modal>

<slot></slot>

<SpeedDial></SpeedDial>

<Footer></Footer>
