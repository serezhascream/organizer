import * as React from 'react';

import { TCalendarData, TDayObject, TDaySelectFunc } from '../../data/types';
import WeekdayTitles from './weekdayTitles';
import Day from './day';

const MonthView = ({
	data = [],
	activeView,
	firstDayIsMonday,
	onClick,
}: {
	data: TCalendarData,
	activeView: string,
	firstDayIsMonday: boolean,
	onClick: TDaySelectFunc
}) => {
	const handlerClick = React.useCallback((day: TDayObject) => onClick(day), [onClick]);
	
	if (activeView !== 'month') {
		return null;
	}
	
	return (
		<React.Fragment>
			<WeekdayTitles firstDayIsMonday={firstDayIsMonday} />
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
