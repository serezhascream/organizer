import * as React from 'react';

import { testIds } from '../../data/tests';

const MonthItem = ({ title, index, onClick }: { title: string, index: number, onClick(index:number): void }) => {
	const handlerClick = React.useCallback(() => onClick(index), [onClick, index]);
	
	return (
		<div
			className="org-calendar__year-month"
			data-testid={testIds.monthItem}
			onClick={handlerClick}
		>
			{title}
		</div>
	);
};


export default React.memo(MonthItem);
