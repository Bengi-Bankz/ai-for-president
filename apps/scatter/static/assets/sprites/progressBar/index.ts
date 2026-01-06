import { createAsset } from 'pixi-svelte';

import img from './progressBar.webp';
import atlas from './progressBar.webp.json';

export default createAsset({ img, atlas, preload: true });
