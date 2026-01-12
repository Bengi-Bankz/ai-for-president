<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, Sprite, BitmapText, SpineProvider, SpineTrack } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		multiplierValue: number;
		autoStart?: boolean;
		onComplete?: () => void;
	};

	type BombPhase = 'hidden' | 'landing' | 'static' | 'scaling' | 'tickingUp' | 'exploding' | 'complete';

	const props: Props = $props();
	const context = getContext();
	
	// State management
	let phase = $state<BombPhase>('hidden');
	let animationName = $state('static');
	let showMultiplierText = $state(false);
	let currentTickValue = $state(1);
	let assetError = false;
	let assetLoaded = true;
	
	// Duel state
	let showDuel = $state(false);
	let duelFakeMultiplier = $state(2);
	let duelWinnerRevealed = $state(false);
	
	// Animation tweens
	const scale = new Tween(0);
	const textScale = new Tween(0);
	const rotation = new Tween(0);
	
	// Duel tweens
	const duelGrenadeX = new Tween(-SYMBOL_SIZE * 1.5);
	const duelDonutX = new Tween(SYMBOL_SIZE * 1.5);
	
	// Animation intervals
	let tickUpInterval: ReturnType<typeof setInterval> | null = null;
	
	// Configuration
	const TICK_SPEED = 500; // ms between ticks during count up (slowed down more)
	
	// Get current sprite based on phase - ALL USE THE SAME STATIC SYMBOL
	// For debugging, use the 'trashcan' sprite key
	const currentSprite = $derived(() => {
		return 'trashcan';
	});
	
	// Auto-start if requested
	onMount(() => {
		if (props.autoStart) {
			startBombSequence();
		}
		
		// Cleanup on unmount
		return () => {
			if (tickUpInterval) clearInterval(tickUpInterval);
		};
	});
	
	const startBombSequence = async () => {
		console.log(`🎯 Starting unified bomb sequence for ${props.multiplierValue}X`);
		await playLandingAnimation();
		await playStaticPhase();
		await playScalingPhase();
		await playDuelAnimation();
		await playExplodingAnimation();
		phase = 'complete';
		console.log(`✅ Unified bomb sequence complete for ${props.multiplierValue}X`);
		props.onComplete?.();
	};
	
	const playLandingAnimation = async () => {
		phase = 'landing';
		
		// Play scatter land sound - use the scatter land sound mapping
		const soundMap: { [key: number]: any } = {
			2: 'sfx_scatter_stop_1',
			4: 'sfx_scatter_stop_2', 
			5: 'sfx_scatter_stop_3',
			7: 'sfx_scatter_stop_4',
			10: 'sfx_scatter_stop_5',
		};
		const soundKey = soundMap[props.multiplierValue] || 'sfx_scatter_stop_1';
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: soundKey as any });
		
		// Simple scale bounce animation for landing (no frame animation)
		await scale.set(1.2, { duration: 400 / stateBetDerived.timeScale() });
		await scale.set(1.0, { duration: 300 / stateBetDerived.timeScale() });
	};
	
	const playStaticPhase = async () => {
		phase = 'static';
		// Brief pause - multiplier value still HIDDEN, showing static symbol
		await waitForTimeout(300 / stateBetDerived.timeScale());
	};
	
	const playScalingPhase = async () => {
		phase = 'scaling';
		// Scale up to 2x as requested
		await scale.set(2.0, { duration: 500 / stateBetDerived.timeScale() });
	};
	
	const playDuelAnimation = async () => {
		phase = 'tickingUp';
		console.log('🎯 Starting duel animation');
		
		// Get random fake multiplier
		const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];
		const available = MULTIPLIER_VALUES.filter(v => v !== props.multiplierValue);
		duelFakeMultiplier = available[Math.floor(Math.random() * available.length)];
		
		// Show duel
		showDuel = true;
		console.log(`🎯 Duel: ${props.multiplierValue}X vs ${duelFakeMultiplier}X`);
		
		// Intro - characters slide in
		duelGrenadeX.set(-SYMBOL_SIZE * 0.8, { duration: 400 / stateBetDerived.timeScale() });
		duelDonutX.set(SYMBOL_SIZE * 0.8, { duration: 400 / stateBetDerived.timeScale() });
		await waitForTimeout(600 / stateBetDerived.timeScale());
		
		// Dueling - 3 rounds of shooting
		for (let i = 0; i < 3; i++) {
			console.log(`🔫 Round ${i + 1}/3`);
			
			// Grenade shoots
			duelGrenadeX.set(-SYMBOL_SIZE * 0.3, { duration: 150 / stateBetDerived.timeScale() });
			context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_scatter_stop_1' });
			await waitForTimeout(150 / stateBetDerived.timeScale());
			
			// Donut shoots
			duelDonutX.set(SYMBOL_SIZE * 0.3, { duration: 150 / stateBetDerived.timeScale() });
			context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_scatter_stop_2' });
			await waitForTimeout(150 / stateBetDerived.timeScale());
			
			// Return to positions
			duelGrenadeX.set(-SYMBOL_SIZE * 0.8, { duration: 100 / stateBetDerived.timeScale() });
			duelDonutX.set(SYMBOL_SIZE * 0.8, { duration: 100 / stateBetDerived.timeScale() });
			await waitForTimeout(100 / stateBetDerived.timeScale());
		}
		
		await waitForTimeout(300 / stateBetDerived.timeScale());
		
		// Winner reveal - loser falls, winner celebrates
		console.log(`✨ Revealing winner: ${props.multiplierValue}X`);
		duelWinnerRevealed = true;
		
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		
		await waitForTimeout(1000 / stateBetDerived.timeScale());
		
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
            {:else if phase === 'tickingUp' && showDuel}
                <!-- Inline Duel Animation -->
                <!-- Grenade (left side) -->
                <Container x={duelGrenadeX.current} y={0}>
                    <Sprite
                        key="play"
                        anchor={0.5}
                        scale={0.7}
                        x={0}
                        y={0}
                        tint={0xff6b6b}
                    />
                    <BitmapText
                        anchor={0.5}
                        x={0}
                        y={SYMBOL_SIZE * 0.5}
                        text={`${duelFakeMultiplier}X`}
                        style={{
                            fontFamily: 'purple',
                            fontSize: SYMBOL_SIZE * 0.25,
                            letterSpacing: -1,
                        }}
                    />
                </Container>

                <!-- Donut cop (right side) -->
                <Container x={duelDonutX.current} y={0}>
                    <Sprite
                        key="play"
                        anchor={0.5}
                        scale={0.7}
                        x={0}
                        y={0}
                        tint={0x4ecdc4}
                    />
                    <BitmapText
                        anchor={0.5}
                        x={0}
                        y={SYMBOL_SIZE * 0.5}
                        text={`${props.multiplierValue}X`}
                        style={{
                            fontFamily: 'purple',
                            fontSize: SYMBOL_SIZE * 0.25,
                            letterSpacing: -1,
                        }}
                    />
                </Container>

                <!-- Winner reveal in center -->
                {#if duelWinnerRevealed}
                    <Container y={0} scale={1.5}>
                        <Sprite
                            key="play"
                            anchor={0.5}
                            scale={0.9}
                            x={0}
                            y={0}
                            tint={0xffd93d}
                        />
                        <BitmapText
                            anchor={0.5}
                            x={0}
                            y={SYMBOL_SIZE * 0.5}
                            text={`${props.multiplierValue}X`}
                            style={{
                                fontFamily: 'purple',
                                fontSize: SYMBOL_SIZE * 0.35,
                                letterSpacing: -2,
                            }}
                        />
                    </Container>
                {/if}
            {:else}
                <Container scale={scale.current} rotation={rotation.current}>
                    <Sprite
                        key={currentSprite()}
                        anchor={0.5}
                        scale={0.8}
                        x={0}
                        y={0}
                    />
                    {#if showMultiplierText}
                        <Container scale={textScale.current}>
                            <BitmapText
                                anchor={0.5}
                                x={0}
                                y={0}
                                text={`${currentTickValue}X`}
                                style={{
                                    fontFamily: 'purple',
                                    fontSize: SYMBOL_SIZE * 0.3,
                                    letterSpacing: -2,
                                }}
                            />
                        </Container>
                    {/if}
                </Container>
            {/if}
        {/if}
    </Container>
{/if}