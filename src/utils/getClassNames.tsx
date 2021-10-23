type classMap = { [key: string]: boolean };

export default (...classNames: (string | classMap)[]): string => {
	const classes = classNames.reduce(
		(arr, className) => {
			if (! className) {
				return arr;
			}
			
			if (typeof className === 'string' && className.length) {
				return [...arr, className];
			}

			return Object.keys(className).reduce(
				(acc, r) => className[r] ? [...acc, r] : acc,
				[...arr]
			);
		},
		[]
	);
	
	return classes.join(' ');
}
