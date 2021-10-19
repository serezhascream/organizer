import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TRootState } from '../data/types';
import { removeSettings } from '../utils/settings';
import { deleteAllEvents } from '../utils/events';

import { switchTheme, switchFirstDay } from '../features/settingsSlice';

import Popup from '../components/ui-kit/popup';
import Switcher from '../components/ui-kit/switcher';
import Button from '../components/ui-kit/button';

interface Props {
	onClose(): void;
}

const SettingsPopup: React.VFC<Props> = (props: Props) => {
	const { onClose = () => {} } = props;
	
	const dispatch = useDispatch();
	const theme = useSelector((state: TRootState): string => state.settings.theme);
	const firstDayIsMonday = useSelector(
		(state: TRootState): boolean => state.settings.firstDayIsMonday
	);
	const isDarkTheme = React.useMemo((): boolean => (theme === 'dark'), [theme]);
	
	const handlerChangeTheme = React.useCallback( (): void => {
			dispatch(switchTheme(theme === 'dark' ? 'light' : 'dark'));
		}, [dispatch, theme]
	);

	const handlerChangeFirstDay = React.useCallback(
		(checked: boolean): void => {
			dispatch(switchFirstDay(checked))
		}, [dispatch]
	);

	const handlerRemoveSettings = React.useCallback(() => {
		removeSettings();
		window.location.reload();
	}, []);

	const handlerDeleteAllEvents = React.useCallback(() => {
		deleteAllEvents();
		window.location.reload();
	}, []);

	return (
		<Popup
			title="Settings"
			onClose={onClose}
		>
			<>
				<Switcher
					name="darkTheme"
					checked={isDarkTheme}
					label="Use dark theme"
					onChange={handlerChangeTheme}
				/>
				<Switcher
					name="firstDayIsMonday"
					checked={firstDayIsMonday}
					label="Week starts on Monday"
					onChange={handlerChangeFirstDay}
				/>
				<div className="org-settings__subtitle">Data management</div>
				<div className="org-settings__buttons">
					<Button
						name="remove_settings"
						extraClass="org-settings__button-remove-settings"
						onClick={handlerRemoveSettings}
					>
						Restore settings
					</Button>
					<Button
						name="delete_events"
						onClick={handlerDeleteAllEvents}
					>
						Delete all events
					</Button>
				</div>
			</>
		</Popup>
	);
};

export default React.memo(SettingsPopup);
