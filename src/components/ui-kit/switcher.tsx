import * as React from 'react';

import getClassNames from '../../utils/getClassNames';
import { testIds } from '../../data/tests';

interface Props {
	name: string;
	checked: boolean;
	label: string;
	opposite?: boolean;
	className?: string;
	wrapperTestId?: string;
	checkboxTestId?: string;
	onChange(checked: boolean, name:string): void;
}

const Switcher: React.VFC<Props> = (props: Props) => {
	const {
		name = '',
		checked = false,
		label = '',
		opposite = false,
		className = null,
		wrapperTestId = testIds.switcher,
		checkboxTestId = testIds.switcherCheckbox,
		onChange = () => {}
	} = props;
	
	const switcherWrapperClasses = React.useMemo(
		() => getClassNames(
			'org-switcher',
			className,
			{'org-switcher--opposite': opposite}
		), [className, opposite]
	);
	
	const checkboxClassNames = React.useMemo(
		() => getClassNames(
			'org-switcher__checkbox',
			{ 'org-switcher__checkbox--checked': checked }
		), [checked]
	);
	
	const handleChange = React.useCallback(
		(): void => onChange(!checked, name),
		[checked, name]
	);
	
	return (
		<div
			className={switcherWrapperClasses}
			onClick={handleChange}
			data-testid={wrapperTestId}
		>
			<span
				className={checkboxClassNames}
				data-testid={checkboxTestId}
			/>
			<span className="org-switcher__label">{ label }</span>
		</div>
	);
};

export default React.memo(Switcher);
