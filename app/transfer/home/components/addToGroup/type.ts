import { OneStudent } from "types/student";

export interface ITransferModal {
  open: any;
  handleClose: () => void;
  setOpen: any;
  student: OneStudent | undefined;
}
