export interface IFile {
  id?: number;
  component?: string;
  base_url?: string;
  path?: string;
  type?: string;
  size?: number;
  name?: string;
  upload_ip?: string;
  created_at?: number;
  full_url?: string;
}

export interface ICompanyFile {
  id: number;
  name: string;
  key: number;
  privacy: number;
  date: string;
  file: IFile;
}
export interface IDocumentsCategory {
  id: number;
  name: string;
  color: string;
  order: number;
  fileCount: number;
}
