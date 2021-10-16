import { TSettingsObj } from '../data/types';

export const DEFAULT_SETTINGS:TSettingsObj = {
	theme: 'dark',
	firstDayIsMonday: true,
};

export const portalId = 'popup-portal';

export const dateConfigShort: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
};

export const dateConfigLong: Intl.DateTimeFormatOptions = {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
};

export const timeConfig: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
};
