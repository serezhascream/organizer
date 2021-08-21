import { TDayObject } from '../data/types';

export const getDayClasses = (day: TDayObject): string[] => {
	const classes = ['org-calendar__day'];
	
	if (day.isToday) {
		classes.push('org-calendar__day--today');
	}

	if (day.month !== 'current') {
		classes.push(`org-calendar__day--${day.month}`)
	}

	if (day.isWeekend) {
		classes.push('org-calendar__day--weekend')
	}
	
	if (day.isSelected) {
		classes.push('org-calendar__day--selected')
	}
	
	if (day.hasMarker) {
		classes.push('org-calendar__day--has-marker');
	}
	
	return classes;
}
