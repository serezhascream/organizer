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
			<section className="org-header">
				<h1 className="org-header__title">Organizer</h1>
			</section>
			<div className="org-divider" />
			<section className="org-container">
				<div className="org-container__calendar">
					<Calendar
						firstDayIsMonday={firstDayIsMonday}
						selected={selected}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<div className="org-container__divider" />
				<div className="org-container__content">
					<div className="org-container__content-title">
						Events
					</div>
					<div className="org-container__content-list"></div>
				</div>
			</section>
		</div>
	);
};

export default React.memo(Organizer);
