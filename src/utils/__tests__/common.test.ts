import { describe, expect, it } from '@jest/globals';
import { day } from '../../data/fixture';

import { getDayClasses } from '../common';

describe('utils > common', () => {
	it('returns the default class', () => {
		const expected = ['org-calendar__day'];
		const classes = getDayClasses(day);

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
	
	it('returns today class', () => {
		const expected = ['org-calendar__day--today'];
		const classes = getDayClasses({ ...day, isToday: true });

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
	
	it('returns prev month class', () => {
		const expected = ['org-calendar__day--prev'];
		const classes = getDayClasses({...day, month: 'prev'});

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
	
	it('returns weekend class', () => {
		const expected = ['org-calendar__day--weekend'];
		const classes = getDayClasses({...day, isWeekend: true});

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
	
	it('returns selected day class', () => {
		const expected = ['org-calendar__day--selected'];
		const classes = getDayClasses({...day, isSelected: true});

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
	
	it('returns multiple classes together', () => {
		const expected = [
			'org-calendar__day',
			'org-calendar__day--today',
			'org-calendar__day--weekend',
			'org-calendar__day--selected'
		];
		const classes = getDayClasses({
			...day,
			isToday: true,
			isWeekend: true,
			isSelected: true
		});

		expect(classes).toEqual(
			expect.arrayContaining(expected)
		);
	});
});
