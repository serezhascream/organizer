import * as React from 'react';

import { getUpdatedTime, getTimeInputValue } from '../../utils';
import { testIds } from '../../data/tests';

import Switcher from './switcher';

interface Props {
	timestamp: number;
	className?: string;
	timeIsEnabled: boolean;
	setTimeIsEnabled(value: boolean): void;
	onChange(value: number): void;
}

const TimeInput: React.VFC<Props> = (props: Props) => {
	const {
		timestamp,
		className = null,
		timeIsEnabled,
		setTimeIsEnabled,
		onChange,
	} = props;
	const [timeValue, setTimeValue] = React.useState<string>(() => getTimeInputValue(timestamp))
	const wrapperClasses = React.useMemo(() => {
		const classes = ['org-time-input'];
		
		if (className) {
			classes.push(className);
		}

		if (! timeIsEnabled) {
			classes.push('org-time-input--disabled');
		}

		return classes.join(' ');
	}, [className, timeIsEnabled])

	const handlerChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTimeValue(e.target.value);
		onChange(getUpdatedTime(timestamp, e.target.value));
	}, [setTimeValue, timestamp, onChange]);

	React.useEffect(() => setTimeValue(getTimeInputValue(timestamp)), [timestamp]);
	
	return (
		<div className={wrapperClasses} data-testid={testIds.timeWrapper}>
			<div className="org-time-input__label">
				<Switcher
					name="timeSwitcher"
					label="Time"
					opposite
					wrapperTestId={testIds.timeInputSwitcher}
					className="org-time-input__switcher"
					checked={timeIsEnabled}
					onChange={setTimeIsEnabled}
				/>
			</div>
			<input
				type="time"
				value={timeValue}
				className="org-time-input__input"
				data-testid={testIds.timeInput}
				disabled={! timeIsEnabled}
				onChange={handlerChange}
			/>
		</div>
	);
};

export default React.memo(TimeInput);
