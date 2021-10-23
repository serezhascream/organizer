import * as React from 'react';

import { testIds } from '../data/tests';
import getClassNames from '../utils/getClassNames';

import SettingsPopup from './settings';
import Icon from './ui-kit/icon';

const Header: React.VFC = () => {
	const [settingsPopupIsActive, setSettingsPopupIsActive] = React.useState(false);
	
	const handlerOpenSettings = React.useCallback(
		(): void => setSettingsPopupIsActive(true), [setSettingsPopupIsActive]
	);
	
	const handlerCloseSettings = React.useCallback(
		(): void => setSettingsPopupIsActive(false), [setSettingsPopupIsActive]
	);

	const iconClasses = React.useMemo(
		() => getClassNames(
			'org-settings-button',
			{ 'org-settings-button--active': settingsPopupIsActive }
		), [settingsPopupIsActive]
	);
	
	return (
		<>
			<section className="org-header">
				<h1 className="org-header__title">Organizer</h1>
				<Icon
					name={'settings'}
					className={iconClasses}
					testId={testIds.openSettingsButton}
					onClick={handlerOpenSettings}
				/>
			</section>
			{
				settingsPopupIsActive &&
				<SettingsPopup onClose={handlerCloseSettings} />
			}
		</>
	);
};

export default Header;
