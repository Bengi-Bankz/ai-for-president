export default {
	S_19: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/19.png', import.meta.url).href,
	},
	S_20: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/20.png', import.meta.url).href,
	},
	S_21: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/21.png', import.meta.url).href,
	},
	S_22: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/22.png', import.meta.url).href,
	},
	S_23: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/23.png', import.meta.url).href,
	},
	S_24: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/24.png', import.meta.url).href,
	},
	S_25: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/25.png', import.meta.url).href,
	},
	S_26: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/26.png', import.meta.url).href,
	},
	S_27: {
		type: 'sprite',
		src: new URL('../../assets/sprites/19-27/27.png', import.meta.url).href,
	},
	bg: {
		type: 'sprite',
		src: new URL('../../assets/sprites/backgrounds/bg.webp', import.meta.url).href,
		preload: true,
	},
	bg2: {
		type: 'sprite',
		src: new URL('../../assets/sprites/backgrounds/bg2.webp', import.meta.url).href,
		preload: true,
	},
	bg3: {
		type: 'sprite',
		src: new URL('../../assets/sprites/backgrounds/bg3.webp', import.meta.url).href,
		preload: true,
	},
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url)
			.href,
		preload: true,
	},
	H1: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H1_01: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H1_02: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H1_03: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H1_04: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H2: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H3: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H4: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	H5: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	L1: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	L2: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	L3: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	L4: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbols/symbols.webp.json', import.meta.url).href,
		preload: true,
	},
	M: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/M.json', import.meta.url).href,
			scale: 2,
		},
	},
	S: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols2/symbols2.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols2/S.json', import.meta.url).href,
			scale: 2,
		},
	},
	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},
	W: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/symbols3/W.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	trashcan: {
		type: 'sprite',
		src: new URL('../../assets/fonts/trashcan/trashcan.png', import.meta.url).href,
	},
	play01: {
		type: 'sprite',
		src: new URL('../../assets/fonts/play01/play01.png', import.meta.url).href,
	},
	balance: {
		type: 'sprite',
		src: new URL('../../assets/fonts/balance/balance.png', import.meta.url).href,
	},
	spin: {
		type: 'sprite',
		src: new URL('../../assets/fonts/spin/spin.png', import.meta.url).href,
	},
	payFrame: {
		type: 'sprite',
		src: new URL('../../assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},
	MoneyFont3: {
		type: 'font',
		src: new URL('../../assets/fonts/MoneyFont3/MoneyFont3.xml', import.meta.url).href,
	},
	auto: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/auto.webp', import.meta.url).href,
	},

	turboon: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/turboon.webp', import.meta.url).href,
	},
	turbooff: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/turbooff.webp', import.meta.url).href,
	},
	menu: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/menu.webp', import.meta.url).href,
	},
	play: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/play.webp', import.meta.url).href,
	},
	beehive: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/beehive.webp', import.meta.url).href,
	},

	stop: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/stop.webp', import.meta.url).href,
	},
	increase: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/increase.webp', import.meta.url).href,
	},
	decrease: {
		type: 'sprite',
		src: new URL('../../assets/fonts/icons/decrease.webp', import.meta.url).href,
	},

	green_win_background: {
		type: 'sprite',
		src: new URL('../../assets/sprites/green/green_win_background.webp', import.meta.url).href,
	},

	goldBlur: {
		type: 'font',
		src: new URL('../../assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},
	silverFont: {
		type: 'font',
		src: new URL('../../assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},
	purpleFont: {
		type: 'font',
		src: new URL('../../assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/globalMultiplier/multiframe.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas',
				import.meta.url,
			).href,
			skeleton: new URL(
				'../../assets/spines/foregroundFeatureAnimation/mm_bg_feature.json',
				import.meta.url,
			).href,
			scale: 2,
		},
		preload: true,
	},
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url)
				.href,
			scale: 2,
		},
	},
	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},
	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},

	freeSpins: {
		type: 'sprites',
		src: new URL('../../assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},
	winSmall: {
		type: 'sprites',
		src: new URL('../../assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url)
			.href,
	},
	spritesheet: {
		type: 'sprites',
		src: new URL('../../assets/sprites/trump/spritesheet.json', import.meta.url).href,
	},	spritesheet1: {
		type: 'sprites',
		src: new URL('../../assets/sprites/spritesheet1/spritesheet1.webp.json', import.meta.url).href,
	},
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},
	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},
	grenadeRobber: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/duel/grenadeRobber.png', import.meta.url).href,
	},
	donutCop: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/duel/donutCop.png', import.meta.url).href,
	},
	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},
	coins: {
		type: 'spriteSheet',
		src: new URL('../../assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},
	sound: {
		type: 'audio',
		src: new URL('../../assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},

	progressBar: {
		type: 'sprites',
		src: new URL('../../assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},
	m: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/multi/m.png', import.meta.url).href,
	},
	grenadeMugShot: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/grenade_mug_shot.png', import.meta.url).href,
	},
} as const;
