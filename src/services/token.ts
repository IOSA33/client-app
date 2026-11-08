import * as SecureStore from "expo-secure-store";

const KEY: string = "jwt";

export const saveToken = (token: string): Promise<void> => SecureStore.setItemAsync(KEY, token);
export const getToken = (): Promise<string | null> => SecureStore.getItemAsync(KEY);
export const clearToken = (): Promise<void> => SecureStore.deleteItemAsync(KEY);