import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settingsSlice';
import { saveSettings } from './utils/settings';

const store = configureStore({
	reducer: {
		settings: settingsReducer,
	},
});

let oldSettings = store.getState().settings;

const handleChangeSettings = () => {
	const newSettings = store.getState().settings;
	
	if (newSettings !== oldSettings) {
		oldSettings = newSettings;
		saveSettings(newSettings);
	}
};

store.subscribe(handleChangeSettings);

export default store;
