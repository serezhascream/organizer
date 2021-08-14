import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Calendar from '../index';
import { testIds } from '../../../data/tests';

describe('components > calendar > Calendar', () => {
	it('renders', () => {
		render(
			<Calendar
				firstDayIsMonday
				selected={null}
				onSelectDay={() => {}}
			/>
		);

		expect(
			screen.getByTestId(testIds.calendar)
		).toBeInTheDocument();
	});
	it.todo('contains selected day');
	it.todo('returns selected day');
});
