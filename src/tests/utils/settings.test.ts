import localStorageMock from '../mock/localStorage';
import localStorageFixture from '../fixture/localStorage';

import * as u from '../../utils/settings';

describe('utils > settings', () => {
	const localStorage = JSON.stringify(localStorageFixture);
	
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});
	});
	
	it('getSettings returns the correct object', () => {
		const settings = u.getSettings();
		
		expect(settings.theme).toEqual('dark');
	});
	
	it('setSettings saves settings', () => {
		const settings = u.getSettings();
		
		u.saveSettings({ ...settings, theme: 'light' });
		
		const savedSettings = u.getSettings();
		
		expect(savedSettings.theme).toEqual('light');
	});
	
	it('removeSettings removes settings', () => {
		u.removeSettings();
		
		const settings = u.getSettings();
		
		expect(settings).toEqual({});
	});
});
