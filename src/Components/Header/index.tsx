import React, { useCallback, useState } from 'react';
import { Platform, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Menu, MenuItemProps, AppbarActionProps } from 'react-native-paper';

import { useDrawer } from '~/Contexts/Drawer';

import {
	AppBarHeader,
	AppBarBackAction,
	AppBarContent,
	AppBarAction,
} from './styles';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export interface RequestProps {
	title?: string;
	noDrawer?: boolean;
	onBackPressed?: () => void;
	onMenuPress?: () => void;
	appBarActions?: AppbarActionProps[];
	moreMenuItems?: MenuItemProps[];
	disableBackButton?: boolean;
}

const Header: React.FC<RequestProps> = ({
	title,
	noDrawer,
	onBackPressed,
	onMenuPress,
	appBarActions,
	moreMenuItems,
	disableBackButton,
}: RequestProps) => {
	const navigation = useNavigation();

	const { toggleDrawer } = useDrawer();

	const [showMenu, setShowMenu] = useState(false);

	const handleGoBack = useCallback(() => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	}, [navigation]);

	const switchShowMenu = useCallback(() => {
		setShowMenu(prevValue => !prevValue);
	}, []);

	return (
		<Pressable>
			<AppBarHeader>
				{!disableBackButton && (
					<>
						{noDrawer ? (
							<AppBarBackAction
								onPress={onBackPressed || handleGoBack}
							/>
						) : (
							<AppBarAction
								icon="menu"
								onPress={onMenuPress || toggleDrawer}
							/>
						)}
					</>
				)}

				<AppBarContent title={title || 'Tabuada'} color="white" />

				{appBarActions &&
					appBarActions.length > 0 &&
					appBarActions.map(item => (
						<AppBarAction key={item.icon} {...item} />
					))}

				{moreMenuItems && moreMenuItems.length > 0 && (
					<Menu
						visible={showMenu}
						onDismiss={switchShowMenu}
						anchor={
							<AppBarAction
								icon={MORE_ICON}
								onPress={switchShowMenu}
							/>
						}
					>
						{moreMenuItems.map(item => (
							<Menu.Item
								{...item}
								key={item.title}
								onPress={e => {
									switchShowMenu();
									if (item.onPress) item.onPress(e);
								}}
							/>
						))}
					</Menu>
				)}
			</AppBarHeader>
		</Pressable>
	);
};

export default Header;
