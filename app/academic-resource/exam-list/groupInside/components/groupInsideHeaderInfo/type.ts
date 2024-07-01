import React, { ReactNode } from "react";
import { IGroupMentor, TParams } from "types";

export type TGroupInfoItem = {
  title: string;
  text?: string | ReactNode;
  svg?: React.ReactNode;
  url?: {
    full_url: string;
    children: { full_url: string; resolution: string }[];
  };
  preview?: string;
  id?: string | number;
  colors?: TParams;
  mentor?: IGroupMentor;
};
