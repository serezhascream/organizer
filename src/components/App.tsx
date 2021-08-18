import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TDayObject } from '../data/types';

import { setSelectedDay, setActiveContentView } from '../features/mainSlice';

import Calendar from './calendar';
import Content from './content';
import Button from './ui-kit/button';
import '../styles/index.scss';

const Organizer = () => {
	const dispatch = useDispatch();
	const theme = useSelector(state => state.settings.theme);
	const firstDayIsMonday = useSelector(state => state.settings.firstDayIsMonday);
	const selectedDay = useSelector(state => state.main.selectedDay);
	const activeContentView = useSelector(state => state.main.activeContentView);

	const handlerSelectDay = React.useCallback((day: TDayObject) => {
		if(selectedDay && selectedDay.timestamp === day.timestamp) {
			dispatch(setSelectedDay(null));
			dispatch(setActiveContentView(null));
			return;
		}
		
		dispatch(setSelectedDay(day));
		dispatch(setActiveContentView('list'));
	}, [selectedDay]);

	const handlerOpenSettings = React.useCallback(() => {
		const newView = activeContentView === 'settings' ? null : 'settings';

		dispatch(setSelectedDay(null));
		dispatch(setActiveContentView(newView));
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
						selected={selectedDay}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content />
			</section>
		</div>
	);
};

export default React.memo(Organizer);
