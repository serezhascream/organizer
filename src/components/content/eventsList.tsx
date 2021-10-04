import * as React from 'react';

import Event from './event';
import { TEventObj } from '../../data/types';

interface Props {
	events: TEventObj[];
	onEditEvent(eventId: number): void,
}

const EventsList: React.VFC<Props> = (props: Props) => {
	const { events, onEditEvent } = props;
	
	const handlerEditEvent = React.useCallback((eventId: number) => onEditEvent(eventId), [onEditEvent]);
	
	if (! events.length) {
		return (
			<div className="org-list__placeholder">No events yet.</div>
		);
	}
	
	return (
		<React.Fragment>
			{
				events.map((event: TEventObj) => (
					<Event
						key={event.id}
						{...event}
						onEditEvent={handlerEditEvent}
					/>
				))
			}
		</React.Fragment>
	);
};

export default React.memo(EventsList);
