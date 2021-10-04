import * as React from 'react';

interface Props {
	name: string;
	className?: string;
	onClick?: () => void;
}

const Icon: React.VFC<Props> = (props: Props) => {
	const { name, className = null, onClick = () => {} } = props;

	const classNames = React.useMemo(() => {
		const classes = ['org-icon'];

		if (className) {
			classes.push(className);
		}

		return classes.join(' ');
	}, [className]);
	
	return (
		<div className={classNames} onClick={onClick}>
			<svg className="org-icon__svg">
				<use xlinkHref={`#${name}`}></use>
			</svg>
		</div>
	);
};

export default Icon;