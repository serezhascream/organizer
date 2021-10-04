import * as React from 'react';

import Icon from '../ui-kit/icon';

import { TEventObj } from '../../data/types';

interface Props extends TEventObj {
	onEditEvent(eventId: number): void,
}

const Event: React.VFC<Props> = (props: Props) => {
	const { id, title, description, onEditEvent } = props;
	const descriptionText = React.useMemo(
		(): string => (description || 'Empty description'),
		[event]
	);

	const handlerEditEvent = React.useCallback(() => onEditEvent(id), [id, onEditEvent]);
	
	return (
		<div className="org-event">
			<div className="org-event__title">{ title }</div>
			<div className="org-event__description">{ descriptionText }</div>

			<Icon
				name="edit"
				className="org-event__edit-button"
				onClick={handlerEditEvent}
			/>
		</div>
	);
};

export default React.memo(Event);
