import { createSlice } from '@reduxjs/toolkit';
import { loadEvents } from '../utils/events';

const items = loadEvents();
const defaultActiveEvent = {
	id: null,
	day: null,
	title: '',
	description: '',
	timestamp: null,
};

export const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		items,
		selectedEvent: defaultActiveEvent,
	},
	reducers: {
		updateSelectedEvent: (state, { payload }) => {
			state.selectedEvent = {...state.selectedEvent, ...payload};
		},
		
		resetSelectedEvent: (state) => {
			state.selectedEvent = defaultActiveEvent;
		},
		
		saveEvent: ({ items, selectedEvent }) => {
			if (! selectedEvent.id) {
				items.push(selectedEvent);
				
				return;
			}
			
			items[selectedEvent.id] = {...selectedEvent}
		},
	}
});

export const { updateSelectedEvent, resetSelectedEvent, saveEvent } = eventsSlice.actions;

export default eventsSlice.reducer;
