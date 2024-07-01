import { ICallTemplates, IDialPad } from "../callSettings/templates";

export interface IEnum {
  enum: number;
  label: string;
}

export interface ITemplates {
  company: ICallTemplates[];
}

export interface IAutoCallPageData {
  enums: IEnum[];
  templates: ITemplates;
}

export interface IAdminCallCron {
  crons: IAutoCallCron[];
}

export interface IAutoCallCron {
  key: string;
  label: string;
  description: string;
  can_run: boolean;
  templates: IAutoCallCronTemplate[];
  config: IAutoCallCronConfig;
}

export interface IAutoCallCronTemplate {
  id: number;
  name: string;
  status: number;
  url: string;
  dial_pads: IDialPad;
  delay: number;
  manual_dialing: string;
  default: number;
  attempt_interval: number;
  max_attempt: number;
  is_repeat: boolean;
  scenario: number;
  scenarioLabel: string;
}

export interface IAutoCallCronConfig {
  timing: {
    days: IAutoCallCronConfigDay[];
    type: string;
  };
}

export interface IAutoCallCronConfigDay {
  time_to: string;
  week_day: number;
  time_from: string;
}
