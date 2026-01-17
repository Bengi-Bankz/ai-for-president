import Modals from './src/components/Modals.svelte';
import GameVersion from './src/components/GameVersion.svelte';
import GlobalStyle from './src/components/GlobalStyle.svelte';
import Button3D from './src/components/Button3D.svelte';
import ButtonGlow from './src/components/ButtonGlow.svelte';

import messagesMap from './src/i18n/messagesMap';
import { i18nDerived } from './src/i18n/i18nDerived';

export * from './src/types';
export * from './src/gameHistory';

export { 
	messagesMap, 
	i18nDerived, 
	Modals, 
	GameVersion, 
	GlobalStyle, 
	Button3D, 
	ButtonGlow
};
