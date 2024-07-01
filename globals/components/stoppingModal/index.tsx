import * as React from "react";
import {
  AntdModal,
  Button,
  Input,
  MySelect,
  PodoSvg,
  Radios,
  StudentCard,
  WarningComponent,
  BalanceWithDebt,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  PriceBox,
  IconWrapper,
  CalculationInfoWrapper,
  WaitingListWrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "components/antd/datePicker";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useEffect, useState } from "react";
import {
  useGetOneStudent,
  usePageDataMemo,
  usePerformStop,
  useStopCalculation,
  useStopPageData,
  useStopStatusChange,
} from "hooks";
import moment from "moment";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { EUser } from "types";
import { selectCreator } from "./selectCreator";
import { Divider, Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { validationErrorHandler } from "utils";
import { ICalculation } from "types/ICalculation";
import { queryKeys } from "constants/queryKeys";
import BranchSelect from "./branchSelect";
import GroupLevel from "./groupLevel";
import DaySelect from "./daySelect";
import TimeSelect from "./timeSelect";
import AdditionalPreferences from "./additionalPreferences";
import { undefinedValues } from "../../../app/student/create-student/components/common";

const stoppingType = {
  waitingList: 100,
  archived: 200,
};

const bgColor = {
  danger: bgColors.pepper,
  success: bgColors.sadet,
  warning: bgColors.primary,
};

const shColor = {
  danger: bgColors.fond,
  success: bgColors.pepper,
  warning: bgColors.primary,
};

const icon = {
  danger: (
    <IconWrapper>
      <PodoSvg width={18} height={18} color={bgColors.white} /> NOT PAID
    </IconWrapper>
  ),
  success: bgColors.pepper,
  warning: bgColors.primary,
};

const priceStatus = "danger";
const StoppingModal = () => {
  const [calculation, setCalculation] = useState<ICalculation | undefined>(
    undefined,
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    stopping: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const {
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    control,
    setValue,
    clearErrors,
  } = useForm<any>();
  const performStop = (
    !data?.isStatusChangeByWhereColumn ? usePerformStop : useStopStatusChange
  )?.({
    onSuccess: () => {
      if (Array.isArray(data.queryKeys)) {
        for (let i = 0; i < data.queryKeys.length; i++)
          queryClient.invalidateQueries(data.queryKeys[i]);
      }
      reset({});
      toast.success("Success");
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError,
        formHookMainField: "root",
      });
    },
  });

  const performCalculation = useStopCalculation({
    onSuccess: (data) => {
      setCalculation(data);
      clearErrors();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError,
        formHookMainField: "root",
      });
    },
  });

  const handleClose = () => {
    reset({});
    setCalculation(undefined);
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "stopping",
      }),
    );

    queryClient.invalidateQueries([
      queryKeys.admin_grouped_stop_calculation,
      queryKeys.admin_grouped_stop_page_data,
    ]);
  };
  const id = data?.id;
  const isDate = data?.permissionActions?.can_stop;
  const onSubmit = (submittedData: any) => {
    const root = submittedData?.root;
    if (root?.check == stoppingType.waitingList && !!id) {
      if (isDate)
        performStop.mutate({
          body: {
            next_status: EUser.S100,
            leaving_category_id: root?.leaving_category_id,
            reason: root?.reason,
            date_to:
              root.date_to &&
              moment(root.date_to, DATE_FORMAT_YYYY_MM_DD).format(
                DATE_FORMAT_YYYY_MM_DD,
              ),
            // course_id: root?.course_id,
            // group_type_id: root?.group_type_id,
            // level_id: root?.level_id,
            // branch_id: root?.branch_id,
            // lesson_day_ids: root?.lesson_days,
            // lesson_time_ids: root?.lesson_time_id,
            note: root?.note,
            preferences: {
              course_id: root.course_id,
              group_type_id: root.group_type_id,
              level_id: root.sub_level_id,
              strict_by_branch: root.strict_by_branch,
              strict_by_level: root.strict_by_level,
              strict_by_time: root.strict_by_time,
              strict_by_day: root.strict_by_day,
              lesson_day_id: root.lesson_day_id,
              lesson_time_id: root.lesson_time_id,
              branch_id: Array.isArray(root.branch_id)
                ? root.branch_id
                : [root.branch_id],
              teacher_id: root.teacher_id?.map((e: any) => e.value) || [],
              start_date: root.start_date,
            },
            ...undefinedValues,
          },
          id: id,
          query_params: {
            id,
          },
        });
      else {
        performStop.mutate({
          body: {
            next_status: EUser.S100,
            leaving_category_id: root?.leaving_category_id,
            reason: root?.reason,
            // course_id: root?.course_id,
            // group_type_id: root?.group_type_id,
            // branch_id: root?.branch_id,
            // level_id: root?.level_id,
            lesson_day_ids: root?.lesson_days,
            lesson_time_ids: root?.lesson_time_id,
            note: root?.note,
            preferences: {
              course_id: root.course_id,
              group_type_id: root.group_type_id,
              level_id: root.sub_level_id,
              strict_by_branch: root.strict_by_branch,
              strict_by_level: root.strict_by_level,
              strict_by_time: root.strict_by_time,
              strict_by_day: root.strict_by_day,
              lesson_day_id: root.lesson_day_id,
              lesson_time_id: root.lesson_time_id,
              branch_id: Array.isArray(root.branch_id)
                ? root.branch_id
                : [root.branch_id],
              teacher_id: root.teacher_id?.map((e: any) => e.value) || [],
              start_date: root.start_date,
            },
            ...undefinedValues,
          },
          id: id,
          query_params: {
            id,
          },
        });
      }
    }
    if (root?.check == stoppingType.archived && !!id) {
      if (isDate) {
        performStop.mutate({
          body: {
            next_status: EUser.S300,
            leaving_category_id: root?.leaving_category_id,
            reason: root?.reason,
            date_to:
              root.date_to &&
              moment(root.date_to, DATE_FORMAT_YYYY_MM_DD).format(
                DATE_FORMAT_YYYY_MM_DD,
              ),
            preferences: {
              strict_by_branch: root.strict_by_branch,
              strict_by_level: root.strict_by_level,
              strict_by_time: root.strict_by_time,
              strict_by_day: root.strict_by_day,
              teacher_id: root.teacher_id?.map((e: any) => e.value) || [],
              start_date: root.start_date,
              course_id: `${pageData?.contact?.course_id}`,
              group_type_id: `${pageData?.contact?.group_type_id}`,
              branch_id: [`${pageData?.contact?.branch_id}`],
              level_id: `${pageData?.contact?.level_id}`,
              lesson_day_id: [`${pageData?.contact?.lesson_day_id}`],
              lesson_time_id: [`${pageData?.contact?.lesson_time_id}`],
            },
          },
          id: id,
          query_params: {
            id,
          },
        });
      } else {
        performStop.mutate({
          body: {
            next_status: EUser.S300,
            leaving_category_id: root?.leaving_category_id,
            reason: root?.reason,
            preferences: {
              strict_by_branch: root.strict_by_branch,
              strict_by_level: root.strict_by_level,
              strict_by_time: root.strict_by_time,
              strict_by_day: root.strict_by_day,
              teacher_id: root.teacher_id?.map((e: any) => e.value) || [],
              start_date: root.start_date,
              course_id: `${pageData?.contact?.course_id}`,
              group_type_id: `${pageData?.contact?.group_type_id}`,
              branch_id: [`${pageData?.contact?.branch_id}`],
              level_id: `${pageData?.contact?.level_id}`,
              lesson_day_id: [`${pageData?.contact?.lesson_day_id}`],
              lesson_time_id: [`${pageData?.contact?.lesson_time_id}`],
            },
          },
          id: id,
          query_params: {
            id,
          },
        });
      }
    }
  };

  const {
    data: pageData,
    isLoading: pageLoading,
    isPreviousData,
  } = useStopPageData({
    id: data?.id,
  });

  const { data: studentData, isLoading: isLoadingStudent } = useGetOneStudent({
    // expand,
    id: data.student?.user?.id,
    type: "update",
  });

  const pageDataSelects = usePageDataMemo();

  const selects = selectCreator({
    ...pageData?.academic,
    ...pageData?.company,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "root.date_to" && type === "change") {
        performCalculation.mutate({
          body: {
            date_to: moment(new Date(value.root.date_to)).format(
              DATE_FORMAT_YYYY_MM_DD,
            ),
          },
          query_params: {
            contact_id: data?.id,
          },
        });
      } else if (name == "root.level_id") {
        setValue("root.sub_level_id", null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, data]);

  useEffect(() => {
    if (pageData)
      setValue("root", {
        ...pageData?.contact,
        course_id: `${pageData.contact?.course_id}`,
        group_type_id: `${pageData.contact?.group_type_id}`,
        branch_id: [`${pageData.contact?.branch_id}`],
        level_id: `${pageData.contact?.parent_level_id}`,
        sub_level_id: `${pageData.contact?.level_id}`,
        lesson_day_id: [`${pageData?.contact?.lesson_day_id}`],
        lesson_time_id: [`${pageData?.contact?.lesson_time_id}`],
      });
  }, [pageData?.contact, isPreviousData, pageLoading, open]);

  const dates = studentData?.currentGroupContact?.group?.lessonDays || [];

  const lessonWeekDayIndexes = pageDataSelects?.days
    ?.find(
      (f) => f.value == studentData?.currentGroupContact?.group?.lesson_day_id,
    )
    ?.lessonWeekDayIndexes?.map((item) => +item);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={840}>
      <Spin spinning={performCalculation.isLoading || pageLoading}>
        <ModalTitle>Stopping</ModalTitle>
        <div className="mt10">
          <StudentCard data={data?.student} />
        </div>
        {!!calculation?.group?.debt &&
          calculation?.group?.debt > 0 &&
          !!watch("root.date_to") && (
            <>
              <PriceBox
                style={{
                  width: "100%",
                  background: bgColor[priceStatus],
                  boxShadow: `inset 0 0 8px ${shColor[priceStatus]}`,
                }}
              >
                {icon[priceStatus]} -
                {toCurrencyFormat(calculation?.group?.debt)}
              </PriceBox>
            </>
          )}
        <form onSubmit={handleSubmit(onSubmit)}>
          {isDate && (
            <>
              <Wrapper>
                <DatePicker
                  label="Finish date"
                  name="root.date_to"
                  control={control}
                  error={(errors as any)?.root?.date_to?.message}
                  enabledDatesWithoutTodayValidation={dates}
                  weekDaysIndexes={lessonWeekDayIndexes}
                />
              </Wrapper>
            </>
          )}
          {calculation?.notifications?.date_to && (
            <Wrapper>
              <WarningComponent text={calculation?.notifications?.date_to} />
            </Wrapper>
          )}
          <Wrapper>
            <MySelect
              label="Stopping category"
              name="root.leaving_category_id"
              control={control}
              options={selects.stopping_categories}
              error={(errors as any)?.root?.leaving_category_id?.message}
            />
          </Wrapper>
          <Wrapper>
            <Input
              placeholder="Type here..."
              name="root.reason"
              control={control}
              label="Reason"
              type="textarea"
              error={(errors as any)?.root?.reason?.message}
            />
          </Wrapper>
          <Wrapper>
            <Radios
              control={control}
              name="root.check"
              options={[
                { label: "Waiting list", value: stoppingType.waitingList },
                { label: "Archived", value: stoppingType.archived },
              ]}
              error={(errors as any)?.root?.check?.message}
            />
          </Wrapper>
          {watch("root.check") != stoppingType.waitingList ||
          !watch("root.check") ? (
            <div style={{ padding: "90px 0" }}></div>
          ) : (
            <WaitingListWrapper>
              <Divider style={{ marginTop: "0px", marginBottom: "0px" }} />
              <p className="title">General preferences</p>
              <GroupLevel
                selects={pageDataSelects}
                control={control}
                errors={errors}
                watch={watch}
              />
              <BranchSelect
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
              <div className="flex">
                <DaySelect control={control} errors={errors} watch={watch} />
                <TimeSelect
                  selects={pageDataSelects}
                  control={control}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
              <Divider style={{ marginTop: "8px", marginBottom: "0px" }} />
              <AdditionalPreferences
                control={control}
                setValue={setValue}
                watch={watch}
              />
              <Input
                name="root.note"
                control={control}
                type="textarea"
                label="Note"
                style={{ marginBottom: "16px" }}
              />
            </WaitingListWrapper>
          )}
          {calculation && (
            <CalculationInfoWrapper>
              <BalanceWithDebt
                debt={calculation?.group?.debt}
                addedBalance={calculation?.student?.difference}
                balance={calculation?.student?.balance}
              />
            </CalculationInfoWrapper>
          )}
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={performStop.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default StoppingModal;
