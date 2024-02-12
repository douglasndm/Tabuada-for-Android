import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import './Services/Admob';

import Routes from '~/routes';
import PreferencesContext from './Contexts/PreferencesContext';

import { getEnableRemoveAds } from './Functions/RemoveAds';

import { GetTheme } from './Themes';

const theme = GetTheme();

const App: React.FC = () => {
	const [preferences, setPreferences] = useState({
		removeAds: false,
	});

	useEffect(() => {
		getEnableRemoveAds().then(response =>
			setPreferences({ removeAds: response })
		);
	}, []);

	return (
		<PreferencesContext.Provider
			value={{
				userPreferences: preferences,
				setUserPreferences: setPreferences,
			}}
		>
			<ThemeProvider theme={theme}>
				<NavigationContainer>
					<StatusBar
						backgroundColor="#00bfff"
						barStyle="light-content"
					/>
					<Routes />
				</NavigationContainer>
			</ThemeProvider>
		</PreferencesContext.Provider>
	);
};

const codePushOptions: CodePushOptions = {
	checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
	installMode: CodePush.InstallMode.ON_NEXT_RESUME,
};

export default CodePush(codePushOptions)(App);
