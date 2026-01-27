import { createAsset } from 'pixi-svelte';

import img0 from './MildEast0.png';
import img1 from './MildEast1.png';
import font from './MildEast.xml?raw';

export default createAsset({ img: [img0, img1], font });