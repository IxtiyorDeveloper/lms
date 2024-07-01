import React, { useEffect } from "react";
import { TitleText } from "./style";
import VacationLifecycle from "./components/vacationLifecycle";
import UserDetails from "./components/userDetails";
import FormSide from "./components/form";
import { useForm } from "react-hook-form";
import { useGetUserVacationList } from "hooks";
import { Spin } from "antd";
import { useDispatch } from "react-redux";
import { toggleModal, useAppSelector } from "store";
import { AntdModal } from "components";

export enum VacationModalType {
  UPDATE = "update",
  CREATE = "create",
}

const CreateVacationModal = () => {
  const dispatch = useDispatch();

  const {
    createVacationModal: { open, data: modalData },
  } = useAppSelector((state) => state.modals);

  const handleClose = () => {
    setValue("note", undefined);
    setValue("custom_date", undefined);
    dispatch(
      toggleModal({
        key: "createVacationModal",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const { data: userData, isLoading: userLoading } = useGetUserVacationList({
    query_params: {
      user_id: modalData?.user_id,
      expand: "userProfile.avatar,rbacAssignment.rbacRole,userPhones,staff",
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("slot", modalData?.slot_id);
  }, [modalData]);

  return (
    <AntdModal
      width={520}
      padding="0"
      open={open}
      onCancel={handleClose}
      destroyOnClose
    >
      <TitleText>
        {modalData.type === VacationModalType.CREATE ? "Create" : "Edit"}{" "}
        Vacation
      </TitleText>
      <Spin spinning={userLoading}>
        <VacationLifecycle data={userData ? userData.vacations : undefined} />
        <UserDetails data={userData ? userData?.user : {}} />
      </Spin>
      <FormSide
        control={control}
        errors={errors}
        data={modalData}
        // @ts-ignore
        role_id={userData?.user?.rbacAssignment?.rbac_role_id}
        // @ts-ignore
        role_shift_id={userData?.user?.rbacAssignment?.rbac_role_shift_id}
        watch={watch}
        setValue={setValue}
        handleCancel={handleClose}
        handleSubmit={handleSubmit}
      />
    </AntdModal>
  );
};

export default CreateVacationModal;
