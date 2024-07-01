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
  FlexWrapper,
  PriceBox,
  IconWrapper,
  CalculationInfoWrapper,
} from "./style";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "components/antd/datePicker";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useEffect, useState } from "react";
import {
  useGetOneStudent,
  useStopCalculation,
  useStopPageData,
  useStopStatusChange,
} from "hooks";
import moment from "moment";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { EUser } from "types";
import { selectCreator } from "./selectCreator";
import { IOption } from "components/common/select/type";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { PerformStopValidation } from "validation/actions";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { findMethod } from "utils/findParentLevel";
import { validationErrorHandler } from "utils";
import { ICalculation } from "types/ICalculation";
import { expand } from "app/student/[studentId]/expand";
import { queryKeys } from "constants/queryKeys";

const stoppingType = {
  waitingList: "100",
  archived: "300",
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
const StoppingStatusChangeModal = () => {
  const [calculation, setCalculation] = useState<ICalculation | undefined>(
    undefined,
  );
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {
    stoppingStatusChange: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const performStop = useStopStatusChange({
    onSuccess: () => {
      queryClient.invalidateQueries(data.queryKeys);
      reset({});
      toast.success("Success");
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: true,
      });
    },
  });

  const performCalculation = useStopCalculation({
    onSuccess: (data) => {
      clearErrors();
      setCalculation(data);
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: true,
      });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    control,
    setValue,
    clearErrors,
  } = useForm<any>({
    resolver: yupResolver(PerformStopValidation),
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
        key: "stoppingStatusChange",
      }),
    );

    queryClient.invalidateQueries([
      queryKeys.admin_grouped_stop_calculation,
      queryKeys.admin_grouped_stop_page_data,
    ]);
  };

  const id = data?.id;
  const status = data?.status;
  const isDate = data?.permissionActions?.can_stop;
  const onSubmit = (submittedData: any) => {
    const general = submittedData?.general;
    if (general?.check == stoppingType.waitingList && !!id) {
      if (isDate)
        performStop.mutate({
          body: {
            next_status: EUser.S100,
            leaving_category_id: general?.leaving_category_id,
            reason: general?.reason,
            date_to: moment(new Date(general.date_to)).format(
              DATE_FORMAT_YYYY_MM_DD,
            ),
            course_id: general?.course_id,
            group_type_id: general?.group_type_id,
            level_id: general?.level_id,
            lesson_day_ids: general?.lesson_days,
            lesson_time_ids: general?.lesson_time_id,
            branch_id: general?.branch_id,
            note: general?.comment,
          },
          query_params: {
            id,
          },
        });
      else {
        performStop.mutate({
          body: {
            next_status: EUser.S100,
            leaving_category_id: general?.leaving_category_id,
            reason: general?.reason,
            course_id: general?.course_id,
            group_type_id: general?.group_type_id,
            level_id: general?.level_id,
            lesson_day_ids: general?.lesson_days,
            lesson_time_ids: general?.lesson_time_id,
            branch_id: general?.branch_id,
            note: general?.comment,
          },
          query_params: {
            id,
          },
        });
      }
    }
    if (general?.check == stoppingType.archived && !!id) {
      if (isDate) {
        performStop.mutate({
          body: {
            next_status: EUser.S300,
            leaving_category_id: general?.leaving_category_id,
            reason: general?.reason,
            date_to: moment(new Date(general.date_to)).format(
              DATE_FORMAT_YYYY_MM_DD,
            ),
          },
          query_params: {
            id,
          },
        });
      } else {
        performStop.mutate({
          body: {
            next_status: EUser.S300,
            leaving_category_id: general?.leaving_category_id,
            reason: general?.reason,
          },
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
    expand,
    id: data.student?.user?.id,
    type: "update",
  });

  const selects = selectCreator({
    ...pageData?.academic,
    ...pageData?.company,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "general.date_to" && type === "change") {
        performCalculation.mutate({
          body: {
            date_to: moment(new Date(watch("general.date_to"))).format(
              DATE_FORMAT_YYYY_MM_DD,
            ),
          },
          query_params: {
            contact_id: data?.id,
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, data]);

  useEffect(() => {
    if (pageData) {
      setValue("general", {
        ...watch("general"),
        ...pageData?.contact,
        lesson_day_id: [pageData?.contact?.lesson_day_id],
        lesson_time_id: [pageData?.contact?.lesson_time_id],
        parent_level_id: findMethod(selects.level, pageData?.contact?.level_id)
          ?.value,
      });
    }
  }, [pageData?.contact, isPreviousData, pageLoading, open]);

  const dates = studentData?.currentGroupContact?.group?.lessonDays || [];

  useEffect(() => {
    if (status) {
      setValue("general.check", status?.toString());
    }
  }, [status]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={performCalculation.isLoading || pageLoading}>
        <ModalTitle>Stopping</ModalTitle>
        <div className="mt10">
          <StudentCard data={data?.student} />
        </div>
        {!!calculation?.group?.debt &&
          calculation?.group?.debt > 0 &&
          !!watch("general.date_to") && (
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
                  name="general.date_to"
                  control={control}
                  error={(errors as any)?.general?.date_to?.message}
                  enabledDatesWithoutTodayValidation={dates}
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
              name="general.leaving_category_id"
              control={control}
              options={selects.stopping_categories}
              error={(errors as any)?.general?.leaving_category_id?.message}
            />
          </Wrapper>
          <Wrapper>
            <Input
              placeholder="Type here..."
              name="general.reason"
              control={control}
              label="Reason"
              type="textarea"
              error={(errors as any)?.general?.reason?.message}
            />
          </Wrapper>
          <Wrapper>
            <Radios
              control={control}
              name="general.check"
              options={[
                { label: "Waiting list", value: stoppingType.waitingList },
                { label: "Archived", value: stoppingType.archived },
              ]}
              error={(errors as any)?.general?.check?.message}
            />
          </Wrapper>
          {watch("general.check") != stoppingType.waitingList ||
          !watch("general.check") ? (
            <div style={{ padding: "90px 0" }}></div>
          ) : (
            <>
              <FlexWrapper>
                <Wrapper>
                  <MySelect
                    label="Course"
                    name="general.course_id"
                    control={control}
                    options={selects.course}
                  />
                </Wrapper>
                <Wrapper>
                  <MySelect
                    label="Group type"
                    name="general.group_type_id"
                    control={control}
                    options={selects.groupType}
                  />
                </Wrapper>
              </FlexWrapper>
              <FlexWrapper>
                <Wrapper>
                  <MySelect
                    label="Level"
                    name="general.parent_level_id"
                    control={control}
                    options={selects.level.options}
                  />
                </Wrapper>
                <Wrapper>
                  <MySelect
                    label="Sub level"
                    name="general.level_id"
                    control={control}
                    disabled={!watch("general.parent_level_id")}
                    options={
                      selects.level?.options?.find(
                        (e: IOption) =>
                          e?.value === watch("general.parent_level_id"),
                      )?.subLevel
                    }
                  />
                </Wrapper>
              </FlexWrapper>
              <FlexWrapper>
                <Wrapper>
                  <MySelect
                    control={control}
                    name="general.lesson_day_id"
                    label="Day"
                    options={selects.lesson_days}
                    placeholder="-"
                    mode="multiple"
                  />
                </Wrapper>
                <Wrapper>
                  <MySelect
                    control={control}
                    name="general.lesson_time_id"
                    label="Time"
                    options={selects.lesson_times}
                    placeholder="-"
                    mode="multiple"
                  />
                </Wrapper>
              </FlexWrapper>
              <FlexWrapper>
                <Wrapper>
                  <MySelect
                    control={control}
                    name="general.branch_id"
                    label="Branch"
                    options={selects.branch}
                    placeholder="-"
                  />
                </Wrapper>
              </FlexWrapper>
              <FlexWrapper style={{ marginBottom: "30px" }}>
                <Wrapper>
                  <Input
                    placeholder="Type here..."
                    name="general.comment"
                    control={control}
                    label="Comment"
                    type="textarea"
                  />
                </Wrapper>
              </FlexWrapper>
            </>
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
export default StoppingStatusChangeModal;
