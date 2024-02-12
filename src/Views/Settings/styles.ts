import styled from 'styled-components/native';

interface Request {
	notPremium?: boolean;
}

export const Container = styled.View`
	flex: 1;
	background: ${props => props.theme.colors.background};
`;
export const SettingsContent = styled.View`
	padding: 0 16px 16px 16px;
`;

export const Category = styled.View`
	margin-top: 20px;
	padding: 15px 15px 25px;
	background-color: ${props => props.theme.colors.containers};
	border-radius: 12px;
`;

export const CategoryTitle = styled.Text`
	font-size: 21px;
	color: ${props => props.theme.colors.text};
`;

export const CategoryOptions = styled.View<Request>`
	margin-top: 20px;
	opacity: ${props => (props.notPremium ? 0.2 : 1)};
`;

export const SettingDescription = styled.Text`
	font-size: 14px;
	color: ${props => props.theme.colors.text};
`;
