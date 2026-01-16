import { createAsset } from 'pixi-svelte';

import img from './symbols.webp';
import rawAtlas from './symbols.atlas?raw';
import H1 from './symbols.webp.json';
import H2 from './symbols.webp.json';
import H3 from './symbols.webp.json';
import H4 from './symbols.webp.json';
import H5 from './symbols.webp.json';
import L1 from './symbols.webp.json';
import L2 from './symbols.webp.json';
import L3 from './symbols.webp.json';
import L4 from './symbols.webp.json';
import M from './symbols.webp.json';

export default createAsset({
	img,
	rawAtlas,
	spines: {
		H1,
		H2,
		H3,
		H4,
		H5,
		L1,
		L2,
		L3,
		L4,
		M,
	},
});