<script lang="ts">
	import { isReplayMode, lastReplayGameId } from '../stores/replayState';

	function watchAgain() {
		// Reload the page to replay again
		window.location.reload();
	}
</script>

{#if $isReplayMode && $lastReplayGameId}
	<div class="watch-again-container">
		<button class="watch-again-button" onclick={watchAgain}>
			🎬 Watch Again
		</button>
	</div>
{/if}

<style>
	.watch-again-container {
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
	}

	   .watch-again-button {
		   background: #222;
		   color: #fff;
		   border: none;
		   padding: 16px 40px;
		   border-radius: 12px;
		   font-family: 'Crimes Times Six', sans-serif;
		   font-weight: 700;
		   font-size: 1.1rem;
		   cursor: pointer;
		   transition: background 0.2s, transform 0.2s;
		   box-shadow: 0 2px 8px rgba(0,0,0,0.15);
	   }

	   .watch-again-button:hover {
		   background: #444;
		   transform: scale(1.05);
		   box-shadow: 0 4px 16px rgba(0,0,0,0.25);
	   }

	.watch-again-button:active {
		transform: scale(0.98);
	}

	@media (max-width: 700px) {
		.watch-again-button {
			padding: 12px 30px;
			font-size: 0.95rem;
		}
	}
</style>
