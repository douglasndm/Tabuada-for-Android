import admob, { MaxAdContentRating } from 'react-native-google-mobile-ads';

// Seta as configurações defaults para todos os ads no app
admob().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.G,
    tagForChildDirectedTreatment: false,
    tagForUnderAgeOfConsent: false,
});
