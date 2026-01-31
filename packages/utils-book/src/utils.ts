import { PUBLIC_CHROMATIC } from 'envs';
import { stateUrlDerived } from 'state-shared';
import { requestEndEvent } from 'rgs-requests';

import type { BaseBookEvent } from './types';

// Check if running in replay mode - replay doesn't need session API calls
const isReplayMode = (): boolean => {
	if (typeof window === 'undefined') return false;
	const params = new URLSearchParams(window.location.search);
	return params.get('replay') === 'true';
};

export function recordBookEvent<TBookEvent extends BaseBookEvent>({
	bookEvent,
}: {
	bookEvent: TBookEvent;
}) {
	try {
		// Skip in replay mode - no active session
		if (isReplayMode()) {
			return;
		}

		if (PUBLIC_CHROMATIC) {
			console.log('storybook mock request end-event:', bookEvent.index, bookEvent.type);
			return;
		}

		requestEndEvent({
			eventIndex: bookEvent.index,
			rgsUrl: stateUrlDerived.rgsUrl(),
			sessionID: stateUrlDerived.sessionID(),
		});
	} catch (error) {
		console.error(error);
	}
}

export function checkIsMultipleRevealEvents<TBookEvent extends BaseBookEvent>({
	bookEvents,
}: {
	bookEvents: TBookEvent[];
}) {
	const revealEventCount = bookEvents.filter((bookEvent) => bookEvent.type === 'reveal').length;
	const isMultipleReveals = revealEventCount > 1;
	return isMultipleReveals;
}
