type TSwitchDirection = (direction: string) => void;

type TMonthType = "prev" | "current" | "next";

export interface TDayObject {
	day: number,
	month:TMonthType,
	isToday: boolean,
	timestamp: number,
	weekday: number,
	isWeekend: boolean,
	isSelected: boolean,
}

export interface TYearAndMonth {
	year: number;
	month: number;
}

export interface TAppProps {
	decadeView: boolean,
	firstDayIsMonday: boolean,
	markers: string[],
	onDayClickHandler(): string | void,
	onMonthSelect(): string | void,
	onYearSelect(): number | void,
	showPrevNextDates: boolean,
}

export interface TCalendarProps {
	firstDayIsMonday: boolean;
	selected: TDayObject;
	onSelectDay(TDayObject): void;
}

export interface TControlsProps {
	active: {
		year: number,
		month: number,
	},
	activeView: string,
	onSwitchDirection: TSwitchDirection,
	onSwitchView(view: string): void,
}

export interface TDecadeViewProps {
	decade: number[]
	activeView: string,
	onClick(year: number): void,
}

export type TCalendarData = TDayObject[];


export type TUseCalendarReturn = [
	{
		active: TYearAndMonth,
		data: TCalendarData,
	},
	{
		setActive(YearAndMonth): void,
		switchMonth: TSwitchDirection,
		setSelected(day:TDayObject): void,
	}
];

export type TUseDecadeReturn = [
	number[],
	TSwitchDirection
];

export type TDaySelectFunc = (day: TDayObject) => void;
