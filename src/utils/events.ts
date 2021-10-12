import { TEventObj } from '../data/types';

export const loadEvents = (): TEventObj[] => {
	const events = window.localStorage.getItem('orgCalendarEvents');
	
	return events ? JSON.parse(events) : [];
};

export const saveEvents = (events: TEventObj[]): void => {
	window.localStorage.setItem('orgCalendarEvents', JSON.stringify(events));
};

export const deleteAllEvents = (): void => {
	window.localStorage.removeItem('orgCalendarEvents');
}

export const sortEventsByTimestamp = (arr: TEventObj[]): TEventObj[] => {
	return arr.sort((a: TEventObj, b: TEventObj) => (a.timestamp - b.timestamp));
};

export const getMarkerNumber = (timestamp: number): number => {
	const date = new Date(timestamp);
	
	return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}
