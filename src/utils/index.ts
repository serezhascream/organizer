export const getListTitle = (selectedDay: number | null): string => {
	
	if (! selectedDay) {
		return 'Events';
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

