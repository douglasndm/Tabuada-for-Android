import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
	align-items: center;
	align-self: center;
	padding: 22px;

	background-color: ${props => props.theme.colors.accent};
	border-radius: 12px;
	margin: 10px 0;
	elevation: 2;
`;

export const ButtonText = styled.Text`
	color: #fff;
	text-align: center;
`;

export const Loading = styled.ActivityIndicator.attrs(() => ({
	size: 48,
	color: '#fff',
}))``;
