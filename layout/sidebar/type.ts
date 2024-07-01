export type TMenuItem = {
  title?: string;
  icon?: string;
  child?: object[];
  open?: boolean;
};

export type TStyledImage = {
  bool: string;
  open: boolean;
};

export type TMenuItemStyled = {
  width?: string | number;
  open?: boolean;
};
