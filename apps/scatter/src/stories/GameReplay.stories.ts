
import GameReplayWrapper from './GameReplayWrapper.svelte';

export default {
  title: 'Game/Replay',
  component: GameReplayWrapper,
};

export const Replay = {
  render: (args) => ({
    Component: GameReplayWrapper,
    props: args,
  }),
};
