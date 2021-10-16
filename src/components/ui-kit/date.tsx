import * as React from 'react';

import { getUpdatedDate, getDateInputValue } from '../../utils';

interface Props {
	timestamp: number;
	className?: string;
	onChange(value: number): void;
}

const DateInput: React.VFC<Props> = (props: Props) => {
	const { timestamp, className = null, onChange } = props;
	const [dateValue, setDateValue] = React.useState<string>(() => getDateInputValue(timestamp));

	const wrapperClasses = React.useMemo(() => {
		const classes = ['org-date-input'];
		
		if (className) {
			classes.push(className);
		}

		return classes.join(' ');
	}, [className]);

	const handlerChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setDateValue(e.target.value);
		const updatedDate = getUpdatedDate(timestamp, e.target.value);
		
		onChange(updatedDate);
	}, [onChange, timestamp, setDateValue]);

	React.useEffect(() => setDateValue(getDateInputValue(timestamp)), [timestamp]);
	
	return (
		<div className={wrapperClasses}>
			<label className="org-date-input__label">Date</label>
			<input
				className="org-date-input__input"
				type="date"
				value={dateValue}
				onChange={handlerChange}
			/>
		</div>
	);
};

export default React.memo(DateInput);
