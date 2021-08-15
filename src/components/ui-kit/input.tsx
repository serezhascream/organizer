import * as React from 'react';

import { TInputProps } from '../../data/types';
import { testIds } from '../../data/tests';

const Input = ({
	name = '',
	label = '',
	inputType = 'text',
	value = '',
	extraClass = '',
	onChange = () => {},
}: TInputProps) => {
	const [inputValue, setInputValue] = React.useState(value);
	const inputClasses = React.useMemo(() => {
		const classes = ['org-input'];

		if (extraClass.length) {
			classes.push(extraClass);
		}

		return classes.join(' ');
	}, [extraClass]);

	const handlerChange = React.useCallback(e => {
		const { value } = e.target;
		
		setInputValue(value);
		onChange(value, name);
	}, [onChange, name]);
	
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
				data-testid={testIds.input}
			/>
		</div>
	);
};

export default React.memo(Input);
