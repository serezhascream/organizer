import * as React from 'react';

import { TSwitcherProps } from '../../data/types';
import { testIds } from '../../data/tests';

const Switcher = ({
	name = '',
	checked = false,
	label = '',
	onChange = () => {}
}:TSwitcherProps) => {
	const classChecked = React.useMemo(() => (checked ? ' org-switcher__checkbox--checked' : ''), [checked]);
	const handleChange = React.useCallback(() => onChange(!checked, name), [checked, name]);
	
	return (
		<div
			className="org-switcher"
			onClick={handleChange}
			data-testid={testIds.switcher}
		>
			<span
				className={`org-switcher__checkbox${classChecked}`}
				data-testid={testIds.switcherCheckbox}
			/>
			<span className="org-switcher__label">{ label }</span>
		</div>
	);
};

export default React.memo(Switcher);
