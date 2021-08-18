import * as React from 'react';
import { useSelector } from 'react-redux';

import Settings from './settings';
import List from './list';

const Content = () => {
	const activeContentView = useSelector(state => state.main.activeContentView);

	if (! activeContentView) {
		return null;
	}
	
	return (
		<React.Fragment>
			<div className="org-container__divider" />
			{
				activeContentView === 'settings' &&
				<Settings />
			}
			{
				activeContentView === 'list' &&
				<List />
			}
		</React.Fragment>
	);
};

export default React.memo(Content);
