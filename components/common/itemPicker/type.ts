export interface IItemPicker {
  label?: string;
  active?: string | number;
  onClick?: (id: number) => void;
}
