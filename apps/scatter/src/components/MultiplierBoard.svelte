<script lang="ts" module>
	export type EmitterEventMultiplierBoard =
		| { type: 'multiplierBoardShow' }
		| { type: 'multiplierBoardHide' }
		| { type: 'multiplierBoardInit' }
		| { type: 'multiplierBoardReset' }
		| { type: 'multiplierBoardAnimate' }
		| { type: 'multiplierBoardMove' };
</script>


<script lang="ts">
	import _ from 'lodash';
	import { Tween } from 'svelte/motion';
	import { quartInOut } from 'svelte/easing';
	import { waitForResolve } from 'utils-shared/wait';
	import { waitForTimeout } from 'utils-shared/wait';
	import { Sprite, Container } from 'pixi-svelte';
	import BoardContainer from './BoardContainer.svelte';
	import DonutDuel from './DonutDuel.svelte';
	import { getContext } from '../game/context';
	import type { RawSymbol, SymbolState } from '../game/types';
	import { getSymbolX, getSymbolY } from '../game/utils';

	const context = getContext();

	type BombType = {
		id: number;
		multiplierValue: number;
		x: number;
		y: number;
		reelIndex: number;
		symbolIndex: number;
		isActive: boolean;
		backdropScale: number;
		showBackdrop: boolean;
		startTicking: boolean;
	};

	let show = $state(false);
	let unifiedBombs = $state<BombType[]>([]);
	let completedBombs = $state<number[]>([]);
	let currentAnimatingBombs = $state<number[]>([]);
	let animationSequenceRunning = $state(false);

	const animateBackdrop = async (bomb: BombType): Promise<void> => {
		const frameCount = 15;
		const startScale = 0.5;
		const endScale = 2;
		const stepDuration = 50;
		const scaleSteps = Array.from({ length: frameCount }, (_, i) =>
			startScale + ((endScale - startScale) * i) / (frameCount - 1),
		);
		bomb.showBackdrop = true;
		for (const scale of scaleSteps) {
			bomb.backdropScale = scale;
			await waitForTimeout(stepDuration);
		}
		await waitForTimeout(100);
		bomb.startTicking = true;
	};

	context.eventEmitter.subscribeOnMount({
		multiplierBoardShow: () => (show = true),
		multiplierBoardHide: () => (show = false),
		multiplierBoardInit: () => {
			const bombs: BombType[] = [];
			let bombId = 0;
			context.stateGameDerived.boardRaw().forEach((rawSymbols, reelIndex) => {
				rawSymbols.forEach((rawSymbol, symbolIndex) => {
					if (rawSymbol.name === 'M' && symbolIndex > 0 && symbolIndex < rawSymbols.length - 1) {
						const multiplierValue = rawSymbol.multiplier || 2;
						bombs.push({
							id: bombId++,
							multiplierValue,
							x: getSymbolX(reelIndex),
							y: getSymbolY(symbolIndex - 1),
							reelIndex,
							symbolIndex: symbolIndex - 1,
							isActive: false,
							backdropScale: 0.2,
							showBackdrop: false,
							startTicking: false,
						});
					}
				});
			});
			unifiedBombs = bombs;
			completedBombs = [];
			currentAnimatingBombs = [];
			animationSequenceRunning = false;
		},
		multiplierBoardReset: () => {
			unifiedBombs = [];
			completedBombs = [];
			currentAnimatingBombs = [];
			animationSequenceRunning = false;
		},
		multiplierBoardAnimate: async () => {
			if (unifiedBombs.length === 0) return;
			animationSequenceRunning = true;
			completedBombs = [];
			for (let i = 0; i < unifiedBombs.length; i++) {
				const bomb = unifiedBombs[i];
				bomb.isActive = true;
				currentAnimatingBombs = [bomb.id];
				await animateBackdrop(bomb);
				await waitForBombCompletion(bomb.id);
				await waitForTimeout(300);
			}
			animationSequenceRunning = false;
		},
	});

	const waitForBombCompletion = (bombId: number): Promise<void> => {
		return new Promise((resolve) => {
			const checkCompletion = () => {
				if (completedBombs.includes(bombId)) {
					resolve();
				} else {
					setTimeout(checkCompletion, 50);
				}
			};
			checkCompletion();
		});
	};

	const handleBombComplete = (bombId: number) => {
		completedBombs = [...completedBombs, bombId];
		currentAnimatingBombs = currentAnimatingBombs.filter(id => id !== bombId);
	};
</script>

{#if show}
	<BoardContainer>
		{#each unifiedBombs as bomb (bomb.id)}
			{#if bomb.isActive}
				{#if bomb.showBackdrop}
					<!-- Backdrop glow effect - using a simple circle -->
					<Container x={bomb.x} y={bomb.y}>
						<Sprite 
							key="play"
							anchor={0.5}
							scale={0.3 * bomb.backdropScale}
							x={0}
							y={0}
							alpha={0.5}
						/>
					</Container>
				{/if}
				{#if bomb.startTicking}
					<DonutDuel 
						x={bomb.x}
						y={bomb.y}
						multiplierValue={bomb.multiplierValue}
						gridPosition={{ row: bomb.symbolIndex, col: bomb.reelIndex }}
						onComplete={() => handleBombComplete(bomb.id)}
					/>
				{/if}
			{/if}
		{/each}
	</BoardContainer>
{/if}
