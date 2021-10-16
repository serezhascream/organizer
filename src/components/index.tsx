import * as React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../data/types';

import { getEventMarkers } from '../selectors/events';

import Calendar from 'react-grid-calendar';
import Header from './header';
import Content from './content';
import SettingsPopup from './settings';
import 'react-grid-calendar/lib/styles/index.scss';
import '../styles/index.scss';

const Organizer: React.VFC = () => {
	const [settingsPopupIsActive, setSettingsPopupIsActive] = React.useState(false);
	const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
	
	const theme = useSelector(
		(state: TRootState): string => state.settings.theme
	);
	const firstDayIsMonday = useSelector(
		(state: TRootState): boolean => state.settings.firstDayIsMonday
	);
	const markers = useSelector(
		(state: TRootState): number[] => getEventMarkers(state)
	);
	
	const calendarMarkers = markers.map((marker: number): Date => new Date(marker));

	const handlerSelectDay = React.useCallback(
		(day: Date): void => setSelectedDay(day ? day.getTime : null),
		[selectedDay]
	);

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
		<>
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
					<Content selectedDay={selectedDay} />
				</section>
				
				{
					settingsPopupIsActive &&
					<SettingsPopup onClose={handlerCloseSettings} />
				}
			</div>
		</>
	);
};

export default React.memo(Organizer);
