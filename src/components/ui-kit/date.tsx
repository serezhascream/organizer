import * as React from 'react';

import { testIds } from '../../data/tests';

import { getUpdatedDate, getDateInputValue } from '../../utils';

interface Props {
	name?: string;
	timestamp: number;
	className?: string;
	testId?: string;
	onChange(value: number, name: string): void;
}

const DateInput: React.VFC<Props> = (props: Props) => {
	const {
		name = 'date',
		timestamp,
		className = null,
		testId = testIds.dateInput,
		onChange,	
	} = props;
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
		
		onChange(updatedDate, name);
	}, [onChange, timestamp, setDateValue, name]);

	React.useEffect(() => setDateValue(getDateInputValue(timestamp)), [timestamp]);
	
	return (
		<div className={wrapperClasses} data-testid={testIds.dateWrapper}>
			<label className="org-date-input__label">Date</label>
			<input
				className="org-date-input__input"
				data-testid={testId}
				type="date"
				value={dateValue}
				onChange={handlerChange}
			/>
		</div>
	);
};

export default React.memo(DateInput);
