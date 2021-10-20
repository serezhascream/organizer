import * as React from 'react';

import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event'
import localStorageFixture from '../fixture/localStorage';
import localStorageMock from '../mock/localStorage';

import { testIds } from '../../data/tests';
import { portalId } from '../../data/constants';
import Organizer from '../../components';

describe('components > Settings ', () => {
	const location = window.location;
	
	beforeAll(() => {
		const localStorage = JSON.stringify(localStorageFixture);
		const portalContainer = document.createElement('div');
		
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});

		delete window.location;
		window.location = {
			...location,
			reload: jest.fn(),
		};
		
		portalContainer.id = portalId;
		document.body.appendChild(portalContainer);
	});

	afterAll(() => {
		window.location = location;
	});
	
	beforeEach(() => {
		render(<Organizer />);
		
		userEvent.click(screen.getByTestId(testIds.openSettingsButton));
	});
	
	it('settings popup opens on click', () => {
		expect(screen.getByTestId(testIds.mainWrapper)).toBeInTheDocument();
		expect(screen.getByTestId(testIds.settingsPopupWrapper)).toBeInTheDocument();
	});

	it('theme switcher switches the theme', () => {
		userEvent.click(screen.getByTestId(testIds.settingsThemeSwitcher));

		expect(document.querySelector('html').getAttribute('data-theme')).toEqual('light');
	});

	it('day switcher switches the first day of week', () => {
		userEvent.click(screen.getByTestId(testIds.settingsFirstDaySwitcher));

		const list = screen.getByText('Sun').parentNode;
		expect(list.children[0].textContent).toEqual('Sun');
	});
	
	it('click on button removes settings', () => {
		userEvent.click(screen.getByTestId(testIds.settingsRemoveSettingsButton))

		expect(window.localStorage.getItem('orgCalendarSettings')).toBeFalsy();
		expect(window.location.reload).toHaveBeenCalled();
	});
	
	it('click on button removes events', () => {
		userEvent.click(screen.getByTestId(testIds.settingsRemoveEventsButton))
		
		expect(window.localStorage.getItem('orgCalendarEvents')).toBeFalsy();
		expect(window.location.reload).toHaveBeenCalled();
	});
});
