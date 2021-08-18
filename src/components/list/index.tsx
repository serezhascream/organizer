import * as React from 'react';
import { useSelector } from 'react-redux';

import { MONTHS_TITLES } from '../../data/constants';

import Button from '../ui-kit/button';
import EventsList from './eventsList';
import EventPopup from './eventPopup';

const List = () => {
	const selectedDay = useSelector(state => state.main.selectedDay);
	const events = useSelector(state => state.events.items);
	
	const [showEventPopup, setShowEventPopup] = React.useState(false);
	
	const title = React.useMemo(() => {
		const date = new Date(selectedDay.timestamp);
		const month = MONTHS_TITLES[date.getMonth()];
		
		return `${date.getDate()} ${month} ${date.getFullYear()}`;
	}, [selectedDay]);
	
	const handlerCreateEvent = React.useCallback(() => {
		setShowEventPopup(true);
	}, []);

	const handlerCloseEventPopup = React.useCallback(() => {
		setShowEventPopup(false);
	}, []);
	
	return (
		<div className="org-list">
			<EventPopup
				show={showEventPopup}
				onClose={handlerCloseEventPopup}
			/>
			<div className="org-list__header">
				<div className="org-container__content-title">
					{ title }
				</div>
				<Button
					name="addEvent"
					onClick={handlerCreateEvent}
				>+</Button>
			</div>
			<div className="org-list__content">
				{
					events.length ? 
					<EventsList events={events} />
					:
					<div className="org-list__placeholder">No events yet.</div>
				}
			</div>
		</div>
	);
};

export default React.memo(List);
