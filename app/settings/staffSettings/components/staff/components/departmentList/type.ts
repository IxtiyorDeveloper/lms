import { DepartmentModal } from "../../index";
import { TModalType } from "types/modal";

export interface IDepartmentList {
  handleOpen: (
    a: DepartmentModal,
    id?: number,
    type?: TModalType,
    data?: { id: number; name: string }
  ) => void;
  status: number;
}
