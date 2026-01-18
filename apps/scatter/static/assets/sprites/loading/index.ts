import { createAsset } from 'pixi-svelte';

import img from './loading.webp';
import atlas from './loading.webp.json';

export default createAsset({ img, atlas, preload: true });
