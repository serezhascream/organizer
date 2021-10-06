import * as React from 'react';

import Icon from '../ui-kit/icon';

import { TEventObj } from '../../data/types';

interface Props extends TEventObj {
	onEditEvent(eventId: string): void;
	onDeleteEvent(eventId: string): void;
}

const Event: React.VFC<Props> = (props: Props) => {
	const {
		id,
		title,
		description,
		onEditEvent,
		onDeleteEvent,
	} = props;
	
	const descriptionText = React.useMemo(
		(): string => (description || 'Empty description'), [event]
	);

	const handlerEditEvent = React.useCallback(() => onEditEvent(id), [id, onEditEvent]);
	const handlerDeleteEvent = React.useCallback(() => onDeleteEvent(id), [id]);
	
	return (
		<div className="org-event">
			<div className="org-event__title">{ title }</div>
			<div className="org-event__description">{ descriptionText }</div>

			<div className="org-event__buttons">
				<Icon
					name="edit"
					className="org-event__button"
					onClick={handlerEditEvent}
				/>
				<Icon
					name="delete"
					className="org-event__button"
					onClick={handlerDeleteEvent}
				/>
			</div>
		</div>
	);
};

export default React.memo(Event);
