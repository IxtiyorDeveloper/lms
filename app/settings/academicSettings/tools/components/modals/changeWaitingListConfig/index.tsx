import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AntdModal, Button, InputNumber, Segmented } from "components";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import { Buttons, Content, Wrapper } from "./style";
import {
  usePageDataMemo,
  useSetWaitingListConfig,
  useWaitingListConfig,
} from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import lodash from "lodash";

const ChangeWaitingListConfig = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
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
    if (router.query.waitingListConfig == "true") {
      setOpen(true);
    }
  }, [router.query?.waitingListConfig]);

  const handleClose = () => {
    setOpen(false);
    clearErrors();
    setTimeout(() => {
      const query = router.query;
      delete query.waitingListConfig;
      delete query.tabId;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  const { isLoading, data } = useWaitingListConfig({
    waitingListConfig: router.query.waitingListConfig,
    enabled: router.query.waitingListConfig == "true",
  });

  const selects = usePageDataMemo();

  const save = useSetWaitingListConfig({
    onSuccess: () => {
      handleClose();
      toast.success("Changed");
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
    let a = {};
    lodash.map(
      data.root?.potentialGroupStudentCounts,
      (value, key, collection) => {
        a = {
          ...a,
          [key.split("a_")?.[1]]: value,
        };
      },
    );

    save.mutate({
      body: {
        ...data.root,
        potentialGroupStudentCounts: a,
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
    lodash.map(data?.potentialGroupStudentCounts, (value, key, collection) => {
      setValue(`root.potentialGroupStudentCounts.a_${key}`, value);
    });

    setValue(
      "root.branch_striction_valid_days",
      data?.branch_striction_valid_days,
    );
    setValue("root.day_striction_valid_days", data?.day_striction_valid_days);
    setValue(
      "root.level_striction_valid_days",
      data?.level_striction_valid_days,
    );
    setValue(
      "root.teacher_striction_valid_days",
      data?.teacher_striction_valid_days,
    );
    setValue("root.time_striction_valid_days", data?.time_striction_valid_days);
    return () => {
      reset();
      clearErrors();
    };
  }, [data]);

  return (
    <AntdModal open={open} onCancel={handleClose} width={520}>
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Waiting list config</div>
            <Segmented
              options={[
                {
                  label: (
                    <div
                      className={`flex ${
                        router.query.tabId == "2" ? "inactive" : ""
                      }`}
                    >
                      Strict expire dates
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
                      Potential groups
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
                  name="root.level_striction_valid_days"
                  error={
                    (errors as any)?.root?.level_striction_valid_days?.message
                  }
                  label="STRICT for level"
                  control={control}
                  placeholder="Enter"
                  suffix="Day"
                />
                <InputNumber
                  name="root.day_striction_valid_days"
                  error={
                    (errors as any)?.root?.day_striction_valid_days?.message
                  }
                  label="STRICT for day"
                  control={control}
                  placeholder="Enter"
                  suffix="Day"
                />
              </div>

              <div className="flex">
                <InputNumber
                  name="root.time_striction_valid_days"
                  error={
                    (errors as any)?.root?.time_striction_valid_days?.message
                  }
                  label="STRICT for lesson time"
                  control={control}
                  placeholder="STRICT for lesson time"
                  suffix="Day"
                />
                <InputNumber
                  name="root.branch_striction_valid_days"
                  error={
                    (errors as any)?.root?.branch_striction_valid_days?.message
                  }
                  label="STRICT for branch"
                  control={control}
                  placeholder="Enter"
                  suffix="Day"
                />
              </div>
              <div className="flex">
                <InputNumber
                  name="root.teacher_striction_valid_days"
                  label="STRICT for teacher"
                  error={
                    (errors as any)?.root?.teacher_striction_valid_days?.message
                  }
                  control={control}
                  placeholder="Enter"
                  suffix="Day"
                />
              </div>
            </Content>
            <Content hidden={router.query.tabId != "2"}>
              {selects.groupType?.map((e) => {
                return (
                  <div className="flex">
                    <InputNumber
                      name={`root.potentialGroupStudentCounts.a_${e.value}`}
                      error={
                        (errors as any)?.root?.potentialGroupStudentCounts
                          ?.message
                      }
                      label={`${e.label} count to show recommendation`}
                      control={control}
                      placeholder="Enter"
                      suffix="Student"
                    />
                  </div>
                );
              })}
            </Content>
            <Buttons style={{ height: "100%" }}>
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

export default ChangeWaitingListConfig;
