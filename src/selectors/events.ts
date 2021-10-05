import { TEventObj, TRootState } from '../data/types';
import { nanoid } from '@reduxjs/toolkit';

const blankEvent = {
	title: '',
	description: '',
};

export const getUniqueValues = (arr: number[]): number[] => {
	const set = new Set(arr);
	return [...set];
}

export const getEvent = (state: TRootState, id: string | null, day: number | null): TEventObj => {
	if (! id) {
		return {
			id: nanoid(),
			day,
			timestamp: day,
			...blankEvent,
		};
	}
	
	return state.events.find(event => event.id === id);
};

export const getEvents = (state: TRootState, timestamp: number): TEventObj[] => {
	return state.events.filter(event => event.day === timestamp);
};

export const getEventMarkers = (state: TRootState): number[] => {
	const events = state.events.map(event => event.day);
	
	return getUniqueValues(events);
};
