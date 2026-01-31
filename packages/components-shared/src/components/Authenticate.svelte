<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import { requestAuthenticate } from 'rgs-requests';
	import { stateUrlDerived, stateBet, stateConfig, stateModal, stateForce } from 'state-shared';
	import { API_AMOUNT_MULTIPLIER } from 'constants-shared/bet';

	type Props = { children: Snippet };

	const props: Props = $props();

	let authenticated = $state(false);

	import { isReplayMode } from '../replayMode';

	// Check if running in storybook
	const isStorybook = (): boolean => {
		if (typeof window === 'undefined') return false;
		// Check for storybook-specific globals or URL patterns
		return !!(window as any).__STORYBOOK__ || 
		       window.location.href.includes('iframe.html') ||
		       window.location.port === '6001' ||
		       window.location.port === '6002';
	};

	// Helper to get URL search params for replay mode
	const getReplayUrlParam = (key: string): string | null => {
		if (typeof window === 'undefined') return null;
		return new URLSearchParams(window.location.search).get(key);
	};

	const initializeReplayMode = () => {
		// Set up state from URL parameters for replay mode
		const currency = getReplayUrlParam('currency');
		const amount = getReplayUrlParam('amount');
		const mode = getReplayUrlParam('mode');

		if (currency) {
			stateBet.currency = currency;
		}
		if (amount) {
			const amountNum = Number(amount);
			if (!isNaN(amountNum)) {
				stateBet.betAmount = amountNum;
				stateBet.wageredBetAmount = amountNum;
			}
		}
		if (mode) {
			stateBet.activeBetModeKey = mode;
		}

		// In replay mode, set a fake balance so UI doesn't show 0
		// The actual bet cost will come from the replay data
		stateBet.balanceAmount = 1000000;
	};

	const authenticate = async () => {
		if (isReplayMode()) {
			// In replay mode, skip session authentication but initialize state from URL
			initializeReplayMode();
			return;
		}
		if (isStorybook()) {
			// In storybook mode, skip authentication entirely
			return;
		}
		try {
			const authenticateData = await requestAuthenticate({
				rgsUrl: stateUrlDerived.rgsUrl(),
				sessionID: stateUrlDerived.sessionID(),
				language: stateUrlDerived.lang(),
			});

			// error
			if (authenticateData?.error) throw authenticateData;

			// balance
			if (authenticateData?.balance) {
				// Example of authenticateData.balance
				// {
				// 		"amount": 10000000000000000,
				// 		"currency": "USD"
				// },
				stateBet.currency = authenticateData.balance.currency;
				stateBet.balanceAmount = authenticateData.balance.amount / API_AMOUNT_MULTIPLIER;
			}

			// Set default bet amount if no active round and defaultBetLevel is present
			if (
				authenticateData?.config?.defaultBetLevel &&
				(!authenticateData?.round || !authenticateData.round.amount)
			) {
				stateBet.betAmount = authenticateData.config.defaultBetLevel / API_AMOUNT_MULTIPLIER;
				stateBet.wageredBetAmount = authenticateData.config.defaultBetLevel / API_AMOUNT_MULTIPLIER;
			}

			// config
			if (authenticateData?.config) {
				// Example of authenticateData.config
				// {
				// 	"gameID": "37_test-lines",
				// 	"minBet": 100000,
				// 	"maxBet": 1000000000,
				// 	"stepBet": 10000,
				// 	"defaultBetLevel": 1000000,
				// 	"betLevels": [100000, 200000, ..., 1000000000],
				// 	"betModes": {},
				// 	"jurisdiction": {
				// 			"socialCasino": false,
				// 			"disabledFullscreen": false,
				// 			"disabledTurbo": false,
				// 			"disabledSuperTurbo": false,
				// 			"disabledAutoplay": false,
				// 			"disabledSlamstop": false,
				// 			"disabledSpacebar": false,
				// 			"disabledBuyFeature": false,
				// 			"displayNetPosition": false,
				// 			"displayRTP": false,
				// 			"displaySessionTimer": false,
				// 			"minimumRoundDuration": 0
				// 	}
				// }
				stateConfig.jurisdiction = authenticateData?.config?.jurisdiction;
				stateConfig.betAmountOptions = (authenticateData.config?.betLevels || []).map(
					(level) => level / API_AMOUNT_MULTIPLIER,
				);
				// Show all available bet amounts from RGS, not just filtered subset
				stateConfig.betMenuOptions = stateConfig.betAmountOptions;
			}

			// round
			if (authenticateData?.round) {
				// Example of authenticateData.round 
				// {
				// 	"betID": 62277967,
				// 	"amount": 1000000,
				// 	"payout": 33400000,
				// 	"payoutMultiplier": 33.4,
				// 	"active": true,
				// 	"state": [...],
				// 	"mode": "BONUS",
				// 	"event": null
				// }

				if(authenticateData.round?.state) {
					// @ts-ignore
					stateBet.lastBet =  authenticateData.round;
				}

				if(authenticateData.round?.amount) {
					const betAmountValue =
						authenticateData.round.amount > 0
							? authenticateData.round.amount / API_AMOUNT_MULTIPLIER
							: 0;
					stateBet.betAmount = betAmountValue;
					stateBet.wageredBetAmount = betAmountValue;
				}

				if (authenticateData.round?.mode) {
					stateBet.activeBetModeKey = authenticateData.round.mode;
				};
			}

			// Initialize force mode from URL parameters
			if (stateUrlDerived.force()) {
				stateForce.force = true;
				stateForce.forceType = 'api';
				
				// Read bookID from URL
				const bookID = stateUrlDerived.bookID();
				if (bookID) {
					stateForce.forceSearch.bookID = Number(bookID);
				}
				
				// Read eventID from URL (if you want to support that too)
				const eventID = stateUrlDerived.eventID();
				if (eventID) {
					// Set event ID if your force search supports it
					// stateForce.forceSearch.eventID = Number(eventID);
				}
				
				// Read mode from URL
				const urlMode = stateUrlDerived.urlMode();
				if (urlMode) {
					stateForce.forceBetModeKey = urlMode as any;
				}
				
				// Read amount from URL (if needed)
				const urlAmount = stateUrlDerived.urlAmount();
				if (urlAmount) {
					stateBet.betAmount = Number(urlAmount);
				}
			}
		} catch (error) {
			console.error(error);
			stateModal.modal = { name: 'error', error };
		}
	};

	onMount(async () => {
		await authenticate();
		authenticated = true;
	});
</script>

{#if authenticated}
	{@render props.children()}
{/if}