import * as React from 'react';

import { TDayObject, TDaySelectFunc } from '../../data/types';
import { getDayClasses } from '../../utils/common';

const Day = ({
	day,
	onClick
}: {
	day: TDayObject,
	onClick: TDaySelectFunc
}) => {
	const classes = getDayClasses(day);
	const handlerClick = React.useCallback(() => onClick(day), [onClick, day]);
	
	return (
		<span
			key={day.timestamp}
			className={classes.join(' ')}
			onClick={handlerClick}
		>
			{day.day}
		</span>
	);
};

export default React.memo(Day);
