import { IFile } from "./file";

export interface IOfficialCompany {
  id: number;
  name: string;
  phone_number: string;
  payment_mode: null;
  status: number;
  detail: IDetail;
  public_offer_file_id: number;
  publicOfferFile: IFile;
  restrict_access: boolean;
}
export interface IDetail {
  inn: string;
  mfo: string;
  p_c: string;
  bank: string;
  odek: string;
  email: string;
  phone: string;
  place: string;
  website: string;
  director: string;
  post_index: string;
  company_name: string;
}
