import { TEventObj } from '../data/types';

export const loadEvents = (): TEventObj[] => {
	const events = window.localStorage.getItem('orgCalendarEvents');
	
	return events ? JSON.parse(events) : [];
};

export const saveEvents = (events: TEventObj[]): void => {
	window.localStorage.setItem('orgCalendarEvents', JSON.stringify(events));
};
