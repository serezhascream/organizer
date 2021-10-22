import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Button from '../../../components/ui-kit/button';
import { testIds } from '../../../data/tests';

describe('components > ui-kit > Button', () => {
	it('renders', () => {
		render(
			<Button
				name="testButton"
				extraClass=""
				onClick={() => {}}
			>test button</Button>
		);

		expect(
			screen.getByTestId(testIds.button)
		).toBeInTheDocument();
	});
	
	it('has the provided text', () => {
		const buttonText = 'Save changes';
		
		render(
			<Button
				name="testButton"
				extraClass=""
				onClick={() => {}}
			>{ buttonText }</Button>
		);
		
		expect(screen.getByText(buttonText)).toBeInTheDocument();
	});
	
	it('is disabled', () => {
		render(
			<Button
				name="testButton"
				disabled
				onClick={() => {}}
			>
				test button
			</Button>
		);

		expect(screen.getByTestId(testIds.button).hasAttribute('disabled')).toEqual(true);
	});
	
	it('has an extra class', () => {
		const extraClass = 'save-button';
		
		render(
			<Button
				name="testButton"
				extraClass={extraClass}
				onClick={() => {}}
			>test button</Button>
		);

		expect(screen.getByTestId(testIds.button)).toHaveClass(extraClass);
	});
	
	it('returns it`s name on click', () => {
		const buttonName = 'saveButton';
		const handlerClick = jest.fn(name => name);
		
		render(
			<Button
				name={buttonName}
				extraClass=""
				onClick={handlerClick}
			>test button</Button>
		);

		userEvent.click(screen.getByTestId(testIds.button));

		expect(handlerClick).toHaveBeenCalledWith(buttonName);
	});
});
