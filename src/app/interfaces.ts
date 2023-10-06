// Local database interfaces
export interface Member {
  id: number;
  username: string;
  roles: Array<string>;
  ships: string[];
  auth: string;
  organizationsLeader: string;
  organizations: string;
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
  cargoCapacity: number;
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
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Member[];
  'hydra:totalItems': number;
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
