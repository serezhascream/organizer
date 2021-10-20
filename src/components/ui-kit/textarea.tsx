import * as React from 'react';

import { testIds } from '../../data/tests';

interface Props {
	name: string;
	value: string;
	label?: string;
	extraClass?: string;
	testId?: string;
	onChange(value: string, name: string): void;
}

const Textarea: React.VFC<Props> = (props: Props) => {
	const {
		name,
		value,
		label = '',
		extraClass = '',
		testId = testIds.textarea,
		onChange = () => {},
	} = props;
	
	const [text, setText] = React.useState<string>(value);
	const wrapperClasses = React.useMemo(() => {
		const classes = ['org-textarea'];

		if (extraClass.length) {
			classes.push(extraClass);
		}

		return classes.join(' ');
	}, [extraClass]);
	
	const handlerChange = React.useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
			const { value } = e.target;
			
			setText(value);
			onChange(value, name);
		}, [onChange]
	);
	
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
				data-testid={testId}
			/>
		
		</div>
	);
};

export default React.memo(Textarea);
