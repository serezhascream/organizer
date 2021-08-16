import * as React from 'react';

import { TContentProps } from '../data/types';
import Settings from './settings';

const Content = ({
	activeView,
	theme,
	firstDayIsMonday,
	onChangeTheme,
	onChangeFirstDay,
}: TContentProps) => {

	const handlerChangeTheme = React.useCallback(
		(checked: boolean): void => onChangeTheme(checked), [onChangeTheme]
	);

	const handlerChangeFirstDay = React.useCallback(
		(checked: boolean): void => onChangeFirstDay(checked), [onChangeTheme]
	);

	if (! activeView) {
		return null;
	}
	
	return (
		<React.Fragment>
			<div className="org-container__divider" />
			{
				activeView === 'settings' &&
				<Settings
					theme={theme}
					firstDayIsMonday={firstDayIsMonday}
					onChangeTheme={handlerChangeTheme}
					onChangeFirstDay={handlerChangeFirstDay}
				/>
			}
		</React.Fragment>
	);
};

export default React.memo(Content);
