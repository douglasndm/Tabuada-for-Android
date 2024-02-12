import Purchases, { PurchasesPackage } from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EnvConfig from 'react-native-config';


Purchases.configure({
	apiKey: EnvConfig.REVENUECAT_PUBLIC_APP_ID || '',
});


async function setEnableRemoveAds(remove: boolean): Promise<void> {
    await AsyncStorage.setItem('RemoveAds', String(remove));
}

export async function getEnableRemoveAds(): Promise<boolean> {
    const removed = await AsyncStorage.getItem('RemoveAds');

    if (!removed || removed === 'false') {
        return false;
    }

    return true;
}

export async function isRemoveAdsActive(): Promise<boolean> {
    const purchaserInfo = await Purchases.getCustomerInfo();

    if (
        typeof purchaserInfo.entitlements.active.removeAds !== 'undefined'
    ) {
        await setEnableRemoveAds(true);
        return true;
    }
    await setEnableRemoveAds(false);
    return false;
}

export async function getPurchasesDetails(): Promise<Array<PurchasesPackage>> {
    const offerings = await Purchases.getOfferings();

    const packages: Array<PurchasesPackage> = [];

    if (offerings.current && offerings.current.lifetime !== null) {
        packages.push(offerings.current.lifetime);
    }

    return packages;
}

export async function makePurchase(
    purchasePackage: PurchasesPackage
): Promise<void> {
    const {
        customerInfo
        // productIdentifier,
    } = await Purchases.purchasePackage(purchasePackage);

    // console.log(productIdentifier);
    // console.log(purchaserInfo);
    if (
        typeof customerInfo.entitlements.active.removeAds !== 'undefined'
    ) {
        await setEnableRemoveAds(true);
    }
}

export async function RestorePurchasers(): Promise<void> {
    const restore = await Purchases.restorePurchases();
    // ... check restored purchaserInfo to see if entitlement is now active

    restore.allPurchasedProductIdentifiers.forEach(async product => {
        if (product === 'tabuada.removeads') {
            await setEnableRemoveAds(true);
        }
    });
}

// Chama a função para verificar se usuário tem inscrição ativa (como o arquivo é importado
// na home ele verifica e já marca nas configurações a resposta)
isRemoveAdsActive().then(() => console.log('Purchases checked'));
