export type TTheme = 'dark' | 'light';

export interface TSettingsObj {
	theme: TTheme,
	firstDayIsMonday: boolean,
}

export type TEventObj = {
	id: string,
	day: number,
	title: string,
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

