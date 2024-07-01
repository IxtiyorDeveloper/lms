import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ActionModal } from "components";
import { bgColors, fontSizes } from "styles/theme";
import { useForm } from "react-hook-form";
import DatePicker from "components/antd/datePicker";
import moment from "moment";
import { useToolsChangeDate } from "hooks";
import { toast } from "react-toastify";
import _ from "lodash";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

function disabledDate(value: any) {
  return (
    value.format("YYYY-MM") !== moment(value).startOf("month").format("YYYY-MM")
  );
}
const ChangeDate = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
  } = useForm();

  useEffect(() => {
    if (router.query.changeDate === "true") {
      setOpen(true);
    }
  }, [router.query?.changeDate]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      const query = router.query;
      delete query.changeDate;
      router.replace({
        pathname: router.pathname,
        query: query,
      });
    }, 100);
  };

  const save = useToolsChangeDate({
    onSuccess: () => {
      handleClose();
      toast.success("Day changed");
      queryClient.invalidateQueries([queryKeys.page_data]);
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
    save.mutate({
      day: moment(data?.date, DATE_FORMAT_YYYY_MM_DD).format("DD"),
    });
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
      vertical={true}
      errors={errors}
      control={control}
      submitButtonText="Save"
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      blurColor={bgColors.primary}
      handleClose={() => handleClose()}
      icon={<img alt="date" src="/calendar-upgrade.png" />}
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866"
      text={
        <div style={{ textAlign: "left" }}>
          <p
            style={{
              fontSize: fontSizes.f14,
              marginBottom: "24px",
              textAlign: "center",
            }}
          >
            Set level recommendation for future
          </p>
          <DatePicker
            name="date"
            control={control}
            label="Change date"
            placeholder="Select"
            format="DD"
            disabledDate={disabledDate}
            error={
              _.map(errors, (value) => {
                return value;
              })?.[0]?.message
            }
          />
        </div>
      }
    />
  );
};

export default ChangeDate;
