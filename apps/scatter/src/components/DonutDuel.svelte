<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { quartOut, cubicInOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	
	import { getContext } from '../game/context';
	import FramedDisplay from '../framedisplay.svelte';
	import MultiplierNumber from './MultiplierNumber.svelte';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		multiplierValue: number;
		gridPosition?: { row: number; col: number }; // Position on grid where VS symbol landed
		onComplete?: () => void;
	};

	type DuelPhase = 'hidden' | 'anticipation' | 'vs-reveal' | 'multiplier-drop' | 'complete';

	const props: Props = $props();
	const context = getContext();
	
	// Animation timing constants (in ms)
	const ANTICIPATION_DURATION = 300;
	const VS_ANIMATION_DURATION = 2250;
	const VS_HOLD_DURATION = 600;
	const MULTIPLIER_DROP_DURATION = 700;
	const DROP_BOUNCE_DURATION = 200;
	const TOTAL_SEQUENCE_DURATION = 
		ANTICIPATION_DURATION + 
		VS_ANIMATION_DURATION + 
		VS_HOLD_DURATION + 
		MULTIPLIER_DROP_DURATION + 
		DROP_BOUNCE_DURATION;
	
	// Helper function to get random multiplier (must be defined before use)
	const getRandomMultiplier = () => {
		const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];
		const available = MULTIPLIER_VALUES.filter(v => v !== props.multiplierValue);
		return available[Math.floor(Math.random() * available.length)];
	};

	// Helper to determine multiplier size based on value
	const getMultiplierSize = (multiplier: number) => {
		const largeMultipliers = [10, 15, 25, 50, 100];
		return largeMultipliers.includes(multiplier) ? SYMBOL_SIZE * 1.4 : SYMBOL_SIZE * 1.2;
	};

	// Helper to determine if multiplier is on an end column (left or right edge)
	const isEndColumn = (): boolean => {
		if (!props.gridPosition) return false;
		const col = props.gridPosition.col;
		const boardWidth = BOARD_DIMENSIONS.x;
		return col === 0 || col === boardWidth - 1;
	};

	// Helper to get multiplier positions (horizontal vs vertical arrangement)
	const getMultiplierPositions = () => {
		if (isEndColumn()) {
			// Vertical arrangement: blue above, red below
			return {
				blue: { x: 0, y: -SYMBOL_SIZE },
				red: { x: 0, y: SYMBOL_SIZE },
				vs: { x: 0, y: 0 }
			};
		} else {
			// Horizontal arrangement: blue left, red right
			return {
				blue: { x: -SYMBOL_SIZE * 1.3, y: 0 },
				red: { x: SYMBOL_SIZE * 1.3, y: 0 },
				vs: { x: -SYMBOL_SIZE * 0.8, y: 0 }
			};
		}
	};
	
	let phase = $state<DuelPhase>('hidden');
	let showVSAnimation = $state(false);
	let showMultiplierDrop = $state(false);
	
	// Randomly determine which side wins - will be set in onMount
	let leftWins = $state(false);
	let fakeMultiplier = $state(2);
	let grenadeMultiplier = $state(0);
	let copMultiplier = $state(0);
	
	// Multiplier drop animation
	const VS_ANIMATION_FRAMES = [
		"vs0001 (9).png", "vs0001 (8).png", "vs0001 (7).png", "vs0001 (6).png", "vs0001 (5).png", "vs0001 (4).png",
		"vs0001 (3).png", "vs0001 (2).png", "vs0001 (1).png", "vs0001 (30).png", "vs0001 (29).png", "vs0001 (28).png",
		"vs0001 (27).png", "vs0001 (26).png", "vs0001 (25).png", "vs0001 (24).png", "vs0001 (23).png", "vs0001 (22).png",
		"vs0001 (21).png", "vs0001 (20).png", "vs0001 (19).png", "vs0001 (18).png", "vs0001 (17).png", "vs0001 (16).png",
		"vs0001 (15).png", "vs0001 (14).png", "vs0001 (13).png", "vs0001 (12).png", "vs0001 (11).png", "vs0001 (10).png"
	];

	// Multiplier drop animation
	const multiplierDropX = new Tween(0);
	const multiplierDropY = new Tween(0);
	const multiplierDropScale = new Tween(1);
	const multiplierDropAlpha = new Tween(0);

	onMount(() => {
		// Randomly decide which side gets the winning multiplier
		leftWins = Math.random() > 0.5;
		fakeMultiplier = getRandomMultiplier();
		
		// Assign multipliers - left (blue) gets real value half the time
		grenadeMultiplier = leftWins ? props.multiplierValue : fakeMultiplier;
		copMultiplier = leftWins ? fakeMultiplier : props.multiplierValue;
		
		console.log(`🎲 Left wins: ${leftWins}, Blue: ${grenadeMultiplier}X, Red: ${copMultiplier}X`);
		
		startDuelSequence();
	});

	const startDuelSequence = async () => {
		console.log(`🎯 Donut Duel: ${leftWins ? 'Left (Blue)' : 'Right (Red)'} wins with ${props.multiplierValue}X vs ${fakeMultiplier}X`);
		
		// Phase 0: Anticipation pulse
		phase = 'anticipation';
		await playAnticipation();
		
		// Phase 1: VS Animation with multiplier comparison
		phase = 'vs-reveal';
		await playVSAnimation();
		
		// Brief hold on VS multipliers
		await waitForTimeout(VS_HOLD_DURATION / stateBetDerived.timeScale());
		
		// Phase 2: Multiplier Drop to Grid
		phase = 'multiplier-drop';
		await playMultiplierDrop();
		
		phase = 'complete';
		console.log('✅ Donut Duel complete');
		props.onComplete?.();
	};

	const playAnticipation = async () => {
		console.log('⏳ Playing anticipation pulse');
		
		// Play anticipation sound
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_anticipation' });
		
		await waitForTimeout(ANTICIPATION_DURATION / stateBetDerived.timeScale());
		console.log('✅ Anticipation complete');
	};

	const playVSAnimation = async () => {
		console.log('🆚 Playing VS animation with multiplier comparison');
		showVSAnimation = true;
		
		// Play explosion sound at start
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		
		// Play through all frames
		await waitForTimeout(VS_ANIMATION_DURATION / stateBetDerived.timeScale());
		
		showVSAnimation = false;
		console.log('✅ VS animation complete');
	};

	const playMultiplierDrop = async () => {
		console.log('💰 Dropping multiplier to grid position');
		showMultiplierDrop = true;
		
		// Reset position at board center
		multiplierDropX.set(0, { duration: 0 });
		multiplierDropY.set(0, { duration: 0 });
		multiplierDropScale.set(1.3, { duration: 0 });
		multiplierDropAlpha.set(1, { duration: 0 });
		
		// Brief delay before drop
		await waitForTimeout(100 / stateBetDerived.timeScale());
		
		// Play drop sound
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_up' });
		
		// Animate drop with easing
		multiplierDropY.set(0, { 
			duration: MULTIPLIER_DROP_DURATION / stateBetDerived.timeScale(), 
			easing: cubicInOut 
		});
		multiplierDropScale.set(1, { 
			duration: MULTIPLIER_DROP_DURATION / stateBetDerived.timeScale(), 
			easing: cubicInOut 
		});
		
		await waitForTimeout(MULTIPLIER_DROP_DURATION / stateBetDerived.timeScale());
		
		// Bounce effect
		multiplierDropScale.set(1.15, { duration: 50 });
		await waitForTimeout(50);
		multiplierDropScale.set(1, { duration: 100 });
		await waitForTimeout(100);
		
		showMultiplierDrop = false;
		console.log('✅ Multiplier drop complete');
	};
</script>

{#if phase !== 'hidden' && phase !== 'complete'}
	<Container x={props.x} y={props.y}>
		<!-- Anticipation Phase - Hidden, just sound and timing -->
		{#if phase === 'anticipation'}
			<!-- Invisible phase - just anticipation sound and timing -->
		{/if}

		<!-- VS Animation Phase with large Multiplier Comparison -->
		{#if phase === 'vs-reveal' && showVSAnimation}
			{@const positions = getMultiplierPositions()}
			<!-- VS Duel Background -->
			<Sprite
				key="duelbg.png"
				anchor={{ x: 0.5, y: 0.5 }}
				x={0}
				y={SYMBOL_SIZE * 0.9  }
				width={SYMBOL_SIZE * 5}
				height={SYMBOL_SIZE * 2}
			/>
			<!-- Grenade Robber Multiplier (left or top) - Large display -->
			<MultiplierNumber
				multiplier={grenadeMultiplier}
				color="blue"
				x={positions.blue.x}
				y={positions.blue.y}
				width={getMultiplierSize(grenadeMultiplier)}
				height={getMultiplierSize(grenadeMultiplier)}
				anchor={{ x: 0.5, y: 0.5 }}
			/>

			<!-- VS Animation in center -->
			<FramedDisplay
				frameKeys={VS_ANIMATION_FRAMES}
				x={positions.vs.x}
				y={positions.vs.y}
				width={SYMBOL_SIZE * 1.6}
				height={SYMBOL_SIZE * 1.6}
				fps={16}
				scale={1}
				loop={false}
			/>

			<!-- Donut Cop Multiplier (right or bottom) - Large display -->
			<MultiplierNumber
				multiplier={copMultiplier}
				color="red"
				x={positions.red.x}
				y={positions.red.y}
				width={getMultiplierSize(copMultiplier)}
				height={getMultiplierSize(copMultiplier)}
				anchor={{ x: 0.5, y: 0.5 }}
			/>
		{/if}

		<!-- Multiplier Drop Phase - Stays on board location -->
		{#if phase === 'multiplier-drop' && showMultiplierDrop}
			<Container
				x={multiplierDropX.current}
				y={multiplierDropY.current}
				scale={multiplierDropScale.current}
				alpha={multiplierDropAlpha.current}
			>
				<MultiplierNumber
					multiplier={props.multiplierValue}
					color={leftWins ? 'blue' : 'red'}
					width={SYMBOL_SIZE}
					height={SYMBOL_SIZE}
					anchor={{ x: 0.5, y: 0.5 }}
				/>
			</Container>
		{/if}
	</Container>
{/if}
