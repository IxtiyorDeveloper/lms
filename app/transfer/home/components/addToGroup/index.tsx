import React, { FC, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  ModalTitle,
  BottomSite,
  FormElementWrapper,
  Wrapper,
  CardWrap,
  CardWrapLeftRight,
  WarningWrapper,
} from "./style";
import { AntdModal, Button, Input, MySelect, StudentCard } from "components";
import { ITransferModal } from "./type";
import { bgColors, textColors } from "styles/theme";
import { SameCard } from "components";
import DatePicker from "components/antd/datePicker";
import {
  useSaveTransfer,
  useTransferCalc,
  useTransferPageData,
  useTransferValidate,
} from "hooks";
import { Spin } from "antd";
import { toast } from "react-toastify";
import moment from "moment";
import { useMoveValidate, useSaveMove } from "hooks/useStudentMove";
import PaymentCalc from "./components/paymentCalc";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useRouter } from "next/router";
import { OneStudent } from "types/student";
import { STOPPING_STUDENT } from "constants/studentStatuses";
import { validationErrorHandler } from "utils";
import Warning from "./components/warning";

const TransferModal: FC<ITransferModal> = ({
  open,
  handleClose,
  setOpen,
  student,
}) => {
  const router = useRouter();
  const transfer = router.query.action === "transfer";
  const currentStudent: OneStudent = open?.student;
  const finish_date = moment(currentStudent?.currentGroupContact?.finish_date);

  const isPast = finish_date.diff(moment(), "days") < 0;
  const isStopping =
    currentStudent?.currentGroupContact?.status?.toString() ===
    STOPPING_STUDENT?.toString();

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
    watch,
    clearErrors,
    reset,
    setValue,
  } = useForm<any>();
  const { isLoading, data } = useTransferPageData({
    group_id: router.query.groupId,
    contact_id: router.query.contactId,
  });
  const transfer_date_from = watch("transfer_date_from");
  const date_to = watch("date_to");

  //transfer yoki move ligiga qarab backend action o'zgartirilmoqda
  const {
    isInitialLoading: isLoadingValidate,
    error,
    // data: dataValidate,
  } = transfer
    ? useTransferValidate({
        group_id: open?.group?.id,
        contact_id: router.query.contactId,
        transfer_date_from:
          transfer_date_from &&
          moment(new Date(transfer_date_from)).format(DATE_FORMAT_YYYY_MM_DD),
        date_to:
          date_to && moment(new Date(date_to)).format(DATE_FORMAT_YYYY_MM_DD),
        leaving_category_id: watch("leaving_category_id"),
        reason: watch("reason"),
        transfer: transfer,
      })
    : useMoveValidate({
        group_id: open?.group?.id,
        contact_id: router.query.contactId,
        date_from:
          transfer_date_from &&
          moment(new Date(transfer_date_from)).format(DATE_FORMAT_YYYY_MM_DD),
        leaving_category_id: watch("leaving_category_id"),
        reason: watch("reason"),
        move: !transfer,
      });

  const {
    // isLoading: isLoadingCalc,
    data: dataCalc,
  } = useTransferCalc({
    group_id: open?.group?.id,
    contact_id: router.query.contactId,
    transfer_date_from:
      transfer_date_from &&
      moment(new Date(transfer_date_from)).format(DATE_FORMAT_YYYY_MM_DD),
    date_to:
      date_to && moment(new Date(date_to)).format(DATE_FORMAT_YYYY_MM_DD),
    leaving_category_id: watch("leaving_category_id"),
    reason: watch("reason"),
    isLoadingValidate: isLoadingValidate || error,
    transfer: transfer,
    onError: (err: any) => {
      validationErrorHandler({ err, showToast: false, setError });
    },
    onSuccess: () => {
      clearErrors();
    },
  });

  const save = useSaveTransfer({
    onSuccess: (data) => {
      toast.success("Student transferred");
      router.push(`/groups/${data.group.id}`);
    },
    onError: (err) => {
      validationErrorHandler({ err, showToast: false, setError });
    },
  });
  const move = useSaveMove({
    onSuccess: (data) => {
      toast.success("Student moved");
      router.push(`/groups/${data.group.id}`);
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        callBackSetError: (err) =>
          setError(err.field === "date" ? "date_from" : err.field, {
            message: err.message,
          }),
      });
    },
  });

  const onSubmit = (data: any) => {
    const transfer_date_from = moment(new Date(data.transfer_date_from)).format(
      DATE_FORMAT_YYYY_MM_DD,
    );
    const date_to = moment(new Date(data.date_to)).format(
      DATE_FORMAT_YYYY_MM_DD,
    );
    transfer
      ? save.mutate({
          group_id: open?.group?.id,
          contact_id: router.query.contactId,
          ...data,
          transfer_date_from: data.transfer_date_from && transfer_date_from,
          date_to: data.date_to && date_to,
        })
      : move.mutate({
          group_id: open?.group?.id,
          contact_id: router.query.contactId,
          ...data,
          date_from: data.transfer_date_from && transfer_date_from,
        });
  };

  const selects = useMemo(() => {
    return data?.company?.transferring_categories.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  }, [data?.company?.transferring_categories]);
  const groups = useMemo(() => {
    return {
      new: {
        name: data?.groups?.new?.name,
        type: data?.groups?.new?.groupType?.name,
        id: data?.groups?.new?.id,
      },
      old: {
        name: data?.groups?.old?.name,
        type: data?.groups?.old?.groupType?.name,
        id: data?.groups?.old?.id,
      },
    };
  }, [data?.groups]);

  useEffect(() => {
    const err = error as any;
    if (err) {
      validationErrorHandler({ err, showToast: true, setError });
    } else {
      clearErrors();
    }
  }, [error]);

  useEffect(() => {
    if (!open?.modal?.isOpen) {
      reset();
    }
  }, [open?.modal?.isOpen]);

  useEffect(() => {
    if (isStopping) {
      setValue("date_to", currentStudent?.currentGroupContact?.finish_date);
    }
  }, [isStopping, open?.modal?.isOpen]);

  return (
    <AntdModal
      open={open.modal.isOpen}
      onCancel={handleClose}
      centered
      width={520}
      padding="0"
    >
      <ModalTitle>{transfer ? "Transfer to group" : "Move"}</ModalTitle>
      <Spin spinning={isLoading}>
        <CardWrapLeftRight>
          <StudentCard data={student} />
        </CardWrapLeftRight>
        <WarningWrapper>
          <Warning student={student} />
        </WarningWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardWrap>
            <SameCard
              // lastTwo={true}
              // gridStyle={{
              //   gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 2fr",
              // }}
              group={open.group}
              // lastStyle={{ gridColumn: "1/4", gridRow: "3/4" }}
              setOpen={setOpen}
            />
          </CardWrap>
          <FormElementWrapper>
            <MySelect
              name="leaving_category_id"
              control={control}
              label={`${transfer ? "Transfer" : "Mov"}ing category`}
              options={selects}
              error={errors?.leaving_category_id?.message}
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Input
              name="reason"
              control={control}
              label="Reason"
              type="textarea"
              placeholder="Type here..."
              error={errors?.reason?.message || errors?.contact?.message}
            />
          </FormElementWrapper>
          <Spin spinning={isLoadingValidate}>
            <Wrapper>
              {transfer && (
                <FormElementWrapper
                  style={transfer ? { paddingRight: 0 } : {}}
                  className="w50"
                >
                  <DatePicker
                    error={errors?.date_to?.message || errors?.contact?.message}
                    name="date_to"
                    control={control}
                    label="(Old group) Finish date"
                    weekDaysIndexes={
                      data?.groups?.new?.lessonDay?.lessonWeeks?.map(
                        (e: any) => e.week_day,
                      ) ?? []
                    }
                    disabled={isPast && isStopping}
                  />
                </FormElementWrapper>
              )}
              <FormElementWrapper
                style={transfer ? { paddingLeft: 0 } : {}}
                className={transfer ? "w50" : "w100"}
              >
                <DatePicker
                  error={
                    errors?.transfer_date_from?.message ||
                    errors?.date_from?.message
                  }
                  name="transfer_date_from"
                  control={control}
                  label="(New Group) Start date"
                  weekDaysIndexes={open?.group?.weekIndex ?? []}
                />
              </FormElementWrapper>
            </Wrapper>
          </Spin>
          <PaymentCalc open={open} dataCalc={dataCalc} groups={groups} />
          <BottomSite>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={transfer && !dataCalc}
              buttonLoading={save.isLoading || move.isLoading}
            >
              Save
            </Button>
          </BottomSite>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default TransferModal;
