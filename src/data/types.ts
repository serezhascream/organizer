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

export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export interface TContentProps {
	activeView: string | null,
	selected: number | null,
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
	day: number,
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
	selected: number | null,
}

export interface TRootState {
	events: {
		items: TEventObj[],
		selectedEvent: TEventObj,
	},
	main: {
		selectedDay: number | null,
		activeContentView: string,
	},
	settings: {
		theme: TTheme,
		firstDayIsMonday: boolean,
	}
}

