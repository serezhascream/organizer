import { TEventObj, TRootState } from '../data/types';

export const getUniqueValues = (arr: number[]): number[] => {
	const set = new Set(arr);
	return [...set];
}

export const getEvents = (state: TRootState, timestamp: number): TEventObj[] => {
	const events = state.events.items;
	
	return events.filter(event => event.day === timestamp);
};

export const getEventMarkers = (state: TRootState): number[] => {
	const events = state.events.items.map(event => event.day);
	
	return getUniqueValues(events);
};
