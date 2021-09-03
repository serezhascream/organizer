import * as React from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../../data/types';

import Button from '../ui-kit/button';
import EventsList from './eventsList';
import EventPopup from './eventPopup';

const List = () => {
	const selectedDay = useSelector((state: TRootState) => state.main.selectedDay);
	
	const [showEventPopup, setShowEventPopup] = React.useState(false);
	
	const title = React.useMemo(() => {
		const date = new Date(selectedDay);
		
		return date.toLocaleDateString(
			'en-US',
			{
				day: 'numeric',
				month: 'long',
				year: 'numeric',
			},
		);
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
				<EventsList />
			</div>
		</div>
	);
};

export default React.memo(List);
