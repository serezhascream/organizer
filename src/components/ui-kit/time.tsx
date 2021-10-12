import * as React from 'react';

import { getUpdatedTime, getTimeString } from '../../utils';

interface Props {
	timestamp: number;
	className?: string;
	onChange(value: number): void;
}

const TimeInput: React.VFC<Props> = (props: Props) => {
	const { timestamp, className, onChange } = props;
	const [timeValue, setTimeValue] = React.useState<string>(() => getTimeString(timestamp))
	const wrapperClasses = React.useMemo(() => {
		const classes = ['org-time-input'];
		
		if (className) {
			classes.push(className);
		}

		return classes.join(' ');
	}, [className])

	const handlerChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTimeValue(e.target.value);
		onChange(getUpdatedTime(timestamp, e.target.value));
	}, [setTimeValue, onChange]);
	
	return (
		<div className={wrapperClasses}>
			<label className="org-time-input__label">
				<span>{ 'Time' }</span>
			</label>
			<input
				type="time"
				value={timeValue}
				className="org-time-input__input"
				onChange={handlerChange}
			/>
		</div>
	);
};

export default TimeInput;
