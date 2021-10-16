import * as React from 'react';

import { TEditPopupEditProps, TEditPopupShowProps } from '../../data/types';
import Edit from './edit';
import Show from './show';

interface Props extends TEditPopupEditProps, TEditPopupShowProps {
	view: 'show' | 'edit';
}

const EventPopupContent: React.VFC<Props> = (props: Props) => {
	const { view } = props;
	const popupViews = { show: Show, edit: Edit };
	const View = React.useMemo(() => (popupViews[view]), [view]);
	
	return <View { ...props } />;
};

export default React.memo(EventPopupContent);
