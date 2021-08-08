import * as React from 'react';

import { TDecadeViewProps } from '../../data/types';
import YearItem from './yearItem';

const DecadeView = ({ decade, activeView, onClick, }: TDecadeViewProps) => {

	const handlerClick = React.useCallback(
		(year: number): void => onClick(year), [onClick]
	);

	if (activeView !== 'decade') {
		return null;
	}
	
	return (
		<div className="org-calendar__decade">
			{
				decade.map(year => (
					<YearItem key={year} year={year} onClick={handlerClick} />
				))
			}
		</div>
	);
};

export default React.memo(DecadeView);
