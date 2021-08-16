import * as React from 'react';

import { TListProps } from '../../data/types';
import { MONTHS_TITLES } from '../../data/constants';

import Button from '../ui-kit/button';
import EventsList from './eventsList';

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
	const title = React.useMemo(() => {
		const date = new Date(selected.timestamp);
		const month = MONTHS_TITLES[date.getMonth()];
		
		return `${date.getDate()} ${month} ${date.getFullYear()}`;
	}, [selected]);
	const handlerAddEvent = React.useCallback(() => {}, []);
	return (
		<div className="org-list">
			<div className="org-list__header">
				<div className="org-container__content-title">
					{ title }
				</div>
				<Button
					name="addEvent"
					onClick={handlerAddEvent}
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
