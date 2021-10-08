export const getListTitle = (selectedDay: number | null): string => {
	
	if (! selectedDay) {
		return 'Upcoming events';
	}
	
	const date = new Date(selectedDay);
	
	return date.toLocaleDateString(
		'en-US',
		{
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		},
	);
};

export const getDayTimestamp = (timestamp: number): number => {
	const date = new Date(timestamp);
	
	return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

export const getDayDateString = (timestamp: number): string => {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + (date.getDate())).slice(-2);

	return `${year}-${month}-${day}`;
}
