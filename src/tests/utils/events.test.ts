import localStorageMock from '../mock/localStorage';
import localStorageFixture from '../fixture/localStorage';

import {
	loadEvents,
	saveEvents,
	deleteAllEvents,
	sortEventsByTimestamp,
	getMarkerNumber,
} from '../../utils/events';

const testEvent = {
	id: "KXKX8_3mWB5S63Wb9HCfq",
	timestamp: 1634224380000,
	title: "A new amazing event",
	description: "Some text",
	hasTime: true
};
		
describe('utils > events', () => {
	const localStorage = JSON.stringify(localStorageFixture);
	
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});
	});
	
	it('loadEvents returns events from localStorage', () => {
		const events = loadEvents();
		
		expect(events[2].timestamp).toEqual(1634282484406);
	});
	
	it('saveEvents saves writes events to localStorage', () => {
		const oldEvents = loadEvents();
		const newEvents = [ ...oldEvents, testEvent]
		
		saveEvents(newEvents);
		
		const savedEvents = loadEvents();
		
		expect(savedEvents[3].timestamp).toEqual(testEvent.timestamp);
	});
	it('deleteAllEvents removes all events from localStorage', () => {
		deleteAllEvents();
		
		const events = loadEvents();
		
		expect(events.length).toBeFalsy();
	});
	
	it('sortEventsByTimestamp returns the sorted events object', () => {
		const events = [
			...localStorageFixture.orgCalendarEvents,
			testEvent
		];
		
		const sortedEvents = sortEventsByTimestamp(events);
		
		expect(sortedEvents[3].timestamp).toEqual(1634541120000);
		
	});
	
	it('getMarkerNumber returns the correct timestamp', () => {
		expect(getMarkerNumber(1634112000000)).toEqual(1634072400000);
	});
});
