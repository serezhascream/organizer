import * as React from 'react';

import { TEventProps } from '../../data/types';

const Event = ({ event }: TEventProps) => {
	const descriptionText = React.useMemo(
		() => (event.description ? event.description : 'Empty description'),
		[event]
	);
	
	return (
		<div className="org-event">
			<div className="org-event__title">{ event.title }</div>
			<div className="org-event__description">{ descriptionText }</div>
		</div>
	);
};

export default React.memo(Event);
