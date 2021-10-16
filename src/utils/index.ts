import { TEventObj } from '../data/types';
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
	
	return date.toLocaleDateString(
		'en-US',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		},
	);
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

export const getDayDateString = (timestamp: number): string => {
	const date = new Date(timestamp);
	
	return `${date.getFullYear()}-${get2DigitMonth(date.getMonth())}-${get2DigitDay(date.getDate())}`;
}

export const getTimeString = (timestamp: number): string => {
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
	
	const dateConfig: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	};
	
	const timeConfig: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
	};

	if (! event.hasTime) {
		return date.toLocaleString('en-US', dateConfig);
	}

	return date.toLocaleString('en-US', {...dateConfig, ...timeConfig});
};
