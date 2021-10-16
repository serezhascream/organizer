import * as React from 'react';

import { TEventObj } from '../../data/types';

interface Props extends TEventObj {
	selectedDay: number | null;
	onOpenEvent(eventId: string): void;
}

const Event: React.VFC<Props> = (props: Props) => {
	const {
		id,
		title,
		timestamp,
		hasTime,
		description,
		selectedDay,
		onOpenEvent,
	} = props;
	
	const descriptionText = React.useMemo(
		(): string => (description || 'Empty description'), [event]
	);

	const dateTime = React.useMemo((): string => {
		const date = new Date(timestamp);

		if (!selectedDay) {
			return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
		}

		if (selectedDay && hasTime) {
			const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false});
			return time === '24:00' ? '00:00' : time;
		}

		return '';
	}, [timestamp, hasTime, selectedDay]);

	const handlerEditEvent = React.useCallback(() => onOpenEvent(id), [id, onOpenEvent]);

	
	return (
		<div className="org-event" onClick={handlerEditEvent}>
			<div className="org-event__headline">
				<span className="org-event__title">{ title }</span>
				<span className="org-event__date-time">{ dateTime }</span>
			</div>
			<div className="org-event__description">{ descriptionText }</div>
		</div>
	);
};

export default React.memo(Event);
