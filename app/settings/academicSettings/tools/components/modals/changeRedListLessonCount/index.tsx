import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AntdModal, Button, Input } from "components";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { Spin } from "antd";
import {
  Buttons,
  Content,
  Wrapper,
} from "./style";
import { usePageData, useRedListChangeCount } from "hooks";
import { toast } from "react-toastify";
import { queryKeys } from "constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { validationErrorHandler } from "utils";

const ChangeRedListLessonCount = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data } = usePageData();
  const query = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm();

  useEffect(() => {
    if (router.query.redListLessonLimit === "true") {
      setOpen(true);
    } else {
      setValue("count", data?.redListCountConstant);
    }
  }, [router.query?.redListLessonLimit]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const query = router.query;
      delete query.redListLessonLimit;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  const save = useRedListChangeCount({
    onSuccess: () => {
      handleClose();
      toast.success("Day changed");
      query.invalidateQueries([queryKeys.page_data]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  });
  const onSubmit = (data: any) => {
    save.mutate({ count: data.count });
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
    setValue("count", data?.redListCountConstant);
  }, [data?.redListCountConstant]);

  if (router.query.redListLessonLimit !== "true") {
    return null;
  }

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Change red list lesson count</div>
            <Content>
              <div className="flex">
                <Input
                  name="count"
                  label="Lesson count"
                  control={control}
                  placeholder="3"
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

export default ChangeRedListLessonCount;
