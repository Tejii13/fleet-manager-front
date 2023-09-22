// Local database interfaces
export interface Member {
  id: number;
  username: string;
  roles: Array<string>;
  auth: string;
}

export interface Ship {
  id: number;
  owner_id?: number;
  name: string;
  nickname?: string;
}

export interface ConnectionStatus {
  message: string;
  code: number;
  auth: string;
  id?: number;
}
export interface UserListResponse {
  '@context': string;
  '@id': string;
  '@type': string;
  'hydra:member': Member[];
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
  max_crew: number;
  name: string;
  production_status: string;
  size: string;
  type: string;
  url: string;
}
