export interface IConfig {
  user: IUser;
  isConnected: boolean;
}

export interface IUser {
  port: number;
  ip?: string;
  branch: any;
}
