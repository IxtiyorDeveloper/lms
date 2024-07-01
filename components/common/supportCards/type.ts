import React from "react";
import { IGroupMentor, IUser, TParams } from "types";
import {
  IDetailStudent,
  IRankingObservation,
} from "../../../types/observation";

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

export interface ISupportCard {
  branch_name?: string;
  date?: string;
  timetable?: string;
  students?: IDetailStudent[];
  support?: IUser;
  data: IRankingObservation | undefined;
}
