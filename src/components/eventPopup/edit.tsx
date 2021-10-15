import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Input, Textarea, DateInput, TimeInput, Button} from '../ui-kit';
import { TEventObj } from '../../data/types';
import { saveEvent } from '../../features/eventsSlice';

interface Props {
	selectedEvent: TEventObj;
	onSwitchView(view: 'show' | 'edit'): void;
	onClose(): void;
}

const EventPopupEdit: React.VFC<Props> = (props: Props) => {
	const { selectedEvent, onSwitchView, onClose } = props;
	const dispatch = useDispatch();
	
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const [ timestamp, setTimestamp ] = React.useState<number | null>(selectedEvent.timestamp || new Date().getTime());
	const [ hasTime, setHasTime ] = React.useState<boolean>(selectedEvent.hasTime);
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);
	
	const handlerChangeTitle = React.useCallback((value: string): void => {
		setTitle(value);
	}, []);
	
	const handlerChangeDescription = React.useCallback((value: string): void => {
			setDescription(value);
	}, []);
	
	const handlerChangeTimestamp = React.useCallback((value: number): void => {
		setTimestamp(value);
	}, [setTimestamp]);

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
	
	return (
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
					onClick={onClose}
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
	);
};

export default EventPopupEdit;