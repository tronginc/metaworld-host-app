import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { StorageValue, persist } from 'zustand/middleware';
import { User, UserCredentinals } from '../types/User';

interface UserState {
  hydrated: boolean;
  hydrateFinished: () => void;

  isFirstRun: boolean;
  setFirstRun: (isFirstRun: boolean) => void;

  credentials?: UserCredentinals;
  setCredentials: (credentials: UserCredentinals) => void;

  user?: User;
  setUser: (user: User) => void;

  clearStore: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    set => ({
      isFirstRun: true,

      hydrated: false,
      hydrateFinished: () => set(() => ({ hydrated: true })),

      setFirstRun: isFirstRun => set(() => ({ isFirstRun })),
      setCredentials: credentials => set(() => ({ credentials })),
      setUser: user => set(() => ({ user })),
      clearStore: () =>
        set(() => ({ credentials: undefined, user: undefined })),
    }),
    {
      name: 'user',
      version: 1,
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
      partialize: state => ({
        ...state,
        hydrated: false,
        // isFirstRun: true,
        user: undefined,
        // credentials: undefined,
      }),
      onRehydrateStorage: () => {
        return state => {
          if (state) {
            state.hydrateFinished();
          }
        };
      },
    },
  ),
);

export default useUserStore;
