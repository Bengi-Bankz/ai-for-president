<script lang="ts">
    import FrameDisplay from '../framedisplay.svelte';
	import { MainContainer, OnPressFullScreen } from 'components-layout';
	import { OnHotkey } from 'components-shared';
	import { stateUrlDerived } from 'state-shared';
	import { Sprite } from 'pixi-svelte';

	import { getContext } from '../game/context';

	type Props = {
		onpress: () => void;
	};

	const props: Props = $props();
	const context = getContext();
</script>

<MainContainer alignVertical="bottom">
	<Sprite
		key="pressToContinueText_{stateUrlDerived.lang()}.png"
		width={800}
		height={134}
		anchor={{ x: 0.5, y: 1 }}
		x={context.stateLayoutDerived.mainLayout().width * 0.5}
		y={context.stateLayoutDerived.mainLayout().height}
	/>

	<!-- Example: Add a FrameDisplay animation below the text -->

	<!-- Third FrameDisplay: Clinton frames, left of Lincoln -->
	<FrameDisplay
		frameKeys={["clinton0","clinton1","clinton2","clinton3","clinton4","clinton5","clinton6","clinton7","clinton8"]}
		fps={12}
		x={context.stateLayoutDerived.mainLayout().width * 0.5 - 450}
		y={context.stateLayoutDerived.mainLayout().height - 400}
		width={400}
		height={500}
		scale={2}
	/>

	<!-- Second FrameDisplay beside the first -->
	<FrameDisplay
		frameKeys={["trump0","trump1","trump2","trump3","trump4","trump5","trump6","trump7","trump8","trump9"]}
		fps={12}
		x={context.stateLayoutDerived.mainLayout().width * 0.5 + 50}
		y={context.stateLayoutDerived.mainLayout().height - 400}
		width={400}
		height={500}
		scale={2}
	/>
</MainContainer>
<OnHotkey hotkey="Space" onpress={() => props.onpress()} />
<OnPressFullScreen onpress={() => props.onpress()} />
