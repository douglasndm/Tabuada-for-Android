import React, { useState, useCallback, useEffect } from 'react';
import { View, Linking } from 'react-native';
import {
	getVersion,
	getBuildNumber,
	getSystemName,
	getSystemVersion,
} from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import Purchases from 'react-native-purchases';

import Header from '~/Components/Header';

import {
	Container,
	Content,
	ApplicationName,
	ApplicationVersion,
	AboutSection,
	UserId,
	Text,
	Link,
	SocialContainer,
	SocialIcon,
	IdContainer,
	IdButton,
} from './styles';

const About: React.FC = () => {
	const [pid, setPid] = useState('');
	const [firebaseId, setFirebaseId] = useState('');

	const loadData = useCallback(async () => {
		try {
			const purchase = await Purchases.getAppUserID();

			setPid(purchase);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
			}
		}

		try {
			const firebase = await messaging().getToken();

			setFirebaseId(firebase);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
			}
		}
	}, []);

	useEffect(() => {
		loadData();
	}, []);

	const handleNavigateToSite = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev');
	}, []);

	const navigateToTerms = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/terms/expiry-tracker');
	}, []);

	const navigateToPrivacy = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev/privacy');
	}, []);

	const handleNaviTelegram = useCallback(async () => {
		await Linking.openURL('https://t.me/douglasdev');
	}, []);

	const handleLinkedinPress = useCallback(async () => {
		await Linking.openURL('https://www.linkedin.com/in/douglasndm/');
	}, []);

	const handleNaviTwitter = useCallback(async () => {
		await Linking.openURL('https://www.twitter.com/douglasndmdev/');
	}, []);

	const handleNaviMail = useCallback(async () => {
		if (await Linking.canOpenURL('mailto:suporte@douglasndm.dev'))
			await Linking.openURL('mailto:suporte@douglasndm.dev');
	}, []);

	const handleFlatIconPress = useCallback(async () => {
		await Linking.openURL('https://www.flaticon.com/authors/srip');
	}, []);

	const handleFlatIconPROIconPress = useCallback(async () => {
		await Linking.openURL(
			'https://www.flaticon.com/free-icons/high-quality'
		);
	}, []);

	return (
		<Container>
			<Header title="Sobre" noDrawer />
			<Content>
				<AboutSection>
					<ApplicationName>Tabuada</ApplicationName>

					<View style={{ flexDirection: 'row' }}>
						<ApplicationVersion>
							{`Versão ${getVersion()} (Build: ${getBuildNumber()})`}
						</ApplicationVersion>
					</View>
					<ApplicationVersion>{`${getSystemName()} ${getSystemVersion()}`}</ApplicationVersion>
				</AboutSection>

				{(!!firebaseId || !!pid) && (
					<IdContainer>
						<IdButton>
							<View>
								<UserId>{`mid: ${firebaseId}`}</UserId>
								<UserId>{`pid: ${pid}`}</UserId>
							</View>
						</IdButton>
					</IdContainer>
				)}

				<AboutSection>
					<Text>
						Ao usar este aplicativo você está aceitando nossos
						<Link onPress={navigateToTerms}> Termos de uso</Link>
						{` e `}
						<Link onPress={navigateToPrivacy}>
							Política de Privacidade
						</Link>
						.
					</Text>
				</AboutSection>

				<AboutSection>
					<Text>Logo feito por</Text>

					<View>
						<Link onPress={handleFlatIconPress}>
							https://www.flaticon.com/authors/srip
						</Link>
					</View>
				</AboutSection>

				<AboutSection>
					<Text>
						High quality icons created by HAJICON - Flaticon
					</Text>
					<View>
						<Link onPress={handleFlatIconPROIconPress}>
							https://www.flaticon.com/free-icons/high-quality
						</Link>
					</View>
				</AboutSection>

				<AboutSection>
					<Text>Criado por Douglas Nunes de Mattos</Text>
				</AboutSection>

				<SocialContainer>
					<SocialIcon
						name="desktop-outline"
						onPress={handleNavigateToSite}
					/>

					<SocialIcon
						name="chatbubbles-outline"
						onPress={handleNaviTelegram}
					/>

					<SocialIcon
						name="logo-linkedin"
						onPress={handleLinkedinPress}
					/>
					<SocialIcon
						name="logo-twitter"
						onPress={handleNaviTwitter}
					/>
					<SocialIcon name="mail-outline" onPress={handleNaviMail} />
				</SocialContainer>
			</Content>
		</Container>
	);
};

export default About;
