import { setContext } from '../game/context';
import { writable } from 'svelte/store';
import WatchAgain from '../components/WatchAgain.svelte';

// Mock the stores used by WatchAgain
const isReplayMode = writable(true);
const lastReplayGameId = writable('mock-game-id');

export default {
  title: 'Buttons/WatchAgain',
  component: WatchAgain,
  decorators: [
    (Story) => {
      setContext();
      // Provide the mock stores globally for the story
      // @ts-ignore
      window.__SVELTE_STORES__ = { isReplayMode, lastReplayGameId };
      return Story();
    },
  ],
};

export const Default = () => ({
  Component: WatchAgain,
  props: {},
  on: {},
});
