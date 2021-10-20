import * as React from 'react';

import Icon from '../ui-kit/icon';
import Button from '../ui-kit/button';
import { TEditPopupShowProps as Props } from '../../data/types';
import { testIds } from '../../data/tests';

const EventPopupShow: React.VFC<Props> = (props: Props) => {
	const { dateString, selectedEvent, onOpenEditor, onDeleteEvent } = props;
	
	return (
		<>
			<h3
				className="org-event-popup__show-title"
				data-testid={testIds.eventPopupShowTitle}
			>
				{selectedEvent.title}
			</h3>
			<div
				className="org-event-popup__show-date"
				data-testid={testIds.eventPopupShowDateTime}
			>
				{ dateString }
			</div>
			{
				!! selectedEvent.description.length &&
				<p
					className="org-event-popup__show-description"
					data-testid={testIds.eventPopupShowDescription}
				>
					{selectedEvent.description}
				</p>
			}
			<div className="org-event-popup__show-controls">
				<Icon
					name="delete"
					className="org-event-popup__button-delete"
					testId={testIds.eventPopupShowButtonDelete}
					onClick={onDeleteEvent}
				/>
				<Button
					name="edit"
					testId={testIds.eventPopupShowButtonEdit}
					onClick={onOpenEditor}
				>
					{'Edit'}
				</Button>
			</div>
		</>
	);
};

export default React.memo(EventPopupShow);
