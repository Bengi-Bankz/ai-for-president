<script lang="ts">
	import { SvelteDate } from 'svelte/reactivity';

	import { Text, REM, Sprite } from 'pixi-svelte';
	import { WHITE } from 'constants-shared/colors';

	type Props = {
		name: string;
	};

	const props: Props = $props();
	const reactiveDate = new SvelteDate();
	const clock = $derived(
		reactiveDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: 'numeric',
			hour12: false,
		}),
	);
	const textProps = {
		style: {
			   fontFamily: 'BungeeSpice-Regular, sans-serif',
			fontSize: REM * 1.5,
			fontWeight: '600',
			lineHeight: REM * 2,
			fill: WHITE,
		},
	} as const;

	let clockSizes = $state({ width: 0, height: 0 });

	$effect(() => {
		const interval = setInterval(() => {
			reactiveDate.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Text text={clock} onresize={(value) => (clockSizes = value)} {...textProps} />
<Text text={props.name} x={clockSizes.width + 5} {...textProps} />
<Sprite key="gamelogo" x={clockSizes.width + 220} y={-10} width={180} height={80} anchor={0.5} />
