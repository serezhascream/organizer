import { DEFAULT_SETTINGS } from '../data/constants';
import { TSettingsObj } from '../data/types';

export const getSettings = (): TSettingsObj => {
	const lsSettings = window.localStorage.getItem('orgCalendarSettings');
	const settings = lsSettings ? JSON.parse(lsSettings) : DEFAULT_SETTINGS;
	
	return settings;
};

export const saveSettings = (settings:TSettingsObj): void => {
	window.localStorage.setItem('orgCalendarSettings', JSON.stringify(settings));
};
