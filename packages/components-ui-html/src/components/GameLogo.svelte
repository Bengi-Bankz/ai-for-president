<script lang="ts">
import { Sprite } from 'pixi-svelte';
import { getContext } from '../../../apps/scatter/src/game/context';

export let width: number = 180;
export let height: number = 80;
export let x: number = 0;
export let y: number = 0;
export let anchor: number | { x: number; y: number } = 0.5;

const context = getContext();
</script>

<Sprite
  key="gamelogo"
  {width}
  {height}
  {anchor}
  x={x}
  y={y}
/>
