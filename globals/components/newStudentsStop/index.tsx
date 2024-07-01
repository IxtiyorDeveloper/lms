import * as React from "react";
import {
  AntdModal,
  Button,
  Input,
  MySelect,
  Radios,
  StudentCard,
} from "components";
import { ModalTitle, Wrapper, ButtonWrapper, FlexWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useEffect } from "react";
import { useNewStudentStop, useStopPageData } from "hooks";
import { EUser } from "types";
import { selectCreator } from "./selectCreator";
import { IOption } from "components/common/select/type";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { PerformStopValidation } from "validation/actions";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const stoppingType = {
  waitingList: 100,
  archived: 200,
};

const NewStudentsStoppingModal = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const performStop = useNewStudentStop({
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

  const {
    new_students_stop: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    reset,
    control,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(PerformStopValidation),
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "new_students_stop",
      })
    );
    queryClient.invalidateQueries([
      queryKeys.admin_grouped_stop_calculation,
      queryKeys.admin_grouped_stop_page_data,
    ]);
  };
  const id = data?.id;
  const onSubmit = (submittedData: any) => {
    const general = submittedData?.general;
    if (general?.check == stoppingType.waitingList && !!id) {
      performStop.mutate({
        query_params: {
          contact_id: id,
        },
        body: {
          next_status: EUser.S100,
          leaving_category_id: general?.stopping_category,
          reason: general?.reason,
          course_id: general?.course_id,
          group_type_id: general?.group_type_id,
          level_id: general?.level_id,
          lesson_day_ids: general?.lesson_days,
          lesson_time_ids: general?.lesson_time_id,
          branch_id: general?.branch_id,
          note: general?.comment,
        },
        id,
      });
    }
    if (general?.check == stoppingType.archived && !!id) {
      performStop.mutate({
        query_params: {
          contact_id: id,
        },
        body: {
          next_status: EUser.S300,
          leaving_category_id: general?.stopping_category,
          reason: general?.reason,
        },
      });
    }
  };

  const { data: pageData, isLoading: pageLoading } = useStopPageData({
    id: data?.id,
  });

  const selects = selectCreator({
    ...pageData?.academic,
    ...pageData?.company,
  });
  const findMethod = (array: { options: any }, id?: number) => {
    if (!!array) {
      for (let i = 0; i < array.options?.length; i++) {
        if (array.options[i].subLevel?.some((p: IOption) => p.value === id)) {
          return array.options[i];
        }
      }
    }
  };

  useEffect(() => {
    setValue("general", {
      ...pageData?.contact,
      lesson_day_id: [pageData?.contact?.lesson_day_id],
      lesson_time_id: [pageData?.contact?.lesson_time_id],
      parent_level_id: findMethod(selects.level, pageData?.contact.level_id)
        ?.value,
    });
  }, [pageData?.contact]);

  const check = watch("general.receipt");
  const parent_level_id = watch("general.parent_level_id");

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={pageLoading}>
        <ModalTitle>Stopping</ModalTitle>
        <div className="mt10 mb10">
          <StudentCard data={data?.student} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <MySelect
              label="Stopping category"
              name="general.stopping_category"
              control={control}
              options={selects.stopping_categories}
              error={(errors as any)?.general?.stopping_category?.message}
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
          {check !== stoppingType.waitingList || !check ? (
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
                    disabled={!parent_level_id}
                    options={
                      selects.level?.options?.find(
                        (e: IOption) => e?.value === parent_level_id
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
export default NewStudentsStoppingModal;
