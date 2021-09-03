import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent } from '../../features/eventsSlice';

import { TRootState, TEventObj } from '../../data/types';
import Button from '../ui-kit/button';
import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';

interface Props {
	show: boolean,
	onClose(): void,
}

const EventPopup: React.VFC<Props> = (props: Props) => {
	const {show = false, onClose = () => {}} = props;
	
	const dispatch = useDispatch();
	const selectedEvent = useSelector(
		(state: TRootState): TEventObj => state.events.selectedEvent
	);
	const selectedDay = useSelector(
		(state: TRootState): number => state.main.selectedDay
	);
	
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const day = React.useMemo(
		(): number => (selectedEvent.day || selectedDay),
		[selectedEvent, selectedDay]
	);
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);

	const clearFields = (): void => {
		setTitle('');
		setDescription('');
	};
	
	const handlerSave = React.useCallback((): void => {
		dispatch(addEvent({ title, description, day }));
		
		clearFields();
		onClose();
	}, [title, description, day]);

	const handlerClose = React.useCallback((): void => {
		onClose();
		clearFields();
	}, [onClose]);

	const handlerChange = React.useCallback((value: string, name: string): void => {
		if (name === 'title') {
			setTitle(value);
		}

		if (name === 'description') {
			setDescription(value);
		}
		
	}, []);
	
	if (! show) {
		return null;
	}
	
	return (
		<div className="org-popup">
			<div className="org-popup__overlay" />
			<div className="org-popup__container">
				<div className="org-popup__header">
					<div className="org-popup__header-title">Edit event</div>
					<div
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
						onChange={handlerChange}
					/>
					<Textarea
						name="description"
						value={description}
						extraClass="org-popup__content-description"
						label="Description"
						onChange={handlerChange}
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
