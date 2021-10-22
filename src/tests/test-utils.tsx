import * as React from 'react';
import { render as rtlRender, RenderResult } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import settingsReducer from '../features/settingsSlice';
import eventsReducer from '../features/eventsSlice'

interface WrapperProps {
	children: React.ReactNode,
}

const render = (
	ui: React.ReactElement,
	{
		preloadedState = {},
		store = configureStore({
			reducer: {
				settings: settingsReducer,
				events: eventsReducer,
			},
			preloadedState
		}),
		...renderOptions
	} = {}
): RenderResult => {
	const Wrapper: React.VFC<WrapperProps> = ({ children }: WrapperProps) => (
		<Provider store={store}>{ children }</Provider>
	);

	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from '@testing-library/react';

export { render }
