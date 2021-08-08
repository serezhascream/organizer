import * as React from 'react';

const YearItem = ({ year, onClick } : { year: number, onClick(year: number): void }) => {
	const handlerClick = React.useCallback((): void => onClick(year), [onClick, year]);
	
	return (
		<div className="org-calendar__decade-year" onClick={handlerClick}>
			{year}
		</div>
	);
};

export default React.memo(YearItem);
