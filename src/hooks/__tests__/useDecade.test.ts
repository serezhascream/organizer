import { describe, expect, it } from '@jest/globals';
import { renderHook, act } from '@testing-library/react-hooks';

import { getDecade, useDecade } from '../useDecade';
import { eighties_decade, nineties_decade } from '../../data/fixture';

describe('hooks > useDecade', () => {
	it('getDecade function returns correct decade for 1984', () => {
		const decade = getDecade(1984);
		
		expect(decade).toEqual(eighties_decade);
	});
	it('hook returns correct decade for 1984', () => {
		const { result } = renderHook(() => useDecade(1984));
		const [decade] = result.current;
		
		expect(decade).toEqual(eighties_decade);
	});
	it('hook switches decade to 90s', () => {
		const { result } = renderHook(() => useDecade(1984));
		const [decade, switchDecade] = result.current;
		
		act(() => {
			switchDecade('next');
		})
		
		expect(decade).toEqual(nineties_decade);
	});
});
