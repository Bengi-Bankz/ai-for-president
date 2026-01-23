<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	const { Story } = defineMeta({
		title: 'Components/MultiplierBoard',
		args: {
			show: true,
		},
		argTypes: {
			show: {
				control: 'boolean',
				description: 'Show/hide the multiplier board',
			},
		},
	});
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Container, Sprite, Text } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';
	import MultiplierBoard from '../components/MultiplierBoard.svelte';
	import { getContext } from '../game/context';
	import assets from '../game/assets';
	import { SYMBOL_SIZE } from '../game/constants';

	let show = $state(true);
	let animateTriggered = $state(false);

	// Mock board data with some multiplier symbols
	const mockBoardRaw = [
		[
			{ name: 'H1' },
			{ name: 'M', multiplier: 5 },
			{ name: 'H2' },
			{ name: 'L1' },
		],
		[
			{ name: 'L2' },
			{ name: 'M', multiplier: 10 },
			{ name: 'H3' },
			{ name: 'W' },
		],
		[
			{ name: 'H1' },
			{ name: 'L3' },
			{ name: 'M', multiplier: 7 },
			{ name: 'H4' },
		],
		[
			{ name: 'M', multiplier: 2 },
			{ name: 'H2' },
			{ name: 'L1' },
			{ name: 'S' },
		],
	];

	const triggerAnimation = () => {
		animateTriggered = true;
		console.log('🎬 Animation triggered!');
	};
</script>

<Story name="default">
	{#snippet template(args)}
		<StoryPixiApp {assets} width={1000} height={700}>
			<Container>
				<!-- Board background grid (for reference) -->
				{#each mockBoardRaw as row, rowIndex}
					{#each row as _, colIndex}
						<Sprite
							key="grid-bg"
							x={colIndex * SYMBOL_SIZE}
							y={rowIndex * SYMBOL_SIZE}
							width={SYMBOL_SIZE}
							height={SYMBOL_SIZE}
							alpha={0.1}
						/>
					{/each}
				{/each}

				<!-- Board labels -->
				<Text
					x={10}
					y={10}
					style={{
						fontFamily: 'Arial',
						fontSize: 16,
						fill: 0xffffff,
					}}
					text="Click button to trigger animation"
				/>

				<!-- Multiplier Board -->
				{#if args.show}
					<MultiplierBoard />
				{/if}
			</Container>
		</StoryPixiApp>

		<!-- Control Panel -->
		<div style="margin-top: 20px; display: flex; gap: 10px;">
			<button
				onclick={triggerAnimation}
				style={{
					padding: '10px 20px',
					fontSize: '14px',
					backgroundColor: '#4CAF50',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
				}}
			>
				Trigger Multiplier Animation
			</button>
			<button
				onclick={() => (show = !show)}
				style={{
					padding: '10px 20px',
					fontSize: '14px',
					backgroundColor: '#2196F3',
					color: 'white',
					border: 'none',
					borderRadius: '4px',
					cursor: 'pointer',
				}}
			>
				{args.show ? 'Hide' : 'Show'} Board
			</button>
		</div>
	{/snippet}
</Story>

<Story name="hidden">
	{#snippet template()}
		<StoryPixiApp {assets} width={1000} height={700}>
			<Container>
				<Text
					x={10}
					y={10}
					style={{
						fontFamily: 'Arial',
						fontSize: 16,
						fill: 0xffffff,
					}}
					text="Multiplier Board is hidden"
				/>
			</Container>
		</StoryPixiApp>
	{/snippet}
</Story>

<Story name="with-animations">
	{#snippet template()}
		<div>
			<StoryPixiApp {assets} width={1000} height={700}>
				<Container>
					<!-- Board background grid -->
					{#each mockBoardRaw as row, rowIndex}
						{#each row as _, colIndex}
							<Sprite
								key="grid-bg"
								x={colIndex * SYMBOL_SIZE}
								y={rowIndex * SYMBOL_SIZE}
								width={SYMBOL_SIZE}
								height={SYMBOL_SIZE}
								alpha={0.1}
							/>
						{/each}
					{/each}

					<!-- Multiplier Board -->
					<MultiplierBoard />
				</Container>
			</StoryPixiApp>

			<!-- Auto-trigger after mount -->
			<div style="margin-top: 20px;">
				<p>Animations will trigger automatically in sequence</p>
				<button
					onclick={() => {
						console.log('Manually triggering animation');
						animateTriggered = !animateTriggered;
					}}
					style={{
						padding: '10px 20px',
						fontSize: '14px',
						backgroundColor: '#FF9800',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Trigger Animation
				</button>
			</div>
		</div>
	{/snippet}
</Story>
