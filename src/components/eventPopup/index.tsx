import * as React from 'react';

import { TEventObj } from '../../data/types';
import { Popup } from '../ui-kit';
import Edit from './edit';
import Show from './show';

interface Props {
	eventId: string | null;
	selectedEvent: TEventObj;
	onSave(event: TEventObj): void
	onClose(): void;
	onDeleteEvent(eventId: string): void;
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const {
		eventId,
		selectedEvent,
		onSave,
		onClose,
		onDeleteEvent,
	} = props;
	
	const [popupView, setPopupView] = React.useState<'show' | 'edit'>(() => (eventId ? 'show' : 'edit'));
	
	const popupTitle = React.useMemo((): string => {
		if (! eventId) {
			return 'Create event';
		}

		if (popupView === 'edit') {
			return 'Edit event';
		}

		return 'Event';
	}, [eventId, popupView]);
	
	const Content = React.useMemo(() => {
		const ContentView = {
			edit: Edit,
			show: Show,
		};

		return ContentView[popupView]
	}, [popupView]);
	
	const handlerClose = React.useCallback((): void => {
		onClose();
	}, [onClose]);

	const handlerSwitchView = React.useCallback(
		(view: 'show' | 'edit') => setPopupView(view), [setPopupView]
	);

	const handlerSaveEvent = React.useCallback((event: TEventObj) => {
		onSave(event);
		setPopupView('show');
	}, [onSave]);
	
	return (
		<Popup title={popupTitle} onClose={handlerClose}>
			<Content
				eventId={eventId}
				selectedEvent={selectedEvent}
				onSwitchView={handlerSwitchView}
				onSave={handlerSaveEvent}
				onDeleteEvent={onDeleteEvent}
				onClose={handlerClose}
			/>
		</Popup>
	);
};

export default React.memo(EventPopup);
