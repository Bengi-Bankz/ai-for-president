import _ from 'lodash';

import type { RawSymbol, SymbolState } from './types';

export const SYMBOL_SIZE = 120;

export const REEL_PADDING = 0.53;

// initial board (padded top and bottom)
export const INITIAL_BOARD: RawSymbol[][] = [
	[
		{ name: 'H1' },
		{ name: 'H1' },
		{ name: 'L2' },
		{ name: 'L1' },
		{ name: 'H1' },
		{ name: 'H4' },
		{ name: 'H1' },
	],
	[
		{ name: 'L3' },
		{ name: 'H2' },
		{ name: 'L1' },
		{ name: 'L2' },
		{ name: 'L1' },
		{ name: 'L2' },
		{ name: 'L2' },
	],
	[
		{ name: 'L2' },
		{ name: 'H3' },
		{ name: 'H1' },
		{ name: 'L3' },
		{ name: 'L4' },
		{ name: 'L2' },
		{ name: 'L2' },
	],
	[
		{ name: 'L3' },
		{ name: 'H4' },
		{ name: 'L3' },
		{ name: 'L4' },
		{ name: 'H4' },
		{ name: 'H1' },
		{ name: 'H1' },
	],
	[
		{ name: 'H3' },
		{ name: 'H4' },
		{ name: 'H2' },
		{ name: 'H2' },
		{ name: 'L3' },
		{ name: 'L2' },
		{ name: 'H2' },
	],
	[
		{ name: 'H2' },
		{ name: 'H2' },
		{ name: 'L1' },
		{ name: 'L3' },
		{ name: 'H1' },
		{ name: 'L1' },
		{ name: 'L2' },
	],
];

export const BOARD_DIMENSIONS = { x: INITIAL_BOARD.length, y: INITIAL_BOARD[0].length - 2 };

export const BOARD_SIZES = {
	width: SYMBOL_SIZE * BOARD_DIMENSIONS.x,
	height: SYMBOL_SIZE * BOARD_DIMENSIONS.y,
};

export const BACKGROUND_RATIO = 2039 / 1000;
export const PORTRAIT_BACKGROUND_RATIO = 1242 / 2208;
const PORTRAIT_RATIO = 800 / 1422;
const LANDSCAPE_RATIO = 1600 / 900;
const DESKTOP_RATIO = 1422 / 800;

const DESKTOP_HEIGHT = 800;
const LANDSCAPE_HEIGHT = 900;
const PORTRAIT_HEIGHT = 1422;
export const DESKTOP_MAIN_SIZES = { width: DESKTOP_HEIGHT * DESKTOP_RATIO, height: DESKTOP_HEIGHT };
export const LANDSCAPE_MAIN_SIZES = {
	width: LANDSCAPE_HEIGHT * LANDSCAPE_RATIO,
	height: LANDSCAPE_HEIGHT,
};
export const PORTRAIT_MAIN_SIZES = {
	width: PORTRAIT_HEIGHT * PORTRAIT_RATIO,
	height: PORTRAIT_HEIGHT,
};

export const HIGH_SYMBOLS = ['H1', 'H2', 'H3', 'H4', 'H5'];

export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

const M_SIZE = 0.5;
const HIGH_SYMBOL_SIZE = 0.9;
const LOW_SYMBOL_SIZE = 0.9;
const SPECIAL_SYMBOL_SIZE = 0.9;

const SPIN_OPTIONS_SHARED = {
	reelFallInDelay: 80,
	reelPaddingMultiplierNormal: 1.25,
	reelPaddingMultiplierAnticipated: 18,
	reelFallOutDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 3.5,
	symbolFallInInterval: 30,
	symbolFallInBounceSpeed: 0.15,
	symbolFallInBounceSizeMulti: 0.5,
	symbolFallOutSpeed: 3.5,
	symbolFallOutInterval: 20,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	symbolFallInSpeed: 7,
	symbolFallInInterval: 0,
	symbolFallInBounceSpeed: 0.3,
	symbolFallInBounceSizeMulti: 0.25,
	symbolFallOutSpeed: 7,
	symbolFallOutInterval: 0,
};

export const MOTION_BLUR_VELOCITY = 31;

export const zIndexes = {
	background: {
		backdrop: -3,
		normal: -2,
		feature: -1,
	},
};

const explosion = {
	type: 'spine',
	assetKey: 'explosion',
	animationName: 'explosion',
	sizeRatios: { width: 1, height: 1 },
};

const h1Static = { type: 'sprite', assetKey: 'h1.png', sizeRatios: { width: 1, height: 1 } };
const h2Static = { type: 'sprite', assetKey: 'h2.png', sizeRatios: { width: 1, height: 1 } };
const h3Static = { type: 'sprite', assetKey: 'h3.png', sizeRatios: { width: 1, height: 1 } };
const h4Static = { type: 'sprite', assetKey: 'h4.png', sizeRatios: { width: 1, height: 1 } };
const h5Static = { type: 'sprite', assetKey: 'h5.png', sizeRatios: { width: 1, height: 1 } };
const l1Static = { type: 'sprite', assetKey: 'l1.png', sizeRatios: { width: 1, height: 1 } };
const l2Static = { type: 'sprite', assetKey: 'l2.png', sizeRatios: { width: 1, height: 1 } };
const l3Static = { type: 'sprite', assetKey: 'l3.png', sizeRatios: { width: 1, height: 1 } };
const l4Static = { type: 'sprite', assetKey: 'l4.png', sizeRatios: { width: 1, height: 1 } };
const sStatic = { type: 'sprite', assetKey: 's.png', sizeRatios: { width: 1.243, height: 1.243 } };
const wStatic = { type: 'sprite', assetKey: 'w.png', sizeRatios: { width: 1.12, height: 1.12 } };

const m2Static = {
	type: 'sprite',
	assetKey: 'm.png',
	sizeRatios: { width: 1, height: 1 },
};
const m4Static = {
	type: 'sprite',
	assetKey: 'm.png',
	sizeRatios: { width: 1, height: 1 },
};
const m5Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };
const m7Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };
const m10Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };
const m15Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };
const m25Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };		
const m50Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };
const m100Static = { type: 'sprite', assetKey: 'm.png', sizeRatios: { width: 1, height: 1 } };	



const wSizeRatios = { width: 1.5 * 0.9, height: SPECIAL_SYMBOL_SIZE * 1.15 };
const sSizeRatios = { width: 1.2, height: SPECIAL_SYMBOL_SIZE * 1.4 };

const backgroundLowStatic = {
	type: 'sprite',
	assetKey: 'm.png',
	sizeRatios: { width: M_SIZE, height: M_SIZE },
};
const backgroundMidStatic = {
	type: 'sprite',
	assetKey: 'm.png',
	sizeRatios: { width: M_SIZE, height: M_SIZE },
};
const backgroundHighStatic = {
	type: 'sprite',
	assetKey: 'm.png',
	sizeRatios: { width: M_SIZE, height: M_SIZE },
};

const backgroundLow = {
	explosion,
	win: backgroundLowStatic,
	postWinStatic: backgroundLowStatic,
	static: backgroundLowStatic,
	spin: backgroundLowStatic,
	land: backgroundLowStatic,
};

const backgroundMid = {
	explosion,
	win: backgroundMidStatic,
	postWinStatic: backgroundMidStatic,
	static: backgroundMidStatic,
	spin: backgroundMidStatic,
	land: backgroundMidStatic,
};

const backgroundHigh = {
	explosion,
	win: backgroundHighStatic,
	postWinStatic: backgroundHighStatic,
	static: backgroundHighStatic,
	spin: backgroundHighStatic,
	land: backgroundHighStatic,
};

export const SYMBOL_INFO_MAP = {
	H1: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['h1.png', 'h1_01.png', 'h1_02.png', 'h1_03.png', 'h1_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: h1Static,
		static: h1Static,
		spin: h1Static,
		land: h1Static,
	},
	H2: {
		explosion,
			win: {
			type: 'sprite',
			assetKeys: ['h2.png', 'h2_01.png', 'h2_02.png', 'h2_03.png', 'h2_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: h2Static,
		static: h2Static,
		spin: h2Static,
		land: h2Static,
	},
	H3: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['h3.png', 'h3_01.png', 'h3_02.png', 'h3_03.png', 'h3_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: h3Static,
		static: h3Static,
		spin: h3Static,
		land: h3Static,
	},
	H4: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['h4.png', 'h4_01.png', 'h4_02.png', 'h4_03.png', 'h4_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: h4Static,
		static: h4Static,
		spin: h4Static,
		land: h4Static,
	},
	H5: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['h5.png', 'h5_01.png', 'h5_02.png', 'h5_03.png', 'h5_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: h5Static,
		static: h5Static,
		spin: h5Static,
		land: h5Static,
	},
	L1: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['l1.png', 'l1_01.png', 'l1_02.png', 'l1_03.png', 'l1_04.png',],
			sizeRatios: sSizeRatios,
		},	
		postWinStatic: l1Static,
		static: l1Static,
		spin: l1Static,
		land: l1Static,
	},
	L2: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['l2.png', 'l2_01.png', 'l2_02.png', 'l2_03.png', 'l2_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: l2Static,
		static: l2Static,
		spin: l2Static,
		land: l2Static,
	},
	L3: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['l3.png', 'l3_01.png', 'l3_02.png', 'l3_03.png', 'l3_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: l3Static,
		static: l3Static,
		spin: l3Static,
		land: l3Static,
	},
	L4: {
		explosion,
		win: {
			type: 'sprite',
			assetKeys: ['l4.png', 'l4_01.png', 'l4_02.png', 'l4_03.png', 'l4_04.png',],
			sizeRatios: sSizeRatios,
		},
		postWinStatic: l4Static,
		static: l4Static,
		spin: l4Static,
		land: l4Static,
	},
	W: {
		explosion,
		postWinStatic: {
			type: 'sprite',
			assetKey: 'explodedW.png',
			sizeRatios: { width: 0.85, height: 0.85 },
		},
		static: wStatic,
		spin: wStatic,
		win: { type: 'spine', assetKey: 'W', animationName: 'wild_dynamite', sizeRatios: wSizeRatios },
		land: {
			type: 'spine',
			assetKey: 'W',
			animationName: 'wild_dynamite_land',
			sizeRatios: wSizeRatios,
		},
	},
	S: {
		explosion,
		postWinStatic: {
			type: 'sprite',
			assetKey: 'S_19',
			sizeRatios: sSizeRatios,
		},
		static: {
			type: 'sprite',
			assetKey: 'S_19',
			sizeRatios: sSizeRatios,
		},
		spin: {
			type: 'sprite',
			assetKey: 'S_19',
			sizeRatios: sSizeRatios,
		},
		win: {
			type: 'sprite',
			assetKeys: ['S_19', 'S_20', 'S_21', 'S_22', 'S_23', 'S_24', 'S_25', 'S_26', 'S_27'],
			sizeRatios: sSizeRatios,
		},
		land: {
			type: 'sprite',
			assetKey: 'S_19',
			sizeRatios: sSizeRatios,
		},
	},
	M_2: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_4: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_5: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_7: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_10: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_15: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_25: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_50: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_100: {
		explosion,
		postWinStatic: m10Static,
		static: m10Static,
		spin: m10Static,
		win: m10Static,
		land: m10Static,
	},
	M_TAKEN_2: backgroundLow,
	M_TAKEN_4: backgroundLow,
	M_TAKEN_5: backgroundMid,
	M_TAKEN_7: backgroundMid,
	M_TAKEN_10: backgroundHigh,
} as const;

export const MULTIPLIER_BACKGROUND_INFO_MAP = {
	M_2: backgroundLow,
	M_4: backgroundLow,
	M_5: backgroundMid,
	M_7: backgroundMid,
	M_10: backgroundHigh,
	M_15: backgroundHigh, // Use high background for debug
};

export const SCATTER_LAND_SOUND_MAP = {
	1: 'sfx_scatter_stop_1',
	2: 'sfx_scatter_stop_2',
	3: 'sfx_scatter_stop_3',
	4: 'sfx_scatter_stop_4',
	5: 'sfx_scatter_stop_5',
} as const;
