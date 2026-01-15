<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, Sprite, BitmapText, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	
	import { getContext } from '../game/context';
	import RevolverCylinder from './RevolverCylinder.svelte';
	import FramedDisplay from '../framedisplay.svelte';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		multiplierValue: number;
		bulletCount?: number; // Number of bullets/duels in this round (default 1)
		autoStart?: boolean;
		onComplete?: () => void;
	};

	type BombPhase = 'hidden' | 'revolver-loading' | 'revolver-ready' | 'dueling' | 'exploding' | 'complete';

	type DuelCharacter = {
		id: 'grenadeRobber' | 'donutCop';
		multiplier: number;
		spriteKey: 'grenadeRobber' | 'donutCop';
		x: number;
		isWinner: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	
	// State management
	let phase = $state<BombPhase>('hidden');
	let animationName = $state('static');
	let assetError = false;
	let assetLoaded = true;
	
	// Revolver state
	let revolverComponent: any;
	const bulletCount = $derived(props.bulletCount ?? 1);
	
	// Duel state
	let showDuel = $state(false);
	let showVSAnimation = $state(false);
	let showWinAnimation = $state(false);
	let duelCharacters = $state<DuelCharacter[]>([]);
	let duelWinnerRevealed = $state(false);
	let duelShootOrder = $state<('grenadeRobber' | 'donutCop')[]>([]);
	const winningCharacter = $derived(duelCharacters.find(c => c.isWinner));
	
	// Animation tweens
	const scale = new Tween(0);
	
	// Duel tweens - centered on grid
	const duelGrenadeX = new Tween(-SYMBOL_SIZE * 0.8);
	const duelDonutX = new Tween(SYMBOL_SIZE * 0.8);
	const duelGrenadeScale = new Tween(1);
	const duelDonutScale = new Tween(1);
	
	// Helper function to get random multiplier
	const getRandomMultiplier = () => {
		const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];
		const available = MULTIPLIER_VALUES.filter(v => v !== props.multiplierValue);
		return available[Math.floor(Math.random() * available.length)];
	};
	
	// Configuration
	const TICK_SPEED = 500;
	
	// Auto-start if requested
	onMount(() => {
		if (props.autoStart) {
			startBombSequence();
		}
	});
	
	const startBombSequence = async () => {
		console.log(`🎯 Starting revolver sequence for ${props.multiplierValue}X with ${bulletCount} bullets`);
		
		// Phase 1: Load revolver
		phase = 'revolver-loading';
		await revolverComponent?.playLoadAnimation();
		
		// Phase 2: Run duels for each bullet
		phase = 'revolver-ready';
		for (let i = 0; i < bulletCount; i++) {
			console.log(`🔫 Duel ${i + 1}/${bulletCount}`);
			await playDuelAnimation();
			await revolverComponent?.fireBullet();
			await waitForTimeout(300 / stateBetDerived.timeScale());
		}
		
		// Phase 3: Explosion
		await playExplodingAnimation();
		phase = 'complete';
		console.log(`✅ Revolver sequence complete for ${props.multiplierValue}X`);
		props.onComplete?.();
	};
	
	const playDuelAnimation = async () => {
		console.log('🎯 Starting VS comparison');
		
		// Create character objects - Grenade always left with winning multiplier, Cop always right with fake
		const fakeMultiplier = getRandomMultiplier();
		
		duelCharacters = [
			{
				id: 'grenadeRobber',
				multiplier: props.multiplierValue,
				spriteKey: 'grenadeRobber',
				x: -SYMBOL_SIZE * 0.8,
				isWinner: true,
			},
			{
				id: 'donutCop',
				multiplier: fakeMultiplier,
				spriteKey: 'donutCop',
				x: SYMBOL_SIZE * 0.8,
				isWinner: false,
			},
		];
		
		console.log(
			`🆚 VS: Grenade (${duelCharacters[0].multiplier}X) vs Donut (${duelCharacters[1].multiplier}X)`,
		);
		
		// Show duel with winner immediately revealed
		showDuel = true;
		duelWinnerRevealed = true;
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		
		// VS Animation - show comparison with multipliers displayed
		console.log('🆚 Playing VS animation');
		showVSAnimation = true;
		await waitForTimeout(2250 / stateBetDerived.timeScale()); // 36 frames at fps 16 = ~2.25 seconds
		showVSAnimation = false;
		
		// Character-specific win animation
		console.log(`🏆 Playing ${winningCharacter?.id} win animation`);
		showWinAnimation = true;
		await waitForTimeout(2250 / stateBetDerived.timeScale()); // 36 frames at fps 16 = ~2.25 seconds
		showWinAnimation = false;
		
		console.log('✅ Duel complete');
		showDuel = false;
	};
	
	const playExplodingAnimation = async () => {
		phase = 'exploding';
		animationName = 'explosion';
		await waitForTimeout(500 / stateBetDerived.timeScale());
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		await waitForTimeout(600 / stateBetDerived.timeScale());
	};
</script>

{#if assetError}
    <div class="asset-error">
        Failed to load asset: {assetError}
    </div>
{:else if !assetLoaded}
    <div class="asset-loading">
        Loading...
    </div>
{:else}
    <Container x={props.x} y={props.y}>
        {#if phase !== 'hidden' && phase !== 'complete'}
            {#if phase === 'exploding'}
                <SpineProvider
                    x={0}
                    y={0}
                    width={SYMBOL_SIZE * 2}
                    key="explosion"
                >
                    <SpineTrack
                        trackIndex={0}
                        animationName={animationName}
                        timeScale={stateBetDerived.timeScale()}
                    />
                </SpineProvider>
            {:else if phase === 'revolver-loading' || phase === 'revolver-ready'}
                <!-- Revolver Cylinder -->
                <RevolverCylinder
                    bind:this={revolverComponent}
                    bulletCount={bulletCount}
                />

                <!-- VS Comparison with multipliers shown on sides -->
                {#if phase === 'revolver-ready' && showDuel && duelWinnerRevealed}
                    <!-- Grenade Robber (left) with multiplier -->
                    <Container x={-SYMBOL_SIZE * 1.0} y={0}>
                        <Sprite
                            key="grenadeRobber"
                            anchor={0.5}
                            scale={0.7}
                            x={0}
                            y={0}
                        />
                        <BitmapText
                            anchor={0.5}
                            x={0}
                            y={SYMBOL_SIZE * 0.5}
                            text={`${duelCharacters[0].multiplier}X`}
                            style={{
                                fontFamily: 'purple',
                                fontSize: SYMBOL_SIZE * 0.25,
                                letterSpacing: -1,
                            }}
                        />
                    </Container>

                    <!-- VS Animation in center -->
                    {#if showVSAnimation}
                        <FramedDisplay
                            frameKeys={[
                                "vsanimation1", "vsanimation2", "vsanimation3", "vsanimation4", "vsanimation5", 
                                "vsanimation6", "vsanimation7", "vsanimation8", "vsanimation9", "vsanimation10",
                                "vsanimation11", "vsanimation12", "vsanimation13", "vsanimation14", "vsanimation15", 
                                "vsanimation16", "vsanimation17", "vsanimation18", "vsanimation19", "vsanimation20",
                                "vsanimation21", "vsanimation22", "vsanimation23", "vsanimation24", "vsanimation25", 
                                "vsanimation26", "vsanimation27", "vsanimation28", "vsanimation29", "vsanimation30",
                                "vsanimation31", "vsanimation32", "vsanimation33", "vsanimation34", "vsanimation35", 
                                "vsanimation36"
                            ]}
                            x={-(SYMBOL_SIZE * 0.8)}
                            y={0}
                            width={SYMBOL_SIZE * 1.6}
                            height={SYMBOL_SIZE * 1.6}
                            fps={16}
                            scale={1}
                            loop={false}
                        />
                    {/if}

                    <!-- Donut Cop (right) with multiplier -->
                    <Container x={SYMBOL_SIZE * 1.0} y={0}>
                        <Sprite
                            key="donutCop"
                            anchor={0.5}
                            scale={0.7}
                            x={0}
                            y={0}
                        />
                        <BitmapText
                            anchor={0.5}
                            x={0}
                            y={SYMBOL_SIZE * 0.5}
                            text={`${duelCharacters[1].multiplier}X`}
                            style={{
                                fontFamily: 'purple',
                                fontSize: SYMBOL_SIZE * 0.25,
                                letterSpacing: -1,
                            }}
                        />
                    </Container>
                {/if}

                <!-- Winner animations -->
                {#if phase === 'revolver-ready' && duelWinnerRevealed && winningCharacter}
                    <!-- Character Win Animation -->
                    {#if showWinAnimation}
                        <FramedDisplay
                            frameKeys={winningCharacter.id === 'donutCop' 
                                ? ["copwins1", "copwins2", "copwins3", "copwins4", "copwins5", "copwins6", "copwins7", "copwins8", "copwins9", "copwins10", "copwins11", "copwins12", "copwins13", "copwins14", "copwins15", "copwins16", "copwins17", "copwins18", "copwins19", "copwins20", "copwins21", "copwins22", "copwins23", "copwins24", "copwins25", "copwins26", "copwins27", "copwins28", "copwins29", "copwins30", "copwins31", "copwins32", "copwins33", "copwins34", "copwins35", "copwins36"]
                                : ["robberwins1", "robberwins2", "robberwins3", "robberwins4", "robberwins5", "robberwins6", "robberwins7", "robberwins8", "robberwins9", "robberwins10", "robberwins11", "robberwins12", "robberwins13", "robberwins14", "robberwins15", "robberwins16", "robberwins17", "robberwins18", "robberwins19", "robberwins20", "robberwins21", "robberwins22", "robberwins23", "robberwins24", "robberwins25", "robberwins26", "robberwins27", "robberwins28", "robberwins29", "robberwins30", "robberwins31", "robberwins32", "robberwins33", "robberwins34", "robberwins35", "robberwins36"]
                            }
                            x={winningCharacter.id === 'donutCop' ? -(SYMBOL_SIZE * 1.2) : -(SYMBOL_SIZE * 0.8)}
                            y={0}
                            width={winningCharacter.id === 'donutCop' ? SYMBOL_SIZE * 2.4 : SYMBOL_SIZE * 1.6}
                            height={winningCharacter.id === 'donutCop' ? SYMBOL_SIZE * 2.4 : SYMBOL_SIZE * 1.6}
                            fps={16}
                            scale={1}
                            loop={false}
                        />
                    {/if}
                {/if}
            {/if}
        {/if}
    </Container>
{/if}