import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Input from '../input';
import { testIds } from '../../../data/tests';

describe('components > ui-kit > Input', () => {
	it('renders', () => {
		render(
			<Input
				name='test-input'
				value="hello"
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByTestId(testIds.input)).toBeInTheDocument();
	});
	
	it('has an extra class', () => {
		const extraClass = 'input-title';
		render(
			<Input
				name='test-input'
				value="hello"
				extraClass={extraClass}
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByTestId(testIds.inputWrapper)).toHaveClass(extraClass);
	});
	
	it('has the provided label', () => {
		const label = 'Event name';
		render(
			<Input
				name='test-input'
				label={label}
				value="hello"
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByText(label)).toBeInTheDocument();
	});
	it('has the provided type', () => {
		render(
			<Input
				name='test-input'
				value="hello"
				inputType="number"
				onChange={() => {}}
			/>
		);
		
		expect(
			screen.getByTestId(testIds.input).getAttribute('type')
		).toEqual('number');
	});
	
	it('returns it`s value and name on typing', () => {
		const text = 'Vacation';
		const name = 'event-title'
		const handlerChangeInput = jest.fn((value, name) => ([value, name]));
		
		render(
			<Input
				name={name}
				value=""
				onChange={handlerChangeInput}
			/>
		);
		const input = screen.getByTestId(testIds.input);
		
		userEvent.type(input, text);
		
		expect(handlerChangeInput.mock.results.pop().value).toEqual([text, name]);
	});
});
