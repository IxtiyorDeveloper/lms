import * as React from "react";
import { AntdModal, Button, Input, StudentCard, PaymentCalc } from "components";
import { ModalTitle, Wrapper, ButtonWrapper, FormWrapper } from "./style";
import { TContinueModal } from "./type";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "components/antd/datePicker";
import { useForm } from "react-hook-form";
import { store, toggleModal, useAppSelector } from "store";
import { useSaveContinue } from "hooks/useStudentMove";
import { toast } from "react-toastify";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { useGroup, useTransferCalc } from "hooks";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { Spin } from "antd";
import { STOPPING_STUDENT } from "constants/studentStatuses";
import { OneStudent } from "types/student";
import { useEffect } from "react";
import dayjs from "dayjs";
import { week_days } from "app/settings/smsSettings/home/components/autoSms/trow";
import { validationErrorHandler } from "utils";

const ContinueModal = ({}: TContinueModal) => {
  const continueModal = useAppSelector((state) => state.modals.continueModal);
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    watch,
    setValue,
    clearErrors,
    getValues,
  } = useForm({});
  const { data: group } = useGroup({
    id: continueModal.data?.group?.id || continueModal.data?.group_id,
    expand: "lessonDay.lessonWeekDayIndexes",
  });
  const handleClose = () => {
    store.dispatch(
      toggleModal({
        key: "continueModal",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const saveContinue = useSaveContinue({
    onSuccess: () => {
      toast.success("Student activated");
      queryClient.invalidateQueries(["stopping-student-list1"]);
      continueModal.data?.queryKeys &&
        queryClient.invalidateQueries(continueModal.data.queryKeys);
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

  const onSubmit = (data: any) => {
    saveContinue.mutate({
      contact_id: continueModal.data.id,
      ...data,
      transfer_date_from: moment(new Date(data.transfer_date_from)).format(
        DATE_FORMAT_YYYY_MM_DD,
      ),
    });
  };
  const transfer_date_from = watch("transfer_date_from");
  const { isInitialLoading: isLoadingCalc, data: dataCalc } = useTransferCalc({
    group_id: continueModal.data?.group?.id,
    contact_id: continueModal.data?.id,
    transfer_date_from:
      transfer_date_from &&
      moment(new Date(transfer_date_from)).format(DATE_FORMAT_YYYY_MM_DD),
    leaving_category_id: watch("leaving_category_id"),
    reason: watch("reason"),
    isLoadingValidate: false,
    transfer: true,
    isOwnGroup: true,
    date_to: continueModal?.data?.finish_date,
  });
  const currentStudent: OneStudent = continueModal?.data?.student;
  const finish_date = moment(currentStudent?.finish_date);
  const isPast = finish_date.diff(moment(), "days") < 0;
  const isStopping =
    currentStudent?.status?.toString() === STOPPING_STUDENT?.toString();

  useEffect(() => {
    if (isStopping) {
      setValue("date_to", currentStudent?.finish_date);
    }
  }, [isStopping, continueModal.open]);
  // const dates =
  //   (currentStudent as any)?.group?.lessonDays ||
  //   (currentStudent as any)?.lessonDays ||
  //   [];
  const weekDays =
    (
      group?.lessonDay?.lessonWeekDayIndexes ||
      currentStudent?.group?.lessonDay?.lessonWeekDayIndexes ||
      (currentStudent as any)?.lessonDay?.lessonWeekDayIndexes
    )?.map((e: string) => week_days?.[e as keyof typeof week_days]) || [];
  return (
    <AntdModal
      open={continueModal.open}
      onCancel={handleClose}
      centered
      width={520}
      afterClose={() => reset()}
    >
      <Spin spinning={isLoadingCalc}>
        <ModalTitle>Continue</ModalTitle>
        <div className="mt10">
          <StudentCard data={continueModal.data?.student} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper style={{ border: "none", paddingTop: "20px" }}>
            <Wrapper>
              <DatePicker
                error={errors?.date_to?.message}
                name="date_to"
                control={control}
                label="(Old group) Finish date"
                disabled={isPast && isStopping}
                // enabledDatesWithoutTodayValidation={dates}
              />
              <DatePicker
                name="transfer_date_from"
                control={control}
                label="Start date"
                error={
                  errors?.transfer_date_from?.message ||
                  errors?.date_to?.message
                }
                disabledDate={(date) => {
                  return (
                    !weekDays.find((e: any) => e == date.format("dddd")) ||
                    date.isBefore(
                      dayjs(getValues("date_to"), DATE_FORMAT_YYYY_MM_DD),
                    )
                  );
                }}
                // enabledDatesWithoutTodayValidation={dates}
              />
            </Wrapper>
          </FormWrapper>
          <FormWrapper style={{ paddingBottom: "63px" }}>
            <Wrapper>
              <Input
                name="reason"
                control={control}
                label="Reason"
                type="textarea"
                rows={4}
                error={errors?.reason?.message}
                onChange={(e) => {
                  setValue("reason", e?.target?.value);
                  clearErrors("reason");
                }}
              />
            </Wrapper>
          </FormWrapper>
          <PaymentCalc
            dataCalc={dataCalc}
            groups={{
              old: {
                name: continueModal.data?.group?.name,
                type: continueModal.data?.group?.groupType?.name,
              },
            }}
            open={{
              group: {
                name: continueModal.data?.group?.name,
                type: continueModal.data?.group?.groupType?.name,
              },
            }}
          />
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={saveContinue.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default ContinueModal;
