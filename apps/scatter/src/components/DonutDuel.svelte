<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Container, Sprite, BitmapText } from 'pixi-svelte';
	import { waitForTimeout } from 'utils-shared/wait';
	import { stateBetDerived } from 'state-shared';
	
	import { getContext } from '../game/context';
	import FramedDisplay from '../framedisplay.svelte';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		x?: number;
		y?: number;
		multiplierValue: number;
		gridPosition?: { row: number; col: number }; // Position on grid where VS symbol landed
		onComplete?: () => void;
	};

	type DuelPhase = 'hidden' | 'vs-reveal' | 'win-animation' | 'multiplier-drop' | 'complete';

	const props: Props = $props();
	const context = getContext();
	
	// Helper function to get random multiplier (must be defined before use)
	const getRandomMultiplier = () => {
		const MULTIPLIER_VALUES = [2, 4, 5, 7, 10, 50, 100];
		const available = MULTIPLIER_VALUES.filter(v => v !== props.multiplierValue);
		return available[Math.floor(Math.random() * available.length)];
	};
	
	let phase = $state<DuelPhase>('hidden');
	let showVSAnimation = $state(false);
	let showWinAnimation = $state(false);
	let showMultiplierDrop = $state(false);
	
	// Randomly determine winner (50/50 chance)
	const winnerIsGrenade = Math.random() > 0.5;
	const winningCharacterId = winnerIsGrenade ? 'grenadeRobber' : 'donutCop';
	const fakeMultiplier = getRandomMultiplier();
	
	// Assign multipliers based on winner
	const grenadeMultiplier = winnerIsGrenade ? props.multiplierValue : fakeMultiplier;
	const copMultiplier = winnerIsGrenade ? fakeMultiplier : props.multiplierValue;
	
	// Multiplier drop animation
	const multiplierDropX = new Tween(0);
	const multiplierDropY = new Tween(0);
	const multiplierDropScale = new Tween(1);

	// Win animation entrance
	const winAnimationScale = new Tween(0);
	const winAnimationAlpha = new Tween(0);

	onMount(() => {
		startDuelSequence();
	});

	const startDuelSequence = async () => {
		console.log(`🎯 Donut Duel: ${winningCharacterId === 'grenadeRobber' ? 'Grenade' : 'Cop'} wins with ${props.multiplierValue}X vs ${fakeMultiplier}X`);
		
		// Phase 1: VS Animation with multiplier comparison
		phase = 'vs-reveal';
		await playVSAnimation();
		
		// Pause to let multipliers sink in
		await waitForTimeout(800 / stateBetDerived.timeScale());
		
		// Phase 2: Character Win Animation
		phase = 'win-animation';
		await playWinAnimation();
		
		// Phase 3: Multiplier Drop to Grid
		phase = 'multiplier-drop';
		await playMultiplierDrop();
		
		phase = 'complete';
		console.log('✅ Donut Duel complete');
		props.onComplete?.();
	};

	const playVSAnimation = async () => {
		console.log('🆚 Playing VS animation with multiplier comparison');
		showVSAnimation = true;
		context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_multiplier_explosion_a' });
		
		// Play through all 36 frames (at fps 16 = ~2.25 seconds)
		await waitForTimeout(2250 / stateBetDerived.timeScale());
		
		showVSAnimation = false;
		console.log('✅ VS animation complete');
	};

	const playWinAnimation = async () => {
		console.log(`🏆 Playing ${winningCharacterId} win animation`);
		
		// Reset and animate entrance
		winAnimationScale.set(0, { duration: 0 });
		winAnimationAlpha.set(0, { duration: 0 });
		
		showWinAnimation = true;
		
		// Animate in with scale and alpha
		winAnimationScale.set(1, { duration: 300 });
		winAnimationAlpha.set(1, { duration: 300 });
		
		// Play through all 36 frames (at fps 16 = ~2.25 seconds)
		await waitForTimeout(2250 / stateBetDerived.timeScale());
		
		showWinAnimation = false;
		console.log('✅ Win animation complete');
	};

	const playMultiplierDrop = async () => {
		console.log('💰 Dropping multiplier to grid position');
		showMultiplierDrop = true;
		
		// Calculate target grid position
		const targetX = props.gridPosition ? (props.gridPosition.col - 1.5) * SYMBOL_SIZE : 0;
		const targetY = props.gridPosition ? (props.gridPosition.row - 1.5) * SYMBOL_SIZE : 0;
		
		// Animate multiplier from center to grid position with drop effect
		multiplierDropScale.set(1.5, { duration: 0 }); // Start larger
		multiplierDropX.set(0, { duration: 0 });
		multiplierDropY.set(-SYMBOL_SIZE * 2, { duration: 0 });
		
		// Drop down to grid position
		multiplierDropY.set(targetY, { duration: 600 / stateBetDerived.timeScale() });
		multiplierDropX.set(targetX, { duration: 600 / stateBetDerived.timeScale() });
		multiplierDropScale.set(1, { duration: 600 / stateBetDerived.timeScale() });
		
		await waitForTimeout(700 / stateBetDerived.timeScale());
		
		showMultiplierDrop = false;
		console.log('✅ Multiplier drop complete');
	};
</script>

{#if phase !== 'hidden' && phase !== 'complete'}
	<Container x={props.x} y={props.y - SYMBOL_SIZE * 0.8}>
		<!-- VS Animation Phase with large Multiplier Comparison -->
		{#if phase === 'vs-reveal' && showVSAnimation}
			<!-- Grenade Robber Multiplier (left) - Large display -->
			<BitmapText
				anchor={0.5}
				x={-SYMBOL_SIZE * 1.2}
				y={0}
				text={`${grenadeMultiplier}X`}
				style={{
					fontFamily: 'purple',
					fontSize: SYMBOL_SIZE * 0.8,
					letterSpacing: -3,
					fontWeight: 'bold',
				}}
			/>

			<!-- VS Animation in center -->
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

			<!-- Donut Cop Multiplier (right) - Large display -->
			<BitmapText
				anchor={0.5}
				x={SYMBOL_SIZE * 1.2}
				y={0}
				text={`${copMultiplier}X`}
				style={{
					fontFamily: 'purple',
					fontSize: SYMBOL_SIZE * 0.8,
					letterSpacing: -3,
					fontWeight: 'bold',
				}}
			/>
		{/if}

		<!-- Character Win Animation Phase (Wanted Poster Style) -->
		{#if phase === 'win-animation' && showWinAnimation}
			<Container x={0} y={winningCharacterId === 'donutCop' ? -SYMBOL_SIZE : 0} scale={winAnimationScale.current} alpha={winAnimationAlpha.current}>
				<!-- Win animation - Full character with winning multiplier overlay -->
				<FramedDisplay
					frameKeys={winningCharacterId === 'grenadeRobber'
						? [
							"robberwins1", "robberwins2", "robberwins3", "robberwins4", "robberwins5", "robberwins6",
							"robberwins7", "robberwins8", "robberwins9", "robberwins10", "robberwins11", "robberwins12",
							"robberwins13", "robberwins14", "robberwins15", "robberwins16", "robberwins17", "robberwins18",
							"robberwins19", "robberwins20", "robberwins21", "robberwins22", "robberwins23", "robberwins24",
							"robberwins25", "robberwins26", "robberwins27", "robberwins28", "robberwins29", "robberwins30",
							"robberwins31", "robberwins32", "robberwins33", "robberwins34", "robberwins35", "robberwins36"
						]
						: [
							"copwins1", "copwins2", "copwins3", "copwins4", "copwins5", "copwins6",
							"copwins7", "copwins8", "copwins9", "copwins10", "copwins11", "copwins12",
							"copwins13", "copwins14", "copwins15", "copwins16", "copwins17", "copwins18",
							"copwins19", "copwins20", "copwins21", "copwins22", "copwins23", "copwins24",
							"copwins25", "copwins26", "copwins27", "copwins28", "copwins29", "copwins30",
							"copwins31", "copwins32", "copwins33", "copwins34", "copwins35", "copwins36"
						]
					}
					x={-(SYMBOL_SIZE * 1.0)}
					y={0}
					width={winningCharacterId === 'donutCop' ? SYMBOL_SIZE * 3.2 : SYMBOL_SIZE * 2.0}
					height={winningCharacterId === 'donutCop' ? SYMBOL_SIZE * 3.2 : SYMBOL_SIZE * 2.0}
					fps={16}
					scale={1}
					loop={false}
				/>
				
				<!-- Large Winning Multiplier Overlay -->
				<BitmapText
					anchor={0.5}
					x={0}
					y={0}
					text={`${props.multiplierValue}X`}
					style={{
						fontFamily: 'purple',
						fontSize: SYMBOL_SIZE,
						letterSpacing: -4,
						fontWeight: 'bold',
					}}
				/>
			</Container>
		{/if}

		<!-- Multiplier Drop Phase -->
		{#if phase === 'multiplier-drop' && showMultiplierDrop}
			<Container
				x={multiplierDropX.current}
				y={multiplierDropY.current}
				scale={multiplierDropScale.current}
			>
				<BitmapText
					anchor={0.5}
					x={0}
					y={0}
					text={`${props.multiplierValue}X`}
					style={{
						fontFamily: 'purple',
						fontSize: SYMBOL_SIZE * 0.4,
						letterSpacing: -2,
						fontWeight: 'bold',
					}}
				/>
			</Container>
		{/if}
	</Container>
{/if}
