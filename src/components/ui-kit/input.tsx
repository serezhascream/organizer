import * as React from 'react';

import getClassNames from '../../utils/getClassNames';
import { testIds } from '../../data/tests';

interface Props {
	name: string;
	label?: string;
	inputType?: string;
	value: string | number | null;
	extraClass?: string;
	testId?: string,
	onChange(value:string | number | null, name: string): void;
}

const Input: React.VFC<Props> = (props: Props) => {
	const {
		name = '',
		label = '',
		inputType = 'text',
		value = '',
		extraClass = '',
		testId = testIds.input,
		onChange = () => {},
	} = props;
	
	const [
		inputValue,
		setInputValue
	] = React.useState<string | number | null>(value);
	
	
	const inputClasses = React.useMemo(
		() => getClassNames('org-input', extraClass), [extraClass]
	);

	const handlerChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			const { value } = e.target;
			
			setInputValue(value);
			onChange(value, name);
		}, [onChange, name]
	);
	
	return (
		<div className={inputClasses} data-testid={testIds.inputWrapper}>
			{
				label.length &&
				<div className="org-input__label">{ label }</div>
			}
			<input
				name={name}
				type={inputType}
				value={inputValue}
				className="org-input__input"
				onChange={handlerChange}
				data-testid={testId}
			/>
		</div>
	);
};

export default React.memo(Input);
