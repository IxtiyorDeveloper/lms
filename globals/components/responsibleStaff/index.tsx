import React from "react";
import {
  AntdModal,
  Button,
  Input,
  MySelect,
  PodoSvg,
  StudentCard,
} from "components";
import { useForm } from "react-hook-form";
import {
  useAddActionStudent,
  useChangeGroupResponsible,
  usePageDataMemo,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Buttons, SvgWrapper, Title, Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { LABEL_PODO } from "constants/labels";
import { yupResolver } from "@hookform/resolvers/yup";
import { BlockStudent, ResponsibleSchema } from "validation/actions";
import { validationErrorHandler } from "utils";

const ResponsibleStaffModal = () => {
  const dispatch = useDispatch();

  const selects = usePageDataMemo();

  const {
    responsibleStaff: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const queryKeys = data?.queryKeys;

  const id = data?.id;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "responsibleStaff",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const queryClient = useQueryClient();

  const addAction = useChangeGroupResponsible({
    onSuccess: () => {
      toast.success("Student action changed");
      if (Array.isArray(queryKeys)) {
        for (let i = 0; i < queryKeys.length; i++) {
          queryClient.invalidateQueries({
            queryKey: queryKeys[i],
          });
        }
      } else {
        queryClient.invalidateQueries({
          queryKey: queryKeys,
        });
      }
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ responsible_id: string }>({
    resolver: yupResolver(ResponsibleSchema),
  });

  const onSubmit = (data: { responsible_id: string }) => {
    const responsible_id = data?.responsible_id;
    addAction.mutate({
      query_params: {
        id,
      },
      body: {
        responsible_id,
      },
    });
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={340}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Title>Select responsible staff</Title>
          <div className="form">
            <MySelect
              control={control}
              name="responsible_id"
              label="Responsible"
              options={selects.admin}
              error={errors?.responsible_id?.message}
            />
          </div>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              bgColor={bgColors.whiteSmoke}
              style={{ width: "100%" }}
            >
              Cancel
            </Button>
            <Button
              style={{ width: "100%" }}
              className="save"
              type="submit"
              buttonLoading={addAction?.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </Wrapper>
      </form>
    </AntdModal>
  );
};

export default ResponsibleStaffModal;
