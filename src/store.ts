import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settingsSlice';
import eventsReducer from './features/eventsSlice';
import { saveSettings } from './utils/settings';
import { saveEvents } from './utils/events';

const store = configureStore({
	reducer: {
		settings: settingsReducer,
		events: eventsReducer,
	},
});

let oldSettings = store.getState().settings;
let oldEvents = store.getState().events;

const handleChangeSettings = () => {
	const newSettings = store.getState().settings;
	
	if (newSettings !== oldSettings) {
		oldSettings = newSettings;
		saveSettings(newSettings);
	}
};

const handleChangeEvents = () => {
	const newEvents = store.getState().events;
	
	if (newEvents !== oldEvents) {
		oldEvents = newEvents;
		saveEvents(newEvents);
	}
};

store.subscribe(handleChangeSettings);
store.subscribe(handleChangeEvents);

export default store;
