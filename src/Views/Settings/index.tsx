import React, { useState, useCallback, useContext } from 'react';
import { ScrollView } from 'react-native';
import { TabRouter, useNavigation } from '@react-navigation/native';

import PreferencesContext from '~/Contexts/PreferencesContext';

import Header from '~/Components/Header';
import Button from '~/Components/Button';

import {
	getPurchasesDetails,
	makePurchase,
	RestorePurchasers,
	getEnableRemoveAds,
} from '~/Functions/RemoveAds';

import {
	Container,
	PageHeader,
	PageTitle,
	SettingsContent,
	Category,
	CategoryTitle,
	CategoryOptions,
	SettingDescription,
} from './styles';

const Settings: React.FC = () => {
	const [isBuyLoading, setIsBuyLoading] = useState<boolean>(false);
	const [isRestoreLoading, setIsRestoreLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const { userPreferences, setUserPreferences } =
		useContext(PreferencesContext);
	const { goBack } = useNavigation();

	const onDimissError = useCallback(() => {
		setError('');
	}, []);

	const handleBuyRemoveAds = useCallback(async () => {
		setIsBuyLoading(true);
		try {
			const purchases = await getPurchasesDetails();
			console.log(purchases);
			await makePurchase(purchases[0]);
			setUserPreferences({
				removeAds: true,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsBuyLoading(false);
		}
	}, [setUserPreferences]);

	const handleRestore = useCallback(async () => {
		setIsRestoreLoading(true);
		try {
			await RestorePurchasers();

			const response = await getEnableRemoveAds();

			setUserPreferences({
				removeAds: response,
			});
		} catch (err) {
			console.log(err);
		} finally {
			setIsRestoreLoading(false);
		}
	}, [setUserPreferences]);

	return (
		<Container>
			<Header title="Configurações" />
			<ScrollView>
				<SettingsContent>
					<Category>
						<CategoryTitle>Anúncios</CategoryTitle>

						<CategoryOptions>
							<SettingDescription>
								Remova todos os anúncios do aplicativo
							</SettingDescription>

							{userPreferences.removeAds === true ? (
								<SettingDescription>
									Você já remove os anúncios
								</SettingDescription>
							) : (
								<>
									<Button
										text="Remover anúncios"
										onPress={handleBuyRemoveAds}
										isLoading={isBuyLoading}
									/>
									<Button
										text="Restaurar compra"
										onPress={handleRestore}
										isLoading={isRestoreLoading}
									/>
								</>
							)}
						</CategoryOptions>
					</Category>
				</SettingsContent>
			</ScrollView>
		</Container>
	);
};

export default Settings;
