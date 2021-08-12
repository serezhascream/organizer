import { TDayObject } from './types';

export const eighties_decade = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989];
export const nineties_decade = [1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989];

export const day:TDayObject = {
	day: 1,
	month: 'current',
	isToday: false,
	timestamp: 1000000000,
	weekday: 1,
	isWeekend: false,
	isSelected: false,
};

export const firstOfMay2021:TDayObject = {
	"day": 1,
	"month": "current",
	"timestamp": 1619816400000,
	"isToday": false,
	"isWeekend": true,
	"weekday": 5,
	"isSelected": null
};
