<script lang="ts">
import { setContext } from '../game/context';
import { setContext as setSvelteContext } from 'svelte';
import type { ReplayParams } from '../game/utils-replay';
import Game from '../components/Game.svelte';

const replayParams: ReplayParams = {
  isReplayMode: true,
  game: 'scatter',
  version: '1',
  mode: 'BASE',
  event: '12345',
  rgs_url: 'https://mock-rgs-url.com',
  currency: 'USD',
  amount: '100',
  lang: 'en',
  device: 'desktop',
  social: 'false',
};

setContext();
setSvelteContext('replay', replayParams);
</script>

<Game />
