import * as React from 'react';
import { useSelector } from 'react-redux';

import { TRootState } from '../../data/types';

import Button from '../ui-kit/button';
import EventsList from './eventsList';
import EventPopup from './eventPopup';

const List: React.VFC = () => {
	const selectedDay = useSelector(
		(state: TRootState): number => state.main.selectedDay
	);
	
	const [showEventPopup, setShowEventPopup] = React.useState<boolean>(false);
	
	const title = React.useMemo((): string => {
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
	
	const handlerCreateEvent = React.useCallback((): void => {
		setShowEventPopup(true);
	}, []);

	const handlerCloseEventPopup = React.useCallback(():void => {
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
