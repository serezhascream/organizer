import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import { feb2021 } from '../../../data/fixture';
import { testIds } from '../../../data/tests';
import Controls from '../controls';

const {
	controls,
	controlsPrevBtn,
	controlsNextBtn,
	controlsYearTitle,
	controlsMonthTitle
} = testIds;

describe('components > calendar > controls', () => {
	it('renders correctly', () => {
		render(
			<Controls
				active={feb2021}
				activeView="month"
				onSwitchDirection={() => {}}
				onSwitchView={() => {}}
			/>
		);

		expect(screen.getByTestId(controls)).toBeInTheDocument();
		expect(screen.getByTestId(controlsPrevBtn)).toBeInTheDocument();
		expect(screen.getByTestId(controlsNextBtn)).toBeInTheDocument();
		expect(screen.getByTestId(controlsMonthTitle)).toBeInTheDocument();
		expect(screen.getByTestId(controlsYearTitle)).toBeInTheDocument();
	});
	
	it('has blocked arrows when active view is year', () => {
		render(
			<Controls
				active={feb2021}
				activeView="year"
				onSwitchDirection={() => {}}
				onSwitchView={() => {}}
			/>
		);
		
		expect(
			screen.getByTestId(controlsPrevBtn)
		).toHaveClass('org-calendar__btn--blocked');
		
		expect(
			screen.getByTestId(controlsNextBtn)
		).toHaveClass('org-calendar__btn--blocked');
	});
	
	it('click on month title works', () => {
		const handlerSwitchView = jest.fn(view => view);
		
		render(
			<Controls
				active={feb2021}
				activeView="month"
				onSwitchDirection={() => {}}
				onSwitchView={handlerSwitchView}
			/>
		);
		
		userEvent.click(screen.getByTestId(controlsMonthTitle));
		
		expect(handlerSwitchView.mock.results[0].value).toEqual('year');
	});
	it('click on year title works', () => {
		const handlerSwitchView = jest.fn(view => view);
		
		render(
			<Controls
				active={feb2021}
				activeView="month"
				onSwitchDirection={() => {}}
				onSwitchView={handlerSwitchView}
			/>
		);
		
		userEvent.click(screen.getByTestId(controlsYearTitle));
		
		expect(handlerSwitchView.mock.results[0].value).toEqual('decade');
	});
	it('click on arrows works', () => {
		const handlerSwitchDirection = jest.fn(direction => direction);
	
		render(
			<Controls
				active={feb2021}
				activeView="month"
				onSwitchDirection={handlerSwitchDirection}
				onSwitchView={() => {}}
			/>
		);
		
		userEvent.click(screen.getByTestId(controlsPrevBtn));
		expect(handlerSwitchDirection.mock.results[0].value).toEqual('prev');

		handlerSwitchDirection.mockClear();
		
		userEvent.click(screen.getByTestId(controlsNextBtn));
		expect(handlerSwitchDirection.mock.results[0].value).toEqual('next');
	});
});
