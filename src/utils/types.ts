export interface AgentService {
  agent_service_url: string;
  agent_service_id: string;
  enabled: boolean;
}

export interface ProviderApp {
  name: string;
  url: string;
  agent_service_url: string;
  agent_service_id: string;
  enabled: boolean;
}

export interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export type Tab = "tabs-apps" | "tabs-agent-services"
