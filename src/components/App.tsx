import * as React from 'react';
import { TAppProps, TDayObject } from '../data/types';

import Calendar from './calendar';
import '../styles/index.scss';

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
		<div className="org-wrapper">
			<div className="org-header">
				<h1 className="org-header__title">Organizer</h1>
			</div>
			<div className="org-content">
				<div className="org-content__calendar">
					<Calendar
						firstDayIsMonday={firstDayIsMonday}
						selected={selected}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<div className="org-content__event-list" />
			</div>
		</div>
	);
};

export default React.memo(Organizer);
