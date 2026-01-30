import { setContext } from '../game/context';
import PressToContinue from '../components/PressToContinue.svelte';

export default {
  title: 'Buttons/PressToContinue',
  component: PressToContinue,
  argTypes: {
    onpress: { action: 'pressed' },
  },
  decorators: [
    (Story) => {
      setContext();
      return Story();
    },
  ],
};

const Template = (args) => ({
  Component: PressToContinue,
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  onpress: () => alert('Continue pressed!'),
};
