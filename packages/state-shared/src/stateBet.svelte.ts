import type { BaseBet } from 'utils-bet';
import { stateMeta } from './stateMeta.svelte';
import { stateConfig } from './stateConfig.svelte';

export type Currency = string;
export type LastBet = BaseBet | null;
export type BetModeKey = string;

export const stateBet = $state({
	currency: 'USD' as Currency,
	balanceAmount: 0,
	betAmount: 1,
	wageredBetAmount: 1,
	lastBet: null as LastBet,
	activeBetModeKey: 'BASE' as BetModeKey,
	winBookEventAmount: 0,
	autoSpinsLoss: 0,
	autoSpinsCounter: 0,
	autoSpinsLossLimitAmount: Infinity,
	autoSpinsSingleWinLimitAmount: Infinity,
	isSpaceHold: false,
	isTurbo: false,
});

const getMinBet = () => {
	// If betAmountOptions is set from RGS config, use the minimum, else fallback to 1
	if (Array.isArray(stateConfig.betAmountOptions) && stateConfig.betAmountOptions.length > 0) {
		return Math.min(...stateConfig.betAmountOptions);
	}
	return 1;
};

const getMaxBet = () => {
	// If betAmountOptions is set from RGS config, use the maximum, else fallback to balance
	if (Array.isArray(stateConfig.betAmountOptions) && stateConfig.betAmountOptions.length > 0) {
		return Math.max(...stateConfig.betAmountOptions);
	}
	// fallback: max is balance/costMultiplier
	const costMultiplier = betCostMultiplier();
	return costMultiplier > 0 ? stateBet.balanceAmount / costMultiplier : stateBet.balanceAmount;
};

const correctBetAmount = (value: number) => {
	const min = getMinBet();
	const max = getMaxBet();
	if (value < min) return min;
	if (value > max) return max;
	return value;
};

const setBetAmount = (value: number) => {
	stateBet.betAmount = correctBetAmount(value);
};

const updateBetAmount = (update: (value: number) => number) => {
	stateBet.betAmount = correctBetAmount(update(stateBet.betAmount));
};

let isTurboLocked = false;

const updateIsTurbo = (value: boolean, options: { persistent: boolean }) => {
	const { persistent } = options;

	if (!persistent && isTurboLocked) return;
	if (persistent) isTurboLocked = value;

	stateBet.isTurbo = value;
};

const activeBetMode = () => stateMeta.betModeMeta?.[stateBet.activeBetModeKey] || null;
const isContinuousBet = () => stateBet.autoSpinsCounter > 1 || stateBet.isSpaceHold;
const timeScale = () => (stateBet.isTurbo ? 2 : 1);
const betCostMultiplier = () =>
	stateBetDerived.activeBetMode().type === 'activate'
		? stateBetDerived.activeBetMode().costMultiplier
		: 1;
const betCost = () => stateBet.betAmount * betCostMultiplier();
const isBetCostAvailable = () => betCost() > 0 && betCost() <= stateBet.balanceAmount;
const hasAutoBetCounter = () => stateBet.autoSpinsCounter !== 0;

export const stateBetDerived = {
	setBetAmount,
	updateBetAmount,
	updateIsTurbo,
	activeBetMode,
	isContinuousBet,
	timeScale,
	betCost,
	isBetCostAvailable,
	hasAutoBetCounter,
};
