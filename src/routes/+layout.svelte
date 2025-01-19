<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/navbar.svelte';
	import SpeedDial from '$lib/components/speed-dial.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<Navbar></Navbar>

<slot></slot>

<SpeedDial></SpeedDial>

<Footer></Footer>
