import * as React from "react";
import {
  BRow,
  Buttons,
  Content,
  CustomDay,
  HeadContent,
  InputNumberWrapper,
  RadioContentWrapper,
} from "./style";
import { AntdModal, AntdSwitch, Button, ContentRadio, Input } from "components";
import { bgColors } from "styles/theme";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateLessonDay, useLessonDay, useUpdateLessonDay } from "hooks";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateLessonDay } from "validation";
import { days, dayTypes } from "./data";
import { Spin } from "antd";
import _ from "lodash";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

type dayType = "odd" | "even" | "custom" | "";

export enum Enum {
  create = "create",
  update = "update",
}

export enum DayEnums {
  odd = "odd",
  even = "even",
  custom = "custom",
}

interface Interface {
  general: {
    name: string;
    day: dayType;
    day1: string;
    day2: string;
    day3: string;
    day4: string;
    day5: string;
    day6: string;
    day7: string;
  };
}

const StyledModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [dayType, setDayType] = useState<dayType>("");
  const {
    dayModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const dayId = data?.dayId;
  const {
    data: lessonDay,
    isPreviousData,
    isInitialLoading: isLoading,
  } = useLessonDay({
    query_params: {
      id: dayId,
      expand: "lessonWeeks",
    },
  });
  const type = data?.type;

  const createLessonDay = useCreateLessonDay({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const updateLessonDay = useUpdateLessonDay({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "dayModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  }: any = useForm<Interface>({
    resolver: yupResolver(CreateLessonDay as any),
  });

  const onSubmit = (data: { general: any }) => {
    const { general } = data;
    let days: { week_day: number }[] = [];

    if (general?.day !== "custom") {
      days = dayTypes[general?.day as keyof typeof dayTypes];
    } else {
      for (let i = 1; i <= 7; i++) {
        if (general?.days?.[`day${i}`]) days = [...days, { week_day: i }];
      }
    }
    if (type === Enum?.create) {
      createLessonDay.mutate({
        body: {
          course_id: router?.query?.update_id,
          name: general?.name,
          status: 100,
          lessonWeeks: days,
        },
      });
    }
    if (type === Enum?.update) {
      updateLessonDay.mutate({
        query_params: {
          id: dayId,
        },
        body: {
          course_id: router?.query?.update_id,
          name: general?.name,
          status: 100,
          lessonWeeks: days,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update) {
      let match;
      if (lessonDay) {
        const newArray = lessonDay?.lessonWeeks.map(({ id, ...rest }) => rest);
        Object.entries(dayTypes).map(([key, type]) => {
          if (_.isEqual(newArray, type)) {
            match = key;
          }
        });
      }
      let lessonDayType: string;
      if (match === DayEnums.odd) {
        lessonDayType = DayEnums.odd;
        setDayType(DayEnums.odd);
      } else {
        if (match === DayEnums.even) {
          setDayType(DayEnums.even);
          lessonDayType = DayEnums.even;
        } else {
          setDayType(DayEnums.custom);
          lessonDayType = DayEnums.custom;
        }
      }

      if (lessonDayType == DayEnums.custom) {
        let lessons = [1, 2, 3, 4, 5, 6, 7]?.map((item) => ({
          [`day${item}`]: lessonDay?.lessonWeeks.some(
            (w) => w.week_day == item
          ),
        }));

        setValue("general", {
          days: lessons.reduce((acc, curr, index) => {
            const key = `day${index + 1}`;
            return { ...acc, [key]: curr[key] };
          }, {}),
          name: lessonDay?.name,
          day: lessonDayType,
        });
      } else {
        setValue("general", {
          name: lessonDay?.name,
          day: lessonDayType,
        });
      }
    }
  }, [open, lessonDay]);

  useEffect(() => {
    const subscription = watch(
      (value: { general: { day: unknown } }, { name, type }: any) => {
        if (type === "change" && name === "general.day") {
          setDayType(value.general.day as unknown as dayType);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={isLoading || isPreviousData}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Input
              label="Name"
              name="general.name"
              control={control}
              placeholder="John"
              error={errors?.general?.name?.message}
            />
            <InputNumberWrapper>
              <ContentRadio
                label="Name"
                name="general.day"
                control={control}
                error={errors?.general?.day?.message}
                contents={[
                  {
                    content: (
                      <RadioContentWrapper>
                        <div className="nums">1,3,5</div>
                        <div className="text">Mon,Wed,Fri</div>
                      </RadioContentWrapper>
                    ),
                    value: "odd",
                  },
                  {
                    content: (
                      <RadioContentWrapper>
                        <div className="nums">2,4,6</div>
                        <div className="text">Tue,Thu,Sat</div>
                      </RadioContentWrapper>
                    ),
                    value: "even",
                  },
                  {
                    content: (
                      <RadioContentWrapper>
                        <div className="nums">Custom</div>
                        <div className="text">Mon,Tue,Wed,Thu,Fri</div>
                      </RadioContentWrapper>
                    ),
                    value: "custom",
                  },
                ]}
              />
            </InputNumberWrapper>
          </Content>
          {dayType === "custom" && (
            <CustomDay>
              <HeadContent>
                <div className="text">Days</div>
                <div className="text">Actions</div>
              </HeadContent>
              {days?.map((item, index) => {
                return (
                  <BRow key={index}>
                    <div>{item?.title}</div>
                    <div className="switch">
                      <AntdSwitch
                        control={control}
                        name={`general.days.${item?.name}`}
                      />
                    </div>
                  </BRow>
                );
              })}
            </CustomDay>
          )}
          <Buttons
            style={{ marginTop: dayType === "custom" ? "50px" : "350px" }}
          >
            <Button
              className="cancel"
              onClick={handleClose}
              style={{ backgroundColor: bgColors.wildSand }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              buttonLoading={
                updateLessonDay?.isLoading || createLessonDay?.isLoading
              }
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default StyledModal;
