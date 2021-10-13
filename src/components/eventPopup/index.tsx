import * as React from 'react';
import { useSelector } from 'react-redux';

import { getEvent } from '../../selectors/events';
import { TRootState } from '../../data/types';
import { Popup } from '../ui-kit';
import Edit from './edit';
import Show from './show';


interface Props {
	eventId: string | null;
	selectedDay: number;
	popupView: 'show' | 'edit';
	onClose(): void;
	onSwitchView(view: 'show' | 'edit'): void;
	onDeleteEvent(eventId: string): void;
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const {
		eventId,
		selectedDay,
		popupView,
		onClose,
		onSwitchView,
		onDeleteEvent,
	} = props;
	
	const selectedEvent = useSelector((state: TRootState) => getEvent(state, eventId, selectedDay));
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

	return (
		<Popup title={popupTitle} onClose={handlerClose}>
			<Content
				eventId={eventId}
				selectedEvent={selectedEvent}
				onSwitchView={onSwitchView}
				onDeleteEvent={onDeleteEvent}
				onClose={handlerClose}
			/>
		</Popup>
	);
};

export default React.memo(EventPopup);
