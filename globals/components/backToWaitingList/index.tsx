import React, { useEffect } from "react";
import { AntdModal, Button, Input, MySelect, StudentCard } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { useBackToWaiting, usePageDataMemo } from "hooks";
import { toast } from "react-toastify";
import { Spin } from "antd";
import {
  ButtonWrapper,
  FlexWrapper,
  ModalTitle,
  Wrapper,
} from "../stoppingModal/style";
import { IOption } from "components/common/select/type";
import { IBackToWaitingList } from "./type";
import { useRouter } from "next/router";
import { findMethod } from "utils/findParentLevel";
import { validationErrorHandler } from "utils";

const BackToWaitingList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const selects = usePageDataMemo();
  const [level, setLevel] = React.useState<any>([]);
  const { control, handleSubmit, watch, setValue, reset } =
    useForm<IBackToWaitingList>();
  const {
    backToWaiting: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const id = data?.id;
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "backToWaiting",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const backToWaiting = useBackToWaiting({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(data?.queryKeys);
      handleClose();
      router.push("/student/waiting-list");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (data: IBackToWaitingList) => {
    backToWaiting.mutate({
      query_params: {
        id,
      },
      body: data?.general,
    });
  };
  const pageData = data?.student;
  useEffect(() => {
    if (data) {
      setValue("general", {
        branch_id: pageData?.branch_id?.toString(),
        note: pageData?.note,
        course_id: pageData?.course?.id?.toString(),
        group_type_id: pageData?.groupType?.id?.toString(),
        level_id: pageData?.level?.id?.toString(),
        parent_level_id: findMethod(
          selects.level,
          pageData?.level?.id?.toString()
        )?.value,
        lesson_day_ids: pageData?.preferDays,
        lesson_time_ids: pageData?.preferTimes,
      });
    }
  }, [pageData, open]);

  const watchAllFields = watch();
  useEffect(() => {
    setLevel(
      selects.level?.options?.find(
        (e: IOption) =>
          e?.value?.toString() ===
          watchAllFields?.general?.parent_level_id?.toString()
      )?.subLevel
    );
  }, [watchAllFields?.general?.parent_level_id]);
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={backToWaiting.isLoading}>
        <ModalTitle>Back to Waiting List</ModalTitle>
        <div className="mt10">
          <StudentCard data={data?.student} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                options={level}
              />
            </Wrapper>
          </FlexWrapper>
          <FlexWrapper>
            <Wrapper>
              <MySelect
                control={control}
                name="general.lesson_day_id"
                label="Day"
                options={selects.days}
                placeholder="-"
                mode="multiple"
              />
            </Wrapper>
            <Wrapper>
              <MySelect
                control={control}
                name="general.lesson_time_id"
                label="Time"
                options={selects.time}
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
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit" buttonLoading={backToWaiting.isLoading}>
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
    // <ActionModal
    //   handleSubmit={handleSubmit}
    //   handleClose={() => handleClose()}
    //   open={open}
    //   onSubmit={onSubmit}
    //   blurColor={bgColors.sceptreBlue}
    //   label="Reason *"
    //   boxShadow=""
    //   student={data?.student}
    //   icon={<BackToWaitingSvg width={50} height={50} />}
    //   text={<div>Are you sure to back to waiting list this student?</div>}
    //   control={control}
    //   cancelButtonText="No"
    //   submitButtonText="Yes"
    //   buttonStyles={{
    //     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
    //     backgroundColor: bgColors.primary,
    //     color: textColors.dark,
    //   }}
    // />
  );
};

export default BackToWaitingList;
