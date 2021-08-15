import * as React from 'react';

import { TTextareaProps } from '../../data/types';
import { testIds } from '../../data/tests';

const Textarea = ({
	name,
	value,
	label = '',
	extraClass = '',
	onChange = () => {},
}: TTextareaProps) => {
	const [text, setText] = React.useState(value);
	const wrapperClasses = React.useMemo(() => {
		const classes = ['org-textarea'];

		if (extraClass.length) {
			classes.push(extraClass);
		}

		return classes.join(' ');
	}, [extraClass]);
	
	const handlerChange = React.useCallback(e => {
		const { value } = e.target;
		
		setText(value);
		onChange(value, name);
	}, [onChange]);
	
	return (
		<div className={wrapperClasses} data-testid={testIds.textareaWrapper}>
			{
				label.length &&
				<div className="org-textarea__label">{ label }</div>
			}
			<textarea
				className="org-textarea__input"
				name={name}
				value={text}
				onChange={handlerChange}
				data-testid={testIds.textarea}
			/>
		
		</div>
	);
};

export default React.memo(Textarea);
