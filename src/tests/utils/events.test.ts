import localStorageMock from '../mock/localStorage';
import localStorageFixture from '../fixture/localStorage';
import * as u from '../../utils/events';
import { testEvent } from '../fixture';
		
describe('utils > events', () => {
	const localStorage = JSON.stringify(localStorageFixture);
	
	beforeAll(() => {
		Object.defineProperty(window, 'localStorage', {
			value: localStorageMock(localStorage)
		});
	});
	
	it('loadEvents returns events from localStorage', () => {
		const events = u.loadEvents();
		
		expect(events[2].timestamp).toEqual(1634282484406);
	});
	
	it('saveEvents saves writes events to localStorage', () => {
		const oldEvents = u.loadEvents();
		const newEvents = [ ...oldEvents, testEvent]
		
		u.saveEvents(newEvents);
		
		const savedEvents = u.loadEvents();
		
		expect(savedEvents[3].timestamp).toEqual(testEvent.timestamp);
	});
	it('deleteAllEvents removes all events from localStorage', () => {
		u.deleteAllEvents();
		
		const events = u.loadEvents();
		
		expect(events.length).toBeFalsy();
	});
	
	it('sortEventsByTimestamp returns the sorted events object', () => {
		const events = [
			...localStorageFixture.orgCalendarEvents,
			testEvent
		];
		
		const sortedEvents = u.sortEventsByTimestamp(events);
		
		expect(sortedEvents[3].timestamp).toEqual(1634541120000);
		
	});
	
	it('getMarkerNumber returns the correct timestamp', () => {
		expect(u.getMarkerNumber(1634112000000)).toEqual(1634072400000);
	});
});
