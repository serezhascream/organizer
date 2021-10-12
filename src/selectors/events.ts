import { TEventObj, TRootState } from '../data/types';
import { nanoid } from '@reduxjs/toolkit';
import { getDateNumber, getUniqueValues } from '../utils';
import { sortEventsByTimestamp, getMarkerNumber } from '../utils/events';

export const getEvent = (state: TRootState, id: string | null, day: number | null): TEventObj => {
	if (! id) {
		return {
			id: nanoid(),
			timestamp: day,
			title: '',
			description: '',
		};
	}
	
	return state.events.find(event => event.id === id);
};

export const getEvents = (state: TRootState, timestamp: number): TEventObj[] => {
	if (timestamp) {
		const date = getDateNumber(timestamp);
		const dayEvents = state.events.filter(event => getDateNumber(event.timestamp) === date);
		
		return sortEventsByTimestamp(dayEvents);
	}
	
	const today = getDateNumber(new Date().getTime());
	
	const upcomingEvents = state.events.filter(
		event => getDateNumber(event.timestamp) >= today
	);
	
	return sortEventsByTimestamp(upcomingEvents);
};

export const getEventMarkers = (state: TRootState): number[] => {
	const events = state.events.map(event => getMarkerNumber(event.timestamp));
	
	return getUniqueValues(events);
};
