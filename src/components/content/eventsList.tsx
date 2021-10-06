import * as React from 'react';

import Event from './event';
import { TEventObj } from '../../data/types';

interface Props {
	events: TEventObj[];
	onEditEvent(eventId: string): void,
	onDeleteEvent(eventId: string): void,
}

const EventsList: React.VFC<Props> = (props: Props) => {
	const { events, onEditEvent, onDeleteEvent } = props;
	
	const handlerEditEvent = React.useCallback(
		(eventId: string) => onEditEvent(eventId), [onEditEvent]
	);
	
	const handlerDeleteEvent = React.useCallback(
		(eventId: string) => onDeleteEvent(eventId), [onDeleteEvent]
	);
	
	if (! events.length) {
		return (
			<div className="org-list__placeholder">No events yet.</div>
		);
	}
	
	return (
		<>
			{
				events.map((event: TEventObj) => (
					<Event
						key={event.id}
						{...event}
						onEditEvent={handlerEditEvent}
						onDeleteEvent={handlerDeleteEvent}
					/>
				))
			}
		</>
	);
};

export default React.memo(EventsList);
