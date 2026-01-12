<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, Sprite, BitmapText } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		realMultiplier: number;
		onComplete?: () => void;
	};

	type DuelPhase = 'hidden' | 'intro' | 'dueling' | 'winner-reveal' | 'complete';

	const props: Props = $props();
	const context = getContext();

	const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];
	
	// Get random multiplier (different from real)
	const getRandomMultiplier = () => {
		const available = MULTIPLIER_VALUES.filter(v => v !== props.realMultiplier);
		return available[Math.floor(Math.random() * available.length)];
	};

	const fakeMultiplier = $derived(getRandomMultiplier());

	let phase = $state<DuelPhase>('hidden');
	let winnerMultiplier = $state(props.realMultiplier);
	
	// Animations for grenade (left)
	const grenadeX = new Tween(-SYMBOL_SIZE * 1.5);
	const grenadeY = new Tween(0);
	const grenadeScale = new Tween(1);
	const grenadeRotation = new Tween(0);
	
	// Animations for donut cop (right)
	const donutX = new Tween(SYMBOL_SIZE * 1.5);
	const donutY = new Tween(0);
	const donutScale = new Tween(1);
	const donutRotation = new Tween(0);
	
	// Winner display
	const winnerScale = new Tween(0);
	const winnerY = new Tween(-SYMBOL_SIZE);

	onMount(() => {
		startDuelSequence();
		return () => {};
	});

	const startDuelSequence = async () => {
		console.log(`🎯 Starting duel: ${props.realMultiplier}X vs ${fakeMultiplier}X`);
		await playIntroAnimation();
		console.log('✅ Intro done');
		await playDuelingAnimation();
		console.log('✅ Dueling done');
		await playWinnerRevealAnimation();
		console.log('✅ Winner reveal done');
		phase = 'complete';
		console.log(`✅ Duel complete - Winner: ${winnerMultiplier}X`);
		
		// Call the onComplete prop callback
		if (props.onComplete) {
			console.log('✅ Calling onComplete prop');
			props.onComplete();
		}
		
		// Also call the global callback for the parent component
		const globalCallback = (globalThis as any).__duelCompleteCallback;
		if (globalCallback) {
			console.log('✅ Calling global duel callback');
			globalCallback();
		}
	};

	const playIntroAnimation = async () => {
		phase = 'intro';
		console.log('🎬 Intro animation started');
		
		// Grenade and donut cop slide in from sides
		grenadeX.set(-SYMBOL_SIZE * 0.8, { duration: 400 / stateBetDerived.timeScale() });
		donutX.set(SYMBOL_SIZE * 0.8, { duration: 400 / stateBetDerived.timeScale() });
		
		await waitForTimeout(400 / stateBetDerived.timeScale());
		
		console.log('✅ Intro animation complete');
		await waitForTimeout(200 / stateBetDerived.timeScale());
	};

	const playDuelingAnimation = async () => {
		phase = 'dueling';
		console.log('🎯 Dueling animation started');
		
		// Shooting animation - both attack back and forth
		for (let i = 0; i < 3; i++) {
			console.log(`🔫 Duel round ${i + 1}/3`);
			
			// Grenade shoots
			grenadeX.set(-SYMBOL_SIZE * 0.3, { duration: 150 / stateBetDerived.timeScale() });
			context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_scatter_stop_1' });
			
			await waitForTimeout(150 / stateBetDerived.timeScale());
			
			// Donut cop shoots
			donutX.set(SYMBOL_SIZE * 0.3, { duration: 150 / stateBetDerived.timeScale() });
			context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_scatter_stop_2' });
			
			await waitForTimeout(150 / stateBetDerived.timeScale());
			
			// Return to starting positions
			grenadeX.set(-SYMBOL_SIZE * 0.8, { duration: 100 / stateBetDerived.timeScale() });
			donutX.set(SYMBOL_SIZE * 0.8, { duration: 100 / stateBetDerived.timeScale() });
			
			await waitForTimeout(100 / stateBetDerived.timeScale());
		}
		
		console.log('✅ Dueling animation complete');
		await waitForTimeout(200 / stateBetDerived.timeScale());
	};

	const playWinnerRevealAnimation = async () => {
		phase = 'winner-reveal';
		console.log('🏆 Winner reveal animation started');
		
		// Determine which side is the winner (always real multiplier)
		// Real multiplier is always the winner
		// Fake multiplier falls
		const fakeIsGrenade = Math.random() > 0.5;
		
		if (fakeIsGrenade) {
			// Grenade (left) is fake - it falls
			console.log('💣 Grenade falls, Donut cop wins!');
			grenadeY.set(SYMBOL_SIZE * 2, { duration: 500 / stateBetDerived.timeScale() });
			grenadeRotation.set(Math.PI * 2, { duration: 500 / stateBetDerived.timeScale() });
		} else {
			// Donut cop (right) is fake - it falls
			console.log('👮 Donut cop falls, Grenade wins!');
			donutY.set(SYMBOL_SIZE * 2, { duration: 500 / stateBetDerived.timeScale() });
			donutRotation.set(Math.PI * 2, { duration: 500 / stateBetDerived.timeScale() });
		}
		
		await waitForTimeout(500 / stateBetDerived.timeScale());
		
		await waitForTimeout(300 / stateBetDerived.timeScale());
		
		// Winner moves to center and scales up
		winnerMultiplier = props.realMultiplier;
		console.log(`✨ Winner multiplier ${winnerMultiplier}X moves to center`);
		
		winnerScale.set(1.5, { duration: 400 / stateBetDerived.timeScale() });
		winnerY.set(0, { duration: 400 / stateBetDerived.timeScale() });
		
		await waitForTimeout(400 / stateBetDerived.timeScale());
		
		// Play victory sound
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		
		console.log('✅ Winner reveal complete');
		await waitForTimeout(300 / stateBetDerived.timeScale());
	};
</script>

<Container x={props.x} y={props.y}>
	{#if phase !== 'hidden' && phase !== 'complete'}
		<!-- Grenade (left side) -->
		{#if fakeMultiplier}
			<Container x={grenadeX.current} y={grenadeY.current} rotation={grenadeRotation.current} scale={grenadeScale.current}>
				<!-- Placeholder for grenade sprite -->
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
					text={`${fakeMultiplier}X`}
					style={{
						fontFamily: 'purple',
						fontSize: SYMBOL_SIZE * 0.25,
						letterSpacing: -1,
					}}
				/>
			</Container>
		{/if}

		<!-- Donut cop (right side) -->
		<Container x={donutX.current} y={donutY.current} rotation={donutRotation.current} scale={donutScale.current}>
			<!-- Placeholder for donut cop sprite -->
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
				text={`${props.realMultiplier}X`}
				style={{
					fontFamily: 'purple',
					fontSize: SYMBOL_SIZE * 0.25,
					letterSpacing: -1,
				}}
			/>
		</Container>

		<!-- Winner reveal in center -->
		{#if phase === 'winner-reveal'}
			<Container y={winnerY.current}>
				<Sprite
					key="play"
					anchor={0.5}
					scale={0.9 * winnerScale.current}
					x={0}
					y={0}
					tint={0xffd93d}
				/>
				<BitmapText
					anchor={0.5}
					x={0}
					y={SYMBOL_SIZE * 0.5}
					text={`${winnerMultiplier}X`}
					style={{
						fontFamily: 'purple',
						fontSize: SYMBOL_SIZE * 0.35,
						letterSpacing: -2,
					}}
				/>
			</Container>
		{/if}
	{/if}
</Container>
