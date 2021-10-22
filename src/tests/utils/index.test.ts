import * as u from '../../utils';
import * as f from '../fixture';

describe('utils > index', () => {
	it(
		'getUniqueValues returns duplicated values from the array',
		() => expect(u.getUniqueValues([1, 2, 6, 6, 6, 3])).toEqual([1, 2, 6, 3])
	);
	it(
		'getListTitle returns the default value',
		() => expect(u.getListTitle(null)).toEqual('Upcoming events')
	);
	it(
		'getListTitle returns the correct value for the timestamp',
		() => expect(u.getListTitle(f.sixOfMarch2021)).toEqual('March 6, 2021')
	);
	it(
		'getUpdatedDate returns a timestamp with the updated date',
		() => expect(u.getUpdatedDate(f.sixOfMarch2021, '2022-03-06')).toEqual(f.sixOfMarch2022)
	);
	it(
		'getUpdatedTime returns a timestamp with the updated time',
		() => expect(u.getUpdatedTime(f.sixOfMarch2022, '18:00')).toEqual(1646578800000)
	);
	it(
		'getDateInputValue returns the correct value for DateInput',
		() => expect(u.getDateInputValue(f.sixOfMarch2021)).toEqual('2021-03-06')
	);
	it(
		'getDateNumber returns a correct number (yyyymmdd)',
		() => expect(u.getDateNumber(f.sixOfMarch2021)).toEqual(20210306)
	);
	it(
		'getDateString returns a string with date only',
		() => expect(u.getDateString(f.testEventNoTime)).toEqual('10/14/2021')
	);
	it(
		'getDateString returns a string with date and time',
		() => expect(u.getDateString(f.testEvent)).toEqual('10/14/2021, 18:13')
	);
	it(
		'getEventPopupTitle returns a title for the new event',
		() => expect(u.getEventPopupTitle(null, 'edit')).toEqual('Create event')
	);
	it(
		'getEventPopupTitle returns a title for the editing event',
		() => expect(u.getEventPopupTitle(f.testEvent.id, 'edit')).toEqual('Edit event')
	);
	it(
		'getEventPopupTitle returns a title for Show view',
		() => expect(u.getEventPopupTitle(f.testEvent.id, 'show')).toEqual('Event')
	);
	it(
		'getEventItemDateString returns a date string only',
		() => expect(u.getEventItemDateString(f.testEventNoTime, null)).toEqual('10/14/2021')
	);
	it(
		'getEventItemDateString returns a date and time string',
		() => expect(u.getEventItemDateString(f.testEvent, null)).toEqual('10/14/2021, 18:13')
	);
	it(
		'getEventItemDateString returns a time string wnen day was selected',
		() => expect(u.getEventItemDateString(f.testEvent, f.sixOfMarch2021)).toEqual('18:13')
	);
	it(
		'getEventItemDateString returns an empty string wnen day was selected and event has no time',
		() => expect(u.getEventItemDateString(f.testEventNoTime, f.sixOfMarch2021)).toEqual('')
	)
});
