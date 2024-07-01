export interface IEnum {
  enum: number;
  label: string;
}

export interface ICompany {
  id: number;
  type: number;
  scenario: number;
  name: string;
  text: string;
  model_type: number;
  model_id?: any;
}

export interface IOwn {
  id: number;
  type: number;
  scenario: number;
  name: string;
  text: string;
  model_type: number;
  model_id: number;
}

export interface ITemplates {
  company: ICompany[];
  own: IOwn[];
}

export interface ISendSmsPageData {
  enums: IEnum[];
  templates: ITemplates;
}

export interface ISmsPhoneTypeCount {
  phones: { [key: number]: number };
  user_count: number;
}
