import * as React from 'react';

import { testIds } from '../../data/tests';
interface Props {
	name: string;
	className?: string;
	testId?: string;
	onClick?: () => void;
}

const Icon: React.VFC<Props> = (props: Props) => {
	const {
		name,
		className = null,
		testId = testIds.icon,
		onClick = () => {}
	} = props;

	const classNames = React.useMemo(() => {
		const classes = ['org-icon'];

		if (className) {
			classes.push(className);
		}

		return classes.join(' ');
	}, [className]);
	
	return (
		<div className={classNames} data-testid={testId} onClick={onClick}>
			<svg className="org-icon__svg">
				<use xlinkHref={`#${name}`}></use>
			</svg>
		</div>
	);
};

export default React.memo(Icon);
