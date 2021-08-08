import * as React from 'react';

import { TCalendarData, TDayObject, TDaySelectFunc } from '../../data/types';
import WeekdayTitles from './weekdayTitles';
import Day from './day';

const MonthView = ({
	data = [],
	onClick,
	activeView,
}: {
	data: TCalendarData,
	onClick: TDaySelectFunc
	activeView: string,
}) => {
	const handlerClick = React.useCallback((day: TDayObject) => onClick(day), [onClick]);
	
	if (activeView !== 'month') {
		return null;
	}
	
	return (
		<React.Fragment>
			<WeekdayTitles />
			<div className="org-calendar__month">
				{
					data.map(day => (
						<Day key={day.timestamp} day={day} onClick={handlerClick} />
					))
				}
			</div>
		</React.Fragment>
	);
};

export default React.memo(MonthView);
