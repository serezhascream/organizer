import * as React from 'react';

import { MONTHS_TITLES } from '../../data/constants';
import { TControlsProps } from '../../data/types';
import { testIds } from '../../data/tests';

const Controls = ({
	active,
	activeView,
	onSwitchDirection,
	onSwitchView,
}: TControlsProps) => {
	const monthTitle = React.useMemo(() => (MONTHS_TITLES[active.month]), [active]);
	const blockedArrowsClass = React.useMemo(() => (activeView === 'year' ? ' org-calendar__btn--blocked' : ''), [activeView]);

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
		<div className="org-calendar__controls" data-testid={testIds.controls}>
			<span
				className={`org-calendar__btn org-calendar__btn-prev${blockedArrowsClass}`}
				data-testid={testIds.controlsPrevBtn}
				onClick={handlerClickPrev}
			>{'<'}</span>
			<span
				className="org-calendar__controls-month"
				data-testid={testIds.controlsMonthTitle}
				onClick={handlerClickOnMonth}
			>
				{ monthTitle }
			</span>
			<span
				className="org-calendar__controls-year"
				data-testid={testIds.controlsYearTitle}
				onClick={handlerClickOnYear}
			>
				{active.year}
			</span>
			<span
				className={`org-calendar__btn org-calendar__btn-next${blockedArrowsClass}`}
				data-testid={testIds.controlsNextBtn}
				onClick={handlerClickNext}
			>{'>'}</span>
		</div>
	);
};

export default React.memo(Controls);
