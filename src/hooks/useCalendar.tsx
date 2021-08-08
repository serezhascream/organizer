import * as React from 'react';

import {
	TYearAndMonth,
	TCalendarData,
	TUseCalendarReturn,
	TDayObject,
} from '../data/types';

// FUNCTIONS

const getYearAndMonth = (initialDate: Date = null) => {
	const activeDate = initialDate || new Date(Date.now());
	
	return {
		month: activeDate.getMonth(),
		year: activeDate.getFullYear(),
	};
};

const isToday = (year: number, month: number, day: number): boolean => {
	const today = new Date(Date.now());
	
	return today.getFullYear() === year && today.getMonth() + 1 === month + 1 && today.getDate() === day;
};

const getWeekday = (year, month, day, firstDayIsMonday) => {
	const weekday = new Date(year, month, day).getDay();

	if (firstDayIsMonday) {
		return weekday === 0 ? 6 : weekday - 1;
	}

	return weekday;
};

const getIsWeekend = (weekday, firstDayIsMonday) => {
	const weekends = firstDayIsMonday ? [5,6] : [0,6];

	return weekends.includes(weekday);
};

const getPrevMonthYear = (year: number, month: number): TYearAndMonth  => {
	return {
		year: month === 0 ? year - 1 : year,
		month: month === 0 ? 11 : month - 1,
	};
};

const getNextMonthYear = (year: number, month: number): TYearAndMonth => {
	return {
		year: month === 11 ? year + 1 : year,
		month: month === 11 ? 0 : month + 1,
	};
};

const getNumOfDaysInMonth = (year: number, month: number): number => {
	return new Date(year, month + 1, 0).getDate();
};

const getStart = ({year, month}, firstWeekday): number => {
	const daysInPrevMonth = getNumOfDaysInMonth(year, month);
	
	return daysInPrevMonth - firstWeekday + 1;
};

const getEnd = (lastWeekday) => (6 - lastWeekday);

const getMonthType = (
	year: number,
	month: number,
	activeYear: number,
	activeMonth: number
): string => {
	if (year < activeYear || month < activeMonth) {
		return 'prev';
	}
	
	if (year > activeYear || month > activeMonth) {
		return 'next';
	}

	return 'current';
};
	
const getIsSelected = (year: number, month: number, day: number, selected: TDayObject) => {
	if (! selected) {
		return false;
	}

	const selectedDate = new Date(selected.timestamp);
	const { year: selectedYear, month: selectedMonth } = getYearAndMonth(selectedDate);

	return year === selectedYear && month === selectedMonth && selected.day === day;
};

const getDaysArray = (
	{year, month}: TYearAndMonth,
	{year: activeYear, month: activeMonth}: TYearAndMonth,
	selected: TDayObject,
	start = 1,
	end = null,
	firstDayIsMonday = true,
) => {
		const days = [];
		const lastDay = end || getNumOfDaysInMonth(year, month);
		
		for (let i = start; i <= lastDay; i++) {
			const date = new Date(year, month, i);
			const weekday = getWeekday(year, month, i, firstDayIsMonday);
			const monthType = getMonthType(year, month, activeYear, activeMonth);
			const isSelected = monthType && selected && getIsSelected(year, month, i, selected)
			
			days.push({
				day: i,
				month: monthType,
				timestamp: date.getTime(),
				isToday: isToday(year, month, i),
				isWeekend: getIsWeekend(weekday, firstDayIsMonday),
				weekday,
				isSelected,
			});
		}
		
		return days;
};

// HOOKS

const useCalendarData = (
	active: TYearAndMonth,
	selected: TDayObject,
	firstDayIsMonday: boolean
): TCalendarData => {
	const data = [];
	const { month, year } = active;

	const firstWeekday = getWeekday(year, month, 1, firstDayIsMonday);
	const lastWeekday = getWeekday(
		year,
		month,
		getNumOfDaysInMonth(year, month),
		firstDayIsMonday,
	);
	
	if (firstWeekday > 0) {
		const prev = getPrevMonthYear(year, month);
		const start = getStart(prev, firstWeekday);
		const prevDaysArray = getDaysArray(prev, active, selected, start, null, firstDayIsMonday);
		
		data.push(...prevDaysArray);
	}
	
	data.push(...getDaysArray({year, month}, active, selected, 1, null, firstDayIsMonday));
	
	if (lastWeekday < 6) {
		const next = getNextMonthYear(year, month);
		const end = getEnd(lastWeekday);
		const nextDaysArray = getDaysArray(next, active, selected, 1, end, firstDayIsMonday);
		
		data.push(...nextDaysArray);
	}
	
	return data;
};

// returns calendar object and utilities
const useCalendar = (selected: TDayObject = null, firstDayIsMonday = true): TUseCalendarReturn => {
	const activeYearMonth = getYearAndMonth();
	const [active, setActive] = React.useState(activeYearMonth);

	const calendarData = useCalendarData(active, selected, firstDayIsMonday);

	// UTILS
	
	const switchMonth = React.useCallback((direction: string): void => {
		const { year, month } = active;
		
		if (direction === 'prev') {
			const newActive = getPrevMonthYear(year,month);
			
			setActive(newActive);
			return;
		}

		if (direction === 'next') {
			const newActive = getNextMonthYear(year,month);
			
			setActive(newActive);
			return;
		}
	}, [active]);
	
	// RETURNS
	
	const Calendar = {
		active,
		data: calendarData,
	};
	
	const CalendarUtils = {
		setActive,
		switchMonth,
	};
	
	return [Calendar, CalendarUtils];
};

export default useCalendar;
