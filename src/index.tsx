import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactFlexCalendar from './components/';
import { Provider } from 'react-redux';

import store from './store';

const root = document.getElementById('app-root');

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<ReactFlexCalendar />
		</React.StrictMode>
	</Provider>,
	root,
);
