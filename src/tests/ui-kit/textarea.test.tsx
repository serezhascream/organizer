import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Textarea from '../../components/ui-kit/textarea';
import { testIds } from '../../data/tests';

describe('components > ui-kit > Textarea', () => {
	it('renders', () => {
		render(
			<Textarea
				name="test-textarea"
				value=""
				onChange={() => {}}
			/>
		);

		expect(
			screen.getByTestId(testIds.textareaWrapper)
		).toBeInTheDocument();
	});
	
	it('has the provided class', () => {
		const extraClass = 'description-text';
		render(
			<Textarea
				name="test-textarea"
				value=""
				extraClass={extraClass}
				onChange={() => {}}
			/>
		);

		expect(
			screen.getByTestId(testIds.textareaWrapper)
		).toHaveClass(extraClass);
	});
	
	it('has the provided label', () => {
		const label = 'Event description';
		
		render(
			<Textarea
				name="test-textarea"
				label={label}
				value=""
				onChange={() => {}}
			/>
		);
		
		expect(screen.getByText(label)).toBeInTheDocument();
	});
	
	it('returns it`s value and name on typing', () => {
		const name = 'field-event-description';
		const text = 'Meetup';
		const handlerChange = jest.fn((value, name) => ([value, name]));
		
		render(
			<Textarea
				name={name}
				value=""
				onChange={handlerChange}
			/>
		);
		
		const textarea = screen.getByTestId(testIds.textarea);
		userEvent.type(textarea, text);

		expect(
			handlerChange.mock.results.pop().value
		).toEqual([text, name]);
	});
});
