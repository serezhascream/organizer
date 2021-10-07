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

