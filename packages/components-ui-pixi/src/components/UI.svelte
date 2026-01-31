<script lang="ts">
	import './app.css';
	import type { Snippet } from 'svelte';

	import { getContextLayout } from 'utils-layout';
	import { EnableSpaceHold } from 'components-shared';

	import UiFadeContainer from './UiFadeContainer.svelte';
	import LayoutDesktop from './LayoutDesktop.svelte';
	import LayoutPortrait from './LayoutPortrait.svelte';
	import LayoutLandscape from './LayoutLandscape.svelte';
	import LayoutTablet from './LayoutTablet.svelte';
	import LabelBalance from './LabelBalance.svelte';
	import LabelWin from './LabelWin.svelte';
	import LabelBet from './LabelBet.svelte';
	import ButtonPayTable from './ButtonPayTable.svelte';
	import ButtonGameRules from './ButtonGameRules.svelte';
	import ButtonSettings from './ButtonSettings.svelte';
	import ButtonBuyBonus from './ButtonBuyBonus.svelte';
	import ButtonBet from './ButtonBet.svelte';
	import ButtonTurbo from './ButtonTurbo.svelte';
	import ButtonAutoSpin from './ButtonAutoSpin.svelte';
	import ButtonIncrease from './ButtonIncrease.svelte';
	import ButtonDecrease from './ButtonDecrease.svelte';
	import ButtonMenu from './ButtonMenu.svelte';
	import ButtonMenuClose from './ButtonMenuClose.svelte';
	import ButtonSoundSwitch from './ButtonSoundSwitch.svelte';

	type Props = {
		gameName: Snippet;
		logo: Snippet;
	};

	const props: Props = $props();

	const { stateLayoutDerived } = getContextLayout();

	// Check if in replay mode - hide betting/interactive buttons
	const isReplayMode = (): boolean => {
		if (typeof window === 'undefined') return false;
		return new URLSearchParams(window.location.search).get('replay') === 'true';
	};
	
	const replay = isReplayMode();

	const LAYOUT_COMPONENT_MAP = {
		desktop: LayoutDesktop,
		portrait: LayoutPortrait,
		landscape: LayoutLandscape,
		tablet: LayoutTablet,
	};

	const LayoutComponent = $derived(LAYOUT_COMPONENT_MAP[stateLayoutDerived.layoutType()]);
</script>

{#if !replay}
	<EnableSpaceHold />
{/if}

<UiFadeContainer>
	<LayoutComponent>
		{#snippet gameName()}
			{@render props.gameName()}
		{/snippet}

		{#snippet logo()}
			{@render props.logo()}
		{/snippet}

		{#snippet amountBalance(labelProps)}
			{#if !replay}
				<LabelBalance {...labelProps} />
			{/if}
		{/snippet}

		{#snippet amountWin(labelProps)}
			<LabelWin {...labelProps} />
		{/snippet}

		{#snippet amountBet(labelProps)}
			{#if !replay}
				<LabelBet {...labelProps} />
			{/if}
		{/snippet}

		{#snippet buttonBuyBonus(buttonProps)}
			{#if !replay}
				<ButtonBuyBonus {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonBet(buttonProps)}
			{#if !replay}
				<ButtonBet {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonTurbo(buttonProps)}
			<ButtonTurbo {...buttonProps} />
		{/snippet}

		{#snippet buttonAutoSpin(buttonProps)}
			{#if !replay}
				<ButtonAutoSpin {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonIncrease(buttonProps)}
			{#if !replay}
				<ButtonIncrease {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonDecrease(buttonProps)}
			{#if !replay}
				<ButtonDecrease {...buttonProps} />
			{/if}
		{/snippet}

		{#snippet buttonMenu(buttonProps)}
			<ButtonMenu {...buttonProps} />
		{/snippet}

		{#snippet buttonMenuClose(buttonProps)}
			<ButtonMenuClose {...buttonProps} />
		{/snippet}

		{#snippet buttonPayTable(buttonProps)}
			<ButtonPayTable {...buttonProps} />
		{/snippet}

		{#snippet buttonGameRules(buttonProps)}
			<ButtonGameRules {...buttonProps} />
		{/snippet}

		{#snippet buttonSettings(buttonProps)}
			<ButtonSettings {...buttonProps} />
		{/snippet}

		{#snippet buttonSoundSwitch(buttonProps)}
			<ButtonSoundSwitch {...buttonProps} />
		{/snippet}
	</LayoutComponent>
</UiFadeContainer>
