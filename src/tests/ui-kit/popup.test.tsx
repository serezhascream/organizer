import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Popup from '../../components/ui-kit/popup';
import { testIds } from '../../data/tests';
import { portalId } from '../../data/constants';


describe('components > ui-kit > Popup', () => {
	const portalContainer = document.createElement('div');
	
	portalContainer.id = portalId;
	document.body.appendChild(portalContainer);
	
	it('renders', () => {
		
		render (
			<Popup title={'hello'} onClose={() => {}}>{ null }</Popup>
		);

		expect(
			screen.getByTestId(testIds.popupWrapper)
		).toBeInTheDocument();
	});
	
	it('has a provided title', () => {
		const popupTitle = 'Edit event';
		
		render (
			<Popup title={popupTitle} onClose={() => {}}>{ null }</Popup>
		);

		expect(
			screen.getByText(popupTitle)
		).toBeInTheDocument();
	});
	
	it('has a provided children', () => {
		const testComponentId = 'popup-body';
		const testComponent = (<div data-testid={testComponentId} />);
		
		render (
			<Popup title={'hello'} onClose={() => {}}>{ testComponent }</Popup>
		);

		expect(
			screen.getByTestId(testComponentId)
		).toBeInTheDocument();
	});
	it('overlay click works', () => {
		const handlerClose = jest.fn();
		
		render (
			<Popup title={'hello'} onClose={handlerClose}>{ null }</Popup>
		);
		
		userEvent.click(screen.getByTestId(testIds.popupOverlay));

		expect(handlerClose).toHaveBeenCalled();
	});
	it('close button click works', () => {
		const handlerClose = jest.fn();
		
		render (
			<Popup title={'hello'} onClose={handlerClose}>{ null }</Popup>
		);
		
		userEvent.click(screen.getByTestId(testIds.popupCloseButton));

		expect(handlerClose).toHaveBeenCalled();
	});
});
