import React, { useEffect, useState } from "react";
import {
  AntdModal,
  Button,
  DatePicker,
  StudentCard,
  BalanceWithDebt,
} from "components";
import { useForm } from "react-hook-form";
import {
  useChangeGroupContactDateFrom,
  usePageData,
  useStartDateCalculation,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { bgColors } from "styles/theme";
import { Buttons, Content } from "./style";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeStartDateSchema } from "validation/user";
import { DATE_FORMAT_STANDARD, DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { CalculationInfoWrapper } from "../stoppingModal/style";
import moment from "moment/moment";
import { ICalculation } from "types/ICalculation";
import { Spin } from "antd";
import { validationErrorHandler } from "utils";

interface Interface {
  date_from: string;
}

const ChangeStartDate = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: pageData } = usePageData();
  const {
    changeStartDate: { open, data },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.id;
  const [calculation, setCalculation] = useState<ICalculation | undefined>(
    undefined
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<Interface>({
    resolver: yupResolver(ChangeStartDateSchema),
  });

  const changeStartDate = useChangeGroupContactDateFrom({
    onSuccess: () => {
      queryClient.invalidateQueries(data?.queryKeys);
      toast.info("Successfully updated");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const performCalc = useStartDateCalculation({
    onSuccess: (old) => {
      setCalculation(old);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleClose = () => {
    reset({});
    setCalculation(undefined);
    dispatch(
      toggleModal({
        key: "changeStartDate",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const onSubmit = (data: Interface) => {
    changeStartDate.mutate({
      body: data,
      query_params: {
        contact_id: id,
      },
    });
  };

  useEffect(
    () => setValue("date_from", data?.start_date),
    [data?.start_date, open]
  );
  useEffect(() => {
    const subscription = watch((value: any, { name, type }) => {
      if (name === "date_from") {
        performCalc.mutate({
          body: {
            date_from: moment(new Date(value?.date_from)).format(
              DATE_FORMAT_YYYY_MM_DD
            ),
          },
          query_params: {
            contact_id: data?.id,
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [data?.id]);

  return (
    <AntdModal open={open} onCancel={handleClose} width={520} destroyOnClose>
      <Spin spinning={performCalc?.isLoading}>
        <form onClick={(e) => e.stopPropagation()}>
          <Content>
            <div className="mt10">
              <StudentCard data={data?.student} />
            </div>
            <DatePicker
              format={DATE_FORMAT_STANDARD}
              label="Start date"
              name="date_from"
              control={control}
              error={errors?.date_from?.message}
              weekDaysIndexes={pageData?.days
                .find((e) => e.id == data.student?.group?.lesson_day_id)
                ?.lessonWeekDayIndexes?.map((e) => +e)}
            />
            <div>
              {calculation && (
                <CalculationInfoWrapper>
                  <BalanceWithDebt
                    debt={calculation?.group?.debt}
                    addedBalance={calculation?.student?.difference}
                    balance={calculation?.student?.balance}
                  />
                </CalculationInfoWrapper>
              )}
            </div>
          </Content>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              style={{
                backgroundColor: bgColors.wildSand,
                width: "100%",
              }}>
              Cancel
            </Button>
            <Button
              className="save"
              // type="submit"
              onClick={handleSubmit(onSubmit)}
              buttonLoading={
                performCalc.isLoading || changeStartDate?.isLoading
              }
              style={{
                width: "100%",
              }}>
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default ChangeStartDate;
