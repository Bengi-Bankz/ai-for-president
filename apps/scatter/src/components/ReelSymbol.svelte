<script lang="ts">
	import Symbol from './Symbol.svelte';
	import SymbolWrap from './SymbolWrap.svelte';
	import { getSymbolInfo, getSymbolX } from '../game/utils';
	import type { ReelSymbol } from '../game/stateGame.svelte';

	type Props = {
		reelIndex: number;
		reelSymbol: ReelSymbol;
	};

	const props: Props = $props();
	const symbolInfo = $derived(
		getSymbolInfo({ rawSymbol: props.reelSymbol.rawSymbol, state: props.reelSymbol.symbolState }),
	);

	// Safe fallback for symbolInfo and multiplier/bomb handling
	const isSpineType = symbolInfo?.type === 'spine';
	const isLandOrWin = props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win';
	const multiplier = props.reelSymbol.rawSymbol?.multiplier ?? 1;
	const isBomb = props.reelSymbol.rawSymbol?.name === 'bomb';
</script>

<SymbolWrap
	x={getSymbolX(props.reelIndex)}
	y={props.reelSymbol.symbolY.current}
		animating={!!(symbolInfo && symbolInfo.type === 'spine' &&
			(props.reelSymbol.symbolState === 'land' || props.reelSymbol.symbolState === 'win'))}
	state={props.reelSymbol.symbolState}
>
	<Symbol
		state={props.reelSymbol.symbolState}
		rawSymbol={props.reelSymbol.rawSymbol}
		oncomplete={() => {
			if (props.reelSymbol.symbolState === 'win') props.reelSymbol.oncomplete();
			if (props.reelSymbol.symbolState === 'land') props.reelSymbol.symbolState = 'static';
		}}
	/>
</SymbolWrap>
