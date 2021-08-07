import * as React from 'react';

import { TUseDecadeReturn } from '../data/types';

const getDecade = (year: number): number[] => {
	const decade = [];
	const firstYear = year - (year % 10);
	const lastYear = firstYear + 9;
	
	for (let i = firstYear; i <= lastYear; i++) {
		decade.push(i);
	}
	
	return decade;
};

const useDecade = (currentYear: number): TUseDecadeReturn => {
	const [decade, setDecade] = React.useState(() => getDecade(currentYear));
	
	const handlerSwitchDecade = React.useCallback((direction: string): void => {
		if (direction === 'prev') {
			setDecade(getDecade(decade[0] - 10));
			return;
		}
		
		setDecade(getDecade(decade[0] + 10));
	}, [decade]);
	
	return [ decade, handlerSwitchDecade ];
};

export default useDecade;
