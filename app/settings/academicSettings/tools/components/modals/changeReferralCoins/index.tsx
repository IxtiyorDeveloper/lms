import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ActionModal, InputNumber, UploadFile } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useReferralConfigPageData, useToolsChangeReferralCoins } from "hooks";
import { toast } from "react-toastify";
import _ from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { Spin } from "antd";

const ChangeReferralCoins = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  useEffect(() => {
    if (router.query.changeReferralCoins === "true") {
      setOpen(true);
    }
  }, [router.query?.changeReferralCoins]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const query = router.query;
      delete query.changeReferralCoins;
      router
        .replace({
          pathname: router.pathname,
          query: query,
        })
        .then();
    }, 100);
  };

  const { data: pageData, isLoading } = useReferralConfigPageData();

  useEffect(() => {
    if (pageData) {
      setValue("amount", pageData.amount);
      setValue("lesson_count", pageData.lesson_count);
      setValue("video_url", pageData.video_url);
    }
  }, [pageData]);

  const save = useToolsChangeReferralCoins({
    onSuccess: () => {
      handleClose();
      toast.success("Coins changed");
      queryClient.invalidateQueries([queryKeys.page_data]).then();
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
    save.mutate(data);
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <ActionModal
      open={open}
      width={448}
      errors={errors}
      control={control}
      submitButtonText="Save"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      blurColor={bgColors.primary}
      handleClose={() => handleClose()}
      buttonLoading={save.isLoading}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866"
      text={
        <Spin spinning={isLoading}>
          <div style={{ textAlign: "left", marginBottom: "24px" }}>
            <p style={{ marginBottom: "18px", fontWeight: 600 }}>
              Referral config
            </p>
            <div style={{ marginBottom: "20px" }}>
              <UploadFile
                name="video_url"
                height="100px"
                label="Upload media"
                control={control}
                setValue={setValue}
                onSuccess={(e) => {
                  setValue("video_url", e?.url);
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <InputNumber
                name="amount"
                control={control}
                label="Award amount"
                placeholder="Enter"
                error={
                  _.map(errors, (value) => {
                    return value;
                  })?.[0]?.message
                }
              />
              <InputNumber
                name="lesson_count"
                control={control}
                label="Lesson count for approval"
                placeholder="Enter"
                error={
                  _.map(errors, (value) => {
                    return value;
                  })?.[0]?.message
                }
              />
            </div>
          </div>
        </Spin>
      }
    />
  );
};

export default ChangeReferralCoins;
