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
	let showMultiplierText = $state(false); // HIDDEN until tick-up phase
	let currentTickValue = $state(1); // Start ticking from 1
	let assetError = false; // Define assetError to prevent ReferenceError
	let assetLoaded = true; // Assume asset is loaded for now; update logic as needed
	
	// Animation tweens
	const scale = new Tween(0);
	const textScale = new Tween(0);
	const rotation = new Tween(0);
	
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
		await playTickUpAnimation();
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
	
	const playTickUpAnimation = async () => {
		phase = 'tickingUp';
		
		// NOW show the multiplier text and start ticking up
		showMultiplierText = true;
		currentTickValue = 1;
		
		// NO rotation during tick-up phase to keep text straight
		// Minor rotation removed to prevent text turning
		
		// Animate text scale in
		await textScale.set(1.0, { duration: 200 / stateBetDerived.timeScale() });
		
		// Tick up from 1 to the target multiplier value
		return new Promise<void>((resolve) => {
			tickUpInterval = setInterval(() => {
				// Play incrementally higher sound on each tick
				const tickSoundMap: { [key: number]: any } = {
					1: 'sfx_scatter_stop_1',
					2: 'sfx_scatter_stop_2',
					3: 'sfx_scatter_stop_3',
					4: 'sfx_scatter_stop_4',
					5: 'sfx_scatter_stop_5',
				};
				// Use the current tick value to get progressively higher sounds
				const soundIndex = Math.min(currentTickValue, 5);
				const tickSound = tickSoundMap[soundIndex] || 'sfx_scatter_stop_5';
				context.eventEmitter?.broadcast({ type: 'soundOnce', name: tickSound as any });
				
				// Increment tick value
				currentTickValue++;
				
				// Text scale pulse on each tick
				textScale.set(1.3, { duration: 150 / stateBetDerived.timeScale() })
					.then(() => textScale.set(0.85, { duration: 150 / stateBetDerived.timeScale() }));
				
				// Check if we've reached target
				if (currentTickValue >= props.multiplierValue) {
					if (tickUpInterval) {
						clearInterval(tickUpInterval);
						tickUpInterval = null;
					}
					resolve();
				}
			}, TICK_SPEED / stateBetDerived.timeScale());
		});
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