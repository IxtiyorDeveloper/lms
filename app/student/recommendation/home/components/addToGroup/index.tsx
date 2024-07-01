import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { ModalTitle, BottomSite } from "./style";
import { AntdModal, Button } from "components";
import { IAddToGroup } from "./type";
import { bgColors, textColors } from "styles/theme";
import { SameCard } from "components";
import DatePicker from "components/antd/datePicker";
import { useAddToGroupContact } from "hooks";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddToGroupValidation } from "validation";
import moment from "moment";
import Router from "next/router";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { validationErrorHandler } from "utils";

const AddToGroupModal: FC<IAddToGroup> = ({ open, handleClose, setOpen }) => {
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<any>({ resolver: yupResolver(AddToGroupValidation) });
  const addToGroupContact = useAddToGroupContact({
    onSuccess: () => {
      Router.push(`/groups/${open.modal.id}`);
      toast.success("Action changed");
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = ({ date }: any) => {
    addToGroupContact.mutate({
      date: moment(new Date(date)).format(DATE_FORMAT_YYYY_MM_DD),
      user_id: Router.query.studentId,
      group_id: open.modal.id,
    });
  };
  return (
    <AntdModal
      open={open.modal.isOpen}
      onCancel={handleClose}
      centered
      width={520}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalTitle>Add to group</ModalTitle>
        <SameCard
          // lastTwo={true}
          // gridStyle={{
          //   gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr",
          // }}
          group={open.group}
          // lastStyle={{ gridColumn: "1/4", gridRow: "3/4" }}
          setOpen={setOpen}
          fullStatus={[]}
        />
        <div style={{ padding: "20px 0 40px 0" }}>
          <DatePicker
            error={
              errors?.user_id?.message ||
              errors?.group_id?.message ||
              errors?.date?.message
            }
            name="date"
            control={control}
            label="Start date"
            weekDaysIndexes={open?.group?.weekIndex ?? []}
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
          <Button type="submit" buttonLoading={addToGroupContact.isLoading}>
            Save
          </Button>
        </BottomSite>
      </form>
    </AntdModal>
  );
};

export default AddToGroupModal;
