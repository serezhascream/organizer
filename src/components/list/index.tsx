import * as React from 'react';

import { TListProps, TEventObj } from '../../data/types';
import { MONTHS_TITLES } from '../../data/constants';

import Button from '../ui-kit/button';
import EventsList from './eventsList';
import EventPopup from './eventPopup';

const events = [
	{
		title: 'Meetup',
		description: 'Testing React @ Community center',
	},
	{
		title: 'Dantist',
		description: null,
	}
];

const List = ({ selected }: TListProps) => {
	const [eventList, setEventList] = React.useState(events);
	const [currentEvent, setCurrentEvent] = React.useState({ title: '', description: '' });
	const [showEventPopup, setShowEventPopup] = React.useState(false);
	
	const title = React.useMemo(() => {
		const date = new Date(selected.timestamp);
		const month = MONTHS_TITLES[date.getMonth()];
		
		return `${date.getDate()} ${month} ${date.getFullYear()}`;
	}, [selected]);
	
	const handlerCreateEvent = React.useCallback(() => {
		setCurrentEvent({ title: '', description: '' });
		setShowEventPopup(true);
	}, [setCurrentEvent, setShowEventPopup]);

	const handlerSaveEvent = React.useCallback(
		(event: TEventObj): void => {
			setEventList([ ...eventList, event ]);
			setCurrentEvent({ title: '', description: '' });
			setShowEventPopup(false);
		},
		[eventList, setEventList, setCurrentEvent, setShowEventPopup]
	);

	const handlerCloseEventPopup = React.useCallback(() => {
		setCurrentEvent({ title: '', description: '' });
		setShowEventPopup(false);
	}, [setCurrentEvent, setShowEventPopup]);
	
	return (
		<div className="org-list">
			<EventPopup
				show={showEventPopup}
				event={currentEvent}
				onSave={handlerSaveEvent}
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
					eventList.length ? 
					<EventsList events={eventList} />
					:
					<div className="org-list__placeholder">No events yet.</div>
				}
			</div>
		</div>
	);
};

export default React.memo(List);
