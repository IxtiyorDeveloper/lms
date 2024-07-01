import * as React from "react";
import { useEffect, useState } from "react";
import { Buttons, Content, TimeRow, TimeWrapper } from "./style";
import {
  AntdModal,
  AntdSwitch,
  Button,
  Input,
  MyDateRangePicker,
  MySelect,
  TimePicker,
} from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  useCreateBatchHoliday,
  useHolidayWithGroup,
  usePageDataMemo,
} from "hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { CreateHoliday } from "validation/holiday";
import { HolidayNotifyType } from "types";
import moment from "moment";
import { DATE_FORMAT_STANDARD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import Preview from "./preview";
import dayjs from "dayjs";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

export enum Enum {
  create = "create",
  update = "update",
}

const regex = /general\.dates\.(\d+)\.notify_type/;

const HolidayModal = () => {
  const [step, setStep] = useState(0);
  const [dates, setDates] = useState<{ day: string; time: string }[] | []>([]);
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { companyEnumsHolidayTypes, groupContactEnumsStudyStatuses, args } =
    usePageDataMemo();

  const {
    holiday: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const holiday_group_id = data?.holiday_group_id;
  const type = data?.type;

  const {
    data: holiday,
    isPreviousData,
    isInitialLoading: isLoading,
  } = useHolidayWithGroup({
    query_params: {
      group_id: holiday_group_id,
    },
  });

  const createHoliday = useCreateBatchHoliday({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_company_get_holiday_list]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  }: any = useForm({
    resolver: yupResolver(CreateHoliday),
    defaultValues: {
      general: {
        dates: null,
      },
    },
  });
  const handleClose = () => {
    setDates([]);
    reset({});
    setIsActive(false);
    setStep(0);
    dispatch(
      toggleModal({
        key: "holiday",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const handlePreviousSubmit = () => {
    setStep(1);
  };
  const onSubmit = (data: { general: any }) => {
    const { general } = data;
    const general_dates = general?.dates;
    let dates_with_times: any = [];
    if (dates.length) {
      for (let i = 0; i < dates.length; i++) {
        if (general_dates?.[i]?.notify_type) {
          const inputDate = dates[i].day;
          const formattedDate = moment(inputDate, DATE_FORMAT_STANDARD).format(
            DATE_FORMAT_YYYY_MM_DD
          );
          dates_with_times = [
            ...dates_with_times,
            {
              day: formattedDate,
              from_time: general_dates?.[i]?.from_time?.format("HH:mm"),
              to_time: general_dates?.[i]?.to_time?.format("HH:mm"),
              notify_type: HolidayNotifyType.on,
            },
          ];
        } else {
          const inputDate = dates[i].day;

          const formattedDate = moment(inputDate, DATE_FORMAT_STANDARD).format(
            DATE_FORMAT_YYYY_MM_DD
          );
          dates_with_times = [
            ...dates_with_times,
            {
              day: formattedDate,
              notify_type: HolidayNotifyType.off,
            },
          ];
        }
      }
    }
    if (type === Enum?.create) {
      createHoliday.mutate({
        body: {
          name: general?.name,
          type: general?.type,
          notify_type: general?.notify_type
            ? HolidayNotifyType.on
            : HolidayNotifyType.off,
          dates: dates_with_times,
          notify_text: general.notify_text,
          delivery_statuses: general.delivery_to,
        },
      });
    }
    if (type === Enum?.update) {
      createHoliday.mutate({
        body: {
          group_id: holiday_group_id,
          name: general?.name,
          type: general?.type,
          notify_type: general?.notify_type
            ? HolidayNotifyType.on
            : HolidayNotifyType.off,
          dates: dates_with_times,
          notify_text: general.notify_text,
          delivery_statuses: general.delivery_to,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update && holiday) {
      const from_date = moment(
        holiday?.dates?.[0]?.day,
        DATE_FORMAT_YYYY_MM_DD
      ).format(DATE_FORMAT_STANDARD);
      const to_date = moment(
        holiday?.dates?.[holiday?.dates?.length - 1]?.day,
        DATE_FORMAT_YYYY_MM_DD
      ).format(DATE_FORMAT_STANDARD);

      setValue("general", {
        name: holiday?.name,
        type: holiday?.type?.toString(),
        delivery_to: holiday?.delivery_statuses,
        notify_text: holiday?.notify_text?.toString(),
        notify_type: holiday?.notify_type == HolidayNotifyType.on,
        dates: holiday?.dates?.map((date) => ({
          notify_type: date?.notify_type == HolidayNotifyType.on,
          day: moment(date?.day, DATE_FORMAT_STANDARD),
          from_time: date?.from_time ? moment(date?.from_time, "HH:mm") : null,
          to_time: date?.to_time ? moment(date?.to_time, "HH:mm") : null,
        })),
      });

      setValue("general.date", [
        dayjs(from_date, DATE_FORMAT_STANDARD),
        dayjs(to_date, DATE_FORMAT_STANDARD),
      ]);
    }
  }, [open, holiday, type]);

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (name === "general.notify_type") {
        setIsActive(value?.general?.notify_type);
      }
      const match = name?.match(regex);
      const dynamicNumber = match?.[1];

      if (
        name === `general.dates.${dynamicNumber}.notify_type` &&
        type === "change"
      ) {
        if (!value?.general?.dates?.[dynamicNumber].notify_type) {
          setValue(`general.dates.${dynamicNumber}.from_time`, null);
          setValue(`general.dates.${dynamicNumber}.to_time`, null);
        }
      }
      if ("general.date" === name) {
        const { general } = value;
        let dates: any = [];
        if (Array.isArray(general.date)) {
          const fromDate = general.date[0];
          const toDate = general.date[1];
          const diff = toDate.diff(fromDate, "days");
          for (let i = 0; i <= diff; i++) {
            const newDate = fromDate.clone().add(i, "days");
            dates = [
              ...dates,
              {
                day: newDate.format(DATE_FORMAT_STANDARD),
              },
            ];
          }
        }
        setDates(dates);
        if (type === "change") {
          setValue("general.dates", []);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      title={type === Enum.create ? "Create Holiday" : "Update Holiday"}
    >
      <Spin spinning={args?.isLoading || isPreviousData || isLoading}>
        <form
          onSubmit={handleSubmit(
            watch("general.notify_type") ? handlePreviousSubmit : onSubmit
          )}
        >
          {step === 0 ? (
            <>
              <Content>
                <Input
                  label="Name"
                  name="general.name"
                  control={control}
                  placeholder="John"
                  error={errors?.general?.name?.message}
                />
                <MySelect
                  control={control}
                  name="general.type"
                  label="Type"
                  placeholder="Select"
                  options={companyEnumsHolidayTypes}
                  error={errors?.general?.type?.message}
                />
                <MyDateRangePicker
                  name="general.date"
                  control={control}
                  label="Day"
                  error={errors?.general?.date?.message}
                />
                <AntdSwitch
                  label="Notify (SMS)"
                  control={control}
                  name="general.notify_type"
                />
                {isActive && (
                  <>
                    <MySelect
                      control={control}
                      name="general.delivery_to"
                      label="Delivery to"
                      mode="multiple"
                      placeholder="Select"
                      options={groupContactEnumsStudyStatuses}
                      error={errors?.general?.delivery_to?.message}
                    />
                    <Input
                      label="Text"
                      name="general.notify_text"
                      type="textarea"
                      rows={4}
                      control={control}
                      placeholder="Text"
                      error={errors?.general?.notify_text?.message}
                    />
                    <TimeWrapper>
                      <p>Time</p>
                      <div className="rows">
                        {dates?.map((date, index) => {
                          return (
                            <TimeRow key={date?.day}>
                              <div className="switch">
                                <AntdSwitch
                                  name={`general.dates.${index}.notify_type`}
                                  control={control}
                                />
                                <p className="day">{date?.day}</p>
                              </div>
                              <div className="times">
                                <TimePicker
                                  name={`general.dates.${index}.from_time`}
                                  format="HH:mm"
                                  control={control}
                                  disabled={
                                    !watch(`general.dates.${index}.notify_type`)
                                  }
                                  error={
                                    errors?.general?.dates?.[index]?.from_time
                                      ?.message
                                  }
                                />
                                <TimePicker
                                  name={`general.dates.${index}.to_time`}
                                  format="HH:mm"
                                  control={control}
                                  disabled={
                                    !watch(`general.dates.${index}.notify_type`)
                                  }
                                  error={
                                    errors?.general?.dates?.[index]?.to_time
                                      ?.message
                                  }
                                />
                              </div>
                            </TimeRow>
                          );
                        })}
                      </div>
                    </TimeWrapper>
                  </>
                )}
              </Content>
              <Buttons>
                <Button
                  className="cancel"
                  onClick={handleClose}
                  style={{
                    backgroundColor: bgColors.wildSand,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="save"
                  type="submit"
                  buttonLoading={createHoliday?.isLoading}
                >
                  Save
                </Button>
              </Buttons>
            </>
          ) : (
            <>
              <Preview
                setStep={setStep}
                watch={watch}
                onSubmit={onSubmit}
                buttonLoading={createHoliday?.isLoading}
              />
            </>
          )}
        </form>
      </Spin>
    </AntdModal>
  );
};
export default HolidayModal;
