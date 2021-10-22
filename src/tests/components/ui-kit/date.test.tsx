import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import DateInput from '../../../components/ui-kit/date';
import { testIds } from '../../../data/tests';


describe('components > ui-kit > DateInput', () => {
	const timestamp = 1633813200000;
	
	it('renders', () => {
		render(<DateInput timestamp={timestamp} onChange={() => {}} />);
		
		expect(screen.getByTestId(testIds.dateInput)).toBeInTheDocument();
	});
	
	it('has the correct value provided with timestamp', () => {
		render(<DateInput timestamp={timestamp} onChange={() => {}} />);
		
		expect(screen.getByTestId(testIds.dateInput)).toHaveValue('2021-10-10');
	});
	
	it('has the provided className', () => {
		const testClassName = 'test-date-input';
		
		render(
			<DateInput
				timestamp={timestamp}
				onChange={() => {}}
				className={testClassName}
			/>
		);
		
		expect(screen.getByTestId(testIds.dateWrapper)).toHaveClass(testClassName);
	});
	
	it('returns expected value on change', () => {
		const testDateValue = '2021-03-06';
		const handlerChange = jest.fn(value => value);
		render(<DateInput timestamp={timestamp} onChange={handlerChange} />);
		
		fireEvent.change(
			screen.getByTestId(testIds.dateInput),
			{
				target: { value: testDateValue }
			}
		);
		
		expect(handlerChange).toHaveBeenCalledWith(1614978000000, 'date');
	});
});
