import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactFlexCalendar from './components/App';

const root = document.getElementById('app-root');

ReactDOM.render(
	<React.StrictMode>
		<ReactFlexCalendar />
	</React.StrictMode>,
	root,
);
