import {
  object,
  type,
  string,
  array,
  assert,
  type Describe,
  boolean,
} from "superstruct";
import type { User, AgentService, ProviderApp } from "@utils/types";

const User: Describe<User> = type({
  gender: string(),
  email: string(),
  phone: string(),
  name: object({ title: string(), first: string(), last: string() }),
  picture: object({ large: string(), medium: string(), thumbnail: string() }),
});

const Providers: Describe<User[]> = array(User);

const AgentService: Describe<AgentService> = type({
  agent_service_url: string(),
  agent_service_id: string(),
  enabled: boolean(),
});

const AgentServices: Describe<AgentService[]> = array(AgentService);

const ProviderApp: Describe<ProviderApp> = type({
  name: string(),
  url: string(),
  agent_service_url: string(),
  agent_service_id: string(),
  enabled: boolean(),
});

const ProviderApps: Describe<ProviderApp[]> = array(ProviderApp);

export const getProviders = async () => {
  const responseProviders = await fetch(
    "https://randomuser.me/api?seed=test22&results=10",
  );
  const dataProviders = await responseProviders.json();
  const providers = await dataProviders.results;
  assert(providers, Providers);

  return providers;
};
export const getProvider = async (id: number) => {
  const providers = await getProviders();
  return providers[id];
};

export const getProviderApps = async () => {
  const response = await fetch("/provider_apps.json");
  const data = await response.json();
  assert(data, ProviderApps);
  return data;
};

export const getProviderApp = async (id: number) => {
  const providerApps = await getProviderApps();
  return providerApps[id];
};

export const getAgentServices = async () => {
  const response = await fetch("/agent_services.json");
  const data = await response.json();
  assert(data, AgentServices);
  return data;
};

export const getAgentService = async (id: string) => {
  const agentServices = await getAgentServices();
  return agentServices.find((item) => item.agent_service_id == id);
};
