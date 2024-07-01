import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AntdModal,
  Button,
  InputNumber,
  Segmented,
  TabSupportSvg,
  TabTeacherSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { Buttons, Content, Wrapper } from "./style";
import { useMentorRankingConfig, useSetMentorRankingConfig } from "hooks";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { validationErrorHandler } from "utils";
import { convertNumericStringsToNumbers } from "utils/changeValuesToNumber";

const ChangeRankingConfig = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const query = useQueryClient();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>();

  useEffect(() => {
    if (router.query.changeRankingConfig == "true") {
      setOpen(true);
    }
  }, [router.query?.changeRankingConfig]);

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    setTimeout(() => {
      const query = router.query;
      delete query.changeRankingConfig;
      delete query.tabId;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  const { isLoading, data } = useMentorRankingConfig();

  const save = useSetMentorRankingConfig({
    onSuccess: () => {
      handleClose();
      toast.success("Changed");
      query.invalidateQueries([queryKeys.page_data]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: "root",
      });
    },
  });
  const onSubmit = (data: any) => {
    const teacher = data.root?.teacher;
    const support = data.root?.support;

    save.mutate({
      body: {
        teacher: {
          ...support,
          ...teacher,
        },
        support: {
          ...teacher,
          ...support,
        },
      },
    });
  };

  useEffect(() => {
    const subscription = watch((value, { type, name }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setValue("root", convertNumericStringsToNumbers(data));
    return () => {
      reset();
      clearErrors();
    };
  }, [data]);

  return (
    <AntdModal open={open} onCancel={handleClose} width={520}>
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper style={{ height: "fit-content" }}>
            <div className="title">Change ranking config</div>
            <Segmented
              options={[
                {
                  label: (
                    <div
                      className={`flex ${
                        router.query.tabId == "2" ? "inactive" : ""
                      }`}
                    >
                      <TabTeacherSvg
                        color={
                          router.query.tabId == "2"
                            ? bgColors.yourShadow
                            : bgColors.blueGray
                        }
                      />
                      Teacher
                    </div>
                  ),
                  value: "1",
                },
                {
                  label: (
                    <div
                      className={`flex ${
                        router.query.tabId != "2" ? "inactive" : ""
                      }`}
                    >
                      <TabSupportSvg
                        color={
                          router.query.tabId != "2"
                            ? bgColors.yourShadow
                            : bgColors.blueGray
                        }
                      />
                      Academic Support
                    </div>
                  ),
                  value: "2",
                },
              ]}
              routerKey="tabId"
              initValue={(router.query.tabId as string) || "1"}
            />
            <Content hidden={router.query.tabId == "2"}>
              <div className="flex">
                <InputNumber
                  name="root.teacher.min_group_count"
                  error={
                    (errors as any)?.root?.teacher?.min_group_count?.message ||
                    (errors as any)?.root?.teacher?.message
                  }
                  // label="Minimum group count for Ranking"
                  label="Minimum general group count"
                  control={control}
                  placeholder="Enter"
                />
                <InputNumber
                  name="root.teacher.min_group_count_for_progress"
                  error={
                    (errors as any)?.root?.teacher?.min_group_count_for_progress
                      ?.message
                  }
                  label="Minimum group count with progress for Ranking"
                  control={control}
                  placeholder="Enter"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.lost_standard"
                  label="Lost norm per group"
                  error={(errors as any)?.root?.teacher?.lost_standard?.message}
                  control={control}
                  placeholder="Enter"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.lost_plus_effectiveness"
                  error={
                    (errors as any)?.root?.teacher?.lost_plus_effectiveness
                      ?.message
                  }
                  label="Lost plus affect"
                  control={control}
                  placeholder="Value in percent"
                />
                <InputNumber
                  name="root.teacher.lost_minus_effectiveness"
                  error={
                    (errors as any)?.root?.teacher?.lost_minus_effectiveness
                      ?.message
                  }
                  label="Lost minus affect"
                  control={control}
                  placeholder="Value in percent"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.a_class_from"
                  error={(errors as any)?.root?.teacher?.a_class_from?.message}
                  label="A class from"
                  control={control}
                  placeholder="Value in percent"
                />
                <InputNumber
                  name="root.teacher.a_class_to"
                  error={(errors as any)?.root?.teacher?.a_class_to?.message}
                  label="A class to"
                  control={control}
                  placeholder="Value in percent"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.b_class_from"
                  error={(errors as any)?.root?.teacher?.b_class_from?.message}
                  label="B class from"
                  control={control}
                  placeholder="Value in percent"
                />
                <InputNumber
                  name="root.teacher.b_class_to"
                  error={(errors as any)?.root?.teacher?.b_class_to?.message}
                  label="B class to"
                  control={control}
                  placeholder="Value in percent"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.c_class_from"
                  error={(errors as any)?.root?.teacher?.c_class_from?.message}
                  label="C class from"
                  control={control}
                  placeholder="Value in percent"
                />
                <InputNumber
                  name="root.teacher.c_class_to"
                  error={(errors as any)?.root?.teacher?.c_class_to?.message}
                  label="C class to"
                  control={control}
                  placeholder="Value in percent"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.exam_standard"
                  error={(errors as any)?.root?.teacher?.exam_standard?.message}
                  label="Fail norm per group"
                  control={control}
                  placeholder="Exam standard"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher.exam_minus_effectiveness"
                  error={
                    (errors as any)?.root?.teacher?.exam_minus_effectiveness
                      ?.message
                  }
                  label="Fail minus affect"
                  control={control}
                  placeholder="Exam minus affect"
                />
                <InputNumber
                  name="root.teacher.exam_plus_effectiveness"
                  error={
                    (errors as any)?.root?.teacher?.exam_plus_effectiveness
                      ?.message
                  }
                  label="Fail plus affect"
                  control={control}
                  placeholder="Exam plus affect"
                />
              </div>
            </Content>
            <Content hidden={router.query.tabId != "2"}>
              <div className="flex">
                <InputNumber
                  name="root.support.min_group_count"
                  error={
                    (errors as any)?.root?.support?.min_group_count?.message ||
                    (errors as any)?.root?.support?.message
                  }
                  label="Minimum general group count"
                  control={control}
                  placeholder="Enter"
                />
                <InputNumber
                  name="root.support.min_group_count_for_progress"
                  error={
                    (errors as any)?.root?.support?.min_group_count_for_progress
                      ?.message
                  }
                  label="Minimum group count with progress for Ranking"
                  control={control}
                  placeholder="Enter"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.support.exam_standard"
                  error={(errors as any)?.root?.support?.exam_standard?.message}
                  label="Fail norm per group"
                  control={control}
                  placeholder="Exam standard"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.support.exam_minus_effectiveness"
                  error={
                    (errors as any)?.root?.support?.exam_minus_effectiveness
                      ?.message
                  }
                  label="Fail minus affect"
                  control={control}
                  placeholder="Exam minus affect"
                />
                <InputNumber
                  name="root.support.exam_plus_effectiveness"
                  error={
                    (errors as any)?.root?.support?.exam_plus_effectiveness
                      ?.message
                  }
                  label="Fail plus affect"
                  control={control}
                  placeholder="Exam plus affect"
                />
              </div>
            </Content>
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
                buttonLoading={false}
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

export default ChangeRankingConfig;
