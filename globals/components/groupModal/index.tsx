import React, { useEffect, useMemo, useState } from "react";
import {
  AntdModal,
  Button,
  CalendarHateSvg,
  DatePickerAnt,
  Input,
  MySelect,
  RunningCalendarSvg,
  RunningType,
} from "components";
import { Buttons, Content, UnitPreviewWrapper, Wrapper } from "./style";
import { IOption } from "components/common/select/type";
import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateGroup,
  useGetGroupPreviewDate,
  useGetGroupStudyTypes,
  useGroup,
  useInitialGroupPage,
  usePageDataMemo,
  useUpdateGroup,
} from "hooks";
import { selectCreator } from "utils/selectCreator";
import { expand } from "app/groups/home/expands";
import { toast } from "react-toastify";
import { IFilter } from "app/groups/home/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkToUndefined } from "utils/generalFunction";
import { EMentorTypes, EUser } from "types";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  DATE_FORMAT_SHOW_MMM_YYYY,
  DATE_FORMAT_YYYY_MM_DD,
} from "constants/dates";
import * as yup from "yup";
import { STATE_CLOSED, STATE_CLOSING } from "constants/groupStatus";
import { GROUP_FORM_GROUP } from "constants/groupForms";
import moment from "moment";
import UnitPreview from "./unitPreview";
import { validationErrorHandler } from "utils";
import { groupByDate } from "./unitPreview/utils";
import { groupReasons } from "../../../static/group/reasons";
import { generateItems } from "./components/generateItems";
import { checkResponsible } from "./components/checkResponsible";

const innerTypes = [
  {
    color: bgColors.deep,
    svg: <CalendarHateSvg color={bgColors.deep} height={34} width={34} />,
  },
  {
    color: bgColors.serengeti,
    svg: (
      <RunningCalendarSvg color={bgColors.serengeti} height={34} width={34} />
    ),
  },
];

const GroupModal = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const [studyTypes, setStudyTypes] = useState(null);

  const [watchType, setWatchType] = useState<null | string>(null);

  const {
    isInitialLoading: isInitialFetching,
    data,
    isLoading: isPageDataFetching,
  } = useInitialGroupPage();
  const {
    group: { data: reduxData, open },
  } = useSelector((state: IStore) => state.modals);

  //tekshirish uchun sxema
  const CreateGroupSchema = yup.object().shape({
    general: yup.object().shape({
      name: yup.string().required("Name is a required field"),
      start_date: yup.string().optional(),
      course_id: yup.string().required("Course is a required field"),
      group_type_id: yup.string().required("Group Type is a required field"),
      branch_id: yup.string().required("Index is a required field"),
      room_id: yup.string().required("Room Type is a required field"),
      parent_level_id: yup.string().required("Level is a required field"),
      level_id: yup.string().required("Sub level is a required field"),
      lesson_day_id: yup.string().required("Day is a required field"),
      lesson_time_id: yup.string().required("Time a required field"),
      mentor_id: yup.string().nullable(),
      state: yup.number().nullable(),
      support_id: yup.string().nullable(),
      study_type: yup
        .string()
        .nullable()
        .when("customer_type", {
          is: (type: any) => isGroupFormGroup && studyTypes,
          then: yup.string().required("Study type is a required field"),
          otherwise: yup.string().nullable(),
        }),
    }),
  });
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IFilter>({
    resolver: yupResolver(CreateGroupSchema),
  });

  const selects = useMemo(() => {
    return selectCreator(data);
  }, [data]);

  const pageDataSelect = usePageDataMemo();

  const action = reduxData?.action;

  const { isInitialLoading: isGroupLoading, data: group } = useGroup({
    id: reduxData?.id,
    expand: expand,
  });

  const watchAll = watch();

  const courseId = watch("general.course_id");
  const currentCourse = selects?.course?.find(
    (c: { value: string | number | undefined }) => c.value == courseId,
  );

  const isGroupFormGroup =
    currentCourse?.groupType?.find(
      (grType: { value: { toString: () => string | undefined } }) =>
        grType?.value?.toString() == watch("general.group_type_id")?.toString(),
    )?.group_form == GROUP_FORM_GROUP?.toString();

  const { isFetching, data: studyType } = useGetGroupStudyTypes({
    query_params: {
      start_date: watch("general.start_date"),
      lesson_day_id: watch("general.lesson_day_id"),
      level: watch("general.parent_level_id"),
      group_form: isGroupFormGroup,
    },
  });

  const currentStudyType = studyType?.find(
    (f) => f.type == watch("general.study_type"),
  );

  const { isInitialLoading: isGroupUnitPreview, data: groupUnit } =
    useGetGroupPreviewDate({
      query_params: {
        expand: "parent_unit.publicOrder,publicOrder",
        fields: "parent_unit.publicOrder,publicOrder",
      },
      body: {
        start_date: watch("general.start_date"),
        level_id: watch("general.parent_level_id"),
        lesson_time_id: watch("general.lesson_time_id"),
        group_type_id: watch("general.group_type_id"),
        lesson_day_id: watch("general.lesson_day_id"),
        study_type: watch("general.study_type"),
        finish_date: currentStudyType?.finish_date,
      },
    });

  const handleClose = () => {
    reset({});
    setWatchType(null);
    setStudyTypes(null);
    dispatch(
      toggleModal({
        key: "group",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const createMutation = useCreateGroup({
    onSuccess: () => {
      for (let i = 0; i < reduxData?.queryKeys?.length; i++) {
        queryClient.invalidateQueries(reduxData?.queryKeys[i]);
      }
      handleClose();
      reset({});
      toast.success("Group is created");
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
  const updateMutation = useUpdateGroup({
    onSuccess: () => {
      for (let i = 0; i < reduxData?.queryKeys?.length; i++) {
        queryClient.invalidateQueries(reduxData?.queryKeys[i]);
      }
      handleClose();
      reset({});
      toast.success("Group is updated");
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

  const is_responsible = checkResponsible({ action, group });

  const onSubmit = (data: IFilter) => {
    if (action === "create") {
      createMutation.mutate(
        checkToUndefined({ data: data?.general, canStarDate: true }),
      );
    }
    if (action === "update") {
      updateMutation.mutate({
        body: checkToUndefined({ data: data?.general, group, is_responsible }),
        id: reduxData?.id,
      });
    }
  };

  //update uchun malumotlarni qo'yish
  useEffect(() => {
    if (action === "update" && !!group) {
      setValue("general", {
        name: group?.name,
        branch_id: group?.room?.branch?.id?.toString(),
        group_type_id: group?.group_type_id?.toString(),
        // state: group?.state?.toString(),
        start_date: group?.start_date?.toString(),
        course_id: group?.course?.id?.toString(),
        room_id: group?.room?.id?.toString(),
        parent_level_id: group?.level?.parent_id?.toString(),
        level_id: group?.level_id?.toString(),
        lesson_day_id: group?.lesson_day_id?.toString(),
        lesson_time_id: group?.lesson_time_id?.toString(),
        responsible_id: group?.responsible?.id?.toString(),
        teacher_id: group?.groupMentors
          ?.find((mentor) => mentor?.type == EMentorTypes.Teacher)
          ?.user_id?.toString(),
        support_id: group?.groupMentors
          ?.find((mentor) => mentor?.type == EMentorTypes.Support)
          ?.user_id?.toString(),
      });
      if (
        group?.state?.toString() == STATE_CLOSED?.toString() ||
        group?.state?.toString() == STATE_CLOSING?.toString()
      ) {
        setValue("general.closing_reason", group?.closing_reason);
      }
    }
    if (reduxData?.initial) {
      setValue("general", {
        course_id: reduxData?.course_id,
        group_type_id: reduxData?.group_type_id ?? "1",
        branch_id: reduxData?.branch_id,
        room_id: reduxData?.room_id,
        lesson_day_id: reduxData?.day_id,
        lesson_time_id: reduxData?.time_id,
        parent_level_id: reduxData?.parent_level_id,
        level_id: reduxData?.level_id,
      });
    } else {
      if (open && action === "create")
        setValue("general", {
          course_id: "1",
          group_type_id: "1",
        });
    }
  }, [isGroupLoading, reduxData?.id, open, group, isInitialFetching]);

  //umumiy bir biriga bog'liq maydonlar logikasi
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === "general.branch_id" && type === "change") {
        setValue("general.room_id", undefined);
      }
      if (name === "general.parent_level_id" && type === "change") {
        setValue("general.level_id", undefined);
      }
      if (
        (name === "general.start_date" && type === "change") ||
        (name === "general.lesson_day_id" && type === "change") ||
        (name === "general.parent_level_id" && type === "change")
      ) {
        setWatchType(type);
      }
      if (name === "general.course_id" && type === "change") {
        setValue("general", {
          ...value.general,
          group_type_id: undefined,
          lesson_time_id: undefined,
          lesson_day_id: undefined,
          level_id: undefined,
          parent_level_id: undefined,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const text = action?.charAt(0)?.toUpperCase() + action?.slice(1);

  //agar start_date yoki lesson_day_id o'zgarsa, studyType ga qarab data yigib options ga qo'yamiz
  useEffect(() => {
    if (watchType === "change") {
      if (
        studyType &&
        watch("general.start_date") &&
        watch("general.lesson_day_id")
      ) {
        let array: any = [];
        for (let i = 0; i < studyType?.length; i++) {
          const currentType = studyType[i];
          array = [
            ...array,
            {
              tabId: currentType?.type,
              lessons: currentType?.lessons_count,
              title: currentType?.label,
              color: innerTypes[i].color,
              finish_date: currentType.finish_date,
              dates: moment(currentType?.finish_date).format(
                DATE_FORMAT_SHOW_MMM_YYYY,
              ),
              bottom: true,
              svg: innerTypes[i].svg,
              count: currentType?.info?.joined_units,
              empty_lessons: currentType?.info?.empty_lessons,
              error: currentType?.info?.error,
              prep: 1,
              exam_days: 2,
              wom_days: 1,
            },
          ];
        }
        setStudyTypes(array);
      }
    }
  }, [studyType, watchType]);

  const restructuredUnits = useMemo(() => {
    if (groupUnit) return groupByDate({ units: groupUnit });
  }, [groupUnit]);

  //maydonlar holati uchun kerakli qiymatlar
  const { isOptional, canReason, isDatePickerDisabled, isDisabled } =
    generateItems({ reduxData, group, action });

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin
        spinning={
          isInitialFetching ||
          isGroupLoading ||
          isFetching ||
          pageDataSelect.args.isLoading ||
          isPageDataFetching
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">{text} group</div>
            <Content>
              <div className="flex">
                <div className="col">
                  <Input
                    label="Name"
                    name="general.name"
                    control={control}
                    placeholder="John"
                    disabled={isDisabled}
                    error={errors?.general?.name?.message}
                  />
                </div>
                <div className="col">
                  <DatePickerAnt
                    disabled={isDatePickerDisabled}
                    control={control}
                    name="general.start_date"
                    label="Start Date"
                    placeholder="-"
                    allowClear
                    format={DATE_FORMAT_YYYY_MM_DD}
                    error={errors?.general?.start_date?.message}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="col">
                  <MySelect
                    disabled={isDisabled}
                    control={control}
                    name="general.course_id"
                    label="Course"
                    options={selects?.course}
                    placeholder="-"
                    allowClear
                    error={errors?.general?.course_id?.message}
                  />
                </div>
                <div className="col">
                  <MySelect
                    control={control}
                    name="general.group_type_id"
                    label="Group type"
                    disabled={!watch("general.course_id") || isDisabled}
                    options={currentCourse?.groupType}
                    placeholder="-"
                    error={errors?.general?.group_type_id?.message}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="col">
                  <MySelect
                    control={control}
                    name="general.parent_level_id"
                    label="Level"
                    disabled={!watch("general.course_id") || isDisabled}
                    options={currentCourse?.level?.options}
                    placeholder="-"
                    error={errors?.general?.parent_level_id?.message}
                  />
                </div>
                <div className="col">
                  <MySelect
                    control={control}
                    disabled={
                      !watch("general.parent_level_id") ||
                      !watch("general.course_id") ||
                      isDisabled
                    }
                    name="general.level_id"
                    label="Sub level"
                    options={
                      currentCourse?.level?.options?.find(
                        (e: IOption) =>
                          e?.value ==
                          watchAll?.general?.parent_level_id?.toString(),
                      )?.subLevel
                    }
                    placeholder="-"
                    error={errors?.general?.level_id?.message}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="col">
                  <MySelect
                    disabled={isDisabled}
                    control={control}
                    name="general.branch_id"
                    label="Branch"
                    options={selects?.branch}
                    placeholder="-"
                    error={errors?.general?.branch_id?.message}
                  />
                </div>
                <div className="col">
                  <MySelect
                    control={control}
                    showSearch
                    disabled={!watch("general.branch_id") || isDisabled}
                    name="general.room_id"
                    label="Room"
                    options={selects?.room?.filter(
                      (room: any) =>
                        room.branch_id ==
                        watchAll?.general?.branch_id?.toString(),
                    )}
                    placeholder="-"
                    error={errors?.general?.room_id?.message}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="col">
                  <MySelect
                    control={control}
                    name="general.lesson_day_id"
                    disabled={!watch("general.course_id") || isDisabled}
                    label="Day"
                    options={currentCourse?.day}
                    placeholder="-"
                    error={errors?.general?.lesson_day_id?.message}
                  />
                </div>
                <div className="col">
                  <MySelect
                    control={control}
                    name="general.lesson_time_id"
                    disabled={!watch("general.course_id") || isDisabled}
                    label="Time"
                    options={currentCourse?.time}
                    placeholder="-"
                    error={errors?.general?.lesson_time_id?.message}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="col">
                  <MySelect
                    disabled={isDisabled}
                    control={control}
                    name="general.teacher_id"
                    label={`Teacher ${isOptional ? "(optional)" : ""}`}
                    options={pageDataSelect?.teacher}
                    placeholder="-"
                    error={errors?.general?.teacher_id?.message}
                  />
                </div>
                <div className="col">
                  <MySelect
                    disabled={isDisabled}
                    control={control}
                    name="general.support_id"
                    label={`Support ${isOptional ? "(optional)" : ""}`}
                    options={pageDataSelect?.support}
                    placeholder="-"
                    error={errors?.general?.support_id?.message}
                  />
                </div>
              </div>
              <div className="flex">
                {is_responsible && (
                  <div className="col">
                    <MySelect
                      disabled={isDisabled}
                      control={control}
                      name="general.responsible_id"
                      label="Responsible"
                      options={pageDataSelect?.admin}
                      placeholder="-"
                      error={errors?.general?.responsible_id?.message}
                    />
                  </div>
                )}
              </div>
              {!!studyTypes && isGroupFormGroup && (
                <div className="running">
                  <p className="c-label">Study Type</p>
                  <div className="box">
                    <div className="circle">
                      {studyType?.[0].info?.units_count}
                    </div>
                    <div className="cont">
                      <p className="units">Lesson units</p>
                      <p className="info">
                        Choose level has {studyType?.[0].info?.units_count} sub
                        units
                      </p>
                    </div>
                  </div>
                  <RunningType
                    isLoading={isFetching}
                    name="general.study_type"
                    control={control}
                    data={studyTypes}
                    error={errors?.general?.study_type?.message}
                  />
                </div>
              )}
              {canReason && (
                <div className="flex">
                  <MySelect
                    control={control}
                    name="general.closing_reason"
                    label="Closing reason"
                    options={groupReasons}
                    placeholder="-"
                    allowClear
                    error={errors?.general?.closing_reason?.message}
                  />
                </div>
              )}
            </Content>

            <UnitPreviewWrapper>
              <Spin spinning={isGroupUnitPreview}>
                <UnitPreview restructuredUnits={restructuredUnits} />
              </Spin>
            </UnitPreviewWrapper>
            {/*{reduxData?.id && (*/}
            {/*  <Content>*/}
            {/*    <TakeModal*/}
            {/*      name="general.state"*/}
            {/*      control={control}*/}
            {/*      data={stateData?.filter(*/}
            {/*        (item: { tabId: string | number }) => {*/}
            {/*          return transferCapability[*/}
            {/*            router.query.tab_id as unknown as TStatuses*/}
            {/*          ]?.some((status) => +status === +item.tabId);*/}
            {/*        }*/}
            {/*      )}*/}
            {/*      error={errors?.general?.state?.message}*/}
            {/*    />*/}
            {/*  </Content>*/}
            {/*)}*/}
            <Buttons>
              <Button
                style={{
                  height: "44px",
                  color: textColors.yourShadow,
                  boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                  backgroundColor: bgColors.wildSand,
                }}
                onClick={handleClose}
                className="cancel"
              >
                Cancel
              </Button>
              <Button
                style={{
                  height: "44px",
                  color: textColors.dark,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                }}
                type="submit"
                className="save"
                buttonLoading={
                  updateMutation?.isLoading || createMutation.isLoading
                }
              >
                Save
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default GroupModal;
