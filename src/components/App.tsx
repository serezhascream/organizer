import * as React from 'react';
import { TAppProps, TDayObject } from '../data/types';

import Calendar from './calendar';

const ReactGridCalendar = ({
	//	decadeView = false,
	firstDayIsMonday = true,
	//markers = [],
	//onDayClickHandler = () => {},
	//onMonthSelect = () => {},
	//onYearSelect = () => {},
	//showPrevNextDates = true,
}: TAppProps) => {
	const [selected, setSelected] = React.useState(null);

	const handlerSelectDay = React.useCallback((day: TDayObject) => {
		setSelected(day);
	}, []);
	
	return (
		<Calendar
			firstDayIsMonday={firstDayIsMonday}
			selected={selected}
			onSelectDay={handlerSelectDay}
		/>
	);
};

export default React.memo(ReactGridCalendar); 
