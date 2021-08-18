import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './features/settingsSlice';
import mainReducer from './features/mainSlice';
import { saveSettings } from './utils/settings';

const store = configureStore({
	reducer: {
		main: mainReducer,
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
