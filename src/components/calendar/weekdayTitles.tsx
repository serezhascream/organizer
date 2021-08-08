import * as React from 'react';

import { WEEKDAY_TITLES } from '../../data/constants';

const WeekdayTitles = () => {
	return (
		<div className="org-calendar__weekday-titles">
			{
				WEEKDAY_TITLES.map((day, i) => {
					const weekendClass = i === 5 || i === 6 ? ' org-calendar__weekday-day--weekend' : '';
					
					return (
						<span
							key={day}
							className={`org-calendar__weekday-day${weekendClass}`}
						>
							{day}
						</span>
					);
				})
			}
		</div>
	);
};

export default React.memo(WeekdayTitles);
