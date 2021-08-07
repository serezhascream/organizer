import * as React from 'react';

import { getClassNames } from '../../utils/common';

const MonthItem = ({ title, index, onClick }: { title: string, index: number, onClick(index:number): void }) => {
	const handlerClick = React.useCallback(() => onClick(index), [onClick, index]);
	
	return (
		<div
			className={getClassNames(['calendar__year-month'])}
			onClick={handlerClick}
		>
			{title}
		</div>
	);
};


export default React.memo(MonthItem);
