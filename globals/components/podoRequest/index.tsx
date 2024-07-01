import React, { useEffect } from "react";
import { AntdModal, Button, DatePicker, MySelect } from "components";
import { useForm } from "react-hook-form";
import {
  useCreatePodoRequest,
  usePageDataMemo,
  useUpdatePodoRequest,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Wrapper, ButtonWrapper, Content, Row, Title, BWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { StaffOptions } from "./components/staffOptions";
import { IForm } from "./type";
import { EPodoRequestAction } from "types/statistics/podoRequest";
import { DeleteSvg } from "../../../components";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";
import { podoRequestTypeOfRequest } from "constants/podo-request";

const PodoRequestModal = () => {
  const dispatch = useDispatch();
  const {
    podoRequest: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const queryKeys = data?.queryKeys;
  const queryClient = useQueryClient();
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "podoRequest",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const handleDelete = () => {
    handleClose();
    dispatch(
      toggleModal({
        key: "deletePodoRequest",
        data: {
          data: {
            id,
          },
          open: true,
        },
      }),
    );
  };

  const selects = usePageDataMemo();

  const action: EPodoRequestAction = data?.action;
  const deadline = data?.deadline;
  const id = data?.id;
  const staff_type = data?.staff_type;
  const type = data?.type;
  const lesson_day_id = data?.lesson_day_id;

  const isUpdate = action == EPodoRequestAction.UPDATE;

  const createPodoRequest = useCreatePodoRequest({
    onSuccess: () => {
      toast.success("Success");
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
  const updatePodoRequest = useUpdatePodoRequest({
    onSuccess: () => {
      toast.success("Success");
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
    setValue,
  } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    if (isUpdate) {
      updatePodoRequest.mutate({
        query_params: {
          id,
        },
        body: data,
      });
    } else {
      createPodoRequest.mutate({
        body: data,
      });
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setValue("deadline", deadline);
      setValue("staff_type", staff_type);
      setValue("day_id", `${lesson_day_id}`);
      setValue("type", type);
    }
  }, [data]);

  const submitText = isUpdate ? "Update" : "Create";

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Content>
            <Title>Create request</Title>
            <Row>
              <DatePicker
                name="deadline"
                label="Select deadline"
                control={control}
                placeholder="Select"
                format={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                valueFormat={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                showTime
              />
            </Row>
            <Row>
              <MySelect
                name="staff_type"
                label="Select staff type"
                control={control}
                placeholder="Select"
                options={StaffOptions}
                disabled={isUpdate}
              />
            </Row>
            <Row>
              <MySelect
                name="day_id"
                label="Select day type"
                control={control}
                placeholder="Select"
                options={selects?.days}
                disabled={isUpdate}
              />
            </Row>
            <Row>
              <MySelect
                name="type"
                label="Type of request"
                control={control}
                placeholder="Select"
                options={podoRequestTypeOfRequest}
                disabled={isUpdate}
              />
            </Row>
          </Content>
          <ButtonWrapper isUpdate={isUpdate}>
            {isUpdate && (
              <Button
                onClick={handleDelete}
                textColor={textColors.pop}
                bgColor={bgColors.wildSand}
                icon={<DeleteSvg />}
              >
                Delete
              </Button>
            )}
            <BWrapper>
              <Button
                onClick={handleClose}
                textColor={textColors.yourShadow}
                bgColor={bgColors.wildSand}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                buttonLoading={
                  createPodoRequest.isLoading || updatePodoRequest.isLoading
                }
              >
                {submitText}
              </Button>
            </BWrapper>
          </ButtonWrapper>
        </Wrapper>
      </form>
    </AntdModal>
  );
};

export default PodoRequestModal;
