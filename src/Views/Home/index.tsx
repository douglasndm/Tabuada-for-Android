import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useContext,
} from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
	BannerAd,
	BannerAdSize,
	TestIds,
} from 'react-native-google-mobile-ads';
import EnvConfig from 'react-native-config';

import PreferencesContext from '~/Contexts/PreferencesContext';

import { getAllowedToReadIDFA } from '~/Functions/Privacy';

import Header from '~/Components/Header';

import {
	Container,
	Content,
	InputTextContainer,
	InputText,
	InputTextTip,
	InputContainer,
	Button,
	ButtonText,
} from './styles';

const Home: React.FC = () => {
	const { navigate, reset } = useNavigation();

	const { userPreferences } = useContext(PreferencesContext);

	useEffect(() => {
		if (Platform.OS === 'ios') {
			getAllowedToReadIDFA().then(response => {
				if (response === null) {
					reset({
						routes: [{ name: 'TrackingPermission' }],
					});
				}
			});
		}
	}, [reset]);

	const [numTabuar, setNumTabuar] = useState('');
	const [numVezes, setNumVezes] = useState('');

	const [numCalcError, setNumCalcError] = useState<string>('');
	const [numTimesError, setNumTimesError] = useState<string>('');

	const adUnit = useMemo(() => {
		if (__DEV__) {
			return TestIds.BANNER;
		}

		if (Platform.OS === 'ios') {
			return EnvConfig.IOS_ADMOB_ADUNIT_HOMEBANNER;
		}

		return EnvConfig.ANDROID_ADMOB_ADUNIT_HOMEBANNER;
	}, []);

	const handleCalc = useCallback(() => {
		if (!numTabuar || numTabuar < 0) {
			setNumCalcError('Digite de qual número você quer ver a tabuada');
			return;
		}
		if (!numVezes || numVezes < 0) {
			setNumTimesError('Digite até que número você quer a tabuada');
			return;
		}

		navigate('Results', {
			numberToCalc: numTabuar,
			howManyTimesCalc: numVezes,
		});
	}, [navigate, numTabuar, numVezes]);

	const handleOnTextChangeNum1 = useCallback(() => {
		setNumCalcError('');
	}, []);

	const handleOnTextChangeNum2 = useCallback(() => {
		setNumTimesError('');
	}, []);

	return (
		<Container>
			<Header />

			<Content>
				<InputContainer>
					<InputTextContainer hasError={!!numCalcError}>
						<InputText
							spellCheck={false}
							keyboardType="numeric"
							placeholder="Tabuada de qual número?"
							value={String(numTabuar)}
							onChangeText={v => {
								const regex = /^[0-9\b]+$/;

								if (v === '' || regex.test(v)) {
									setNumTabuar(v);
								}
							}}
							onChange={handleOnTextChangeNum1}
						/>
					</InputTextContainer>

					{!!numCalcError && (
						<InputTextTip>{numCalcError}</InputTextTip>
					)}

					<InputTextContainer hasError={!!numTimesError}>
						<InputText
							spellCheck={false}
							keyboardType="numeric"
							placeholder="Tabuada até qual número?"
							value={String(numVezes)}
							onChangeText={v => {
								const regex = /^[0-9\b]+$/;

								if (v === '' || regex.test(v)) {
									setNumVezes(v);
								}
							}}
							onChange={handleOnTextChangeNum2}
						/>
					</InputTextContainer>

					{!!numTimesError && (
						<InputTextTip>{numTimesError}</InputTextTip>
					)}

					<Button onPress={handleCalc}>
						<ButtonText>Calcular</ButtonText>
					</Button>
				</InputContainer>

				{!userPreferences.removeAds && (
					<BannerAd
						size={BannerAdSize.MEDIUM_RECTANGLE}
						unitId={adUnit}
					/>
				)}
			</Content>
		</Container>
	);
};

export default Home;
