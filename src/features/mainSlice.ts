import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
	name: 'main',
	initialState: {
		selectedDay: null,
		activeContentView: null,
	},
	reducers: {
		setSelectedDay: (state, { payload }) => {
			state.selectedDay = payload;
		},
		setActiveContentView: (state, { payload }) => {
			state.activeContentView = payload;
		},
	}
});

export const { setSelectedDay, setActiveContentView } = mainSlice.actions;

export default mainSlice.reducer;
