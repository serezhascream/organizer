import { TDayObject } from '../data/types';

export const getClassNames = (classes: string[]): string => {
	return classes.reduce((acc, className) => acc += ` org-${className}`, '');
}

export const getDayClasses = (day: TDayObject): string[] => {
	const classes = ['calendar__day'];
	
	if (day.isToday) {
		classes.push('calendar__day--today');
	}

	if (day.month !== 'current') {
		classes.push(`calendar__day--${day.month}`)
	}

	if (day.isWeekend) {
		classes.push('calendar__day--weekend')
	}
	
	if (day.isSelected) {
		classes.push('calendar__day--selected')
	}
	
	return classes;
}
