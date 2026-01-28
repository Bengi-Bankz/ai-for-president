<script lang="ts" module>
import { defineMeta } from '@storybook/addon-svelte-csf';
import Game from '../components/Game.svelte';
import DonutDuel from '../components/DonutDuel.svelte';
import { playBookEvent } from '../game/utils';
import events from './data/base_events';
import { StoryGameTemplate, StoryLocale, type TemplateArgs, templateArgs } from 'components-storybook';

const { Story } = defineMeta({
  title: 'Combined/SetTotalWinDonutDuel',
});
</script>


<script lang="ts">
import { setContext } from '../game/context';
setContext();

// Custom board event with a multiplier at (2,2)
export const duelGridPosition = { row: 2, col: 2 };
export const duelMultiplier = 10;
export const boardWithMultiplier = [
  [ { name: 'L1' }, { name: 'L1' }, { name: 'L3' }, { name: 'H4' }, { name: 'L3' }, { name: 'L3' }, { name: 'L3' } ],
  [ { name: 'H4' }, { name: 'L1' }, { name: 'H4' }, { name: 'H4' }, { name: 'H2' }, { name: 'L1' }, { name: 'H2' } ],
  [ { name: 'L3' }, { name: 'H3' }, { name: 'M', multiplier: duelMultiplier }, { name: 'L1' }, { name: 'H4' }, { name: 'L2' }, { name: 'H4' } ],
  [ { name: 'H2' }, { name: 'L2' }, { name: 'L2' }, { name: 'H2' }, { name: 'H2' }, { name: 'L2' }, { name: 'L2' } ],
  [ { name: 'H1' }, { name: 'H3' }, { name: 'H3' }, { name: 'H4' }, { name: 'H3' }, { name: 'H3' }, { name: 'L1' } ],
  [ { name: 'H4' }, { name: 'H4' }, { name: 'L1' }, { name: 'H3' }, { name: 'H4' }, { name: 'H4' }, { name: 'H2' } ],
];
</script>




{#snippet template(args: TemplateArgs<any>)}
  <StoryGameTemplate
    skipLoadingScreen={true}
    action={async () => {
      // Set up the board with a multiplier at the duel position
      await playBookEvent({ type: 'reveal', board: boardWithMultiplier }, { bookEvents: [] });
      // Optionally, play setTotalWin or other events here if needed
    }}
  >
    <StoryLocale lang="en">
      <Game />
      <DonutDuel
        multiplierValue={duelMultiplier}
        gridPosition={duelGridPosition}
        x={duelGridPosition.col * 120 + 60}
        y={duelGridPosition.row * 120 + 60}
      />
    </StoryLocale>
  </StoryGameTemplate>
{/snippet}

<Story name="CombinedSetTotalWinDonutDuel" args={templateArgs({})} {template} />
