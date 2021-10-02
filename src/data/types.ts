export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export type TEventObj = {
	id: number,
	day: number,
	title: string,
	description: string | null,
	timestamp: number,
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

