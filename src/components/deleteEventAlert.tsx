import * as React from 'react';
import { useDispatch } from 'react-redux';

import Popup from '../components/ui-kit/popup';
import Button from '../components/ui-kit/button';
import { deleteEvent } from '../features/eventsSlice';
import { deleteAlertTestIds as testIds } from '../data/tests';

interface Props {
	eventId: string;
	onClose(): void;
}

const DeleteEventAlert: React.VFC<Props> = (props: Props) => {
	const { eventId, onClose } = props;
	const dispatch = useDispatch();
	
	const handlerConfirm = React.useCallback(() => {
		dispatch(deleteEvent(eventId));
		onClose();
	}, [eventId, onClose]);

	const handlerCancel = React.useCallback(() => onClose(), [onClose]);
	
	return (
		<Popup
			title="Delete event"
			className="org-delete-alert"
			wrapperTestId={testIds.wrapper}
			overlayTestId={testIds.overlay}
			onClose={onClose}
		>
			<div className="org-delete-alert__text">
				Are you sure you want to delete the event?
			</div>
			<div className="org-delete-alert__buttons">
				<Button
					name="Cancel"
					testId={testIds.buttonCancel}
					onClick={handlerCancel}
				>
					Cancel
				</Button>
				<Button
					name="confirm"
					extraClass="org-delete-alert__button-confirm"
					testId={testIds.buttonConfirm}
					onClick={handlerConfirm}
				>
					Confirm
				</Button>
			</div>
		</Popup>
	);
};

export default React.memo(DeleteEventAlert);
