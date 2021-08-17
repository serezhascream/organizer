import * as React from 'react';

import { TSettingsProps } from '../data/types';
import Switcher from './ui-kit/switcher';

const Settings = ({
	theme,
	firstDayIsMonday,
	onChangeTheme,
	onChangeFirstDay,
}: TSettingsProps) => {
	const isDarkTheme = React.useMemo(() => (theme === 'dark'), [theme]);
	
	const handlerChangeTheme = React.useCallback(
		(checked: boolean): void => onChangeTheme(checked), [onChangeTheme]);

	const handlerChangeFirstDay = React.useCallback(
		(checked: boolean): void => onChangeFirstDay(checked), [onChangeFirstDay]);

	return (
		<div className="org-settings">
			<div className="org-container__content-title">
				Settings
			</div>
			<Switcher
				name="darkTheme"
				checked={isDarkTheme}
				label="Use dark theme"
				onChange={handlerChangeTheme}
			/>
			<Switcher
				name="firstDayIsMonday"
				checked={firstDayIsMonday}
				label="Week starts on Monday"
				onChange={handlerChangeFirstDay}
			/>
		</div>
	);
};

export default React.memo(Settings);
