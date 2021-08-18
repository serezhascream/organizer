import * as React from 'react';
import { useSelector } from 'react-redux';
import { TDayObject } from '../data/types';

import Calendar from './calendar';
import Content from './content';
import Button from './ui-kit/button';
import '../styles/index.scss';

const Organizer = () => {
	const theme = useSelector(state => state.settings.theme);
	const firstDayIsMonday = useSelector(state => state.settings.firstDayIsMonday);
	
	const [selected, setSelected] = React.useState(null);
	const [activeContentView, setActiveContentView] = React.useState(null);

	const handlerSelectDay = React.useCallback((day: TDayObject) => {
		if(selected && selected.timestamp === day.timestamp) {
			setSelected(null);
			setActiveContentView(null);
			return;
		}
		
		setSelected(day);
		setActiveContentView('list');
	}, [selected]);

	const handlerOpenSettings = React.useCallback(() => {
		const newView = activeContentView === 'settings' ? null : 'settings';

		setSelected(null);
		setActiveContentView(newView)
	}, [activeContentView, setActiveContentView]);

	React.useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
	}, [theme]);
	
	return (
		<div className="org-wrapper">
			<section className="org-header">
				<h1 className="org-header__title">Organizer</h1>
				<Button
					name="settings"
					onClick={handlerOpenSettings}
				>S</Button>
			</section>
			<div className="org-divider" />
			<section className="org-container">
				<div className="org-container__calendar">
					<Calendar
						firstDayIsMonday={firstDayIsMonday}
						selected={selected}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content
					activeView={activeContentView}
					selected={selected}
				/>
			</section>
		</div>
	);
};

export default React.memo(Organizer);
