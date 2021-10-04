import * as React from 'react';

import Icon from './ui-kit/icon';

interface Props {
	activeContentView: string | null;
	onOpenSettings(): void;
}

const Header: React.VFC<Props> = (props: Props) => {
	const { activeContentView, onOpenSettings } = props;

	const iconClasses = React.useMemo(() => {
		const classes = ['org-settings-button'];
		
		if (activeContentView === 'settings') {
			classes.push('org-settings-button--active');
		}

		return classes.join(' ');
	}, [activeContentView]);
	
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
