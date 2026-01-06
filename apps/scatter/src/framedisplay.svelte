<script lang="ts">
  // Props: frameKeys (array of keys to animate), x, y, width, height, fps
  export let frameKeys: string[] = [];
  export let x: number = 0;
  export let y: number = 0;
  export let width: number = 200;
  export let height: number = 250;
  export let fps: number = 24;
  export let scale: number = 3;
  export let animateX: { start: number; end: number; duration: number; pause?: number; oncomplete?: () => void } | undefined = undefined;

  import { Sprite } from 'pixi-svelte';
  import { onDestroy } from 'svelte';

  let currentFrameIndex = 0;
  let direction = 1; // 1 = forward, -1 = backward
  let interval: any;
  let pauseTimeout: any;
  let animatedX = x;

  $: currentKey = frameKeys.length > 0 ? frameKeys[currentFrameIndex] : '';
  $: animatedX = animateX ? animatedX : x;

  function animateBidirectional() {
    stopAnimation();
    interval = setInterval(() => {
      currentFrameIndex += direction;
      if (currentFrameIndex === frameKeys.length - 1) {
        direction = -1;
        pauseAtEnd();
      } else if (currentFrameIndex === 0 && direction === -1) {
        direction = 1;
        pauseAtEnd();
      }
    }, 1000 / fps);
  }

  function pauseAtEnd() {
    stopAnimation();
    pauseTimeout = setTimeout(() => {
      animateBidirectional();
    }, 180000); // 3 minutes
  }

  function stopAnimation() {
    if (interval) clearInterval(interval);
    interval = null;
    if (pauseTimeout) clearTimeout(pauseTimeout);
    pauseTimeout = null;
  }

  import { onMount, afterUpdate } from 'svelte';

  let animationStarted = false;

  function startMovementAndFrames() {
    stopAnimation();
    animationStarted = true;
    currentFrameIndex = 0;
    animatedX = animateX.start;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      if (elapsed < animateX.duration) {
        animatedX = animateX.start + ((animateX.end - animateX.start) * (elapsed / animateX.duration));
        const progress = elapsed / animateX.duration;
        currentFrameIndex = Math.floor(progress * (frameKeys.length - 1));
        requestAnimationFrame(step);
      } else {
        animatedX = animateX.end;
        currentFrameIndex = frameKeys.length - 1;
        if (animateX.pause) {
          setTimeout(() => {
            if (animateX.oncomplete) animateX.oncomplete();
          }, animateX.pause);
        } else {
          if (animateX.oncomplete) animateX.oncomplete();
        }
      }
    }
    requestAnimationFrame(step);
  }

  onMount(() => {
    if (animateX) {
      startMovementAndFrames();
    } else if (frameKeys.length > 1) {
      stopAnimation();
      currentFrameIndex = 0;
      direction = 1;
      animateBidirectional();
    }
  });

  afterUpdate(() => {
    // Restart animation if animateX changes
    if (animateX && !animationStarted) {
      startMovementAndFrames();
    }
  });

  onDestroy(stopAnimation);
</script>

{#if currentKey}
  <Sprite
    key={currentKey}
    x={animatedX}
    y={y}
    width={width}
    height={height}
    scale={scale}
  />
{:else}
  <div>No frame to display</div>
{/if}
