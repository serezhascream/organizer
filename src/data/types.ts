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

export interface TSwitcherProps {
	name: string,
	checked: boolean,
	label: string,
	onChange(checked: boolean, name:string): void
}

export interface TButtonProps {
	children: string,
	name: string,
	disabled?: boolean,
	extraClass?: string,
	onClick(name:string): void
}

export interface TInputProps {
	name: string,
	label?: string,
	inputType?: string,
	value: string | number | null,
	extraClass?: string,
	onChange(value:string | number | null, name: string): void
}

export interface TTextareaProps {
	name: string,
	value: string,
	label?: string,
	extraClass?: string,
	onChange(value: string, name: string): void
}

export type TCalendarData = TDayObject[];


export type TUseCalendarReturn = {
	active: TYearAndMonth,
	data: TCalendarData,
	setActive(YearAndMonth): void,
	switchMonth: TSwitchDirection,
	setSelected(day:TDayObject): void,
};

export type TUseDecadeReturn = {
	decade: number[],
	switchDecade: TSwitchDirection
};

export type TDaySelectFunc = (day: TDayObject) => void;
export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export interface TContentProps {
	activeView: string | null,
	selected: TDayObject,
}

export interface TSettingsProps {
	theme: TTheme,
	firstDayIsMonday: boolean,
	onChangeTheme(checked: boolean): void,
	onChangeFirstDay(checked: boolean): void,
}

export type TEventObj = {
	title: string,
	description: string | null,
	timestamp: number,
}

export interface TEventsListProps {
	events: TEventObj[],
}

export interface TEventProps {
	event: TEventObj,
}

export interface TEventPopupProps {
	show: boolean,
	onClose(): void,
}

export interface TListProps {
	selected: TDayObject,
}
