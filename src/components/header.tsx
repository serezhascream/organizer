import * as React from 'react';

import { Icon } from './ui-kit';

interface Props {
	settingsPopupIsActive: boolean;
	onOpenSettings(): void;
}

const Header: React.VFC<Props> = (props: Props) => {
	const {
		settingsPopupIsActive,
		onOpenSettings
	} = props;

	const iconClasses = React.useMemo(() => {
		const classes = ['org-settings-button'];
		
		if (settingsPopupIsActive) {
			classes.push('org-settings-button--active');
		}

		return classes.join(' ');
	}, [settingsPopupIsActive]);
	
	return (
		<section className="org-header">
			<h1 className="org-header__title">Organizer</h1>
			<Icon
				name={'settings'}
				className={iconClasses}
				onClick={onOpenSettings}
			/>
		</section>
	);
};

export default Header;
