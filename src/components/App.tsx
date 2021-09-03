import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '../data/types';

import { setSelectedDay, setActiveContentView } from '../features/mainSlice';
import { getEventMarkers } from '../selectors/events';

import Calendar from 'react-grid-calendar';
import Content from './content';
import Button from './ui-kit/button';
import 'react-grid-calendar/lib/styles/index.scss';
import '../styles/index.scss';

const Organizer = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state: TRootState) => state.settings.theme);
	const firstDayIsMonday = useSelector((state: TRootState) => state.settings.firstDayIsMonday);
	const selectedDay = useSelector((state: TRootState) => state.main.selectedDay);
	const activeContentView = useSelector((state: TRootState) => state.main.activeContentView);
	const markers = useSelector((state: TRootState) => getEventMarkers(state));
	const calendarMarkers = markers.map(marker => new Date(marker));

	const handlerSelectDay = React.useCallback((day: Date) => {
		if (!day) {
			dispatch(setSelectedDay(null));
			dispatch(setActiveContentView(null));
			
			return;
		}
		
		dispatch(setSelectedDay(day.getTime()));
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
						markers={calendarMarkers}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content />
			</section>
		</div>
	);
};

export default React.memo(Organizer);
