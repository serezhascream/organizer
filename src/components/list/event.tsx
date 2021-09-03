import * as React from 'react';

import { TEventObj } from '../../data/types';

interface Props {
	event: TEventObj,
}

const Event: React.VFC<Props> = ({ event }: Props) => {
	const descriptionText = React.useMemo(
		(): string => (event.description ? event.description : 'Empty description'),
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
