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

	const context = getContext();

	onMount(() => (context.stateLayout.showLoadingScreen = true));

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

	let shakeOffset = { x: 0, y: 0 };
	let shakeActive = false;

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
      <LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
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
          <Text
            anchor={{ x: 1, y: 0 }}
            text="Only Spins Studios"
            style={{
              fontFamily: 'BungeeSpice-Regular',
              fontWeight: '600',
            }}
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
