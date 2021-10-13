import * as React from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../../data/types';
import { getListTitle } from '../../utils';
import { getEvents } from '../../selectors/events';

import { Icon } from '../ui-kit';
import EventsList from './eventsList';
import EventPopup from '../eventPopup';
import DeleteEventAlert from './deleteEventAlert';

const List: React.VFC = () => {
	const [showEventPopup, setShowEventPopup] = React.useState<boolean>(false);
	const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);
	const [eventIdToDelete, setEventIdToDelete] = React.useState<string | null>(null);
	const [showDeletingAlert, setShowDeletingAlert] = React.useState<boolean>(false);
	const [eventPopupView, setEventPopupView] = React.useState<'show' | 'edit'>('show');
	
	const selectedDay = useSelector((state: TRootState): number => state.main.selectedDay);
	const events = useSelector((state: TRootState) => getEvents(state, selectedDay));
	
	const eventListTitle = React.useMemo(
		(): string => getListTitle(selectedDay), [selectedDay]
	);
	
	const handlerCreateEvent = React.useCallback((): void => {
		setSelectedEventId(null);
		setEventPopupView('edit');
		setShowEventPopup(true);
	}, [selectedDay]);

	const handlerOpenEvent = React.useCallback((eventId: string) => {
		setSelectedEventId(eventId);
		setEventPopupView('show');
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
	
	const handlerSwitchPopupView = React.useCallback(
		(view: 'show' | 'edit') => setEventPopupView(view), [setEventPopupView]
	);
	
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
							onOpenEvent={handlerOpenEvent}
						/>
					</div>
				</div>
			</div>
			{
				showEventPopup &&
				<EventPopup
					eventId={selectedEventId}
					selectedDay={selectedDay}
					popupView={eventPopupView}
					onClose={handlerCloseEventPopup}
					onSwitchView={handlerSwitchPopupView}
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

export default React.memo(List);
