<script lang="ts">
import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();
import { onMount } from 'svelte';

	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { MainContainer } from 'components-layout';
	import { App, Text, REM, Container, Sprite } from 'pixi-svelte';
	import { stateModal } from 'state-shared';

	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';

	import { getContext } from '../game/context';
	import EnableSound from './EnableSound.svelte';
	import EnableGameActor from './EnableGameActor.svelte';
	import ResumeBet from './ResumeBet.svelte';
	import Sound from './Sound.svelte';
	import Background from './Background.svelte';
	import LoadingScreen from './LoadingScreen.svelte';
	import BoardFrame from './BoardFrame.svelte';
	import Board from './Board.svelte';
	import Anticipations from './Anticipations.svelte';
	import ClusterWinAmounts from './ClusterWinAmounts.svelte';
	import TumbleBoard from './TumbleBoard.svelte';
	import TumbleWinAmount from './TumbleWinAmount.svelte';
	import GlobalMultiplier from './GlobalMultiplier.svelte';
	import MultiplierBoard from './MultiplierBoard.svelte';
	import MultiplierTotal from './MultiplierTotal.svelte';
	import Win from './Win.svelte';
	import FreeSpinIntro from './FreeSpinIntro.svelte';
	import FreeSpinCounter from './FreeSpinCounter.svelte';
	import FreeSpinOutro from './FreeSpinOutro.svelte';
	import Transition from './Transition.svelte';
	import CharacterDisplay from './CharacterDisplay.svelte';

	import { scatterLandedThisRound } from '../stores/scatterLandedThisRound';
	import { onDestroy } from 'svelte';
	import ReplayLoadingScreen from './ReplayLoadingScreen.svelte';
	import ReplayCorner from './ReplayCorner.svelte';

	import { getReplayParams, type ReplayParams } from '../game/utils-replay';
	import { requestReplay } from 'rgs-requests';
	import { setContext as setSvelteContext, getContext as getSvelteContext } from 'svelte';
	import { isReplayMode, replayLoading, replayError, replayData, replayReady, replayAwaitingStart, replayPlaying, replayComplete } from '../stores/replayState';

	const context = getContext();

	// Check if replay params were set by parent (e.g., storybook wrapper)
	// If not, read from URL params
	let replayParams: ReplayParams;
	try {
		const existingParams = getSvelteContext<ReplayParams>('replay');
		if (existingParams && existingParams.isReplayMode) {
			replayParams = existingParams;
			console.log('[Replay] Using params from context:', replayParams);
		} else {
			replayParams = getReplayParams();
			setSvelteContext('replay', replayParams);
		}
	} catch {
		replayParams = getReplayParams();
		setSvelteContext('replay', replayParams);
	}

	let loadingMode: 'intro' | 'default' = 'intro';

	let shakeOffset = { x: 0, y: 0 };
	let shakeActive = false;


	import { playBet } from '../game/utils';
	import type { Bet } from '../game/typesBookEvent';

	// Function to start playing the replay (called when Play button is clicked)
	async function startReplay() {
		const data = $replayData;
		if (data && data.state) {
			console.log('[Replay] Starting replay playback...');
			replayPlaying.set(true);
			replayAwaitingStart.set(false);
			replayComplete.set(false);

			try {
				await playBet(data as Bet);
				console.log('[Replay] Replay playback complete, returning to play screen...');
				replayPlaying.set(false);
				// Return to the play button screen instead of showing WatchAgain
				replayAwaitingStart.set(true);
			} catch (err) {
				console.error('[Replay] Error during replay playback:', err);
				replayPlaying.set(false);
				replayAwaitingStart.set(true);
			}
		}
	}

	onMount(async () => {
		const hasSeenIntro =
			typeof localStorage !== 'undefined' && localStorage.getItem('scatter:introSeen') === 'true';
		loadingMode = hasSeenIntro ? 'default' : 'intro';
		context.stateLayout.showLoadingScreen = true;

		// --- REPLAY MODE: Fetch replay data from RGS ---
		if (replayParams.isReplayMode && replayParams.rgs_url && replayParams.game && replayParams.version && replayParams.mode && replayParams.event) {
			replayLoading.set(true);
			replayError.set(null);
			isReplayMode.set(true);

			try {
				console.log('[Replay] Fetching replay data from RGS...');
				const data = await requestReplay({
					rgsUrl: replayParams.rgs_url,
					game: replayParams.game,
					version: replayParams.version,
					mode: replayParams.mode,
					event: replayParams.event,
				});
				console.log('[Replay] Successfully loaded replay data:', data);
				replayData.set(data);
				replayReady.set(true);
				replayLoading.set(false);

				// Skip normal loading screen for replay - the ReplayLoadingScreen handles it
				context.stateLayout.showLoadingScreen = false;

				// DON'T auto-play - wait for the Play button to be clicked
				// The ReplayLoadingScreen will show the loader, then the Play button
			} catch (err) {
				console.error('[Replay] Failed to load replay data:', err);
				replayError.set(err instanceof Error ? err.message : 'Failed to load replay data');
				replayLoading.set(false);
			}
		}
	});

	// Subscribe to scatterLandedThisRound and trigger shake on change
	let scatterUnsub = scatterLandedThisRound.subscribe((count) => {
		if (count > 0) {
			triggerShake({ type: 'slam', magnitude: 15, duration: 400 });
		}
	});

	onDestroy(() => {
		scatterUnsub();
	});

	// Reset scatterLandedThisRound at the start of each round
	function startNewRound() {
		scatterLandedThisRound.set(0);
		// ...other round start logic...
	}
	// Call startNewRound() wherever your round logic begins

	context.eventEmitter.subscribeOnMount({
		buyBonusConfirm: () => {
			stateModal.modal = { name: 'buyBonusConfirm' };
		},
	});

	function triggerShake({ type = 'default', magnitude = 10, duration = 400 } = {}) {
		if (shakeActive) return;
		shakeActive = true;
		let elapsed = 0;
		const start = performance.now();
		function animate(now: number) {
			elapsed = now - start;
			if (elapsed < duration) {
				if (type === 'tremble') {
					// Growing tremble effect
					const grow = magnitude * (elapsed / duration);
					shakeOffset.x = (Math.random() - 0.5) * grow;
					shakeOffset.y = (Math.random() - 0.5) * grow;
				} else if (type === 'slam') {
					// Strong single shake
					shakeOffset.x = (Math.random() - 0.5) * magnitude * 2;
					shakeOffset.y = (Math.random() - 0.5) * magnitude * 2;
				} else {
					// Default shake
					shakeOffset.x = (Math.random() - 0.5) * magnitude;
					shakeOffset.y = (Math.random() - 0.5) * magnitude;
				}
				requestAnimationFrame(animate);
			} else {
				shakeOffset.x = 0;
				shakeOffset.y = 0;
				shakeActive = false;
			}
		}
		requestAnimationFrame(animate);
	}

	$: {
		const scatterCount = context.stateGame.board
			.flatMap((r) => r.reelState.symbols)
			.filter((s) => s.rawSymbol.name === 'S').length;
		if (scatterCount >= 3) {
			dispatch('shake');
		}
	}
</script>

<App
		on:scatterShake={() => triggerShake({ type: 'slam', magnitude: 15, duration: 400 })}
		on:scatterWinShake={() => triggerShake({ type: 'slam', magnitude: 20, duration: 600 })}
>
  <Container position={shakeOffset}>
    <EnableSound />
    <EnableHotkey />
    <EnableGameActor />
    <EnablePixiExtension />
    <Background />
    {#if context.stateLayout.showLoadingScreen}
      <LoadingScreen
			mode={loadingMode}
			onloaded={() => {
				if (loadingMode === 'intro') {
					loadingMode = 'default';
					typeof localStorage !== 'undefined' && localStorage.setItem('scatter:introSeen', 'true');
				}
				context.stateLayout.showLoadingScreen = false;
			}}
		/>
    {:else}
      <ResumeBet />
      <!--
        The reason why <Sound /> is rendered after clicking the loading screen:
        "Autoplay with sound is allowed if: The user has interacted with the domain (click, tap, etc.)."
        Ref: https://developer.chrome.com/blog/autoplay
      -->
      <Sound />

      <MainContainer>
        <BoardFrame />
      </MainContainer>

      <MainContainer>
        <Board />
        <Anticipations on:shake={() => triggerShake({ type: 'scatter' })}
                       on:anticipationShake={() => triggerShake({ type: 'tremble', magnitude: 5, duration: 300 })} />
        <TumbleWinAmount />
        <GlobalMultiplier />
      </MainContainer>

      <MainContainer>
        <TumbleBoard />
        <ClusterWinAmounts />
      </MainContainer>

      <MainContainer>
        <MultiplierBoard />
        <MultiplierTotal />
      </MainContainer>

      <UI>
        {#snippet gameName()}
          <UiGameName name="THE BANG GANG" />
        {/snippet}
        {#snippet logo()}
          <Sprite
            key="logo"
            anchor={{ x: 0, y: 0 }}
            x={10}
            y={10}
            scale={1}
          />
        {/snippet}
      </UI>
      <Win />
      <FreeSpinIntro />
      {#if ['desktop', 'landscape'].includes(context.stateLayoutDerived.layoutType())}
        <FreeSpinCounter />
        <CharacterDisplay />
      {/if}
      <FreeSpinOutro />
      <Transition />

    {/if}
  </Container>
</App>



<Modals>
  {#snippet version()}
    <GameVersion version="0.0.0" />
  {/snippet}
</Modals>
<ReplayLoadingScreen onPlay={startReplay} />
<ReplayCorner />