import * as React from "react";
import { AntdModal, Button, Input, MySelect } from "components";
import { ModalTitle, Wrapper, ButtonWrapper, FormWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { useRouter } from "next/router";
import Switch from "components/antd/switch";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useOneRoom, usePageDataMemo, useSaveRoom, useUpdateRoom } from "hooks";
import { toast } from "react-toastify";
import {
  ROOM_STATUS_ACTIVE,
  ROOM_STATUS_ARCHIVED,
  RoomTypesSelect,
} from "constants/room";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import _ from "lodash";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "../../../../../../../../utils";

const RoomModal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const selects = usePageDataMemo();
  const {
    createRoom: { data: reduxData, open },
  } = useSelector((state: IStore) => state.modals);

  const { isInitialLoading: isLoading, data } = useOneRoom({
    id: reduxData.id,
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
    setError,
  } = useForm<any>({
    defaultValues: {
      region_id: router.query?.regionId,
      branch_id: router.query?.branchId,
    },
  });

  const saveRoom = (
    reduxData.type === "update" ? useUpdateRoom : useSaveRoom
  )?.({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries([queryKeys.rooms_list]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError, showToast: false });
    },
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        key: "createRoom",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onSubmit = (data: any) => {
    saveRoom.mutate({
      ...(reduxData.type === "update"
        ? {
            query_params: {
              id: reduxData.id,
            },
          }
        : {}),
      body: {
        ...data,
        status: data.status ? ROOM_STATUS_ACTIVE : ROOM_STATUS_ARCHIVED,
      },
    });
  };

  useEffect(() => {
    _.map(data, (value, key) => {
      key == "branch"
        ? setValue("branch_id", `${(value as any)?.id}`)
        : key == "type"
          ? setValue("type", `${value}`)
          : key == "status"
            ? setValue("status", (value as any) == ROOM_STATUS_ACTIVE)
            : setValue(key, value);
    });
  }, [data]);
  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={isLoading}>
        <ModalTitle>
          {reduxData.type === "update" ? "Update" : "Create"} room
        </ModalTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <Wrapper>
              <MySelect
                name="region_id"
                control={control}
                label="Region"
                options={selects.regions}
                placeholder="Select"
                error={errors?.region_id?.message}
                disabled
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <MySelect
                name="branch_id"
                control={control}
                label="Branch"
                options={selects.branchByRegion(router.query?.regionId!)}
                placeholder="Select"
                error={errors?.branch_id?.message}
                disabled
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <MySelect
                name="type"
                control={control}
                label="Room type"
                options={RoomTypesSelect}
                placeholder="Select"
                error={errors?.type?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="name"
                label="Name"
                placeholder="Type here..."
                control={control}
                error={errors?.name?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper>
              <Input
                name="capacity"
                label="Capacity"
                placeholder="Type here..."
                control={control}
                error={errors?.capacity?.message}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper>
            <Wrapper style={{ width: "40px" }}>
              <Switch
                name="status"
                error={errors?.status?.message}
                control={control}
                label="Status"
              />
            </Wrapper>
          </FormWrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={false}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default RoomModal;
