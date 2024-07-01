import { ButtonWrapper, Divider, Flex, ModalTitle, Wrapper } from "./style";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Student from "./components/student";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import Stationary from "./components/stationary";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useAdminFinanceStationaryGivePayment, useCalculation } from "hooks";
import { AntdModal, Button } from "components";

const GiveStationary = () => {
  const studentRef = useRef<any>();
  const dispatch = useDispatch();
  const {
    giveStationary: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const queryClient = useQueryClient();
  const queryKeys = data?.queryKeys;

  const {
    control,
    watch,
    formState: { errors },
    setValue,
    reset,
    getValues,
    handleSubmit,
  } = useForm();

  const studentId = data?.student?.id;
  const { data: calculation } = useCalculation({
    id: studentId,
  });
  const handleClose = () => {
    reset({});
    studentRef.current?.clear();
    dispatch(
      toggleModal({
        key: "giveStationary",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const giveStationary = useAdminFinanceStationaryGivePayment({
    onSuccess: () => {
      toast.success("Success");
      if (queryKeys) {
        for (let i = 0; i < queryKeys?.length; i++) {
          queryClient.invalidateQueries(queryKeys[i]);
        }
      }
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (formData: any) => {
    giveStationary.mutate({
      body: {
        stationary_items: {
          "100": formData?.["stationary_items-100"],
          "200": formData?.["stationary_items-200"],
        },
      },
      query_params: {
        student_id: data?.id,
      },
    });
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      width={540}
      destroyOnClose
      forceRender
    >
      <Wrapper onSubmit={handleSubmit(() => {})}>
        <ModalTitle>Giving stationary</ModalTitle>
        <Student ref={studentRef} data={data} />
        <Divider />
        <Stationary
          control={control}
          watch={watch}
          getValues={getValues}
          setValue={setValue}
          calculation={calculation}
          handleClose={handleClose}
          level_id={data.student?.group?.level?.parent?.id}
          branch_id={data?.student?.group?.room?.branch?.id}
        />
        <ButtonWrapper>
          <div />
          <Flex>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              buttonLoading={giveStationary.isLoading}
            >
              Save
            </Button>
          </Flex>
        </ButtonWrapper>
      </Wrapper>
    </AntdModal>
  );
};

export default GiveStationary;
