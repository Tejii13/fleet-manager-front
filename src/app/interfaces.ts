export interface Member {
  id: number;
  name: string;
  auth_token: string;
  is_admin?: boolean;
}

export interface Ship {
  id: number;
  owner_id?: number;
  name: string;
  nickname?: string;
}

export interface connectionStatus {
  message: string;
  code: number;
  id?: number;
}
