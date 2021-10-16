import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TRootState, TEventObj } from '../../data/types';
import { getListTitle } from '../../utils';
import { getEvents, getEvent } from '../../selectors/events';
import { saveEvent } from '../../features/eventsSlice';

import { Icon } from '../ui-kit';
import EventsList from './eventsList';
import EventPopup from '../eventPopup';
import DeleteEventAlert from './deleteEventAlert';

interface Props {
	selectedDay: number | null;
}

const OrganizerContent: React.VFC<Props> = (props: Props) => {
	const { selectedDay } = props;
	const dispatch = useDispatch();
	
	const [showEventPopup, setShowEventPopup] = React.useState<boolean>(false);
	const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
	const [eventIdToDelete, setEventIdToDelete] = React.useState<string | null>(null);
	const [showDeletingAlert, setShowDeletingAlert] = React.useState<boolean>(false);
	
	const selectedEvent = useSelector((state: TRootState) => getEvent(state, selectedEventId, selectedDay));
	const events = useSelector((state: TRootState) => getEvents(state, selectedDay));
	
	const eventListTitle = React.useMemo(
		(): string => getListTitle(selectedDay), [selectedDay]
	);
	
	const handlerCreateEvent = React.useCallback((): void => {
		setSelectedEventId(null);
		setShowEventPopup(true);
	}, [selectedDay]);

	const handlerOpenEvent = React.useCallback((eventId: string) => {
		setSelectedEventId(eventId);
		setShowEventPopup(true);
	}, [events]);

	const handlerDeleteEvent = React.useCallback((eventId: string) => {
		setEventIdToDelete(eventId);
		setShowDeletingAlert(true);
	}, []);
	
	const handlerCloseEventPopup = React.useCallback(():void => {
		setShowEventPopup(false);
		setSelectedEventId(null);
	}, []);

	const handlerCloseDeleteAlert = React.useCallback((): void => {
		setShowDeletingAlert(false);
		setEventIdToDelete(null);
	}, []);

	const handlerSaveEvent = React.useCallback((event: TEventObj): void => {
		dispatch(saveEvent(event));
		setSelectedEventId(event.id);
	}, [dispatch, setSelectedEventId]);
	
	return (
		<>
			<div className="org-container__divider" />
			<div className="org-list">
				<div className="org-list__header">
					<div className="org-container__content-title">
						{ eventListTitle }
					</div>
					<Icon
						name="add"
						className="org-list__add-button"
						onClick={handlerCreateEvent}
					/>
				</div>
				<div className="org-list__wrapper">
					<div className="org-list__content">
						<EventsList
							events={events}
							selectedDay={selectedDay}
							onOpenEvent={handlerOpenEvent}
						/>
					</div>
				</div>
			</div>
			{
				showEventPopup &&
				<EventPopup
					eventId={selectedEventId}
					selectedEvent={selectedEvent}
					onSave={handlerSaveEvent}
					onClose={handlerCloseEventPopup}
					onDeleteEvent={handlerDeleteEvent}
				/>
			}
			{
				showDeletingAlert &&
				<DeleteEventAlert
					eventId={eventIdToDelete}
					onClose={handlerCloseDeleteAlert}
				/>
			}
		</>
	);
};

export default React.memo(OrganizerContent);
