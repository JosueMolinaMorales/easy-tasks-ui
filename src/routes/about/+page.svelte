<script lang="ts">
	import { user } from '../../stores';

	$: loggedInUser = $user;
</script>

<div class="container mx-auto h-screen">
	<p>
		{#if $user}
			Welcome, {loggedInUser.username}!
		{:else}
			You are not logged in.
		{/if}
	</p>
</div>
