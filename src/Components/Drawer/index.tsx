import React, { useCallback } from 'react';
import { useWindowDimensions, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const DrawerMenu: React.FC = (
) => {
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
	}, []);

	const handleNavigateToAbout = useCallback(() => {
		navigate('About');
	}, []);

	return (
		<Container>
			<MainMenuContainer>
				<LogoContainer>
					{windowHeight > 600 ? (
						<MenuItemText style={{ color: '#fff' }}>
							Tabuada
						</MenuItemText>
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
							<MenuItemText>
                            Início
							</MenuItemText>
						</MenuContent>
					</MenuItemContainer>
                    </DrawerSection>

			</MainMenuContainer>

			<DrawerSection>

            <MenuItemContainer onPress={handleNavigateToSettings}>
					<MenuContent>
						<Icons name="settings-outline" />
						<MenuItemText>
                        Configurações
						</MenuItemText>
					</MenuContent>
				</MenuItemContainer>

				<MenuItemContainer onPress={handleNavigateToAbout}>
					<MenuContent>
						<Icons name="help-circle-outline" />
						<MenuItemText>
                        Sobre
						</MenuItemText>
					</MenuContent>
				</MenuItemContainer>

				{/* <MenuItem
					label="Mais aplicativos"
					icon={() => <Icon name="globe-outline" />}
					onPress={handleNavigateToSite}
				/> */}
			</DrawerSection>
		</Container>
	);
};

export default DrawerMenu;
