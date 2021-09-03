export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export type TEventObj = {
	title: string,
	description: string | null,
	day: number,
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

