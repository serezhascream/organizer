import * as React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../data/types';

import List from './list';

const Content: React.VFC = () => {
	const activeContentView = useSelector(
		(state: TRootState): string | null => state.main.activeContentView
	);

	if (! activeContentView) {
		return null;
	}
	
	return (
		<>
			<div className="org-container__divider" />
			{
				activeContentView === 'list' &&
				<List />
			}
		</>
	);
};

export default React.memo(Content);
