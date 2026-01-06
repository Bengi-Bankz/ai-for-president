<script lang="ts">
import { Sprite } from 'pixi-svelte';
import { onMount } from 'svelte';

export let assetKeys: string[] = [];
export let frameRate: number = 8; // frames per second
export let x: number = 0;
export let y: number = 0;
export let width: number = 100;
export let height: number = 100;
export let oncomplete: (() => void) | undefined;

let currentFrame = 0;
let interval: ReturnType<typeof setInterval>;
let finished = false;

onMount(() => {
  interval = setInterval(() => {
    if (currentFrame < assetKeys.length - 1) {
      currentFrame += 1;
      if (currentFrame === assetKeys.length - 1) {
        finished = true;
        clearInterval(interval);
        setTimeout(() => {
          oncomplete?.();
        }, 4000);
      }
    }
  }, 1000 / frameRate);
  return () => clearInterval(interval);
});
</script>

{#if assetKeys.length > 0}
  <Sprite
    x={x}
    y={y}
    anchor={0.5}
    key={assetKeys[currentFrame]}
    width={width}
    height={height}
  />
{/if}
