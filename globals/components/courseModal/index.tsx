import React, { useEffect } from "react";
import { AntdModal, Button, Input } from "components";
import { Content, Buttons } from "./style";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateCourse } from "validation/course";
import { CourseTypes } from "types";
import { useCourse, useCreateCourse, useUpdateCourse } from "hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { Enum } from "../levelModal";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

interface ICreateCourse {
  name: string;
}

const CourseModal = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const createCourse = useCreateCourse({
    onSuccess: (data) => {
      if (data?.id) {
        handleRoute(data?.id);
        queryClient.invalidateQueries([queryKeys.admin_course_view]);
        toast.success("Success");
        handleClose();
        reset({});
      }
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const updateCourse = useUpdateCourse({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const {
    createCourse: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const id = router?.query?.update_id;
  const type = data?.type;
  const {
    data: course,
    isInitialLoading: isLoading,
    isPreviousData,
  } = useCourse({
    query_params: {
      id: id,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ICreateCourse>({
    resolver: yupResolver(CreateCourse),
  });
  const handleRoute = (id: number) => {
    router.push({
      pathname: "/settings/academic-settings/create-course",
      query: {
        update_id: id,
      },
    });
  };
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "createCourse",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = (data: ICreateCourse) => {
    if (type === Enum?.create) {
      createCourse?.mutate({
        body: {
          name: data?.name,
          status: CourseTypes.regular,
        },
      });
    }
    if (type === Enum?.update) {
      updateCourse.mutate({
        query_params: {
          id: id,
        },
        body: {
          name: data?.name,
          status: CourseTypes.regular,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update) {
      setValue("name", course?.name ?? "");
    }
  }, [open, course]);

  useEffect(() => {
    if (type === Enum.create && createCourse.isSuccess) {
      router.push("/settings/academic-settings/create-course");
    }
  }, [createCourse]);
  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <Spin spinning={isLoading || isPreviousData}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Input
              label="Course name"
              name="name"
              control={control}
              placeholder="John"
              error={errors?.name?.message}
            />
          </Content>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              style={{ backgroundColor: bgColors.wildSand, width: "100%" }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              style={{ width: "100%" }}
              buttonLoading={createCourse.isLoading || updateCourse.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CourseModal;
