<script lang="ts">
	import { replayLoading, replayError } from '../stores/replayState';
</script>

{#if $replayLoading}
	<div class="replay-loading-overlay">
		<div class="replay-loading-container">
			<div class="spinner"></div>
			<h2>Loading Replay...</h2>
			<p>Fetching replay data from RGS</p>
		</div>
	</div>
{/if}

{#if $replayError}
	<div class="replay-error-overlay">
		<div class="replay-error-container">
			<h2>Error Loading Replay</h2>
			<p>{$replayError}</p>
			<button onclick={() => window.location.reload()} class="retry-button">
				Try Again
			</button>
		</div>
	</div>
{/if}

<style>
	.replay-loading-overlay,
	.replay-error-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
	}

	.replay-loading-container,
	.replay-error-container {
		background: #1a1a1a;
		border-radius: 16px;
		padding: 48px;
		text-align: center;
		max-width: 400px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
	}

	.spinner {
		width: 50px;
		height: 50px;
		border: 4px solid rgba(255, 255, 255, 0.2);
		border-top: 4px solid #ff6b35;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 24px;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	h2 {
		color: #fff;
		font-family: 'Crimes Times Six', sans-serif;
		font-size: 1.5rem;
		margin: 16px 0 8px;
		font-weight: 700;
	}

	p {
		color: #aaa;
		font-size: 0.95rem;
		margin: 0 0 24px;
	}

	.retry-button {
		background: #ff6b35;
		color: #fff;
		border: none;
		padding: 12px 32px;
		border-radius: 8px;
		font-family: 'Crimes Times Six', sans-serif;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.3s ease;
		font-size: 1rem;
	}

	.retry-button:hover {
		background: #f7931e;
		transform: scale(1.05);
	}

	.retry-button:active {
		transform: scale(0.95);
	}
</style>
