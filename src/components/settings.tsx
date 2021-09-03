import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '../data/types';

import { switchTheme, switchFirstDay } from '../features/settingsSlice';
import Switcher from './ui-kit/switcher';

const Settings: React.VFC = () => {
	const dispatch = useDispatch();
	const theme = useSelector((state: TRootState): string => state.settings.theme);
	const firstDayIsMonday = useSelector(
		(state: TRootState): boolean => state.settings.firstDayIsMonday
	);
	const isDarkTheme = React.useMemo((): boolean => (theme === 'dark'), [theme]);
	
	const handlerChangeTheme = React.useCallback( (): void => {
			dispatch(switchTheme(theme === 'dark' ? 'light' : 'dark'));
		}, [dispatch, theme]
	);

	const handlerChangeFirstDay = React.useCallback(
		(checked: boolean): void => {
			dispatch(switchFirstDay(checked))
		}, [dispatch]
	);

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
