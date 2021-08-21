import { TEventObj, TRootState } from '../data/types';

export const getEvents = (state: TRootState, timestamp: number): TEventObj[] => {
	const events = state.events.items;
	
	return events.filter(event => event.day === timestamp);
};
