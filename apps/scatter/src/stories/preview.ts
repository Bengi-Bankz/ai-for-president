import { setContext } from '../game/context';

export const decorators = [
  (Story) => {
    setContext();
    return Story();
  },
];
