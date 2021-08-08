import * as React from 'react';

import { MONTHS_TITLES } from '../../data/constants';
import MonthItem from './monthItem';

const YearView = ({ onClick, activeView }: { onClick(index: number): void, activeView: string }) => {
	const handlerClick = React.useCallback(
		(index: number) => onClick(index),
		[onClick]
	);

	if (activeView !== 'year') {
		return null;
	}
	
	return (
		<div className="org-calendar__year">
			{
				MONTHS_TITLES.map((title, i) => (
					<MonthItem
						key={title}
						title={title}
						index={i}
						onClick={handlerClick}
					/>
				))
			}
		</div>
	);
};

export default React.memo(YearView);
