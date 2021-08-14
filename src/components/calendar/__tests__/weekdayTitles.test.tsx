import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { testIds } from '../../../data/tests';
import WeekdayTitles from '../weekdayTitles';

describe('components > calendar > weekdayTitles', () => {
	it('renders', () => {
		render(<WeekdayTitles firstDayIsMonday />);

		const titles = screen.getByTestId(testIds.weekdayTitles);

		expect(titles).toBeInTheDocument();
	});
	
	it('renders correctly when week starts on monday', () => {
		render(<WeekdayTitles firstDayIsMonday />);

		const titles = screen.getByTestId(testIds.weekdayTitles);

		expect(titles.children[0].textContent).toEqual('mon');
	});
	
	it('renders correctly when week starts on sunday', () => {
		render(<WeekdayTitles firstDayIsMonday={false} />);

		const titles = screen.getByTestId(testIds.weekdayTitles);

		expect(titles.children[0].textContent).toEqual('sun');
	});
});
