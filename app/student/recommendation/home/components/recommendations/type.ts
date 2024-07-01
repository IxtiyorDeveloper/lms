export interface IGridChild {
  groups?: IGroup[];
  main?: boolean;
  setOpen: (open?: boolean, group?: IGroup) => void;
  search: string;
  setCount?: (e: number) => void;
  branch?: any;
}

export interface IGroup {
  name: string;
  startDate: string;
  freePlaces: number;
  identify: "enabled" | "rejected" | "disabled" | string;
  teacher?: string;
  isNew?: boolean;
  note?: string;
  branch_id?: string;
}

export interface INdChild {
  items: {
    branch?: boolean;
    level?: boolean;
    day?: boolean;
    time?: boolean;
  };
}
