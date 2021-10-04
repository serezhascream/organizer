import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedEvent, saveEvent } from '../../features/eventsSlice';

import { TRootState, TEventObj } from '../../data/types';
import Popup from '../ui-kit/popup';
import Button from '../ui-kit/button';
import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';

interface Props {
	onClose(): void,
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const { onClose = () => {} } = props;
	
	const dispatch = useDispatch();
	const selectedEvent = useSelector(
		(state: TRootState): TEventObj => state.events.selectedEvent
	);
	
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);

	const clearFields = (): void => {
		setTitle('');
		setDescription('');
	};
	
	const handlerSave = React.useCallback((): void => {
		dispatch(updateSelectedEvent({ title, description }));
		
		dispatch(saveEvent());
		clearFields();
		onClose();
	}, [title, description]);

	const handlerClose = React.useCallback((): void => {
		onClose();
		clearFields();
	}, [onClose]);

	const handlerChangeTitle = React.useCallback((value: string): void => {
		setTitle(value);
	}, []);
	
	const handlerChangeDescription = React.useCallback((value: string): void => {
			setDescription(value);
	}, []);

	return (
		<Popup
			title="Edit event"
			onClose={handlerClose}
		>
			<>
				<Input
					name="title"
					value={title}
					extraClass="org-event-popup__title"
					label="Title"
					onChange={handlerChangeTitle}
				/>
				<Textarea
					name="description"
					value={description}
					extraClass="org-event-popup__description"
					label="Description"
					onChange={handlerChangeDescription}
				/>
				<div className="org-event-popup__buttons">
					<Button
						name="cancel"
						extraClass="org-event-popup__cancel"
						onClick={handlerClose}
					>Cancel</Button>
					<Button
						name="save"
						disabled={saveButtonIsDisabled}
						extraClass="org-event-popup__save"
						onClick={handlerSave}
					>Save</Button>
				</div>
			</>
		</Popup>
	);
};

export default React.memo(EventPopup);
