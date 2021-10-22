import * as React from 'react';

import { testIds } from '../../data/tests';

interface Props {
	children: React.ReactNode;
	name: string;
	disabled?: boolean;
	extraClass?: string;
	testId?: string;
	onClick(name:string): void;
}

const Button: React.VFC<Props> = (props: Props) => {
	const {
		children,
		name = '',
		extraClass = '',
		disabled = false,
		testId = testIds.button,
		onClick = () => {},
	} = props;
	
	const buttonClasses = React.useMemo(() => {
		const classes = ['org-button']

		if (extraClass.length) {
			classes.push(extraClass);
		}

		return classes.join(' ');
	
	}, [extraClass]);
	
	const handlerClick = React.useCallback((e: React.SyntheticEvent) => {
		e.preventDefault();
		
		onClick(name);
	}, [ onClick, name ]);
	
	return (
		<button
			className={buttonClasses}
			onClick={handlerClick}
			data-testid={testId}
			disabled={disabled}
		>
			{ children }
		</button>
	);
};

export default React.memo(Button);
