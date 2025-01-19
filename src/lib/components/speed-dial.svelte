<script>
	import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import { ShareNodesSolid } from 'flowbite-svelte-icons';
	import CreateTasks from './create-tasks.svelte';

	$: openCreateTaskModal = false;
</script>

<SpeedDial defaultClass="fixed end-6 bottom-6">
	<SpeedDialButton name="Share" on:click={() => (openCreateTaskModal = true)}>
		<ShareNodesSolid class="h-6 w-6" />
	</SpeedDialButton>
</SpeedDial>

<CreateTasks openModal={openCreateTaskModal}></CreateTasks>
