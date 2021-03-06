import * as React from 'react';

import { render, screen, fireEvent } from '../test-utils';
import userEvent from '@testing-library/user-event'
import localStorageFixture from '../fixture/localStorage';
import localStorageMock from '../mock/localStorage';
import { getDateInputValue } from '../../utils';

import {
	testIds,
	eventPopupTestIds as eTestIds,
	deleteAlertTestIds as dTestIds,
} from '../../data/tests';
import { portalId } from '../../data/constants';
import Organizer from '../../components';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const newEventToCreate = {
	title: 'Birthday party',
	description: 'Go get some fun!',
	date: getDateInputValue(tomorrow.getTime()),
	time: '18:20',
};

describe('components > EventPopup', () => {
	beforeAll(() => {
		const localStorage = JSON.stringify(localStorageFixture);
		const portalContainer = document.createElement('div');
		
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});
		
		portalContainer.id = portalId;
		document.body.appendChild(portalContainer);
	});
	
	beforeEach(() => {
		render(<Organizer />);
		
		userEvent.click(screen.getByTestId(testIds.addEventButton));
	});

	const fillFields = () => {
		fireEvent.change(
			screen.getByTestId(eTestIds.editTitle),
			{ target: { value: newEventToCreate.title }}
		);

		fireEvent.change(
			screen.getByTestId(eTestIds.editDescription),
			{ target: { value: newEventToCreate.description } }
		);

		fireEvent.change(
			screen.getByTestId(eTestIds.editDateInput),
			{ target: { value: newEventToCreate.date } }
		);
	};
	
	it('click on add event button opens the event popup', () => {
		expect(screen.getByTestId(eTestIds.wrapper)).toBeInTheDocument();
	});

	it('click on overlay closes the event popup', () => {
		userEvent.click(screen.getByTestId(eTestIds.overlay));
		
		expect(screen.queryByTestId(eTestIds.wrapper)).not.toBeInTheDocument();
	});

	it('click on cancel button closes the event popup', () => {
		userEvent.click(screen.getByTestId(eTestIds.editButtonCancel));
		
		expect(screen.queryByTestId(eTestIds.wrapper)).not.toBeInTheDocument();
	});

	it('click on popup close button closes the event popup', () => {
		userEvent.click(screen.getByTestId(eTestIds.closeButton));
		
		expect(screen.queryByTestId(eTestIds.wrapper)).not.toBeInTheDocument();
	});

	it('save button is disabled by default', () => {
		expect(screen.getByTestId(eTestIds.editButtonSave)).toBeDisabled();
	})

	it('save button enables after filling a title input', () => {
		fireEvent.change(
			screen.getByTestId(eTestIds.editTitle),
			{ target: { value: newEventToCreate.title }}
		);
		
		expect(screen.getByTestId(eTestIds.editButtonSave)).not.toBeDisabled();
	});
	
	it('creates an event and shows it in the popup', () => {
		fillFields();
		
		userEvent.click(screen.getByTestId(eTestIds.editButtonSave));

		expect(screen.queryByTestId(eTestIds.editTitle)).not.toBeInTheDocument();
		expect(screen.getByTestId(eTestIds.showTitle)).toBeInTheDocument();
		expect(
			screen.getByTestId(eTestIds.showTitle).textContent
		).toEqual(newEventToCreate.title);
		expect(
			screen.getByTestId(eTestIds.showDescription).textContent
		).toEqual(newEventToCreate.description);
	});
	
	it('created event appears in the event list', () => {
		fillFields();

		expect(screen.getByTestId(eTestIds.editTimeInput)).toBeDisabled();
		
		userEvent.click(screen.getByTestId(eTestIds.editButtonSave));
		userEvent.click(screen.getByTestId(eTestIds.overlay));

		expect(screen.getByText(newEventToCreate.title)).toBeInTheDocument();
		expect(screen.getByTestId(testIds.eventListContentWrapper).children.length).toEqual(1);
	});

	it('creates a new event with time', () => {
		fillFields();
		const timeInput = screen.getByTestId(eTestIds.editTimeInput);
		
		userEvent.click(screen.getByTestId(eTestIds.editTimeSwitcher));

		expect(timeInput).not.toBeDisabled();
		
		fireEvent.change(timeInput, { target: { value: newEventToCreate.time }})

		userEvent.click(screen.getByTestId(eTestIds.editButtonSave));

		expect(
			screen.getByTestId(eTestIds.showDateTime)
		).toHaveTextContent(newEventToCreate.time);
	});
	
	it('deletes the created event', () => {
		fillFields();
		
		userEvent.click(screen.getByTestId(eTestIds.editButtonSave));
		expect(screen.getByTestId(testIds.eventListContentWrapper).children.length).toEqual(1);

		userEvent.click(screen.getByTestId(eTestIds.showButtonDelete))
		expect(screen.getByTestId(dTestIds.wrapper)).toBeInTheDocument();

		userEvent.click(screen.getByTestId(dTestIds.buttonConfirm));
		expect(screen.queryByTestId(eTestIds.wrapper)).not.toBeInTheDocument();
		expect(screen.queryByTestId(dTestIds.wrapper)).not.toBeInTheDocument();
		
		expect(screen.queryByText(newEventToCreate.title)).not.toBeInTheDocument();
	});
});
