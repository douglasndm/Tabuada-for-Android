import React, { useCallback, useMemo, useState } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer } from 'react-native-drawer-layout';

import DrawerMenu from '~/Components/Drawer';

import Home from '~/Views/Home';
import Results from '~/Views/Results';
import Settings from '~/Views/Settings';
import About from '~/Views/About';

import TrackingPermission from '~/Views/Permissions/AppleATT';
import DrawerContext from '~/Contexts/Drawer';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
	const [draweOpen, setDrawerOpen] = useState(false);

	const handleRouteChange = useCallback(_ => {
		setDrawerOpen(false);
	}, []);

	const toggleDrawer = useCallback(() => {
		setDrawerOpen(prevState => !prevState);
	}, []);

	const contextValue = useMemo(
		() => ({ setDrawerOpen, toggleDrawer }),
		[setDrawerOpen, toggleDrawer]
	);

	return (
		<Drawer
			open={draweOpen}
			onOpen={() => setDrawerOpen(true)}
			onClose={() => setDrawerOpen(false)}
			renderDrawerContent={() => <DrawerMenu />}
		>
			<DrawerContext.Provider value={contextValue}>
				<StatusBar backgroundColor="#00bfff" translucent />

				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					screenListeners={{ state: handleRouteChange }}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Results" component={Results} />
					<Stack.Screen name="Settings" component={Settings} />
					<Stack.Screen name="About" component={About} />
					<Stack.Screen
						name="TrackingPermission"
						component={TrackingPermission}
					/>
				</Stack.Navigator>
			</DrawerContext.Provider>
		</Drawer>
	);
};

export default Routes;
