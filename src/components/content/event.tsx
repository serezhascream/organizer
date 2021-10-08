import * as React from 'react';

import { TEventObj } from '../../data/types';

interface Props extends TEventObj {
	onOpenEvent(eventId: string): void;
}

const Event: React.VFC<Props> = (props: Props) => {
	const {
		id,
		title,
		timestamp,
		description,
		onOpenEvent,
	} = props;
	
	const descriptionText = React.useMemo(
		(): string => (description || 'Empty description'), [event]
	);

	const dateTime = React.useMemo((): string => {
		const date = new Date(timestamp);

		return date.toLocaleDateString('en-US', { hour12: false });
	}, [timestamp]);

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
