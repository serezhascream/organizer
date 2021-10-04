import * as React from 'react';
import { createPortal } from 'react-dom';

import Icon from './icon';
import { portalId } from '../../data/constants';

interface Props {
	title: string;
	children: React.ReactNode;
	onClose(): void;
}

const Popup: React.VFC<Props> = (props: Props) => {
	const { title, children, onClose = () => {} } = props;
	
	const handlerClose = React.useCallback(
		(): void => onClose(), [onClose]
	);
	
	return createPortal(
		<div className="org-popup">
			<div
				className="org-popup__overlay"
				onClick={handlerClose}
			/>
			<div className="org-popup__container">
				<div className="org-popup__header">
					<div className="org-popup__header-title">{ title }</div>
					<Icon
						name="close"
						className="org-popup__header-close"
						onClick={handlerClose}
					/>
				</div>
				<div className="org-popup__content">
					{ children }
				</div>
			</div>
		</div>,
		document.getElementById(portalId),
	);
};

export default React.memo(Popup);
