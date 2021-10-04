import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '../data/types';

import { setSelectedDay, setActiveContentView } from '../features/mainSlice';
import { getEventMarkers } from '../selectors/events';

import Calendar from 'react-grid-calendar';
import Header from './header';
import Content from './content';
import SettingsPopup from './settings';
import 'react-grid-calendar/lib/styles/index.scss';
import '../styles/index.scss';

const Organizer: React.VFC = () => {
	const dispatch = useDispatch();
	const [settingsPopupIsActive, setSettingsPopupIsActive] = React.useState(false);
	
	const theme = useSelector(
		(state: TRootState): string => state.settings.theme
	);
	const firstDayIsMonday = useSelector(
		(state: TRootState): boolean => state.settings.firstDayIsMonday
	);
	const selectedDay = useSelector(
		(state: TRootState): number => state.main.selectedDay
	);
	const markers = useSelector(
		(state: TRootState): number[] => getEventMarkers(state)
	);
	
	const calendarMarkers = markers.map((marker: number): Date => new Date(marker));

	const handlerSelectDay = React.useCallback((day: Date): void => {
		if (!day) {
			dispatch(setSelectedDay(null));
			dispatch(setActiveContentView(null));
			
			return;
		}
		
		dispatch(setSelectedDay(day.getTime()));
		dispatch(setActiveContentView('list'));
	}, [selectedDay]);

	const handlerOpenSettings = React.useCallback(
		(): void => setSettingsPopupIsActive(true), [setSettingsPopupIsActive]
	);
	const handlerCloseSettings = React.useCallback(
		(): void => setSettingsPopupIsActive(false), [setSettingsPopupIsActive]
	);

	React.useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
	}, [theme]);
	
	return (
		<div className="org-wrapper">
			<Header
				settingsPopupIsActive={settingsPopupIsActive}
				onOpenSettings={handlerOpenSettings}
			/>
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
		
		{
			settingsPopupIsActive &&
			<SettingsPopup onClose={handlerCloseSettings} />
		}
		</div>
	);
};

export default React.memo(Organizer);
