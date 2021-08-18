import * as React from 'react';

import { TContentProps } from '../data/types';
import Settings from './settings';
import List from './list';

const Content = ({
	activeView,
	selected,
}: TContentProps) => {

	if (! activeView) {
		return null;
	}
	
	return (
		<React.Fragment>
			<div className="org-container__divider" />
			{
				activeView === 'settings' &&
				<Settings />
			}
			{
				activeView === 'list' &&
				<List selected={selected} />
			}
		</React.Fragment>
	);
};

export default React.memo(Content);
