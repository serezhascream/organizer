import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TRootState, TEventObj } from '../../data/types';
import { getListTitle } from '../../utils';
import { getEvents, getEvent } from '../../selectors/events';
import { saveEvent } from '../../features/eventsSlice';

import Icon from '../ui-kit/icon';
import EventsList from './list';
import EventPopup from '../eventPopup';
import DeleteEventAlert from '../deleteEventAlert';

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
			<section className="org-content">
				<div className="org-content__header">
					<div className="org-content__header-title">
						{ eventListTitle }
					</div>
					<Icon
						name="add"
						className="org-content__add-button"
						onClick={handlerCreateEvent}
					/>
				</div>
				<div className="org-content__wrapper">
					<div className="org-content__content">
						<EventsList
							events={events}
							selectedDay={selectedDay}
							onOpenEvent={handlerOpenEvent}
						/>
					</div>
				</div>
			</section>
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
