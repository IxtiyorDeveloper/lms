import { Flex } from "antd";
import RewarModalTitle from "app/settings/staffSettings/rewards/components/table/components/rewardModalTitle";
import StaffInfo from "app/settings/staffSettings/rewards/components/table/components/staffInfo";
import { AntdModal, Button, Input } from "components";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ModalFooter } from "../rewardGiveModal/style";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { FormWrapper } from "../rewardGiveModal/style";
import { useApproveReward } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";
import { IStaffReward } from "types/staffSettings";

const RewardApproveModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    rewardApprove: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);

  const data = redux_data?.data as IStaffReward;

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const cancelReward = useApproveReward({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.get_rewards]).then();
      toast.success("Reward approved successfully");
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
        key: "rewardApprove",
      })
    );
  };

  const onSubmit = (values: any) => {
    cancelReward.mutate({
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
      padding="20px"
    >
      <Flex vertical gap={12}>
        <RewarModalTitle title="Approve reward" date={data?.hired_date} />
        <StaffInfo data={data} />
      </Flex>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="button"
            buttonLoading={cancelReward.isLoading}
          >
            Save
          </Button>
        </ModalFooter>
      </FormWrapper>
    </AntdModal>
  );
};

export default RewardApproveModal;
