import * as React from 'react';

import { getUpdatedTime, getTimeInputValue } from '../../utils';
import { testIds } from '../../data/tests';
import getClassNames from '../../utils/getClassNames';

import Switcher from './switcher';

interface Props {
	inputName?: string;
	switcherName?: string;
	timestamp: number;
	className?: string;
	timeIsEnabled: boolean;
	switcherTestId?: string;
	inputTestId?: string;
	onChange(value: number | boolean, name: string): void;
}

const TimeInput: React.VFC<Props> = (props: Props) => {
	const {
		inputName = 'time',
		switcherName = 'timeSwitcher',
		timestamp,
		className = null,
		timeIsEnabled,
		switcherTestId = testIds.timeInputSwitcher,
		inputTestId = testIds.timeInput,
		onChange,
	} = props;
	const [timeValue, setTimeValue] = React.useState<string>(() => getTimeInputValue(timestamp))
	
	const wrapperClasses = React.useMemo(
		() => getClassNames(
			'org-time-input',
			className,
			{ 'org-time-input--disabled': ! timeIsEnabled }
		),
		[className, timeIsEnabled],
	);

	const handlerChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTimeValue(e.target.value);
		const updatedTime = getUpdatedTime(timestamp, e.target.value);
		
		onChange(updatedTime, inputName);
	}, [setTimeValue, timestamp, inputName, onChange]);

	const handlerChangeSwitcher = React.useCallback((value: boolean) => {
		onChange(value, switcherName);
	}, [switcherName]);

	React.useEffect(() => setTimeValue(getTimeInputValue(timestamp)), [timestamp]);
	
	return (
		<div className={wrapperClasses} data-testid={testIds.timeWrapper}>
			<div className="org-time-input__label">
				<Switcher
					name={switcherName}
					label="Time"
					opposite
					wrapperTestId={switcherTestId}
					className="org-time-input__switcher"
					checked={timeIsEnabled}
					onChange={handlerChangeSwitcher}
				/>
			</div>
			<input
				name={inputName}
				type="time"
				value={timeValue}
				className="org-time-input__input"
				data-testid={inputTestId}
				disabled={! timeIsEnabled}
				onChange={handlerChange}
			/>
		</div>
	);
};

export default React.memo(TimeInput);
