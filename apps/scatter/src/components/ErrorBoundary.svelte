<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let fallback: any = 'An unexpected error occurred.';
  export let resetOn = [];

  const error = writable<Error | null>(null);

  // Import the helper from a separate TS file for generic support
  // Usage: import { withErrorBoundary } from './withErrorBoundary';

  // Reset error on certain events (optional)
  $: if (resetOn.length && error) {
    for (const dep of resetOn) {
      dep && error.set(null);
    }
  }
</script>

{#if $error}
  <div class="error-boundary">
    <slot name="fallback">{fallback}</slot>
  </div>
{:else}
  <slot />
{/if}

<style>
.error-boundary {
  color: red;
  background: #fff0f0;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
}
</style>
