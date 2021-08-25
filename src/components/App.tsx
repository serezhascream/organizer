import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TDayObject, TRootState } from '../data/types';

import { setSelectedDay, setActiveContentView } from '../features/mainSlice';
import { getEventMarkers } from '../selectors/events';

import Calendar from 'react-grid-calendar';
import Content from './content';
import Button from './ui-kit/button';
import '../styles/index.scss';

const Organizer = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state: TRootState) => state.settings.theme);
	const firstDayIsMonday = useSelector((state: TRootState) => state.settings.firstDayIsMonday);
	const selectedDay = useSelector((state: TRootState) => state.main.selectedDay);
	const activeContentView = useSelector((state: TRootState) => state.main.activeContentView);
	const markers = useSelector((state: TRootState) => getEventMarkers(state));

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
						markers={markers}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content />
			</section>
		</div>
	);
};

export default React.memo(Organizer);
