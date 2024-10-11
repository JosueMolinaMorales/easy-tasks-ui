<script>
	import { SpeedDial, SpeedDialButton } from 'flowbite-svelte';
	import {
		ShareNodesSolid,
		PrinterSolid,
		DownloadSolid,
		FileCopySolid
	} from 'flowbite-svelte-icons';
</script>

<SpeedDial defaultClass="fixed end-6 bottom-6">
	<SpeedDialButton name="Share">
		<ShareNodesSolid class="h-6 w-6" />
	</SpeedDialButton>
	<SpeedDialButton name="Print">
		<PrinterSolid class="h-6 w-6" />
	</SpeedDialButton>
	<SpeedDialButton name="Download">
		<DownloadSolid class="h-6 w-6" />
	</SpeedDialButton>
	<SpeedDialButton name="Copy">
		<FileCopySolid class="h-6 w-6" />
	</SpeedDialButton>
</SpeedDial>
