import { IDayCron } from "./day";

export interface ITemplate {
  scenario: number;
  name: string;
  text: string;
}

export interface ITiming {
  days: IDayCron[];
  type: string;
}

export interface IVariable {
  key: string;
  name: string;
  default: string;
}

export interface IConfig {
  timing: ITiming;
  variables: IVariable[];
}

export interface ICron {
  key: string;
  label: string;
  description: string;
  project: string;
  can_run: boolean;
  templates: ITemplate[];
  config: IConfig;
}

export interface ICronSms {
  crons: ICron[];
  manuals: {
    id: number;
    model_id: number;
    model_type: number;
    name: string;
    project: null;
    scenario: number;
    text: number;
    type: number;
  }[];
  projects: string[];
}
