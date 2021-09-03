import * as React from 'react';

import { testIds } from '../../data/tests';

interface Props {
	name: string,
	checked: boolean,
	label: string,
	onChange(checked: boolean, name:string): void
}

const Switcher: React.VFC<Props> = (props: Props) => {
	const {
		name = '',
		checked = false,
		label = '',
		onChange = () => {}
	} = props;
	
	const classChecked = React.useMemo(() => (checked ? ' org-switcher__checkbox--checked' : ''), [checked]);
	
	const handleChange = React.useCallback(
		(): void => onChange(!checked, name),
		[checked, name]
	);
	
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
