import * as SecureStore from 'expo-secure-store';
import { useSession } from '../ctx';

// This function can be called globally to log out user
export const signOutUser = async () => {
  await SecureStore.deleteItemAsync('accessToken');
  await SecureStore.deleteItemAsync('refreshToken');

  const authContext = useSession();
  authContext.signOut();
};
