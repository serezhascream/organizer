import * as React from 'react';
import { TEventObj } from '../data/types';

export interface TEditingEvent {
	title: string;
	description: string;
	timestamp: number | null;
	hasTime: boolean;
}

export interface TUseEditEventReturn {
	event: TEditingEvent;
	saveButtonIsDisabled: boolean;
	onChange(value: string | number | boolean, name: string): void;
}

export const useEditEvent = (selectedEvent: TEventObj): TUseEditEventReturn => {
	const [ title, setTitle ] = React.useState<string>(selectedEvent.title);
	const [ description, setDescription ] = React.useState<string>(selectedEvent.description);
	const [ timestamp, setTimestamp ] = React.useState<number | null>(selectedEvent.timestamp || new Date().getTime());
	const [ hasTime, setHasTime ] = React.useState<boolean>(selectedEvent.hasTime);
	
	const saveButtonIsDisabled = React.useMemo((): boolean => (! title.length), [title]);

	const handlerChange = React.useCallback((value, name) => {
		switch(name) {
			case 'title': {
				setTitle(value);
				return;
			}
			case 'description': {
				setDescription(value);
				return;
			}
			case 'timeSwitcher': {
				setHasTime(value);
				return;
			}
			case 'date':
			case 'time': {
				setTimestamp(value);
				return;
			}
			default: return;
		}
	}, [setTitle, setDescription, setTimestamp, setHasTime]);
	
	return {
		event: { title, description, timestamp, hasTime },
		saveButtonIsDisabled,
		onChange: handlerChange,
	}
};
