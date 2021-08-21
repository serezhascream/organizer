import { createSlice } from '@reduxjs/toolkit';
import { loadEvents } from '../utils/events';

const items = loadEvents();
const defaultActiveEvent = {
	day: null,
	title: '',
	description: '',
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		items,
		selectedEvent: defaultActiveEvent,
	},
	reducers: {
		addEvent: (state, action) => {
			state.items.push(action.payload);
			state.selectedEvent = defaultActiveEvent;
		}
	}
});

export const { addEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
