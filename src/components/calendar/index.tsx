import * as React from 'react';

import { TCalendarProps } from '../../data/types';
import useCalendar from '../../hooks/useCalendar';
import useDecade from '../../hooks/useDecade';

import Controls from './controls';
import MonthView from './monthView';
import YearView from './yearView';
import DecadeView from './decadeView';

import '../../styles/calendar';

const Calendar = ({
	firstDayIsMonday = true,
	selected,
	onSelectDay,
}: TCalendarProps) => {
	const [calendar, { setActive, switchMonth }] = useCalendar(selected, firstDayIsMonday);
	const { data, active } = calendar;
	
	const [activeView, setActiveView] = React.useState('month');
	const [current, setCurrent] = React.useState(active);
	const [decade, switchDecade] = useDecade(current.year);
	
	const handleSwitchDirection = React.useCallback((direction: string): void => {
		if (activeView === 'month') {
			switchMonth(direction);
		}

		if (activeView === 'decade') {
			switchDecade(direction);
		}
	}, [activeView, switchMonth, switchDecade]);

	const handlerSwitchView = React.useCallback((view: string): void => {
		setActiveView(view);
	}, []);
	
	const handlerSelectDay = React.useCallback(day => {
		if (day.month !== 'current') {
			switchMonth(day.month);
		}

		onSelectDay(day);
	}, [switchMonth, onSelectDay]);

	const handlerSelectMonth = React.useCallback((month: number): void => {
		const { year } = current;
		
		setCurrent({ year, month });
		setActive({ year, month });
		setActiveView('month');
	}, [current, setActive]);

	const handlerSelectYear = React.useCallback((year: number): void => {
		const { month } = current;

		setCurrent({ year, month });
		setActiveView('year');
	},[current, setActive]);

	React.useEffect(() => {
		setCurrent(active);
	}, [active]);
	
	return (
		<div className="org-calendar">
			<Controls
				active={current}
				activeView={activeView}
				onSwitchDirection={handleSwitchDirection}
				onSwitchView={handlerSwitchView}
			/>
			<MonthView
				data={data}
				activeView={activeView}
				onClick={handlerSelectDay}
			/>
			<YearView
				activeView={activeView}
				onClick={handlerSelectMonth}
			/>
			<DecadeView
				decade={decade}
				activeView={activeView}
				onClick={handlerSelectYear}
			/>
		</div>
	);
};

export default React.memo(Calendar); 
