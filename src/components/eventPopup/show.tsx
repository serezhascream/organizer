import * as React from 'react';

import { Icon, Button} from '../ui-kit';
import { TEventObj } from '../../data/types';

interface Props {
	eventId: string | null;
	selectedEvent: TEventObj;
	onSwitchView(view: 'show' | 'edit'): void;
	onDeleteEvent(eventId: string): void;
	onClose(): void;
}

const EventPopupShow: React.VFC<Props> = (props: Props) => {
	const {
		eventId,
		selectedEvent,
		onSwitchView,
		onDeleteEvent,
		onClose,
	} = props;
	
	const handlerOpenEditor = React.useCallback(() => onSwitchView('edit'), [onSwitchView]);
	const handlerDeleteEvent = React.useCallback(() => {
		if (! eventId) {
			return;
		}
	
		onDeleteEvent(eventId);
		onClose();
	}, [eventId, onDeleteEvent, onClose]);

	return (
		<>
			<h3 className="org-event-popup__show-title">{selectedEvent.title}</h3>
			<p className="org-event-popup__show-description">{selectedEvent.description}</p>
			<div className="org-event-popup__show-controls">
				<Icon
					name="delete"
					className="org-event-popup__button-delete"
					onClick={handlerDeleteEvent}
				/>
				<Button name="edit" onClick={handlerOpenEditor}>
					{ 'Edit' }
				</Button>
			</div>
		</>
	);
};

export default EventPopupShow;
