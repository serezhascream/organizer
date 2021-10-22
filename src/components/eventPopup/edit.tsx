import * as React from 'react';

import { TEditPopupEditProps as Props } from '../../data/types';
import { eventPopupTestIds as testIds } from '../../data/tests'
import { useEditEvent } from '../../hooks/useEditEvent';

import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';
import DateInput from '../ui-kit/date';
import TimeInput from '../ui-kit/time';
import Button from '../ui-kit/button';

const EventPopupEdit: React.VFC<Props> = (props: Props) => {
	const { selectedEvent, onSave, onClose } = props;
	const { event, saveButtonIsDisabled, onChange } = useEditEvent(selectedEvent);

	const handlerChange = React.useCallback(
		(value: string | number | boolean, name: string): void => onChange(value, name),
		[onChange]
	);
	
	const handlerSave = React.useCallback(
		(): void => onSave({ id: selectedEvent.id, ...event, }),
		[event, onSave]
	);
	
	return (
		<>
			<Input
				name="title"
				value={event.title}
				extraClass="org-event-popup__title"
				label="Title"
				testId={testIds.editTitle}
				onChange={handlerChange}
			/>
			<div className="org-event-popup__date-and-time">
				<DateInput
					name="date"
					timestamp={event.timestamp}
					className="org-event-popup__date-input"
					testId={testIds.editDateInput}
					onChange={handlerChange}
				/>
				<TimeInput
					switcherName="timeSwitcher"
					timestamp={event.timestamp}
					className="org-event-popup__time-input"
					timeIsEnabled={event.hasTime}
					switcherTestId={testIds.editTimeSwitcher}
					inputTestId={testIds.editTimeInput}
					onChange={handlerChange}
				/>
			</div>
			<Textarea
				name="description"
				value={event.description}
				extraClass="org-event-popup__description"
				label="Description"
				testId={testIds.editDescription}
				onChange={handlerChange}
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
