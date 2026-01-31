<script lang="ts">
	import type { Snippet } from 'svelte';

	import ModalError from './ModalError.svelte';
	import ModalBetMenu from './ModalBetMenu.svelte';
	import ModalBuyBonus from './ModalBuyBonus.svelte';
	import ModalBuyBonusConfirm from './ModalBuyBonusConfirm.svelte';
	import ModalAutoSpin from './ModalAutoSpin.svelte';
	import ModalAutoSpinMessage from './ModalAutoSpinMessage.svelte';
	// import ModalForceResult from './ModalForceResult.svelte';
	import ModalPayTable from './ModalPayTable.svelte';
	import ModalGameRules from './ModalGameRules.svelte';
	import ModalSettings from './ModalSettings.svelte';
	import ModalGameHistory from './ModalGameHistory.svelte';

	type Props = {
		version: Snippet;
	};

	const props: Props = $props();
	
	// Check if in replay mode - hide betting/interactive modals
	const isReplayMode = (): boolean => {
		if (typeof window === 'undefined') return false;
		return new URLSearchParams(window.location.search).get('replay') === 'true';
	};
	
	const replay = isReplayMode();
</script>

<ModalError />
{#if !replay}
	<ModalBetMenu />
	<ModalBuyBonus />
	<ModalBuyBonusConfirm />
	<ModalAutoSpin />
	<ModalAutoSpinMessage />
{/if}
<!-- <ModalForceResult /> -->
<ModalPayTable>
	{@render props.version()}
</ModalPayTable>
<ModalGameRules>
	{@render props.version()}
</ModalGameRules>
<ModalSettings />
{#if !replay}
	<ModalGameHistory>
		{@render props.version()}
	</ModalGameHistory>
{/if}

