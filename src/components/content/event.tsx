import * as React from 'react';

import { TEventObj } from '../../data/types';
import { getEventItemDateString } from '../../utils';

interface Props {
	event: TEventObj,
	selectedDay: number | null;
	onOpenEvent(eventId: string): void;
}

const Event: React.VFC<Props> = (props: Props) => {
	const { event, selectedDay, onOpenEvent } = props;
	const { id, title, description } = event;
	
	const descriptionText = React.useMemo(
		(): string => (description || 'Empty description'), [event]
	);

	const dateAndTime = React.useMemo(
		(): string => getEventItemDateString(event, selectedDay),
		[event, selectedDay]
	);

	const handlerEditEvent = React.useCallback(() => onOpenEvent(id), [id, onOpenEvent]);

	
	return (
		<div className="org-event" onClick={handlerEditEvent}>
			<div className="org-event__headline">
				{
					!! dateAndTime.length &&
					<span className="org-event__date-time">{ dateAndTime }</span>
				}
				<span className="org-event__title">{ title }</span>
			</div>
			<div className="org-event__description">{ descriptionText }</div>
		</div>
	);
};

export default React.memo(Event);
