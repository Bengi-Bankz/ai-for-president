<script lang="ts">
	import type { ButtonProps } from 'components-pixi';
	import { stateModal } from 'state-shared';

	import UiButton from './UiButton.svelte';
	import { UI_BASE_SIZE } from '../constants';
	import { getContext } from '../context';

	const props: Partial<Omit<ButtonProps, 'children'>> = $props();
	const context = getContext();
	const sizes = { width: UI_BASE_SIZE * 1.7, height: UI_BASE_SIZE * 0.8 };

	const onpress = () => {
		context.eventEmitter.broadcast({ type: 'soundPressGeneral' });
		stateModal.modal = { name: 'settings' };
	};
</script>

<!-- To this for blue glow: -->
<UiButton {...props} {sizes} {onpress} icon="settings" variant="glow-blue" />
