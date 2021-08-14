import * as React from 'react';

import { WEEKDAY_TITLES } from '../../data/constants';
import { testIds } from '../../data/tests';

const WeekdayTitles = ({ firstDayIsMonday }: { firstDayIsMonday: boolean }) => {
	const titles = React.useMemo(() => {
		if (firstDayIsMonday) {
			return WEEKDAY_TITLES;
		}

		return ['sun', ...WEEKDAY_TITLES.slice(0, -1)];
	}, [firstDayIsMonday]);

	const weekend_days = React.useMemo(
		() => (firstDayIsMonday ? [5, 6] : [0, 6]), [firstDayIsMonday]
	);
	
	return (
		
		<div className="org-calendar__weekday-titles" data-testid={testIds.weekdayTitles}>
			{
				titles.map((day, i) => {
					const weekendClass = weekend_days.includes(i) ? ' org-calendar__weekday-day--weekend' : '';
					
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
