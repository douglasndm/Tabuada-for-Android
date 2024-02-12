import styled from 'styled-components/native';
import { Appbar } from 'react-native-paper';

export const AppBarHeader = styled(Appbar.Header)`
	background-color: #00bfff;
`;

export const AppBarBackAction = styled(Appbar.BackAction).attrs(() => ({
	color: '#ffffff',
}))``;

export const AppBarContent = styled(Appbar.Content).attrs(() => ({
	color: '#ffffff',
}))``;

export const Container = styled.SafeAreaView`
	background-color: ${props => props.theme.colors.accent};
`;

export const AppBarAction = styled(Appbar.Action).attrs(() => ({
	color: '#ffffff',
}))``;
