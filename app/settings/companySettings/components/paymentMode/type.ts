export interface IItemPicker {
  label?: string;
  name?: string;
  active?: string | number;
  onClick?: (id: number) => void;
}
