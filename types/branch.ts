import { IFile } from "./file";

export interface IBranchFile {
  id: number;
  fileStorageItem: IFile;
  type: number;
}

export type TBranch = {
  id: string;
  company_id: string;
  region_id: string;
  name: string;
  address: null | string;
  landmark: null | string;
  latitude: null | string;
  longitude: null | string;
  description: null | string;
  status: string;
  deleted_at: null | string;
  cover_file_id: null | string;
  room_count?: number;
  coverFile?: IFile;
  branchFiles: IBranchFile[];
  location_url?: string;
};
