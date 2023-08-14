import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { StorageValue, persist } from 'zustand/middleware';
import { UserCredentinals } from '../types/UserCredentinals';

interface UserState {
  isFirstRun: boolean;
  setFirstRun: (isFirstRun: boolean) => void;
  hydrated: boolean;
  credentials?: UserCredentinals;
  setCredentials: (credentials: UserCredentinals) => void;
  clearStore: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    set => ({
      isFirstRun: true,
      hydrated: false,
      setFirstRun: isFirstRun => set(() => ({ isFirstRun })),
      setCredentials: credentials => set(() => ({ credentials })),
      clearStore: () => set(() => ({ credentials: undefined })),
    }),
    {
      name: 'user',
      storage: {
        getItem: async key => {
          const value = await AsyncStorage.getItem(key);
          return value ? (JSON.parse(value) as StorageValue<UserState>) : null;
        },
        setItem: async (key, value) => {
          if (typeof value === 'object' && 'hydrate' in value) {
            delete value.hydrate;
          }
          return await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async key => {
          return await AsyncStorage.removeItem(key);
        },
      },
      partialize: state => ({ ...state, hydrated: true }), //isFirstRun: true }),
    },
  ),
);

export default useUserStore;
