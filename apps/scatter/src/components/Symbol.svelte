<script lang="ts">
	import SymbolSpine from './SymbolSpine.svelte';
	import SymbolSprite from './SymbolSprite.svelte';
	import ScatterAnimation from './ScatterAnimation.svelte';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getSymbolBackgroundInfo, getSymbolInfo } from '../game/utils';
	import type { SymbolState, RawSymbol } from '../game/types';
	import { getContext } from '../game/context';

	type Props = {
		x?: number;
		y?: number;
		state: SymbolState;
		rawSymbol: RawSymbol;
		oncomplete?: () => void;
		loop?: boolean;
	};

	const props: Props = $props();
	const context = getContext();
	const symbolInfo = $derived(getSymbolInfo({ rawSymbol: props.rawSymbol, state: props.state }));
	const isSprite = $derived(symbolInfo && symbolInfo.type === 'sprite');
	const isScatterWin = $derived(symbolInfo && props.rawSymbol.name === 'S' && props.state === 'win' && Array.isArray((symbolInfo as any).assetKeys));
</script>

{#if isScatterWin && symbolInfo}
   <ScatterAnimation
	   assetKeys={(symbolInfo as any).assetKeys}
	   x={props.x}
	   y={props.y}
	   width={SYMBOL_SIZE * symbolInfo.sizeRatios.width}
	   height={SYMBOL_SIZE * symbolInfo.sizeRatios.height}
	   oncomplete={props.oncomplete}
   />
{:else if isSprite && symbolInfo}
   <SymbolSprite {symbolInfo} x={props.x} y={props.y} oncomplete={props.oncomplete} />
{:else}
   {@const symbolBackgroundInfo = getSymbolBackgroundInfo({
	   rawSymbol: props.rawSymbol,
	   state: props.state,
   })}
   <SymbolSpine
	   loop={props.loop}
	   {symbolInfo}
	   {symbolBackgroundInfo}
	   x={props.x}
	   y={props.y}
	   showWinFrame={props.state === 'win' && !['S', 'M'].includes(props.rawSymbol.name)}
	   listener={{
		   complete: props.oncomplete,
		   event: (_, event) => {
			   if (event.data?.name === 'wildExplode') {
				   context.eventEmitter?.broadcast({ type: 'soundOnce', name: 'sfx_wild_explode' });
			   }
		   },
	   }}
   />
{/if}
