import * as React from 'react';

import { TEventObj } from '../../data/types';
import { getDateString, getEventPopupTitle } from '../../utils';
import { Popup } from '../ui-kit';
import Content from './content';

interface Props {
	eventId: string | null;
	selectedEvent: TEventObj;
	onSave(event: TEventObj): void
	onClose(): void;
	onDeleteEvent(eventId: string): void;
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const { eventId, selectedEvent, onSave, onClose, onDeleteEvent } = props;
	
	const [popupView, setPopupView] = React.useState<'show' | 'edit'>(() => (eventId ? 'show' : 'edit'));
	
	const dateString = React.useMemo(
		() => getDateString(selectedEvent), [selectedEvent]
	);
	const popupTitle = React.useMemo(
		(): string => getEventPopupTitle(eventId, popupView), [eventId, popupView]
	);
	
	const handlerClose = React.useCallback((): void => onClose(), [onClose]);
	const handlerEditEvent = React.useCallback(() => setPopupView('edit'), [setPopupView]);
	
	const handlerDeleteEvent = React.useCallback(() => {
		onDeleteEvent(eventId);
		onClose();
	}, [eventId, onDeleteEvent, onClose]);

	const handlerSaveEvent = React.useCallback((event: TEventObj) => {
		onSave(event);
		setPopupView('show');
	}, [onSave]);
	
	return (
		<Popup title={popupTitle} onClose={handlerClose}>
			<Content
				view={popupView}
				dateString={dateString}
				selectedEvent={selectedEvent}
				onSave={handlerSaveEvent}
				onOpenEditor={handlerEditEvent}
				onDeleteEvent={handlerDeleteEvent}
				onClose={handlerClose}
			/>
		</Popup>
	);
};

export default React.memo(EventPopup);
