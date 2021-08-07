import * as React from 'react';

import { WEEKDAY_TITLES } from '../../data/constants';
import { getClassNames } from '../../utils/common';

const WeekdayTitles = () => {
	return (
		<div className={getClassNames(['calendar__weekday-titles'])}>
			{
				WEEKDAY_TITLES.map((day, i) => {
					const weekendClass = i === 5 || i === 6 ? 'calendar__weekday-day--weekend' : '';
					const weekdayClasses = getClassNames([
						'calendar__weekday-day',
						weekendClass.length && weekendClass
					]);
					
					return (<span key={day} className={weekdayClasses}>{day}</span>);
				})
			}
		</div>
	);
};

export default React.memo(WeekdayTitles);
