import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Icon from '../icon';
import { testIds } from '../../../data/tests';

describe('components > ui-kit > Icon', () => {
	it('renders', () => {
		render(<Icon name="settings" />);

		expect(
			screen.getByTestId(testIds.icon)
		).toBeInTheDocument();
	});
	
	it('has the provided name', () => {
		const iconName = 'delete'
		
		render(<Icon name={iconName} />)
		const use = screen.getByTestId(testIds.iconUse);
		
		expect(use.getAttribute('xlink:href')).toEqual(`#${iconName}`);
	});
	
	it('has the provided className', () => {
		const iconClassName = 'settings-icon';

		render(<Icon name="settings" className={iconClassName} />);

		expect(screen.getByTestId(testIds.icon)).toHaveClass(iconClassName);
	});
	
	it('click works correctly', () => {
		const handlerClick = jest.fn();
		
		render(<Icon name="settings" onClick={handlerClick} />);

		userEvent.click(screen.getByTestId(testIds.icon));

		expect(handlerClick).toHaveBeenCalled();
	});
});
