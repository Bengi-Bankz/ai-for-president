
<script lang="ts">
import { setContext } from '../game/context';
import { setContext as setSvelteContext } from 'svelte';
import type { ReplayParams } from '../game/utils-replay';
import Game from '../components/Game.svelte';

export let isReplayMode = true;
export let game = 'scatter';
export let version = '1';
export let mode = 'BASE';
export let event = '12345';
export let rgs_url = 'https://rgs.stake-engine.com';
export let currency = 'USD';
export let amount = '100';
export let lang = 'en';
export let device = 'desktop';
export let social = 'false';

const replayParams: ReplayParams = {
  isReplayMode,
  game,
  version,
  mode,
  event,
  rgs_url,
  currency,
  amount,
  lang,
  device,
  social,
};

// Create a key that changes when any replay param changes
const key = JSON.stringify(replayParams);

setContext();
setSvelteContext('replay', replayParams);
</script>

<Game {key} />
