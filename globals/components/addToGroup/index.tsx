import React from "react";
import { useForm } from "react-hook-form";
import { ModalTitle, BottomSite, Padding } from "./style";
import { AntdModal, Button, StudentCard, SameCard } from "components";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "components/antd/datePicker";
import { useAddToGroupContact } from "hooks";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddToGroupValidation } from "validation";
import moment from "moment";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const AddToGroupModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    addToGroupModal: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const group = data?.group;
  const user_id = data?.user_id;
  const {
    control,
    formState: { errors },
    reset,
    setError,
    handleSubmit,
  } = useForm<any>({ resolver: yupResolver(AddToGroupValidation) });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "addToGroupModal",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const addToGroupContact = useAddToGroupContact({
    onSuccess: () => {
      toast.success("Action changed");
      queryClient.invalidateQueries([queryKeys.admin_student_list]);
      queryClient.invalidateQueries([queryKeys.admin_group_view]);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  });
  const onSubmit = ({ date }: any) => {
    addToGroupContact.mutate({
      date: moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD),
      user_id: user_id,
      group_id: group?.id,
    });
  };

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="0"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalTitle>Add to group</ModalTitle>
        {data?.student && (
          <Padding>
            <StudentCard data={data?.student} />
          </Padding>
        )}
        <Padding>
          <SameCard
            // lastTwo={true}
            // gridStyle={{
            //   gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 2fr",
            // }}
            group={group}
            // lastStyle={{ gridColumn: "1/4", gridRow: "3/4" }}
            fullStatus={[]}
          />
        </Padding>
        <div style={{ padding: "20px" }}>
          <DatePicker
            error={
              errors?.user_id?.message ||
              errors?.group_id?.message ||
              errors?.date?.message
            }
            name="date"
            control={control}
            label="Start date"
            weekDaysIndexes={
              data?.group?.lessonDay?.lessonWeeks?.map(
                (e: any) => e.week_day,
              ) ?? []
            }
          />
        </div>
        <BottomSite>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit" buttonLoading={addToGroupContact?.isLoading}>
            Save
          </Button>
        </BottomSite>
      </form>
    </AntdModal>
  );
};

export default AddToGroupModal;
