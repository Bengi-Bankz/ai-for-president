<script lang="ts">
	import { isReplayMode } from '../stores/replayState';
	import assets from '../game/assets';

	// Get the replay corner sprite URL
	const replayCornerUrl = assets.replayCorner?.src || '';
</script>

{#if $isReplayMode}
	<div class="replay-corner">
		<img src={replayCornerUrl} alt="Replay Mode" class="corner-image" />
	</div>
{/if}

<style lang="scss">
	.replay-corner {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
		pointer-events: none;
		animation: flash 1.5s ease-in-out infinite;
	}

	.corner-image {
		display: block;
		width: auto;
		height: auto;
		max-width: 150px;
		max-height: 150px;
	}

	@keyframes flash {
		0%, 100% {
			opacity: 1;
			filter: brightness(1);
		}
		50% {
			opacity: 0.7;
			filter: brightness(1.3);
		}
	}

	@media (max-width: 700px) {
		.corner-image {
			max-width: 100px;
			max-height: 100px;
		}
	}
</style>
