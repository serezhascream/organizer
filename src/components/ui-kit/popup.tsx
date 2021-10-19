import * as React from 'react';
import { createPortal } from 'react-dom';

import Icon from './icon';
import { portalId } from '../../data/constants';
import { testIds } from '../../data/tests';

interface Props {
	title: string;
	className?: string;
	children: React.ReactNode;
	wrapperTestId?: string;
	overlayTestId?: string;
	onClose(): void;
}

const Popup: React.VFC<Props> = (props: Props) => {
	const {
		title,
		className = null,
		children,
		wrapperTestId = testIds.popupWrapper,
		overlayTestId = testIds.popupOverlay,
		onClose = () => {},
	} = props;
	
	const containerClasses = React.useMemo(() => {
		const classes = ['org-popup__container'];

		if (className) {
			classes.push(className);
		}

		return classes.join(' ');
	}, [className]);
	
	const handlerClose = React.useCallback(
		(): void => onClose(), [onClose]
	);
	
	return createPortal(
		<div className="org-popup" data-testid={wrapperTestId}>
			<div
				className="org-popup__overlay"
				data-testid={overlayTestId}
				onClick={handlerClose}
			/>
			<div className={containerClasses}>
				<div className="org-popup__header">
					<div className="org-popup__header-title">{ title }</div>
					<Icon
						name="close"
						className="org-popup__header-close"
						testId={testIds.popupCloseButton}
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
