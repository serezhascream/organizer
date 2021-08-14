import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Day from '../day';
import { firstOfMay2021 } from '../../../data/fixture';
import { testIds } from '../../../data/tests';

describe('components > calendar > Day', () => {
	it('renders', () => {
		render(<Day day={firstOfMay2021} onClick={() => {}} />);
		const day = screen.getByTestId(testIds.day);

		expect(day).toBeInTheDocument();
	});

	it('returns day object on click', () => {
		const mockCallback = jest.fn((day) => day);
		render(<Day day={firstOfMay2021} onClick={mockCallback} />);

		userEvent.click(screen.getByTestId(testIds.day));

		expect(mockCallback.mock.results[0].value).toEqual(firstOfMay2021);
	})
});
