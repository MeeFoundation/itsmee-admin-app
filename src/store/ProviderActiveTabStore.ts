import { atom, createStore } from "jotai/vanilla";
import type { Tab } from "@utils/types";
const store = createStore();

export const activeTabAtom = atom<Tab>("tabs-apps");

export const setActiveTab = (activeTab: Tab) => {
  store.set(activeTabAtom, activeTab);
};
export const getActiveTab = () => {
  return store.get(activeTabAtom);
};

export const subscribeActiveTab = (
  callback: (activeTab: Tab) => void,
) => {
  store.sub(activeTabAtom, () => {
    const activeTab = getActiveTab();
    callback(activeTab);
  });
};