import * as React from 'react';

import { TEditPopupEditProps as Props } from '../../data/types';
import { eventPopupTestIds as testIds } from '../../data/tests'

import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';
import DateInput from '../ui-kit/date';
import TimeInput from '../ui-kit/time';
import Button from '../ui-kit/button';

const EventPopupEdit: React.VFC<Props> = (props: Props) => {
	const { selectedEvent, onSave, onClose } = props;
	
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const [ timestamp, setTimestamp ] = React.useState<number | null>(selectedEvent.timestamp || new Date().getTime());
	const [ hasTime, setHasTime ] = React.useState<boolean>(selectedEvent.hasTime);
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);
	
	const handlerChangeTitle = React.useCallback(
		(value: string): void => setTitle(value), [setTitle]
	);
	
	const handlerChangeDescription = React.useCallback(
		(value: string): void => setDescription(value), [setDescription]
	);
	
	const handlerChangeTimestamp = React.useCallback(
		(value: number): void => setTimestamp(value), [setTimestamp]
	);

	const handlerChangeHasTime = React.useCallback(
		(value: boolean): void => setHasTime(value), [setHasTime]
	);
	
	const handlerSave = React.useCallback((): void => onSave(
		{
			...selectedEvent,
			title,
			description,
			timestamp,
			hasTime,
		}
	), [title, description, timestamp, hasTime, onSave]);
	
	return (
		<>
			<Input
				name="title"
				value={title}
				extraClass="org-event-popup__title"
				label="Title"
				testId={testIds.editTitle}
				onChange={handlerChangeTitle}
			/>
			<div className="org-event-popup__date-and-time">
				<DateInput
					timestamp={timestamp}
					className="org-event-popup__date-input"
					testId={testIds.editDateInput}
					onChange={handlerChangeTimestamp}
				/>
				<TimeInput
					timestamp={timestamp}
					className="org-event-popup__time-input"
					timeIsEnabled={hasTime}
					setTimeIsEnabled={handlerChangeHasTime}
					switcherTestId={testIds.editTimeSwitcher}
					inputTestId={testIds.editTimeInput}
					onChange={handlerChangeTimestamp}
				/>
			</div>
			<Textarea
				name="description"
				value={description}
				extraClass="org-event-popup__description"
				label="Description"
				testId={testIds.editDescription}
				onChange={handlerChangeDescription}
			/>
			<div className="org-event-popup__edit-buttons">
				<Button
					name="cancel"
					extraClass="org-event-popup__cancel"
					testId={testIds.editButtonCancel}
					onClick={onClose}
				>
					{'Cancel'}
				</Button>
				<Button
					name="save"
					disabled={saveButtonIsDisabled}
					extraClass="org-event-popup__save"
					testId={testIds.editButtonSave}
					onClick={handlerSave}
				>
					{'Save'}
				</Button>
			</div>
		</>
	);
};

export default React.memo(EventPopupEdit);
