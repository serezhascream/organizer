import getClassNames from '../../utils/getClassNames';

describe('utils > getClassNames', () => {
	it('returns a string with the main and first additional class', () => {
		expect(
			getClassNames(
				'test-class',
				{
					'additional-classname-1': true,
					'additional-classname-2': false
				}
			)
		).toEqual('test-class additional-classname-1');
	});
	
	it('returns a string with additional classes', () => {
		const sum = 18 + 8;
		const theme = 'dark';
		const nope = null;

		const classNames = getClassNames(
			'modal-window',
			nope,
			{
				'modal-window--active': sum > 17,
				[`modal-window--${theme}-theme`]: !! theme.length
			}
		);
		const expected = 'modal-window modal-window--active modal-window--dark-theme'

		expect(classNames).toEqual(expected);
	});

	it('returns a string with only mainClass', () => {
		expect(
			getClassNames(
				'main-wrapper',
				{ 'main-wrapper--dark-theme': false }
			)
		).toEqual('main-wrapper');
	});

	it('returns an empty string when no arguments provided', () => {
		expect(getClassNames()).toEqual('');
	});
});
