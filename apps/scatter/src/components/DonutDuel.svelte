<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { quartOut, cubicInOut } from 'svelte/easing';
	import { Container, Sprite } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	import { getContext } from '../game/context';
	import MultiplierNumber from './MultiplierNumber.svelte';
	import DuelAnimation from './DuelAnimation.svelte';
	import { SYMBOL_SIZE, BOARD_DIMENSIONS } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		multiplierValue: number;
		gridPosition?: { row: number; col: number };
		onComplete?: () => void;
	};

	type DuelPhase = 'hidden' | 'anticipation' | 'vs-reveal' | 'multiplier-drop' | 'return-to-grid' | 'complete';

	const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];

	const props: Props = $props();
	const context = getContext();

	// Board center position
	const centerX = (BOARD_DIMENSIONS.x * SYMBOL_SIZE) / 2;
	const centerY = (BOARD_DIMENSIONS.y * SYMBOL_SIZE) / 2;

	// Target grid cell position
	const targetX = props.x ?? 0;
	const targetY = props.y ?? 0;

	// Animation timing constants (in ms)
	const ANTICIPATION_DURATION = 300;
	const VS_ANIMATION_DURATION = 1500;
	const VS_HOLD_DURATION = 400;
	const MULTIPLIER_DROP_DURATION = 500;
	const RETURN_TO_GRID_DURATION = 500;

	// Duel display sizing
	const DUEL_SCALE = 1.8;
	const CHARACTER_WIDTH = SYMBOL_SIZE * 1.5;
	const CHARACTER_HEIGHT = SYMBOL_SIZE * 1.8;
	const CHARACTER_SPACING = SYMBOL_SIZE * 2.2;
	const MULTIPLIER_SIZE = SYMBOL_SIZE * 1.0;
	const MULTIPLIER_OFFSET_Y = -SYMBOL_SIZE * 0.6; // Numbers above (negative Y)
	const ANIMATION_OFFSET_Y = SYMBOL_SIZE * 0.5; // Animations below (positive Y)
	const OVERALL_OFFSET_Y = SYMBOL_SIZE * 0.4; // Push everything down a bit
	const BG_WIDTH = SYMBOL_SIZE * 4.5;
	const BG_HEIGHT = SYMBOL_SIZE * 2.4;

	const getRandomMultiplier = () => {
		const available = MULTIPLIER_VALUES.filter(v => v !== props.multiplierValue);
		return available[Math.floor(Math.random() * available.length)];
	};

	let phase = $state<DuelPhase>('hidden');
	let showVSAnimation = $state(false);
	let showMultiplierDrop = $state(false);
	let showReturnToGrid = $state(false);

	// Randomly determine which side wins
	let leftWins = $state(false);
	let fakeMultiplier = $state(2);
	let grenadeMultiplier = $state(0);
	let copMultiplier = $state(0);

	// Multiplier drop animation tweens
	const multiplierDropScale = new Tween(1);
	const multiplierDropAlpha = new Tween(0);

	// Return to grid animation tweens
	const returnX = new Tween(centerX);
	const returnY = new Tween(centerY);
	const returnScale = new Tween(1);
	const returnAlpha = new Tween(0);

	onMount(() => {
		// Randomly decide which side wins
		leftWins = Math.random() > 0.5;
		fakeMultiplier = getRandomMultiplier();

		// Assign multipliers - left (blue/cowboy) gets real value if leftWins
		grenadeMultiplier = leftWins ? props.multiplierValue : fakeMultiplier;
		copMultiplier = leftWins ? fakeMultiplier : props.multiplierValue;

		startDuelSequence();
	});

	const startDuelSequence = async () => {
		// Phase 1: Anticipation
		phase = 'anticipation';
		await playAnticipation();

		// Phase 2: VS Animation with duel
		phase = 'vs-reveal';
		await playVSAnimation();
		await waitForTimeout(VS_HOLD_DURATION / stateBetDerived.timeScale());

		// Phase 3: Multiplier Drop
		phase = 'multiplier-drop';
		await playMultiplierDrop();

		// Phase 4: Return to grid
		phase = 'return-to-grid';
		await playReturnToGrid();

		phase = 'complete';
		props.onComplete?.();
	};

	const playAnticipation = async () => {
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_anticipation' });
		await waitForTimeout(ANTICIPATION_DURATION / stateBetDerived.timeScale());
	};

	const playVSAnimation = async () => {
		showVSAnimation = true;
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_explosion' });
		await waitForTimeout(VS_ANIMATION_DURATION / stateBetDerived.timeScale());
		showVSAnimation = false;
	};

	const playMultiplierDrop = async () => {
		showMultiplierDrop = true;

		multiplierDropScale.set(1.3, { duration: 0 });
		multiplierDropAlpha.set(1, { duration: 0 });

		await waitForTimeout(100 / stateBetDerived.timeScale());
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_up' });

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
		showReturnToGrid = true;

		// Setup return animation start state
		returnX.set(centerX, { duration: 0 });
		returnY.set(centerY, { duration: 0 });
		returnScale.set(1, { duration: 0 });
		returnAlpha.set(1, { duration: 0 });
	};

	const playReturnToGrid = async () => {
		const duration = RETURN_TO_GRID_DURATION / stateBetDerived.timeScale();

		returnX.set(targetX, { duration, easing: cubicInOut });
		returnY.set(targetY, { duration, easing: cubicInOut });
		returnScale.set(1, { duration, easing: cubicInOut });

		await waitForTimeout(RETURN_TO_GRID_DURATION);
		showReturnToGrid = false;
	};
</script>

{#if phase !== 'hidden' && phase !== 'complete'}
	{@const mainLayout = context.stateLayoutDerived.mainLayout()}

	<!-- Dim overlay -->
	<Sprite
		key="tint.png"
		x={-mainLayout.width * 0.5}
		y={-mainLayout.height * 0.5}
		width={mainLayout.width * 2}
		height={mainLayout.height * 2}
		anchor={{ x: 0, y: 0 }}
		alpha={0.7}
	/>

	<Container>
		<!-- VS Animation Phase -->
		{#if phase === 'vs-reveal' && showVSAnimation}
			<Container x={centerX} y={centerY + OVERALL_OFFSET_Y} scale={DUEL_SCALE}>
				<!-- Background -->
				<Sprite
					key="duelbg.png"
					anchor={{ x: 0.5, y: 0.5 }}
					x={0}
					y={0}
					width={BG_WIDTH}
					height={BG_HEIGHT}
				/>

				<!-- Left multiplier (blue/cowboy) - now on top -->
				<MultiplierNumber
					multiplier={grenadeMultiplier}
					color="blue"
					x={-CHARACTER_SPACING / 2}
					y={MULTIPLIER_OFFSET_Y}
					width={MULTIPLIER_SIZE}
					height={MULTIPLIER_SIZE}
					anchor={{ x: 0.5, y: 0.5 }}
				/>

				<!-- Right multiplier (red/indian) - now on top -->
				<MultiplierNumber
					multiplier={copMultiplier}
					color="red"
					x={CHARACTER_SPACING / 2}
					y={MULTIPLIER_OFFSET_Y}
					width={MULTIPLIER_SIZE}
					height={MULTIPLIER_SIZE}
					anchor={{ x: 0.5, y: 0.5 }}
				/>

				<!-- Duel Animation - now below -->
				<DuelAnimation
					winner={leftWins ? 'cowboy' : 'indian'}
					x={0}
					y={ANIMATION_OFFSET_Y}
					width={CHARACTER_WIDTH}
					height={CHARACTER_HEIGHT}
					spacing={CHARACTER_SPACING}
					fps={24}
					playSound={true}
				/>
			</Container>
		{/if}

		<!-- Multiplier Drop Phase -->
		{#if phase === 'multiplier-drop' && showMultiplierDrop}
			<Container
				x={centerX}
				y={centerY}
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

		<!-- Return to grid animation -->
		{#if showReturnToGrid}
			<Container
				x={returnX.current}
				y={returnY.current}
				scale={returnScale.current}
				alpha={returnAlpha.current}
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
