import React, { useCallback } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getVersion } from 'react-native-device-info';

import strings from '~/Locales';

import Header from '~/Components/Header';

import {
	Container,
	Content,
	PageTitle,
	ApplicationVersion,
	AboutSection,
	ApplicationName,
	Text,
	Link,
} from './styles';

const About: React.FC = () => {
	const { goBack } = useNavigation();

	const handleLinkedinPress = useCallback(async () => {
		await Linking.openURL('https://www.linkedin.com/in/douglasndm/');
	}, []);

	const iconsUrl = useCallback(async () => {
		await Linking.openURL('https://www.flaticon.com/authors/smashicons');
	}, []);

	const navigateToTerms = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/terms');
	}, []);

	const navigateToPrivacy = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/privacy');
	}, []);

	return (
		<Container>
			<Header title="Sobre" />

			<AboutSection>
				<ApplicationName>Tabuada</ApplicationName>
				<ApplicationVersion>
					{`Versão: ${getVersion()}`}
				</ApplicationVersion>
			</AboutSection>

			<AboutSection>
				<Text>Criado por Douglas Nunes de Mattos</Text>

				<Link onPress={handleLinkedinPress}>Linkedin</Link>
			</AboutSection>

			<AboutSection>
				<Text>Icons made by Smashicons from flaticon.com</Text>
			</AboutSection>

			<AboutSection>
				<Text>
					{strings.BeforeTermsAndPrivacy}
					<Link onPress={navigateToTerms}>{strings.Terms}</Link>
					{strings.BetweenTermsAndPrivacy}
					<Link onPress={navigateToPrivacy}>
						{strings.PrivacyPolicy}
					</Link>
					.
				</Text>
			</AboutSection>
		</Container>
	);
};

export default About;
