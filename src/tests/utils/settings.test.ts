import localStorageMock from '../mock/localStorage';
import localStorageFixture from '../fixture/localStorage';

import { getSettings, saveSettings, removeSettings } from '../../utils/settings';

describe('utils > settings', () => {
	const localStorage = JSON.stringify(localStorageFixture);
	
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});
	});
	
	it('getSettings returns the correct object', () => {
		const settings = getSettings();
		
		expect(settings.theme).toEqual('dark');
	});
	
	it('setSettings saves settings', () => {
		const settings = getSettings();
		
		saveSettings({ ...settings, theme: 'light' });
		
		const savedSettings = getSettings();
		
		expect(savedSettings.theme).toEqual('light');
	});
	
	it('removeSettings removes settings', () => {
		removeSettings();
		
		const settings = getSettings();
		
		expect(settings).toEqual({});
	});
});
