import * as React from 'react';
import { TAppProps, TDayObject } from '../data/types';

import Calendar from './calendar';

const Organizer = ({ firstDayIsMonday = true }: TAppProps) => {
	const [selected, setSelected] = React.useState(null);

	const handlerSelectDay = React.useCallback((day: TDayObject) => {
		if(selected && selected.timestamp === day.timestamp) {
			setSelected(null);
			return;
		}
		
		setSelected(day);
	}, [selected]);
	
	return (
		<Calendar
			firstDayIsMonday={firstDayIsMonday}
			selected={selected}
			onSelectDay={handlerSelectDay}
		/>
	);
};

export default React.memo(Organizer);
