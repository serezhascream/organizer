import * as React from 'react';

import Settings from './settings';

interface TContentProps {
	activeView: string | null,
	settings: {
		theme: string,
		setTheme(theme: string): void,
		weekStartsOnMonday: boolean,
		setWeekStartsOnMonday(value: boolean): void
	}
}

const Content = ({ activeView, settings }: TContentProps) => {

	if (! activeView) {
		return null;
	}
	
	return (
		<React.Fragment>
			<div className="org-container__divider" />
			{
				activeView === 'settings' &&
				<Settings settings={settings} />
			}
		</React.Fragment>
	);
};

export default React.memo(Content);
