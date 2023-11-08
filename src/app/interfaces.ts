// Local database interfaces
export interface Member {
  id: number;
  username: string;
  roles: Array<string>;
  ships: string[];
  auth: string;
  organizations: string;
  main_org: string;
}

export interface Ship {
  id: number;
  owner: string;
  name: string;
  nickname?: string;
  size: string;
  loadout: string[];
  production_status: string;
  manufacturer: string;
  type: string;
  focus: string;
  max_crew: number;
  url: string;
  description: string;
  imageUrl: string;
  cargo_capacity: number;
  owner_username: string;
  obtention_method: string;
  loaner_for: string;
}

export interface Organization {
  id: number;
  name: string;
  sid: string;
  archetype: string;
  banner: string;
  focus: string;
  language: string;
  logo: string;
  members: string;
}

export interface ConnectionStatus {
  message: string;
  code: number;
  auth: string;
  username?: number;
  id?: number;
}

export interface CheckConnection {
  message: string;
  id?: number;
  code: number;
}
export interface UserListResponse {
  username: string;
  id: number;
}

export interface ShipListResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Ship[];
  'hydra:totalItems': number;
}

// Star Citizen interfaces
export interface Data {
  data?: Array<object>;
  message: string;
  source?: string;
  success: number;
}

export interface ShipData {
  cargocapacity: number;
  // compiled // TODO Add it when making loadout app
  description: string;
  focus: string;
  manufacturer: {
    code: string;
    name: string;
  };
  media: {
    0: {
      images: {
        banner: string;
      };
    };
  };
  max_crew: number;
  name: string;
  production_status: string;
  size: string;
  type: string;
  url: string;
}
