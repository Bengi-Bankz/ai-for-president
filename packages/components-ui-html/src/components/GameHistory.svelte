<script lang="ts">
	import { getHistory, clearHistory, type HistoryEntry } from '../gameHistory';
	import { stateModal } from 'state-shared';

	let history = $state<HistoryEntry[]>(getHistory());
	
	// Refresh history when modal opens
	$effect(() => {
		if (stateModal.modal?.name === 'gameHistory') {
			history = getHistory();
		}
	});

	function formatTime(timestamp: number): string {
		const date = new Date(timestamp);
		return date.toLocaleString();
	}

	function formatCurrency(amount: number): string {
		return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
	}

	function handleClearHistory() {
		clearHistory();
		history = [];
	}

	function replayRound(betId: string | number) {
		try {
			// Get current URL parameters
			const url = new URL(window.location.href);
			const params = new URLSearchParams(url.search);
			
			console.log('Current URL:', window.location.href);
			console.log('Replay clicked for bet ID:', betId);
			
			// Set force mode with bookID to replay the specific round
			// The SDK uses force=true with bookID parameter for replay
			params.set('force', 'true');
			params.set('bookID', String(betId));
			
			const replayUrl = `${url.origin}${url.pathname}?${params.toString()}`;
			console.log('Navigating to replay URL:', replayUrl);
			console.log('Force param:', params.get('force'));
			console.log('BookID param:', params.get('bookID'));
			
			// Close the modal
			stateModal.modal = null;
			
			// Navigate to the replay URL
			window.location.href = replayUrl;
		} catch (error) {
			console.error('Error in replayRound:', error);
		}
	}
</script>

<style>
	.history-container {
		width: 100%;
		max-width: 100%;
		overflow-x: auto;
	}

	.history-table {
		width: 100%;
		border-collapse: collapse;
		font-family: 'BungeeSpice-Regular', sans-serif;
		color: #00fff0;
		font-size: 0.9rem;
	}

	.history-table thead {
		background: rgba(0, 255, 240, 0.1);
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.history-table th {
		padding: 12px 8px;
		text-align: left;
		font-weight: 600;
		border-bottom: 2px solid rgba(0, 255, 240, 0.3);
		white-space: nowrap;
	}

	.history-table td {
		padding: 10px 8px;
		border-bottom: 1px solid rgba(0, 255, 240, 0.1);
	}

	.history-table tbody tr {
		transition: background 0.2s;
	}

	.history-table tbody tr:hover {
		background: rgba(0, 255, 240, 0.05);
	}

	.book-id {
		font-family: monospace;
		font-size: 0.85rem;
		color: rgba(0, 255, 240, 0.8);
		cursor: pointer;
		transition: color 0.2s, text-shadow 0.2s;
	}

	.book-id:hover {
		color: #00fff0;
		text-shadow: 0 0 8px rgba(0, 255, 240, 0.6);
		text-decoration: underline;
	}

	.win-amount {
		font-weight: bold;
		color: #00ff00;
	}

	.loss-amount {
		color: rgba(255, 255, 255, 0.5);
	}

	.multiplier {
		font-weight: bold;
		color: #ffd700;
	}

	.multiplier.win {
		color: #00ff00;
	}

	.time {
		color: rgba(0, 255, 240, 0.6);
		font-size: 0.85rem;
	}

	.empty-state {
		text-align: center;
		padding: 48px 16px;
		color: rgba(0, 255, 240, 0.5);
	}

	.clear-button {
		margin-top: 16px;
		padding: 8px 16px;
		background: rgba(255, 50, 50, 0.2);
		border: 1px solid rgba(255, 50, 50, 0.4);
		color: #ff3232;
		border-radius: 4px;
		font-family: 'BungeeSpice-Regular', sans-serif;
		cursor: pointer;
		transition: all 0.2s;
	}

	.clear-button:hover {
		background: rgba(255, 50, 50, 0.3);
		border-color: rgba(255, 50, 50, 0.6);
	}

	@media (max-width: 700px) {
		.history-table {
			font-size: 0.75rem;
		}

		.history-table th,
		.history-table td {
			padding: 8px 4px;
		}

		.book-id {
			font-size: 0.7rem;
		}
	}
</style>

<div class="history-container">
	{#if history.length === 0}
		<div class="empty-state">
			<p>No game history yet</p>
			<p style="font-size: 0.85rem; margin-top: 8px;">Play some rounds to see your history here</p>
		</div>
	{:else}
		<table class="history-table">
			<thead>
				<tr>
					<th>Time</th>
					<th>Book ID</th>
					<th>Bet</th>
					<th>Win</th>
					<th>Multiplier</th>
				</tr>
			</thead>
			<tbody>
				{#each history as entry (entry.id)}
					<tr>
						<td class="time">{formatTime(entry.timestamp)}</td>
						<td class="book-id" onclick={() => replayRound(entry.bookId)} title="Click to replay this round">
							{entry.bookId}
						</td>
						<td>{formatCurrency(entry.betAmount)}</td>
						<td class:win-amount={entry.winAmount > 0} class:loss-amount={entry.winAmount === 0}>
							{formatCurrency(entry.winAmount)}
						</td>
						<td class="multiplier" class:win={entry.payoutMultiplier > 0}>
							{entry.payoutMultiplier.toFixed(2)}×
						</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<button class="clear-button" onclick={handleClearHistory}>
			Clear History
		</button>
	{/if}
</div>
