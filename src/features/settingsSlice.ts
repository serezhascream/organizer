import { createSlice } from '@reduxjs/toolkit';

import { getSettings } from '../utils/settings';
import { DEFAULT_SETTINGS } from '../data/constants';

const settings = getSettings();
const initialState = {...DEFAULT_SETTINGS, ...settings};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		switchTheme: (state, action) => {
			state.theme = action.payload;
		},
		switchFirstDay: (state, action) => {
			state.firstDayIsMonday = action.payload;
		},
	}
});

export const { switchTheme, switchFirstDay } = settingsSlice.actions;

export default settingsSlice.reducer;
