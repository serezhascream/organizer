import * as React from 'react';

import { MONTHS_TITLES } from '../../data/constants';
import { TControlsProps } from '../../data/types';
import { getClassNames } from '../../utils/common';

const Controls = ({
	active,
	activeView,
	onSwitchDirection,
	onSwitchView,
}: TControlsProps) => {
	const monthTitle = React.useMemo(() => (MONTHS_TITLES[active.month]), [active]);
	const blockedArrowsClass = React.useMemo(() => (activeView === 'year' ? 'calendar__btn--blocked' : ''), [activeView]);

	const handlerClickPrev = React.useCallback(
		(): void => onSwitchDirection('prev'), [onSwitchDirection]
	);

	const handlerClickNext = React.useCallback(
		(): void => onSwitchDirection('next'), [onSwitchDirection]
	);
	
	const handlerClickOnMonth = React.useCallback(
		(): void => onSwitchView('year'), [onSwitchView]
	);

	const handlerClickOnYear = React.useCallback(
		(): void => onSwitchView('decade'), [onSwitchView]
	);
	
	return (
		<div className={getClassNames(['calendar__controls'])}>
			<span
				className={getClassNames(['calendar__btn', 'calendar__btn-prev', blockedArrowsClass])}
				onClick={handlerClickPrev}
			>{'<'}</span>
			<span
				className={getClassNames(['calendar__controls-month'])}
				onClick={handlerClickOnMonth}
			>
				{ monthTitle }
			</span>
			<span
				className={getClassNames(['calendar__controls-year'])}
				onClick={handlerClickOnYear}
			>
				{active.year}
			</span>
			<span
				className={getClassNames(['calendar__btn', 'calendar__btn-next', blockedArrowsClass])}
				onClick={handlerClickNext}
			>{'>'}</span>
		</div>
	);
};

export default React.memo(Controls);
