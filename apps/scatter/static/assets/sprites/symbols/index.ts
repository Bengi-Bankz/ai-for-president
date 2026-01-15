import { createAsset } from 'pixi-svelte';

import img from './symbols.webp';
import atlas from './symbols.webp.json';

export default createAsset({ img, atlas, preload: true });
