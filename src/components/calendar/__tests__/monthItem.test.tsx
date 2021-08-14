import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import MonthItem from '../monthItem';
import { testIds } from '../../../data/tests';

describe('components > calendar > MonthItem', () => {
	it('renders', () => {
		render(<MonthItem title="March" index={2} onClick={() => {}} />);

		expect(screen.getByTestId(testIds.monthItem)).toBeInTheDocument();
	});
	
	it('returns correct value on click', () => {
		const handlerClick = jest.fn(index => index);
		render(<MonthItem title="March" index={2} onClick={handlerClick} />);

		userEvent.click(screen.getByTestId(testIds.monthItem));

		expect(handlerClick.mock.results[0].value).toEqual(2);
	});
});
