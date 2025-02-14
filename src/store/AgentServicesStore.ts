import { atom, createStore } from "jotai/vanilla";
import type { AgentService } from "@utils/types";
const store = createStore();
export const agentServicesAtom = atom<AgentService[]>();
const agentServicesAtomsMap = new Map<
  number,
  ReturnType<typeof atom<AgentService | undefined>>
>();

export const setAgentServicesData = (agentServices: AgentService[]) => {
  store.set(agentServicesAtom, agentServices);
};
export const getAgentServicesData = () => {
  return store.get(agentServicesAtom);
};

export const subscribeAgentServicesData = (
  callback: (agentServices?: AgentService[]) => void,
) => {
  store.sub(agentServicesAtom, () => {
    const agentServices = getAgentServicesData();
    callback(agentServices);
  });
};

const agentServiceAtomById = (id: number) => {
  if (!agentServicesAtomsMap.has(id)) {
    const newAgentServiceAtom = atom<AgentService | undefined>(undefined);
    agentServicesAtomsMap.set(id, newAgentServiceAtom);
  }
  return agentServicesAtomsMap.get(id)!;
};

export const setAgentServiceData = (id: number, agentService: AgentService) => {
  const agentServiceAtom = agentServiceAtomById(id);
  store.set(agentServiceAtom, agentService);
};

export const getAgentServiceData = (id: number) => {
  const agentServiceAtom = agentServiceAtomById(id);
  return store.get(agentServiceAtom);
};

export const subscribeAgentServiceData = (
  id: number,
  callback: (agentService?: AgentService) => void,
) => {
  const agentServiceAtom = agentServiceAtomById(id);
  store.sub(agentServiceAtom, () => {
    const agentService = getAgentServiceData(id);
    callback(agentService);
  });
};
