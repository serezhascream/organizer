import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveEvent } from '../../features/eventsSlice';

import { getEvent } from '../../selectors/events';
import { TRootState } from '../../data/types';
import {
	Popup,
	Button,
	Input,
	Textarea,
	Icon,
	DateInput,
	TimeInput,
} from '../ui-kit';

interface Props {
	eventId: string | null;
	selectedDay: number;
	popupView: 'show' | 'edit';
	onClose(): void;
	onSwitchView(view: 'show' | 'edit'): void;
	onDeleteEvent(eventId: string): void;
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const {
		eventId,
		selectedDay,
		popupView,
		onClose,
		onSwitchView,
		onDeleteEvent,
	} = props;
	
	const dispatch = useDispatch();
	const defaultTimestamp = new Date().getTime();
	
	const selectedEvent = useSelector((state: TRootState) => getEvent(state, eventId, selectedDay));
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const [ timestamp, setTimestamp ] = React.useState<number | null>(selectedEvent.timestamp || defaultTimestamp);
	const [ hasTime, setHasTime ] = React.useState<boolean>(selectedEvent.hasTime);
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);
	const popupTitle = React.useMemo((): string => {
		if (! eventId) {
			return 'Create event';
		}

		if (popupView === 'edit') {
			return 'Edit event';
		}

		return 'Event';
	}, [eventId, popupView, title]);


	const clearFields = (): void => {
		setTitle('');
		setDescription('');
		setTimestamp(null);
	};
	
	const handlerClose = React.useCallback((): void => {
		onClose();
		clearFields();
	}, [onClose]);

	const handlerChangeTitle = React.useCallback((value: string): void => {
		setTitle(value);
	}, []);

	const handlerChangeTimestamp = React.useCallback((value: number): void => {
		setTimestamp(value);
	}, [setTimestamp]);
	
	const handlerChangeDescription = React.useCallback((value: string): void => {
			setDescription(value);
	}, []);

	const handlerChangeHasTime = React.useCallback(
		(value: boolean): void => setHasTime(value), [setHasTime]
	);

	const handlerSave = React.useCallback((): void => {
		dispatch(saveEvent({
			...selectedEvent,
			title,
			description,
			timestamp,
			hasTime,
		}));
		
		onSwitchView('show')
	}, [title, description, timestamp, hasTime, onSwitchView]);

	const handlerOpenEditor = React.useCallback(() => onSwitchView('edit'), [onSwitchView]);
	const handlerDeleteEvent = React.useCallback(() => {
		if (! eventId) {
			return;
		}
	
		onDeleteEvent(eventId);
		onClose();
		clearFields();
	}, [eventId, onDeleteEvent, onClose, clearFields]);

	return (
		<Popup
			title={popupTitle}
			onClose={handlerClose}
		>
			{
				popupView === 'edit' &&
				<>
					<Input
						name="title"
						value={title}
						extraClass="org-event-popup__title"
						label="Title"
						onChange={handlerChangeTitle}
					/>
					<div className="org-event-popup__date-and-time">
						<DateInput
							timestamp={timestamp}
							className="org-event-popup__date-input"
							onChange={handlerChangeTimestamp}
						/>
						<TimeInput
							timestamp={timestamp}
							className="org-event-popup__time-input"
							timeIsEnabled={hasTime}
							setTimeIsEnabled={handlerChangeHasTime}
							onChange={handlerChangeTimestamp}
						/>
					</div>
					<Textarea
						name="description"
						value={description}
						extraClass="org-event-popup__description"
						label="Description"
						onChange={handlerChangeDescription}
					/>
					<div className="org-event-popup__edit-buttons">
						<Button
							name="cancel"
							extraClass="org-event-popup__cancel"
							onClick={handlerClose}
						>
							{ 'Cancel' }
						</Button>
						<Button
							name="save"
							disabled={saveButtonIsDisabled}
							extraClass="org-event-popup__save"
							onClick={handlerSave}
						>
							{ 'Save' }
						</Button>
					</div>
				</>
			}
			{
				popupView === 'show' &&
				<>
					<h3 className="org-event-popup__show-title">{title}</h3>
					<p className="org-event-popup__show-description">{description}</p>
					<div className="org-event-popup__show-controls">
						<Icon
							name="delete"
							className="org-event-popup__button-delete"
							onClick={handlerDeleteEvent}
						/>
						<Button name="edit" onClick={handlerOpenEditor}>
							{ 'Edit' }
						</Button>
					</div>
				</>
			}
		</Popup>
	);
};

export default React.memo(EventPopup);
