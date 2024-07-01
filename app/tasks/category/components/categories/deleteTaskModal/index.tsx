import React from "react";
import { AntdModal, Button } from "components";
import { DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { ButtonWrapper, IconWrapper, TextWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRemoveTaskCategory } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { bgColors, textColors } from "styles/theme";

const DeleteTaskCategoryModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    removeCategory: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "removeCategory",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const removeTask = useRemoveTaskCategory({
    onSuccess: () => {
      queryClient
        .invalidateQueries([queryKeys.task_admin_category_index])
        .then();
      handleClose();
      toast.success("Category permanently removed!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const handleDelete = () => {
    removeTask.mutate({
      query_params: {
        id: data?.id,
      },
    });
  };

  return (
    <AntdModal centered open={open} width={340} onCancel={handleClose}>
      <IconWrapper>
        <DeleteSvg height={40} width={40} />
      </IconWrapper>
      <TextWrapper>
        <p>Are you sure?</p>
        <p>Delete this category permanently</p>
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
          buttonLoading={removeTask.isLoading}
          onClick={handleDelete}
          style={{
            width: "100%",
            background: bgColors.pop,
            color: textColors.white,
          }}
        >
          Yes
        </Button>
      </ButtonWrapper>
    </AntdModal>
  );
};

export default DeleteTaskCategoryModal;
