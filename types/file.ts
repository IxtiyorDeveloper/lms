export interface IFile {
  id: number;
  component: string;
  base_url: string;
  path: string;
  full_url: string;
  type: string;
  size: number;
  name: string;
  upload_ip: string;
  created_at: number;
  children: {
    full_url: string;
    resolution: string;
    path: string;
    base_url: string;
  }[];
}
