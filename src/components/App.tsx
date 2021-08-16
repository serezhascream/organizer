import * as React from 'react';
import { TAppProps, TDayObject } from '../data/types';

import Calendar from './calendar';
import Content from './content';
import Button from './ui-kit/button';
import '../styles/index.scss';

const Organizer = ({ firstDayIsMonday = true }: TAppProps) => {
	const [selected, setSelected] = React.useState(null);
	const [theme, setTheme] = React.useState('dark');
	const [weekStartsOnMonday, setWeekStartsOnMonday] = React.useState(firstDayIsMonday);
	const [activeContentView, setActiveContentView] = React.useState(null);
	const settings = React.useMemo(() => ({
		theme,
		setTheme,
		weekStartsOnMonday,
		setWeekStartsOnMonday,
	}), [
		theme,
		setTheme,
		weekStartsOnMonday,
		setWeekStartsOnMonday,
	]);

	const handlerSelectDay = React.useCallback((day: TDayObject) => {
		if(selected && selected.timestamp === day.timestamp) {
			setSelected(null);
			return;
		}
		
		setSelected(day);
	}, [selected]);

	const handlerOpenSettings = React.useCallback(() => {
		const newView = activeContentView === 'settings' ? null : 'settings';

		setActiveContentView(newView)
	}, [activeContentView, setActiveContentView]);
	
	return (
		<div className="org-wrapper">
			<section className="org-header">
				<h1 className="org-header__title">Organizer</h1>
				<Button
					name="settings"
					onClick={handlerOpenSettings}
				>S</Button>
			</section>
			<div className="org-divider" />
			<section className="org-container">
				<div className="org-container__calendar">
					<Calendar
						firstDayIsMonday={weekStartsOnMonday}
						selected={selected}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content activeView={activeContentView} settings={settings} />
			</section>
		</div>
	);
};

export default React.memo(Organizer);
