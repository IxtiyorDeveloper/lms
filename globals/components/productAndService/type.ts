import { IFile } from "types/file";

export interface Interface {
  general: {
    iconFile: IFile;
    name: string;
    description: string;
    pricing_type: string;
    view_level: string;
    sell_place: string;
    price: string;
    type: string;
    icon_file_id?: string;
  };
}
