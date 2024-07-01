import React, { useEffect, useMemo, useState } from "react";
import {
  AntdModal,
  Button,
  CheckBox,
  CircleImage,
  ErrorLabel,
  Input,
} from "components";
import {
  Wrapper,
  Buttons,
  UserInfo,
  PersonalInfo,
  PhotoWrapper,
} from "./style";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useGetOneExclusion,
  usePageDataExclusion,
  useSaveExclusion,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Divider, Spin } from "antd";
import _ from "lodash";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const CreateTemplateModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    reset,
    watch,
    control,
    clearErrors,
    formState: { errors },
    setError,
    setValue,
  } = useForm<any>();

  useEffect(() => {
    if (router.query.editExclusion === "true") {
      setOpen(true);
    }
  }, [router.query?.editExclusion]);

  const handleClose = () => {
    setOpen(false);
    reset({});
    const query = router.query;
    delete query.editExclusion;
    delete query.editExclusionId;
    router.replace({
      pathname: router.pathname,
      query: query,
    });
  };

  const queryClient = useQueryClient();

  const saveExclusion = useSaveExclusion({
    onSuccess: () => {
      toast.success("Saved");
      queryClient.invalidateQueries([queryKeys.sms_exclusion]);
      handleClose();
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

  const { isLoading, data } = useGetOneExclusion({
    id: router.query.editExclusionId,
  });
  const { isLoading: pageDataLoading, data: pageData } = usePageDataExclusion();

  const checkboxs = useMemo(() => {
    return _.map(pageData?.auto_sms_keys, (value, key) => {
      return {
        checked: !!data?.config.keys.find((e) => e === key),
        name: key,
      };
    });
  }, [pageData, data]);

  useEffect(() => {
    if (!!checkboxs) {
      checkboxs.map((e) => {
        setValue(`check.${e.name}`, e.checked);
      });
      setValue("description", data?.description);
    }
  }, [checkboxs]);

  const onSubmit = (formData: any) => {
    saveExclusion.mutate({
      project: "LMS",
      type: 200,
      description: formData.description,
      config: {
        keys: _.map(formData.check, (value, key) => {
          return value ? key : null;
        }).filter((e) => !!e),
      },
      user_id: data?.user_id,
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={isLoading || pageDataLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Edit black list</div>
            <UserInfo>
              <PhotoWrapper>
                <CircleImage
                  src={data?.user?.userProfile?.avatar}
                  width={80}
                  height={80}
                />
              </PhotoWrapper>
              <PersonalInfo>
                <p>{data?.user?.userProfile?.firstname}</p>
                <p>{data?.user?.userProfile?.lastname}</p>
                <p>
                  {_.map(data?.project, (value, key) => {
                    return value;
                  })}
                </p>
              </PersonalInfo>
            </UserInfo>
            <Divider />
            <Input
              name="description"
              control={control}
              placeholder="description"
              label="Description"
              type="textarea"
              error={errors?.description?.message}
            />
            <p className="heading" style={{ marginTop: "16px" }}>
              SMS Black List
            </p>
            <div style={{ marginTop: "21px" }}>
              {checkboxs.map((e) => (
                <CheckBox
                  name={`check.${e.name}`}
                  // @ts-ignore
                  defaultValue={e.checked}
                  defaultChecked={e.checked}
                  control={control}
                  error={errors?.[e.name]?.message}
                >
                  {e.name}
                </CheckBox>
              ))}
            </div>
            <ErrorLabel error={errors?.config?.message} />
            <Buttons>
              <Button onClick={handleClose} className="cancel">
                Cancel
              </Button>
              <Button type="submit" className="save">
                Send
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateTemplateModal;
