import * as React from 'react';
import { TDayObject, TSettingsObj } from '../data/types';

import Calendar from './calendar';
import Content from './content';
import Button from './ui-kit/button';
import { getSettings, saveSettings } from '../utils/settings';
import '../styles/index.scss';

const Organizer = () => {
	const [settings, setSettings] = React.useState(() => getSettings());
	const [theme, setTheme] = React.useState(settings.theme);
	const [firstDayIsMonday, setFirstDayIsMonday] = React.useState(settings.firstDayIsMonday);
	const [selected, setSelected] = React.useState(null);
	const [activeContentView, setActiveContentView] = React.useState(null);

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

	const handlerChangeTheme = React.useCallback((checked: boolean): void => {
		const newTheme = checked ? 'dark': 'light';
		
		document.querySelector('html').setAttribute('data-theme', newTheme);
		setTheme(newTheme);
	}, [settings, saveSettings]);

	const handlerChangeFirstDay = React.useCallback((checked: boolean): void => {
		setFirstDayIsMonday(checked);
	}, [setFirstDayIsMonday]);

	const handlerSaveSettings = React.useCallback((settings: TSettingsObj): void => {
		saveSettings(settings);
		setSettings(settings);
	}, []);
	
	React.useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', settings.theme);
	}, []);
	
	React.useEffect(() => handlerSaveSettings({ theme, firstDayIsMonday }), [theme, firstDayIsMonday]);
	
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
						firstDayIsMonday={firstDayIsMonday}
						selected={selected}
						onSelectDay={handlerSelectDay}
					/>
				</div>
				<Content
					activeView={activeContentView}
					theme={theme}
					firstDayIsMonday={firstDayIsMonday}
					onChangeTheme={handlerChangeTheme}
					onChangeFirstDay={handlerChangeFirstDay}
				/>
			</section>
		</div>
	);
};

export default React.memo(Organizer);
