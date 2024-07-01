import { ReactNode } from "react";
import { ReactComponentLike } from "prop-types";
import { IFile } from "types";

export type TSourceSelect = {
  control: any;
  name: string;
  error?: any;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  navigation?: boolean;
  data: {
    id: string | number;
    title: string | ReactNode;
    name?: string | ReactNode;
    icon: ReactComponentLike;
    iconFile: IFile;
  }[];
};
