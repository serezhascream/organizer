import { TEventObj } from '../data/types';
import { dateConfigShort, dateConfigLong, timeConfig } from '../data/constants';
const get2DigitMonth = (value: number): string => ('0' + (value + 1)).slice(-2);
const get2DigitDay = (value: number): string => ('0' + value).slice(-2);

export const getUniqueValues = (arr: number[]): number[] => {
	const set = new Set(arr);
	return [...set];
}

export const getListTitle = (selectedDay: number | null): string => {
	if (! selectedDay) {
		return 'Upcoming events';
	}
	
	const date = new Date(selectedDay);
	
	return date.toLocaleDateString('en-US', dateConfigLong);
};

export const getUpdatedDate = (timestamp: number, dateString: string): number => {
	const date = new Date(timestamp);
	const [year, month, day] = dateString.split('-');
	
	date.setFullYear(Number(year));
	date.setMonth(Number(month) - 1);
	date.setDate(Number(day));
	
	return date.getTime();
}

export const getUpdatedTime = (timestamp: number, timeString?: string): number => {
	const date = new Date(timestamp);
	const [hours, minutes] = timeString.split(':');
	
	date.setHours(Number(hours));
	date.setMinutes(Number(minutes));
	
	return date.getTime();
};

export const getDateInputValue = (timestamp: number): string => {
	const date = new Date(timestamp);
	
	return `${date.getFullYear()}-${get2DigitMonth(date.getMonth())}-${get2DigitDay(date.getDate())}`;
}

export const getTimeInputValue = (timestamp: number): string => {
	const date = new Date(timestamp);
	
	const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

	return time === '24:00' ? '00:00' : time;
}

export const getDateNumber = (timestamp: number): number => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = get2DigitMonth(date.getMonth());
	const day = get2DigitDay(date.getDate());
	
	return Number(`${year}${month}${day}`);
}
export const getDateString = (event: TEventObj): string => {
	const date = new Date(event.timestamp);
	
	if (! event.hasTime) {
		return date.toLocaleString('en-US', dateConfigShort);
	}

	return date.toLocaleString('en-US', {...dateConfigShort, ...timeConfig});
};

export const getEventPopupTitle = (eventId: string | null, popupView: 'show' | 'edit'): string => {
	if (! eventId) {
		return 'Create event';
	}
	
	if (popupView === 'edit') {
		return 'Edit event';
	}
	
	return 'Event';
};

export const getEventItemDateString = (event: TEventObj, selectedDay: number): string => {
	const date = new Date(event.timestamp);

	if (!selectedDay) {
		return getDateString(event);
	}

	if (selectedDay && event.hasTime) {
		const time = date.toLocaleString('en-US', timeConfig);
		return time === '24:00' ? '00:00' : time;
	}

	return '';
};
