import * as React from 'react';

import Event from './event';
import { TEventObj } from '../../data/types';

interface Props {
	events: TEventObj[];
	selectedDay: number | null;
	onOpenEvent(eventId: string): void;
}

const EventsList: React.VFC<Props> = (props: Props) => {
	const { events, selectedDay, onOpenEvent } = props;
	
	const handlerOpenEvent = React.useCallback(
		(eventId: string) => onOpenEvent(eventId), [onOpenEvent]
	);
	
	if (! events.length) {
		return (
			<div className="org-content__placeholder">No events yet.</div>
		);
	}
	
	return (
		<>
			{
				events.map((event: TEventObj) => (
					<Event
						key={event.id}
						event={event}
						selectedDay={selectedDay}
						onOpenEvent={handlerOpenEvent}
					/>
				))
			}
		</>
	);
};

export default React.memo(EventsList);
