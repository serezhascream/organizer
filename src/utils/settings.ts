import { TSettingsObj } from '../data/types';

export const getSettings = (): TSettingsObj => {
	const settings = window.localStorage.getItem('orgCalendarSettings');
	
	return settings ? JSON.parse(settings) : {};
};

export const saveSettings = (settings:TSettingsObj): void => {
	window.localStorage.setItem('orgCalendarSettings', JSON.stringify(settings));
};

export const removeSettings = (): void => {
	window.localStorage.removeItem('orgCalendarSettings');
};
