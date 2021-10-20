import * as React from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../data/types';
import { testIds } from '../data/tests';

import Calendar from './calendar';
import Header from './header';
import Content from './content';
import 'react-grid-calendar/lib/styles/index.scss';
import '../styles/index.scss';

const Organizer: React.VFC = () => {
	const [selectedDay, setSelectedDay] = React.useState<number | null>(null);
	const theme = useSelector((state: TRootState): string => state.settings.theme);
	
	const handlerSelectDay = React.useCallback(
		(day: number | null): void => setSelectedDay(day), [selectedDay]
	);

	React.useEffect(() => {
		document.querySelector('html').setAttribute('data-theme', theme);
	}, [theme]);
	
	return (
		<main className="org-wrapper" data-testid={testIds.mainWrapper}>
			<Header />
			<div className="org-divider" />
			<section className="org-container">
				<Calendar onSelectDay={handlerSelectDay} />
				<Content selectedDay={selectedDay} />
			</section>
		</main>
	);
};

export default React.memo(Organizer);
