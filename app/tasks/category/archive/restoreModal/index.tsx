import React from "react";
import { AntdModal, Button } from "components";
import { RestoreCategorySvg } from "@jasurbekyuldashov/lms-web-icons";
import { ButtonWrapper, IconWrapper, TextWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRestoreTaskCategory } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";

const ConfirmRestoreModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    confirmRestoreTaskCategory: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "confirmRestoreTaskCategory",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const restoreTaskCategory = useRestoreTaskCategory({
    onSuccess: () => {
      queryClient
        .invalidateQueries([queryKeys.task_admin_category_index])
        .then();
      handleClose();
      toast.success("Category restored!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const handleRestore = () => {
    restoreTaskCategory.mutate({
      query_params: {
        id: data?.id,
      },
    });
  };

  return (
    <AntdModal centered open={open} width={340} onCancel={handleClose}>
      <IconWrapper>
        <RestoreCategorySvg />
      </IconWrapper>
      <TextWrapper>
        <p>Are you sure?</p>
        <p>Restore this task</p>
      </TextWrapper>
      <ButtonWrapper>
        <Button
          onClick={handleClose}
          style={{ width: "100%" }}
          className="close-btn"
        >
          No
        </Button>
        <Button
          buttonLoading={restoreTaskCategory.isLoading}
          onClick={handleRestore}
          style={{ width: "100%" }}
        >
          Yes
        </Button>
      </ButtonWrapper>
    </AntdModal>
  );
};

export default ConfirmRestoreModal;
