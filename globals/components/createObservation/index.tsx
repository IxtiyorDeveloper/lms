import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { AntdModal, Button, CircleImage, MySelect } from "components";
import {
  Wrapper,
  Top,
  Title,
  Right,
  Details,
  Picture,
  Content,
  Flex,
  Box,
  Line,
  Mentors,
  ButtonWrapper,
} from "./style";
import { useForm } from "react-hook-form";
import { EObservationStaff } from "types/observation";
import { bgColors, textColors } from "styles/theme";
import {
  useDailyOfficeHours,
  useObservationMentorList,
  useSaveObservation,
  useStaffGroups,
} from "hooks";
import { createMentorOptions } from "./components/createMentorOptions";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";
import { makeOptions } from "./components/makeOptions";
import { Spin } from "antd";
import { getOrdinalSuffix } from "utils/getOrdinalSuffix";

const CreateObservation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [current, setCurrent] = useState<{
    avatar: any;
    position: string;
    group_count: string;
    ind_count: string;
  }>({
    avatar: undefined,
    position: `Ranking position`,
    group_count: `Group count`,
    ind_count: `Group count`,
  });

  const {
    createObservation: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const { control, watch, handleSubmit, setValue, reset } = useForm<{
    mentor_id: string | undefined;
    origin_id: string | undefined;
    type: EObservationStaff;
  }>();

  const type = watch("type") ?? data?.type;
  const mentor_id = data?.mentor_id;

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "createObservation",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const { data: mentors, isLoading } = useObservationMentorList({
    query_params: {
      type,
      expand: "user.userProfile.avatar",
    },
  });

  const save = useSaveObservation({
    onSuccess: (data) => {
      const newURL = `/academic-resource/observation/${data?.id}`;

      router.push(newURL);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const options = createMentorOptions({ mentors });

  const teacher_id =
    type == EObservationStaff.teacher ? watch("mentor_id") : undefined;
  const support_id =
    type == EObservationStaff.support ? watch("mentor_id") : undefined;

  const { data: groups, isInitialLoading: isGroupLoading } = useStaffGroups({
    query_params: {
      user_id: teacher_id,
      expand: "active_contact_count,lessonDay",
      state: [100, 200, 300, 400],
    },
  });

  const { data: officeHours, isInitialLoading: isOfficeHourLoading } =
    useDailyOfficeHours({
      query_params: {
        support_id,
      },
    });

  const onSubmit = (values: { mentor_id?: string; origin_id?: string }) => {
    save.mutate({
      query_params: {
        expand:
          "observer.userProfile.avatar,details,buttonActions,aspects,group_id",
        fields:
          "observer.userProfile.avatar,observer.userProfile.fullName,created_at,status,score,id,group_id",
      },
      body: {
        type,
        mentor_id: values?.mentor_id,
        origin_id: values?.origin_id,
      },
    });
  };

  const label =
    type == EObservationStaff.teacher
      ? "Select group"
      : "Select timetable slot";

  const origin_options = makeOptions({ type, groups, officeHours });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name == "type") {
        setValue("mentor_id", undefined);
        setValue("origin_id", undefined);
      }
      if (name == "mentor_id") {
        setValue("origin_id", undefined);
        const current = mentors?.find(
          (p) => p.base_mentor_id?.toString() == value?.mentor_id?.toString(),
        );
        setCurrent({
          avatar: current?.user?.userProfile?.avatar,
          position: `Ranking position: ${current?.order}${getOrdinalSuffix(current?.order)}`,
          group_count: `Group: ${current?.real_group_count ?? 0}`,
          ind_count: `Individual: ${current?.individual_group_count ?? 0}`,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, mentors]);

  useEffect(() => {
    if (!!mentor_id && mentors) setValue("mentor_id", mentor_id);
  }, [mentor_id, mentors]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="0"
    >
      <Spin spinning={isOfficeHourLoading || isGroupLoading || isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <Top>
              <Title>Create observation</Title>
              <Right>
                <MySelect
                  name="type"
                  control={control}
                  defaultValue={type?.toString()}
                  options={[
                    { label: "Teacher", value: EObservationStaff.teacher },
                    {
                      label: "Support",
                      value: EObservationStaff.support,
                    },
                  ]}
                />
              </Right>
            </Top>
            <Details>
              <Picture>
                <CircleImage src={current.avatar} width={75} height={75} />
              </Picture>
              <Content>
                <MySelect
                  name="mentor_id"
                  control={control}
                  options={options}
                  optionLabelProp="extra"
                  filterOption={(input, option) => {
                    return option?.extra
                      ?.toLowerCase()
                      .includes(input.toLowerCase());
                  }}
                />
                <Flex>
                  <Box>{current.group_count}</Box>
                  <Box>{current.ind_count}</Box>
                  <Box>{current.position}</Box>
                </Flex>
              </Content>
            </Details>
          </Wrapper>
          <Line />
          <Mentors>
            <MySelect
              name="origin_id"
              control={control}
              label={label}
              options={origin_options}
              optionLabelProp="extra"
              filterOption={(input, option) => {
                return option?.extra
                  ?.toLowerCase()
                  .includes(input.toLowerCase());
              }}
            />
          </Mentors>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={save.isLoading}>
              Create
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateObservation;
