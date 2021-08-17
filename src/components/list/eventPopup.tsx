import * as React from 'react';

import { TEventPopupProps } from '../../data/types';
import Button from '../ui-kit/button';
import Input from '../ui-kit/input';
import Textarea from '../ui-kit/textarea';

const EventPopup = ({
	event = {
		title: '',
		description: '',
	},
	show = false,
	onSave = () => {},
	onClose = () => {},
}: TEventPopupProps) => {
	const [ title, setTitle ] = React.useState(event.title);
	const [ description, setDescription ] = React.useState(event.description);
	const saveButtonIsDisabled = React.useMemo(() => (! title.length), [title]);

	const clearFields = () => {
		setTitle('');
		setDescription('');
	};
	
	const handlerSave = React.useCallback(() => {
		onSave({ title, description });
		clearFields();
	}, [title, description]);

	const handlerClose = React.useCallback(() => {
		onClose();
		clearFields();
	}, [onClose]);

	const handlerChange = React.useCallback((value: string, name: string) => {
		if (name === 'title') {
			setTitle(value);
		}

		if (name === 'description') {
			setDescription(value);
		}
		
	}, [setTitle]);
	
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
