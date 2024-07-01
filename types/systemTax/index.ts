export interface ISystemTaxPageData {
  id: number;
  company_id: number;
  branch_id: number;
  login: string;
  password: string;
  branch: IBranch;
  decryptedPassword: string;
}

export interface IBranch {
  id: number;
  name: string;
  address: any;
  landmark: any;
  latitude: any;
  longitude: any;
  description: any;
  location_url: any;
  status: number;
  region_id: number;
}

export interface IFileVariable {
  url: string;
  data: {
    id: string;
    command: string;
    data: {
      login: string;
      password: string;
    };
  };
}
