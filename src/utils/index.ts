export const getListTitle = (selectedDay:number): string => {
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

