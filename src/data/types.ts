export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export type TEventObj = {
	id: string,
	title: string,
	hasTime: boolean,
	description: string | null,
	timestamp: number,
}

export interface TRootState {
	main: {
		selectedDay: number | null,
		activeContentView: string,
	},
	events: TEventObj[],
	settings: {
		theme: TTheme,
		firstDayIsMonday: boolean,
	}
}

export interface TEditPopupShowProps {
	dateString: string;
	selectedEvent: TEventObj;
	onOpenEditor(): void;
	onDeleteEvent(): void;
}

export interface TEditPopupEditProps {
	selectedEvent: TEventObj;
	onSave(event: TEventObj): void;
	onClose(): void;
}
