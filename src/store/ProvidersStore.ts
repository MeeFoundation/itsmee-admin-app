import { atom, createStore } from "jotai/vanilla";
import type { User } from "@utils/types";
const store = createStore();
export const providersAtom = atom<User[]>();
const providerAtomsMap = new Map<
  number,
  ReturnType<typeof atom<User | undefined>>
>();


export const setProvidersData = (providers: User[]) => {
  store.set(providersAtom, providers);
};
export const getProvidersData = () => {
  return store.get(providersAtom);
};

export const subscribeProvidersData = (callback: (providers?: User[]) => void) => {
  store.sub(providersAtom, () => {
    const providers = getProvidersData();
    callback(providers);
  });
};

const providerAtomById = (id: number) => {
  if (!providerAtomsMap.has(id)) {
    const newProviderAtom = atom<User | undefined>(undefined);
    providerAtomsMap.set(id, newProviderAtom);
  }
  return providerAtomsMap.get(id)!;
};

export const setProviderData = (id: number, provider: User) => {
  const providerAtom = providerAtomById(id);
  store.set(providerAtom, provider);
};

export const getProviderData = (id: number) => {
  const providerAtom = providerAtomById(id);
  return store.get(providerAtom);
};

export const subscribeProviderData = (
  id: number,
  callback: (provider?: User) => void,
) => {
  const providerAtom = providerAtomById(id);
  store.sub(providerAtom, () => {
    const provider = getProviderData(id);
    callback(provider);
  });
};