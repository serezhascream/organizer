import * as React from 'react';
import { useSelector } from 'react-redux';

import { getEvents } from '../../selectors/events';
import Event from './event';
import { TEventObj, TRootState } from '../../data/types';

const EventsList = () => {
	const selectedDay = useSelector((state: TRootState) => state.main.selectedDay);
	const events = useSelector((state: TRootState) => getEvents(state, selectedDay.timestamp));
	
	if (! events.length) {
		return (
			<div className="org-list__placeholder">No events yet.</div>
		);
	}
	
	return (
		<React.Fragment>
			{
				events.map((event: TEventObj) => (
					<Event key={event.day + event.title} event={event} />
				))
			}
		</React.Fragment>
	);
};

export default React.memo(EventsList);
