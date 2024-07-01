import React from "react";
import { IGroupMentor, TParams } from "types";

export type TGroupInfoItem = {
  title: string;
  text?: string;
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
