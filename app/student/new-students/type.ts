export type INewStudentModals = "attendModal" | "backModal";

export interface IProps {
  handlePressOpenModal?: (
    type: INewStudentModals,
    id?: number,
    text?: string
  ) => void;
  handleOpen?: (open?: boolean) => void;
  handlePaymentOpen?: (open?: boolean) => void;
}
