import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TRootState } from '../../data/types';
import { getListTitle } from '../../utils';
import { getEvents } from '../../selectors/events';
import { updateSelectedEvent, resetSelectedEvent } from '../../features/eventsSlice';

import Icon from '../ui-kit/icon';
import EventsList from './eventsList';
import EventPopup from './eventPopup';

const List: React.VFC = () => {
	const dispatch = useDispatch();
	const [showEventPopup, setShowEventPopup] = React.useState<boolean>(false);
	
	const selectedDay = useSelector((state: TRootState): number => state.main.selectedDay);
	const events = useSelector((state: TRootState) => getEvents(state, selectedDay));
	
	const eventListTitle = React.useMemo(
		(): string => getListTitle(selectedDay), [selectedDay]
	);
	
	const handlerCreateEvent = React.useCallback((): void => {
		dispatch(updateSelectedEvent({
			id: selectedDay + events.length + 1,
			day: selectedDay,
			timestamp: selectedDay,
		}));
		
		setShowEventPopup(true);
	}, []);

	const handleEditEvent = React.useCallback((eventId: number) => {
		const newSelectedEvent = events.find(event => event.id === eventId);
		dispatch(updateSelectedEvent({...newSelectedEvent}));
		
		setShowEventPopup(true);
	}, []);

	const handlerCloseEventPopup = React.useCallback(():void => {
		setShowEventPopup(false);
		
		dispatch(resetSelectedEvent());
	}, []);
	
	return (
		<>
			<div className="org-container__divider" />
			<div className="org-list">
				{
					showEventPopup &&
					<EventPopup onClose={handlerCloseEventPopup} />
				}
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
				<div className="org-list__content">
					<EventsList events={events} onEditEvent={handleEditEvent} />
				</div>
			</div>
		</>
	);
};

export default React.memo(List);
