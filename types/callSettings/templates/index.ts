export interface ICallTemplates {
  attempt_interval: number;
  default: string;
  delay: number;
  dial_pads: string[];
  id: number;
  manual_dialing: string;
  max_attempt: number;
  name: string;
  status: number;
  is_repeat: boolean;
  url: string;
}

export interface ICallTemplatePageData {
  greetings: ITemplateGreeting[];
  groups: ITemplateGroup[];
  operators: ITemplateOperator[];
}

export interface ITemplateGroup {
  default: string;
  delay: string;
  id: number;
  name: string;
  num: string;
  users: string;
}

export interface ITemplateOperator {
  name: string;
  num: string;
}

export interface ITemplateGreeting {
  name: string;
  num: string;
  manual_dialing: boolean;
  audio: IAudio;
  delay: number;
  default: string;
  dialpad: IDialPad;
}

export interface IAudio {
  type: string;
  filename: string;
}

export interface IDialPad {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  astr: string;
  sharp: string;
}
