import React, { FC } from "react";
import { bgColors } from "styles/theme";
import { ActionModal, DeleteSvg } from "components";
import { Control, UseFormHandleSubmit } from "react-hook-form";

interface IProps {
  handleDeleteSubmit: UseFormHandleSubmit<any>;
  deleteControl: Control;
  handleClose: (a: any) => void;
  onDeleteSubmit: () => void;
  modals: any;
  setModals: (a: any) => void;
}

const ActionModalComponent: FC<IProps> = (props) => {
  const {
    handleDeleteSubmit,
    deleteControl,
    handleClose,
    modals,
    onDeleteSubmit,
    setModals,
  } = props;

  return (
    <ActionModal
      handleSubmit={handleDeleteSubmit}
      control={deleteControl}
      handleClose={() => handleClose(setModals)}
      open={modals.deleteModal.isOpen}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1), inset 0px 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      text={
        <div>
          <p>Are you sure ?</p>
          <p>This property will be deleted for everyone</p>
        </div>
      }
    />
  );
};

export default ActionModalComponent;
