const DEFAULT_BET_MODE_META = {
	BASE: {
		mode: 'BASE',
		costMultiplier: 1,
		type: 'default',
		parent: '',
		children: '',
		assets: {
			icon: '',
			dialogImage: '',
			dialogVolatility: '',
			volatility: '',
			button: '',
		},
		text: {
			title: 'BASE GAME',
			dialog: 'Standard gameplay with natural scatter triggers.',
			button: 'SPIN',
			betAmountLabel: '',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: 'SPINNING...',
			bannerText: '',
		},
		maxWin: 8888,
	},

	BONUS: {
		mode: 'BONUS',
		costMultiplier: 200,
		type: 'buy',
		parent: '',
		children: '',
		assets: {
			icon: 'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/icon_bonusbuy.webp',
			dialogImage:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/bonus_image.webp',
			dialogVolatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_04.webp',
			volatility:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_04.webp',
			button:
				'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_8_97/betModes/button_buy.webp',
		},
		text: {
			title: "BONUS BANG' SPINS",
			dialog:
				'Triggers FREE SPINS with 4 GUARANTEED SCATTERS for 100x the purchase amount. The Global Multiplier can reach up to 64x and remains active for the duration of each spin.',
			description: '4 guaranteed scatter symbols for free spins.',
			button: 'BUY INHALE',
			tickerIdle: 'PLACE YOUR BET',
			tickerSpin: '4 SCATTER BONUS ACTIVATED',
			bannerText: '4 GUARANTEED SCATTERS',
		},
		maxWin: 8888,
	},

	// BONUS_5_SCATTER and BONUS_6_SCATTER disabled
	// Uncomment these sections to re-enable 5 and 6 scatter bonus cards

	// BONUS_5_SCATTER: {
	// 	mode: 'BONUS_5_SCATTER',
	// 	costMultiplier: 200,
	// 	type: 'buy',
	// 	parent: '',
	// 	children: '',
	// 	assets: {
	// 		icon: 'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/icon_bonusbuy.webp',
	// 		dialogImage:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/bonus_image.webp',
	// 		dialogVolatility:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_04.webp',
	// 		volatility:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_04.webp',
	// 		button:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_8_97/betModes/button_buy.webp',
	// 	},
	// 	text: {
	// 		title: 'HONESTLY MINTING SPINS',
	// 		dialog:
	// 			'Triggers FREE SPINS with 5 GUARANTEED SCATTERS for 200x the purchase amount. The Global Multiplier can reach up to 64x and remains active for the duration of each spin.',
	// 		description: '5 guaranteed scatter symbols for enhanced free spins.',
	// 		button: 'BUY MINTING',
	// 		tickerIdle: 'PLACE YOUR BET',
	// 		tickerSpin: '5 SCATTER BONUS ACTIVATED',
	// 		bannerText: '5 GUARANTEED SCATTERS',
	// 	},
	// 	maxWin: 8888,
	// },

	// BONUS_6_SCATTER: {
	// 	mode: 'BONUS_6_SCATTER',
	// 	costMultiplier: 500,
	// 	type: 'buy',
	// 	parent: '',
	// 	children: '',
	// 	assets: {
	// 		icon: 'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/icon_super_bonusbuy.webp',
	// 		dialogImage:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/super_bonus_image.webp',
	// 		dialogVolatility:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_05.webp',
	// 		volatility:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_9_97/betModes/volatility/volatility_white_05.webp',
	// 		button:
	// 			'https://test-fart-cdn-bucket.s3.ap-southeast-2.amazonaws.com/1_8_97/betModes/button_super_buy.webp',
	// 	},
	// 	text: {
	// 		title: 'OSAMA KILLER SPINS',
	// 		dialog:
	// 			'Triggers FREE SPINS with 6 GUARANTEED SCATTERS for 500x the purchase amount. The Global Multiplier can reach up to 64x and remains active for the duration of each spin.',
	// 		description: 'Maximum 6 guaranteed scatter symbols for ultimate free spins potential.',
	// 		button: 'BUY KILLER',
	// 		tickerIdle: 'PLACE YOUR BET',
	// 		tickerSpin: '6 SCATTER BONUS ACTIVATED',
	// 		bannerText: '6 GUARANTEED SCATTERS',
	// 	},
	// 	maxWin: 8888,
	// },
};

const DEFAULT_GAME_RULE_META = {
	payTable: [
		{
			containers: [
				{
					title: 'WILD SYMBOL',
					text: 'The Wild symbol substitutes all other symbols except Scatter.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: 'FREE SPINS',
					text: 'Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, FREE SPINS is triggered. 3 Scatters award 8 FREE SPINS. 4 Scatters award 12 FREE SPINS. 5 Scatters award 16 FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: 'FREE SPINS RETRIGGER',
					text: 'During FREE SPINS, Scatter Symbols are on all reels. If at least 3 Scatters land in a spin sequence, additional FREE SPINS rounds are triggered. 3 Scatters award 4 additional FREE SPINS. 4 Scatters award 6 additional FREE SPINS. 5 Scatters award 8 additional FREE SPINS. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
			],
			rows: 3,
			columns: 1,
			title: 'PAYTABLE',
		},
		{
			containers: [
				{
					title: '',
					text: '5	|	10x\n4	|	5x\n3	|	2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 1,
				},
				{
					title: '',
					text: '5	|	5x\n4	|	2x\n3	|	1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 0,
					column: 2,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: '5	|	3x\n4	|	1x\n3	|	0.5x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 1,
					column: 1,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 0,
				},
				{
					title: '',
					text: '5	|	2x\n4	|	0.8x\n3	|	0.4x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 3,
					column: 2,
				},
				{
					title: '',
					text: '5	|	1.5x\n4	|	0.5x\n3	|	0.2x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 1,
				},
				{
					title: '',
					text: '5	|	1x\n4	|	0.3x\n3	|	0.1x\n',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/wild.ac78fbf6.png',
					imagePosition: 'left',
					row: 4,
					column: 2,
				},
			],
			rows: 5,
			columns: 3,
			title: 'SYMBOLS',
		},
		{
			containers: [
				{
					title: '',
					text: 'All symbols pay from left to right. Starting from the left most reel. Only symbols on adjacent reels will be a valid win way. This does not apply to Scatter. ',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/winWays.be45a8a4.png',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'WIN WAYS',
		},
	],
	gameRules: [
		{
			containers: [
				{
					title: '',
					text: 'The normal mode of this game has a theoretical expected return of 97.0%.\n\nThe player also has the option to select an ANTE BET mode. This costs 1.25x the underlying bet. The ANTE BET mode has a theoretical expected return of 97.0%. The ANTE BET doubles the chance of FREE SPINS.\n\nThe player also has the option to buy FREE SPINS. This costs 100x the underlying bet. The FREE SPINS buy mode has a theoretical expected return of 97.0%. \n\nThe player has the option to buy a SUPER SPIN. This costs 25x the underlying bet. The SUPER SPIN buy mode has a theoretical expected return of 97.0%. In SUPER SPIN one spin is initially awarded. On each spin stacked Wild Symbols are on Reel Strips\n\n The maximum win in each Bet Mode is 5000x the underlining bet.',
					image: 'https://staging-1-0.twist-game.app/_app/immutable/assets/rtp97.d2febd7d.svg',
					imagePosition: 'top',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'BET MODES',
		},
		{
			containers: [
				{
					title: '',
					text: 'Malfunction voids all pays and plays. A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted bets. The theoretical expected return is calculated over many spins. Movement of reels are not representative of any physical device, and is for illustrative purposes only. TM and \u00a9 2023 Twist Gaming.',
					image: '',
					row: 0,
					column: 0,
				},
			],
			rows: 1,
			columns: 1,
			title: 'LEGAL NOTICE',
		},
		{
			containers: [
				{
					title: '',
					text: 'SPIN BUTTON | Initiates the Betting Round.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleSpin.daacc43a.webp',
					imagePosition: 'left',
					row: 0,
					column: 0,
				},
				{
					title: '',
					text: 'STOP BUTTON | Stops the current Spin.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleStop.30db74c5.webp',
					imagePosition: 'left',
					row: 1,
					column: 0,
				},
				{
					title: '',
					text: 'INFORMATION | Provides Game Information.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 2,
					column: 0,
				},
				{
					title: '',
					text: 'SETTINGS | Adjust Game Settings.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 4,
					column: 0,
				},
				{
					title: '',
					text: 'PAY TABLE | View the Paytable to see Symbol Values.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 6,
					column: 0,
				},
				{
					title: '',
					text: 'AUTO SPIN | Open the Auto Spin pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleAutoSpin.d542a3b0.webp',
					imagePosition: 'left',
					row: 7,
					column: 0,
				},

				{
					title: '',
					text: 'TURBO | Activate Turbo Mode.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleTurbo.a0fcfd04.webp',
					imagePosition: 'left',
					row: 9,
					column: 0,
				},
				{
					title: '',
					text: 'MENU | Expands the Sidebar Menu for more Options.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 10,
					column: 0,
				},
				{
					title: '',
					text: 'CLOSE | Exit the pop-up menu.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 11,
					column: 0,
				},
				{
					title: '',
					text: 'SOUND | Mute or Unmute Game Audio.',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 12,
					column: 0,
				},
				{
					title: '',
					text: 'INCREASE | Increase your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 13,
					column: 0,
				},
				{
					title: '',
					text: 'DECREASE | Decrease your Bet Amount',
					image:
						'https://staging-1-0.twist-game.app/_app/immutable/assets/gameRuleDown.716ec429.webp',
					imagePosition: 'left',
					row: 14,
					column: 0,
				},
			],
			rows: 16,
			columns: 1,
			title: 'USER INTERFACE GUIDE',
		},
	],
	splashScreen: [],
};

export { DEFAULT_BET_MODE_META, DEFAULT_GAME_RULE_META };
