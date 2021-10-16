import * as React from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../data/types';
import { getEventMarkers } from '../selectors/events';

import Calendar from 'react-grid-calendar';

interface Props {
	onSelectDay(day: number | null): void
}

const OrganizerCalendar: React.VFC<Props> = (props: Props) => {
	const { onSelectDay } = props;
	
	const firstDayIsMonday = useSelector(
		(state: TRootState): boolean => state.settings.firstDayIsMonday
	);
	const markers = useSelector(
		(state: TRootState): number[] => getEventMarkers(state)
	);
	const handlerSelectDay = React.useCallback(
		(day: Date): void => onSelectDay(day ? day.getTime() : null),
		[onSelectDay]
	);
	
	const calendarMarkers = markers.map((marker: number): Date => new Date(marker));
	
	return (
		<section className="org-container__calendar">
			<Calendar
				firstDayIsMonday={firstDayIsMonday}
				markers={calendarMarkers}
				onSelectDay={handlerSelectDay}
			/>
		</section>
	);
};

export default OrganizerCalendar;
