<script>
	import { Button, Datepicker, Input, Label, Modal, P, Select, Textarea } from 'flowbite-svelte';

	export let openModal = false;

	/*
    {
    "title": "Renew Gym Membership",
    "description": "Renew the annual gym membership online",
    "priority": "medium",
    "status": "in progress",
    "due_date": 1728300280
  }
     */
	let priorites = [
		{ value: 'low', name: 'Low' },
		{ value: 'medium', name: 'Medium' },
		{ value: 'high', name: 'High' }
	];
	let selected = priorites[0].value;

	let statuses = [
		{ value: 'pending', name: 'Pending' },
		{ value: 'in_progress', name: 'In Progress' },
		{ value: 'completed', name: 'Completed' }
	];
	let selectedStatus = statuses[0].value;

	let textareaprops = {
		id: 'message',
		name: 'message',
		label: 'Your message',
		rows: 4,
		placeholder: 'Leave a comment...'
	};

	let task = {
		title: '',
		description: '',
		status: '',
		due_date: 0,
		priority: ''
	};

	/**
	 * @type {{ toLocaleDateString: () => any; } | null}
	 */
	let selectedDate = null;

	async function submit() {
		console.log('[DEBUG] due date: ', new Date(task.due_date).valueOf());
		task.due_date = new Date(task.due_date).valueOf();
		let res = await fetch('http://localhost:3000/tasks', {
			method: 'POST',
			body: JSON.stringify(task),
			credentials: 'include',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (res.status >= 200) {
			console.log('[DEBUG] CREATING TASK COMPLETE');
			return;
		}

		console.log('[DEBUG] FAILED TO CREATE TASK');
		console.log('[DEBUG] ', await res.json());
	}
</script>

<Modal title="Create Task" bind:open={openModal}>
	<form>
		<div class="mb-6">
			<Label for="default-input" class="mb-2 block">Title</Label>
			<Input id="default-input" placeholder="Title" bind:value={task.title} />
		</div>
		<div class="mb-6">
			<Label for="default-input" class="mb-2 block">Description</Label>

			<Textarea {...textareaprops} bind:value={task.description} />
		</div>
		<div class="mb-6">
			<Label>
				Status
				<Select class="mt-2" items={statuses} bind:value={task.status} />
			</Label>
		</div>
		<div class="mb-6">
			<Label>
				Select an option
				<Select class="mt-2" items={priorites} bind:value={task.priority} />
			</Label>
		</div>
		<div class="z-50 mb-6 md:w-1/2">
			<Label for="default-input" class="mb-2 block">Due Date</Label>
			<Input id="default-input" placeholder="Title" type="date" bind:value={task.due_date} />
		</div>
		<Button on:click={submit}>Submit</Button>
	</form>
</Modal>
