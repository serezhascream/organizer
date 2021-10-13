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

