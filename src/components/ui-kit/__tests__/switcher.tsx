import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Switcher from '../switcher';
import { testIds } from '../../../data/tests';

describe('components > ui-kit > Switcher', () => {
	it('renders', () => {
		render(
			<Switcher
				name="testSwitcher"
				label="Test switcher"
				checked={false}
				onChange={() => {}}
			/>
		);

		expect(screen.getByTestId(testIds.switcher)).toBeInTheDocument();
	});
	
	it('has label', () => {
		const label = 'Use dark theme';

		render(
			<Switcher
				name="testSwitcher"
				label={label}
				checked={false}
				onChange={() => {}}
			/>
		);

		expect(screen.getByText(label)).toBeInTheDocument();
	});
	
	it('returns name and value on click', () => {
		const handlerChange = jest.fn((value, name) => ([value, name]));
		
		render(
			<Switcher
				name="testSwitcher"
				label="testSwitcher"
				checked={false}
				onChange={handlerChange}
			/>
		);

		userEvent.click(screen.getByTestId(testIds.switcher));
		
		expect(
			handlerChange.mock.results[0].value
		).toEqual([true, "testSwitcher"]);
	});
	
	it('has checked class', () => {
		render(
			<Switcher
				name="testSwitcher"
				label="testSwitcher"
				checked={true}
				onChange={() => {}}
			/>
		);
		
		expect(
			screen.getByTestId(testIds.switcherCheckbox)
		).toHaveClass('org-switcher__checkbox--checked');
	});
});
