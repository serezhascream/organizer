import * as React from 'react';

import { TContentProps } from '../data/types';
import Settings from './settings';
import List from './list';

const Content = ({
	activeView,
	theme,
	firstDayIsMonday,
	onChangeTheme,
	onChangeFirstDay,
	selected,
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
			{
				activeView === 'list' &&
				<List selected={selected} />
			}
		</React.Fragment>
	);
};

export default React.memo(Content);
