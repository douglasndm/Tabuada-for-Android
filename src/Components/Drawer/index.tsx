import React, { useCallback } from 'react';
import { useWindowDimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Logo from '~/Assets/Images/2490315.svg';

import {
	Container,
	MainMenuContainer,
	LogoContainer,
	MenuItemContainer,
	MenuContent,
	MenuItemText,
	Icons,
	DrawerSection,
} from './styles';

const DrawerMenu: React.FC = () => {
	const { navigate } = useNavigation();

	const windowHeight = useWindowDimensions().height;

	const handleNavigateToSite = useCallback(async () => {
		await Linking.openURL('https://douglasndm.dev');
	}, []);

	const navigateHome = useCallback(() => {
		navigate('Home', {});
	}, [navigate]);

	const handleNavigateToSettings = useCallback(() => {
		navigate('Settings');
	}, [navigate]);

	const handleNavigateToAbout = useCallback(() => {
		navigate('About');
	}, [navigate]);

	return (
		<Container>
			<MainMenuContainer>
				<LogoContainer>
					{windowHeight > 600 ? (
						<Logo width={120} height={120} />
					) : (
						<MenuItemText style={{ color: '#fff' }}>
							Tabuada
						</MenuItemText>
					)}
				</LogoContainer>

				<DrawerSection>
					<MenuItemContainer onPress={navigateHome}>
						<MenuContent>
							<Icons name="home-outline" />
							<MenuItemText>Início</MenuItemText>
						</MenuContent>
					</MenuItemContainer>
				</DrawerSection>
			</MainMenuContainer>

			<DrawerSection>
				<MenuItemContainer onPress={handleNavigateToSettings}>
					<MenuContent>
						<Icons name="settings-outline" />
						<MenuItemText>Configurações</MenuItemText>
					</MenuContent>
				</MenuItemContainer>

				<MenuItemContainer onPress={handleNavigateToSite}>
					<MenuContent>
						<Icons name="globe-outline" />
						<MenuItemText>Mais aplicativos</MenuItemText>
					</MenuContent>
				</MenuItemContainer>

				<MenuItemContainer onPress={handleNavigateToAbout}>
					<MenuContent>
						<Icons name="help-circle-outline" />
						<MenuItemText>Sobre</MenuItemText>
					</MenuContent>
				</MenuItemContainer>
			</DrawerSection>
		</Container>
	);
};

export default DrawerMenu;
