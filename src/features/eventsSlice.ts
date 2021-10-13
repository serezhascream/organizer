import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadEvents } from '../utils/events';
import { TEventObj } from '../data/types';

const items = loadEvents();

export const eventsSlice = createSlice({
	name: 'events',
	initialState: items as TEventObj[],
	reducers: {
		saveEvent: (state, action: PayloadAction<TEventObj>) => {
			const { payload } = action;
			const event = state.find(event => event.id === payload.id);
			
			if (event) {
				
				event.title = payload.title;
				event.hasTime = payload.hasTime;
				event.description = payload.description;
				event.timestamp = payload.timestamp;
			
				return;
			}
			
			state.push(payload);
		},
		deleteEvent: (state, { payload }) => {
			const index = state.findIndex(event => event.id === payload);
			
			if (index < 0) {
				return;
			}
			
			state.splice(index, 1);
		},
	}
});

export const {
	saveEvent,
	deleteEvent,
} = eventsSlice.actions;

export default eventsSlice.reducer;
