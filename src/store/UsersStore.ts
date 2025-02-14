import { atom, createStore } from "jotai/vanilla";
import type { User } from "@utils/types";
const store = createStore();
export const usersAtom = atom<User[]>();
const userAtomsMap = new Map<
  number,
  ReturnType<typeof atom<User | undefined>>
>();

export const setUsersData = (users: User[]) => {
  store.set(usersAtom, users);
};
export const getUsersData = () => {
  return store.get(usersAtom);
};

export const subscribeUsersData = (callback: (users?: User[]) => void) => {
  store.sub(usersAtom, () => {
    const users = getUsersData();
    callback(users);
  });
};

const userAtomById = (id: number) => {
  if (!userAtomsMap.has(id)) {
    const newUserAtom = atom<User | undefined>(undefined);
    userAtomsMap.set(id, newUserAtom);
  }
  return userAtomsMap.get(id)!;
};

export const setUserData = (id: number, user: User) => {
  const userAtom = userAtomById(id);
  store.set(userAtom, user);
};

export const getUserData = (id: number) => {
  const userAtom = userAtomById(id);
  return store.get(userAtom);
};

export const subscribeUserData = (
  id: number,
  callback: (user?: User) => void,
) => {
  const userAtom = userAtomById(id);
  store.sub(userAtom, () => {
    const user = getUserData(id);
    callback(user);
  });
};
