import { useQueryClient } from "@tanstack/react-query";
import { Flex, Spin } from "antd";
import RewarModalTitle from "app/settings/staffSettings/rewards/components/table/components/rewardModalTitle";
import StaffInfo from "app/settings/staffSettings/rewards/components/table/components/staffInfo";
import { AntdModal, Button, Input, InputNumber, MySelect } from "components";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { IStaffReward } from "types/staffSettings";
import { FormWrapper, ModalFooter } from "./style";
import { useGiveReward, useInitialData } from "hooks";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";

const RewardGiveModal = () => {
  const dispatch = useDispatch();

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const queryClient = useQueryClient();
  const {
    rewardGive: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);
  const data = redux_data?.data as IStaffReward;

  const { data: initialData, isLoading } = useInitialData();

  const giveReward = useGiveReward({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.get_rewards]);
      toast.success("Reward given successfully");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err, setError });
    },
  });

  const handleClose = () => {
    reset();
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "rewardGive",
      })
    );
  };

  const onSubmit = (values: any) => {
    const allValues = {
      type: values.type,
      description: values.description,
      branch_id: values.branch_id,
      amount: values.amount,
    };

    giveReward.mutate({
      query_params: {
        id: data?.id,
      },
      body: allValues,
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="20px">
      <Spin spinning={isLoading}>
        <Flex vertical gap={12}>
          <RewarModalTitle title="Give reward" date={data?.hired_date} />
          <StaffInfo data={data} />
        </Flex>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Bonus for"
            name="bonus_for"
            control={control}
            type="textarea"
            rows={3}
            value={data?.referrer}
            placeholder="Type here..."
            disabled
          />
          <MySelect
            control={control}
            name="branch_id"
            label="Branch"
            options={initialData?.allBranches?.map((branch) => {
              return {
                label: branch.name,
                value: branch.id,
              };
            })}
            placeholder="Select branch"
            error={errors?.branch_id?.message}
          />

          <MySelect
            control={control}
            name="type"
            label="Amount type"
            options={initialData?.rewardTypeList}
            placeholder="Select type"
            error={errors?.type?.message}
          />

          <InputNumber
            label="Amount"
            name="amount"
            control={control}
            placeholder="Type here..."
            suffix={<div>UZS</div>}
            min={0}
            error={errors?.amount?.message}
          />
          <Input
            label="Reason"
            name="description"
            control={control}
            type="textarea"
            rows={3}
            placeholder="Type here..."
            error={errors?.description?.message}
          />

          <ModalFooter>
            <Button
              type="submit"
              className="button"
              bgColor={bgColors.wildSand}
              onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="button"
              buttonLoading={giveReward.isLoading}>
              Save
            </Button>
          </ModalFooter>
        </FormWrapper>
      </Spin>
    </AntdModal>
  );
};

export default RewardGiveModal;
