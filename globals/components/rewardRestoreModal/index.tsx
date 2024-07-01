import { useQueryClient } from "@tanstack/react-query";
import { Flex } from "antd";
import RewarModalTitle from "app/settings/staffSettings/rewards/components/table/components/rewardModalTitle";
import StaffInfo from "app/settings/staffSettings/rewards/components/table/components/staffInfo";
import { AntdModal, Button, Input } from "components";
import { queryKeys } from "constants/queryKeys";
import { useRestoreReward } from "hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { IStaffReward } from "types/staffSettings";
import { validationErrorHandler } from "utils";
import { FormWrapper, ModalFooter } from "../rewardGiveModal/style";

const RewardRestoreModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    rewardRestore: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);

  const data = redux_data?.data as IStaffReward;

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const restoreReward = useRestoreReward({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.get_rewards]);
      toast.success("Reward canceled successfully");
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
        key: "rewardRestore",
      })
    );
  };

  const onSubmit = (values: any) => {
    restoreReward.mutate({
      query_params: {
        id: data?.id,
      },
      body: {
        description: values.description,
      },
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="20px">
      <Flex vertical gap={12}>
        <RewarModalTitle title="Restore reward" date={data?.hired_date} />
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
            buttonLoading={restoreReward.isLoading}>
            Save
          </Button>
        </ModalFooter>
      </FormWrapper>
    </AntdModal>
  );
};

export default RewardRestoreModal;
