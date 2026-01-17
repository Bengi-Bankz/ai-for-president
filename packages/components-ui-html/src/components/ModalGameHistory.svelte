<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';

	import BaseContent from './BaseContent.svelte';
	import BaseScrollable from './BaseScrollable.svelte';
	import GameHistory from './GameHistory.svelte';

	type Props = {
		children: Snippet;
	};

	const props: Props = $props();
</script>

<style>
	h2 {
		font-family: 'BungeeSpice-Regular', sans-serif;
		color: #00fff0;
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 24px;
		text-align: center;
	}

	.history-scroll {
		max-height: 70vh;
		overflow-y: auto;
		padding: 24px 16px;
		box-sizing: border-box;
		margin: 48px auto 24px auto;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 16px;
		width: 100%;
		max-width: 900px;
		scrollbar-width: none;
	}

	.history-scroll::-webkit-scrollbar {
		display: none;
	}

	@media (max-width: 700px) {
		.history-scroll {
			max-height: 80vh;
			margin: 16px 0;
			padding: 16px 8px;
			border-radius: 8px;
		}
	}
</style>

{#if stateModal.modal?.name === 'gameHistory'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<BaseContent maxWidth="100%">
			<BaseScrollable type="column">
				<div class="history-scroll">
					<h2>Game History</h2>
					<GameHistory />
					{@render props.children()}
				</div>
			</BaseScrollable>
		</BaseContent>
	</Popup>
{/if}
