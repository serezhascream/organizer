import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSelectedEvent, saveEvent } from '../../features/eventsSlice';

import { TRootState, TEventObj } from '../../data/types';
import Button from '../ui-kit/button';
import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';
import Icon from '../ui-kit/icon';

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
		<div className="org-popup">
			<div className="org-popup__overlay" />
			<div className="org-popup__container">
				<div className="org-popup__header">
					<div className="org-popup__header-title">Edit event</div>
					<Icon
						name="close"
						className="org-popup__header-close"
						onClick={handlerClose}
					/>
				</div>
				<div className="org-popup__content">
					<Input
						name="title"
						value={title}
						extraClass="org-popup__content-title"
						label="Title"
						onChange={handlerChangeTitle}
					/>
					<Textarea
						name="description"
						value={description}
						extraClass="org-popup__content-description"
						label="Description"
						onChange={handlerChangeDescription}
					/>
					<div className="org-popup__buttons">
						<Button
							name="cancel"
							extraClass="org-popup__content-cancel"
							onClick={handlerClose}
						>Cancel</Button>
						<Button
							name="save"
							disabled={saveButtonIsDisabled}
							extraClass="org-popup__content-save"
							onClick={handlerSave}
						>Save</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default React.memo(EventPopup);
