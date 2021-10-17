import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import TimeInput from '../../components/ui-kit/time';
import { testIds } from '../../data/tests';


describe('components > ui-kit > TimeInput', () => {
	const timestamp = 1615048200000;
	const timeStringValue = '19:30'
	
	it('renders', () => {
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={false}
				setTimeIsEnabled={() => {}}
				onChange={() => {}}
			/>
		);
	
		expect(screen.getByTestId(testIds.timeWrapper)).toBeInTheDocument();
	});
	
	it('disabled input when provided prop', () => {
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={false}
				setTimeIsEnabled={() => {}}
				onChange={() => {}}
			/>
		);
	
		expect(screen.getByTestId(testIds.timeInput)).toHaveAttribute('disabled');
	});
	
	it('has the correct value provided with timestamp', () => {
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={false}
				setTimeIsEnabled={() => {}}
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByTestId(testIds.timeInput)).toHaveValue(timeStringValue);
	});
	
	it('has the provided className', () => {
		const wrapperClassName = 'test-time-input';
		
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={false}
				className={wrapperClassName}
				setTimeIsEnabled={() => {}}
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByTestId(testIds.timeWrapper)).toHaveClass(wrapperClassName);
	});
	
	it('calls callback when clicked on switcher', () => {
		const handlerClickOnSwitch = jest.fn(value => value);
		
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={false}
				setTimeIsEnabled={handlerClickOnSwitch}
				onChange={() => {}}
			/>
		);
	
		userEvent.click(screen.getByTestId(testIds.timeInputSwitcher));
		
		expect(handlerClickOnSwitch).toHaveBeenCalledWith(true, 'timeSwitcher');
	});
	it('returns expected value on change', () => {
		const testTimeValue = '22:35';
		const handlerChange = jest.fn(value => value);
		
		render(
			<TimeInput
				timestamp={timestamp}
				timeIsEnabled={true}
				setTimeIsEnabled={() => {}}
				onChange={handlerChange}
			/>
		);
		
		fireEvent.change(
			screen.getByTestId(testIds.timeInput),
			{
				target: { value: testTimeValue }
			}
		);
		
		expect(handlerChange).toHaveBeenCalledWith(1615059300000);
	});
});
