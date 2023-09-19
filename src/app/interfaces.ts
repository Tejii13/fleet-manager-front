export interface Member {
  id: number;
  username: string;
  roles: Array<string>;
  password: string;
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
  id?: number;
}
