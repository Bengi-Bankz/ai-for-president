<script lang="ts">
	import { onMount, onDestroy, type Snippet, createEventDispatcher } from 'svelte';

	import { getContextApp } from '../context.svelte';

	import InitialiseApplication from './InitialiseApplication.svelte';
	import InitialiseParent from './InitialiseParent.svelte';
	import AssetsLoader from './AssetsLoader.svelte';

	type Props = { children: Snippet };

	const props: Props = $props();
	const context = getContextApp();
	const dispatch = createEventDispatcher();

	onMount(() => context.stateApp.reset());
	onDestroy(() => context.stateApp.reset());

	// Example: Dispatch scatterShake when scatter lands
	// Replace this with your actual scatter landing logic
	// For demonstration, dispatch on mount
	onMount(() => {
		// TODO: Replace with real scatter landing detection
		// dispatch('scatterShake');
	});
</script>

<InitialiseApplication>
	<InitialiseParent>
		<AssetsLoader>
			{@render props.children()}
		</AssetsLoader>
	</InitialiseParent>
</InitialiseApplication>
