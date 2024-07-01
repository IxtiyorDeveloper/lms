export interface IOption {
  value: string | number;
  label: string | number;
  children?: IOption[];
}

export interface ISelect {
  options: IOption[];
}
