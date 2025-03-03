import * as SecureStore from 'expo-secure-store';

export const signOutUser = async (signOut: () => void) => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');
  signOut();
};
