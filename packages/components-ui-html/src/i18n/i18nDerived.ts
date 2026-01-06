import { stateI18nDerived } from 'state-shared';

export const i18nDerived = {
	bet: () => stateI18nDerived.translate('AMOUNT'),
	max: () => stateI18nDerived.translate('MAX'),
	betMenu: () => stateI18nDerived.translate('AMOUNT MENU'),
	selectYourBet: () => stateI18nDerived.translate('SELECT YOUR AMOUNT'),
	confirm: () => stateI18nDerived.translate('CONFIRM'),
	masterVolume: () => stateI18nDerived.translate('MASTER VOLUME'),
	musicVolume: () => stateI18nDerived.translate('MUSIC VOLUME'),
	soundEffectVolume: () => stateI18nDerived.translate('SOUND EFFECT VOLUME'),
	autoSpins: () => stateI18nDerived.translate('AUTO SPINS'),
	numberOfRounds: () => stateI18nDerived.translate('NUMBER OF ROUNDS'),
	advanced: () => stateI18nDerived.translate('ADVANCED'),
	singleWinLimit: () => stateI18nDerived.translate('SINGLE WIN LIMIT'),
	lossLimit: () => stateI18nDerived.translate('LIMIT'),
	startAutoplay: () => stateI18nDerived.translate('START AUTOPLAY'),
	notification: () => stateI18nDerived.translate('NOTIFICATION'),
	autoSpinsStopInfo: () => stateI18nDerived.translate('AUTO PLAY HAS STOPPED DUE TO'),
	insufficientFunds: () =>
		stateI18nDerived.translate(
			'INSUFFICIENT  TOKENS TO PLACE THIS SPIN. PLEASE ADD TOKENS TO YOUR ACCOUNT OR LOWER THE SPIN AMOUNT.',
		),
	lossLimitReached: () => stateI18nDerived.translate('LIMIT REACHED'),
	singleWinLimitReached: () => stateI18nDerived.translate('SINGLE WIN LIMIT REACHED'),
	settings: () => stateI18nDerived.translate('SETTINGS'),
};
