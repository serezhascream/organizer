import * as React from 'react';

import Switcher from './ui-kit/switcher';

interface TSettingsProps {
	settings: {
		theme: string,
		setTheme(theme: string): void,
		weekStartsOnMonday: boolean,
		setWeekStartsOnMonday(value: boolean): void
	}
}

const Settings = ({settings}: TSettingsProps) => {
	const {
		theme,
		setTheme,
		weekStartsOnMonday,
		setWeekStartsOnMonday,
	} = React.useMemo(() => settings, [settings]);

	
	const handlerChangeTheme = React.useCallback(checked => {
		const newTheme = checked ? 'dark': 'light';
		setTheme(newTheme);
		document.querySelector('html').setAttribute('data-theme', newTheme);
	}, [setTheme]);

	const handlerChangeFirstDay = React.useCallback((checked) => {
		setWeekStartsOnMonday(checked);
	}, [setWeekStartsOnMonday]);

	return (
		<div className="org-settings">
			<div className="org-container__content-title">
				Settings
			</div>
			<Switcher
				name="darkTheme"
				checked={theme === 'dark'}
				label="Use dark theme"
				onChange={handlerChangeTheme}
			/>
			<Switcher
				name="firstDayIsMonday"
				checked={weekStartsOnMonday}
				label="Week starts on Monday"
				onChange={handlerChangeFirstDay}
			/>
		</div>
	);
};

export default React.memo(Settings);
