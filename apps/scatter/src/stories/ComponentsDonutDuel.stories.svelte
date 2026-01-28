<script lang="ts" module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	const { Story } = defineMeta({
		title: 'Components/DonutDuel',
		args: {
			multiplierValue: 10,
			x: 0,
			y: 0,
		},
		argTypes: {
			multiplierValue: {
				control: 'select',
				options: [2, 4, 5, 7, 10, 50, 100],
				description: 'The multiplier value to display',
			},
			x: {
				control: 'number',
				description: 'X position on canvas',
			},
			y: {
				control: 'number',
				description: 'Y position on canvas',
			},
		},
	});
</script>

<script lang="ts">
	import { Container } from 'pixi-svelte';
	import { StoryPixiApp } from 'components-storybook';
	import DonutDuel from '../components/DonutDuel.svelte';
	import assets from '../game/assets';
	import DonutDuelContextWrapper from './DonutDuelContextWrapper.svelte';

	let onComplete = () => console.log('✅ Duel complete!');
</script>

<Story name="default">
	{#snippet template(args)}
		<DonutDuelContextWrapper>
			<StoryPixiApp {assets} width={800} height={600}>
				<Container>
					<DonutDuel
						multiplierValue={args.multiplierValue}
						x={args.x + 400}
						y={args.y + 300}
						gridPosition={{ row: 2, col: 2 }}
						onComplete={onComplete}
					/>
				</Container>
			</StoryPixiApp>
		</DonutDuelContextWrapper>
	{/snippet}
</Story>

<Story name="low-multiplier">
	{#snippet template()}
		<DonutDuelContextWrapper>
			<StoryPixiApp {assets} width={800} height={600}>
				<Container>
					<DonutDuel
						multiplierValue={2}
						x={400}
						y={300}
						gridPosition={{ row: 2, col: 2 }}
						onComplete={onComplete}
					/>
				</Container>
			</StoryPixiApp>
		</DonutDuelContextWrapper>
	{/snippet}
</Story>

<Story name="high-multiplier">
	{#snippet template()}
		<DonutDuelContextWrapper>
			<StoryPixiApp {assets} width={800} height={600}>
				<Container>
					<DonutDuel
						multiplierValue={100}
						x={400}
						y={300}
						gridPosition={{ row: 2, col: 2 }}
						onComplete={onComplete}
					/>
				</Container>
			</StoryPixiApp>
		</DonutDuelContextWrapper>
	{/snippet}
</Story>

<Story name="multiple-duels">
	{#snippet template()}
		<DonutDuelContextWrapper>
			<StoryPixiApp {assets} width={800} height={600}>
				<Container>
					<DonutDuel
						multiplierValue={5}
						x={200}
						y={200}
						gridPosition={{ row: 1, col: 1 }}
						onComplete={() => console.log('Duel 1 complete')}
					/>
					<DonutDuel
						multiplierValue={10}
						x={400}
						y={200}
						gridPosition={{ row: 1, col: 3 }}
						onComplete={() => console.log('Duel 2 complete')}
					/>
					<DonutDuel
						multiplierValue={50}
						x={600}
						y={200}
						gridPosition={{ row: 1, col: 5 }}
						onComplete={() => console.log('Duel 3 complete')}
					/>
				</Container>
			</StoryPixiApp>
		</DonutDuelContextWrapper>
	{/snippet}
</Story>
