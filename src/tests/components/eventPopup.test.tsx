import * as React from 'react';

import { render, screen, fireEvent } from '../test-utils';
import userEvent from '@testing-library/user-event'
import localStorageFixture from '../fixture/localStorage';
import localStorageMock from '../mock/localStorage';
import { getDateInputValue } from '../../utils';

import { testIds } from '../../data/tests';
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
			screen.getByTestId(testIds.eventPopupEditTitle),
			{ target: { value: newEventToCreate.title }}
		);

		fireEvent.change(
			screen.getByTestId(testIds.eventPopupEditDescription),
			{ target: { value: newEventToCreate.description } }
		);

		fireEvent.change(
			screen.getByTestId(testIds.eventPopupEditDateInput),
			{ target: { value: newEventToCreate.date } }
		);
	};
	
	it('click on add event button opens the event popup', () => {
		expect(screen.getByTestId(testIds.eventPopupWrapper)).toBeInTheDocument();
	});

	it('click on overlay closes the event popup', () => {
		userEvent.click(screen.getByTestId(testIds.eventPopupOverlay));
		
		expect(screen.queryByTestId(testIds.eventPopupWrapper)).not.toBeInTheDocument();
	});

	it('click on cancel button closes the event popup', () => {
		userEvent.click(screen.getByTestId(testIds.eventPopupEditButtonCancel));
		
		expect(screen.queryByTestId(testIds.eventPopupWrapper)).not.toBeInTheDocument();
	});

	it('click on popup close button closes the event popup', () => {
		userEvent.click(screen.getByTestId(testIds.eventPopupCloseButton));
		
		expect(screen.queryByTestId(testIds.eventPopupWrapper)).not.toBeInTheDocument();
	});

	it('save button is disabled by default', () => {
		expect(screen.getByTestId(testIds.eventPopupEditButtonSave)).toBeDisabled();
	})

	it('save button enables after filling a title input', () => {
		fireEvent.change(
			screen.getByTestId(testIds.eventPopupEditTitle),
			{ target: { value: newEventToCreate.title }}
		);
		
		expect(screen.getByTestId(testIds.eventPopupEditButtonSave)).not.toBeDisabled();
	});
	
	it('creates an event and shows it in the popup', () => {
		fillFields();
		
		userEvent.click(screen.getByTestId(testIds.eventPopupEditButtonSave));

		expect(screen.queryByTestId(testIds.eventPopupEditTitle)).not.toBeInTheDocument();
		expect(screen.getByTestId(testIds.eventPopupShowTitle)).toBeInTheDocument();
		expect(
			screen.getByTestId(testIds.eventPopupShowTitle).textContent
		).toEqual(newEventToCreate.title);
		expect(
			screen.getByTestId(testIds.eventPopupShowDescription).textContent
		).toEqual(newEventToCreate.description);
	});
	
	it('created event appears in the event list', () => {
		fillFields();

		expect(screen.getByTestId(testIds.eventPopupEditTimeInput)).toBeDisabled();
		
		userEvent.click(screen.getByTestId(testIds.eventPopupEditButtonSave));
		userEvent.click(screen.getByTestId(testIds.eventPopupOverlay));

		expect(screen.getByText(newEventToCreate.title)).toBeInTheDocument();
		expect(screen.getByTestId(testIds.eventListContentWrapper).children.length).toEqual(1);
	});

	it('creates a new event with time', () => {
		fillFields();
		const timeInput = screen.getByTestId(testIds.eventPopupEditTimeInput);
		
		userEvent.click(screen.getByTestId(testIds.eventPopupEditTimeSwitcher));

		expect(timeInput).not.toBeDisabled();
		
		fireEvent.change(timeInput, { target: { value: newEventToCreate.time }})

		userEvent.click(screen.getByTestId(testIds.eventPopupEditButtonSave));

		expect(
			screen.getByTestId(testIds.eventPopupShowDateTime)
		).toHaveTextContent(newEventToCreate.time);
	});
	
	it('deletes the created event', () => {
		fillFields();
		
		userEvent.click(screen.getByTestId(testIds.eventPopupEditButtonSave));
		expect(screen.getByTestId(testIds.eventListContentWrapper).children.length).toEqual(1);

		userEvent.click(screen.getByTestId(testIds.eventPopupShowButtonDelete))
		expect(screen.getByTestId(testIds.deleteAlertWrapper)).toBeInTheDocument();

		userEvent.click(screen.getByTestId(testIds.deleteAlertButtonConfirm));
		expect(screen.queryByTestId(testIds.eventPopupWrapper)).not.toBeInTheDocument();
		expect(screen.queryByTestId(testIds.deleteAlertWrapper)).not.toBeInTheDocument();
		
		expect(screen.queryByText(newEventToCreate.title)).not.toBeInTheDocument();
	});
});
