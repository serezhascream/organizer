import * as React from 'react';

import { testIds } from '../../data/tests';
import { TButtonProps } from '../../data/types';

const Button = ({
	children,
	name = '',
	extraClass = '',
	disabled = false,
	onClick = () => {},
}: TButtonProps) => {
	const buttonClasses = React.useMemo(() => {
		const classes = ['org-button']

		if (extraClass.length) {
			classes.push(extraClass);
		}

		return classes.join(' ');
	
	}, [extraClass]);
	
	const handlerClick = React.useCallback((e) => {
		e.preventDefault();
		
		onClick(name);
	}, [ onClick, name ]);
	
	return (
		<button
			className={buttonClasses}
			onClick={handlerClick}
			data-testid={testIds.button}
			disabled={disabled}
		>
			{ children }
		</button>
	);
};

export default React.memo(Button);
