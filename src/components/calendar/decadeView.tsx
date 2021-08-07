import * as React from 'react';
import { getClassNames } from '../../utils/common';

const YearItem = ({ year, onClick } : { year: number, onClick(year: number): void }) => {
	const handlerClick = React.useCallback((): void => onClick(year), [onClick, year]);
	
	return (
		<div
			className={getClassNames(['calendar__decade-year'])}
			onClick={handlerClick}
		>
			{year}
		</div>
	);
};

const DecadeView = ({
	decade,
	activeView,
	onClick,
}: {
	decade: number[]
	activeView: string,
	onClick(year: number): void,
}) => {

	const handlerClick = React.useCallback(
		(year: number): void => onClick(year), [onClick]
	);

	if (activeView !== 'decade') {
		return null;
	}
	
	return (
		<div className={getClassNames(['calendar__decade'])}>
			{
				decade.map(year => (
					<YearItem key={year} year={year} onClick={handlerClick} />
				))
			}
		</div>
	);
};

export default React.memo(DecadeView);
