import * as React from 'react';

import Event from './event';
import { TEventsListProps, TEventObj } from '../../data/types';

const EventsList = ({ events }: TEventsListProps) => {
	return (
		<React.Fragment>
			{
				events.map((event: TEventObj) => (
					<Event key={event.title} event={event} />
				))
			}
		</React.Fragment>
	);
};

export default React.memo(EventsList);
