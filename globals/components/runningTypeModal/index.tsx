import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDeleteHoliday } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  AntdModal,
  Button,
  CalendarHateSvg,
  RunningCalendarSvg,
  TransferSvg,
  ErrorLabel,
} from "components";
import {
  Box,
  Buttons,
  Content,
  IconWrapper,
  Inner,
  SecondWrapper,
  Text,
  TypeContent,
} from "./style";
import { bgColors } from "styles/theme";
import { yupResolver } from "@hookform/resolvers/yup";
import { RunningTypeModalSchema } from "validation";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const RunningTypeModal = () => {
  const innerTypes = [
    {
      tabId: 200,
      lessons: 20,
      title: "Opened",
      color: bgColors.deep,
      dates: "14 Sep - 31 Nov",
      bottom: true,
      svg: <CalendarHateSvg color={bgColors.deep} height={34} width={34} />,
    },
    {
      tabId: 300,
      title: "Running",
      lessons: 20,
      color: bgColors.serengeti,
      bottom: true,
      dates: "14 Sep - 31 Nov",
      svg: (
        <RunningCalendarSvg color={bgColors.serengeti} height={34} width={34} />
      ),
    },
  ];

  const [step, setStep] = useState("first");
  const dispatch = useDispatch();
  const {
    runningTypeModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    reset({});
    setStep("first");
    dispatch(
      toggleModal({
        key: "runningTypeModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();
  const deleteHoliday = useDeleteHoliday({
    onSuccess: () => {
      toast.success("Item is deleted");
      queryClient.invalidateQueries([queryKeys.admin_company_get_holiday_list]);
      handleClose();
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RunningTypeModalSchema),
  });

  const onSubmit = () => {
    deleteHoliday.mutate({
      query_params: {
        id: data?.holiday_id,
      },
    });
  };
  const contents = {
    first: (
      <>
        <Content>
          <IconWrapper>
            <div className="svg">
              <TransferSvg color={bgColors.deep} width={50} height={50} />
            </div>
            <div className="blur" />
          </IconWrapper>
          <Text>
            Are you sure to move this group [GE - 716] runing status ?
          </Text>
        </Content>
        <Buttons>
          <Button
            className="cancel"
            onClick={handleClose}
            style={{
              backgroundColor: bgColors.wildSand,
              width: "100%",
            }}
          >
            No
          </Button>
          <Button
            className="save"
            type="submit"
            style={{
              width: "100%",
            }}
            onClick={() => setStep("second")}
          >
            Yes
          </Button>
        </Buttons>
      </>
    ),
    second: (
      <SecondWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="img">
            <img alt="date" src="/calendar-upgrade.png" />
          </div>
          <p>Choose duration for [GE - 716]</p>
          <Inner required={true} error={!!errors}>
            <Controller
              name="type"
              control={control}
              render={({ field }) => {
                return (
                  <TypeContent>
                    {innerTypes?.map((item, k) => {
                      const active = item?.tabId === field?.value;
                      return (
                        <Box
                          key={k}
                          onClick={() => {
                            field.onChange(item?.tabId);
                          }}
                          style={{
                            borderColor: active
                              ? bgColors.primary
                              : bgColors.transparent,
                          }}
                        >
                          {item?.svg}
                          <div className="title">{item?.title}</div>
                          <div className="lessons">{item?.lessons}</div>
                          <div className="dates">{item?.dates}</div>
                          {item?.bottom && (
                            <div
                              className="abs"
                              style={{ backgroundColor: item?.color }}
                            />
                          )}
                        </Box>
                      );
                    })}
                  </TypeContent>
                );
              }}
            />
            <ErrorLabel error={errors?.type?.message} />
          </Inner>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              style={{
                backgroundColor: bgColors.wildSand,
                width: "100%",
              }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              style={{
                width: "100%",
              }}
              onClick={() => setStep("second")}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </SecondWrapper>
    ),
  };
  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={step === "first" ? 340 : 360}
    >
      {contents[step as keyof typeof contents]}
    </AntdModal>
  );
};

export default RunningTypeModal;
