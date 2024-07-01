import * as React from "react";
import { AntdModal, Button, Segmented } from "components";
import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ButtonWrapper,
  ContentWrapper,
  LabelWrapperSegmented,
  ModalTitle,
  PhoneTypes,
  SegmentedWrapper,
} from "../../../app/settings/documents/home/components/addFile/style";
import { useGetOneExclusion, useGetOneStudent, useSaveExclusion } from "hooks";
import { expand } from "app/student/[studentId]/expand";
import { useForm } from "react-hook-form";
import PhoneTypeC from "./components/phoneType";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { CallFrameSvg, SmsTemplateSvg } from "@jasurbekyuldashov/lms-web-icons";
import CallContent from "./components/callContent";

const SMSBlackListModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { control, watch, setValue, getValues, setError, handleSubmit, reset } =
    useForm();
  const queryClient = useQueryClient();
  const handleClose = () => {
    setOpen(() => false);
    const query = router.query;
    delete query?.user_id;
    delete query?.group;
    delete query?.smsBlackList;
    router
      .replace({
        pathname: router.pathname,
        query: query,
      })
      .then();
  };

  const { data, isLoading } = useGetOneStudent({
    expand,
    id: router.query.user_id,
    type: "update",
  });

  const { data: modalData = {} } = useGetOneExclusion({
    expand,
    user_id: router.query.user_id,
    type: 200,
    project: "LMS",
  });

  const saveExclusion = useSaveExclusion({
    onSuccess: () => {
      reset();
      toast.success("Saved");
      handleClose();
      queryClient.invalidateQueries([queryKeys.sms_exclusion]).then();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = (formData: any) => {
    const objs: any[] = [];
    data?.user?.userPhones?.map((phoneObj, index) => {
      const auto_sms: string[] = [];
      for (let a in formData[`${phoneObj.phone_number}_check`]) {
        if (formData[`${phoneObj.phone_number}_check`][a]) {
          auto_sms.push(a);
        }
      }
      objs[index] = {
        phone_number: phoneObj.phone_number,
        auto_sms,
      };
    });
    const dataCollected = {
      project: "LMS",
      type: 200,
      description: "123",
      config: objs.filter((obj) => obj.auto_sms.length !== 0),
      user_id: router.query.user_id,
    };
    saveExclusion.mutate(dataCollected);
  };

  useEffect(() => {
    reset();
    if (router.query.smsBlackList === "true") {
      setOpen(() => true);
    }
  }, [router.query?.smsBlackList]);
  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      padding="0"
      width={736}
      forceRender
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Spin spinning={isLoading}>
          <ModalTitle>Black list config</ModalTitle>
          <SegmentedWrapper>
            <Segmented
              initValue="smsBlackList"
              options={[
                {
                  label: (
                    <LabelWrapperSegmented>
                      <SmsTemplateSvg
                        width={15}
                        height={15}
                        color={bgColors.dark}
                      />{" "}
                      SMS
                    </LabelWrapperSegmented>
                  ),
                  value: "smsBlackList",
                  children: (
                    <ContentWrapper>
                      <div className="content-d">
                        <p className="title">Auto SMS</p>
                        <PhoneTypes>
                          {data?.user?.userPhones?.map((phone) => {
                            return (
                              <PhoneTypeC
                                reset={reset}
                                key={phone.id}
                                // @ts-ignore
                                pageView={
                                  // @ts-ignore
                                  modalData?.config?.filter(
                                    (p: any) =>
                                      p.phone_number === phone.phone_number,
                                  )[0]
                                }
                                watch={watch}
                                setValue={setValue}
                                getValues={getValues}
                                phone={phone}
                                control={control}
                              />
                            );
                          })}
                        </PhoneTypes>
                      </div>
                      <div className="content-d">
                        <p className="title">Manual SMS</p>
                        <PhoneTypes>
                          {data?.user?.userPhones?.map((phone) => {
                            return (
                              <PhoneTypeC
                                reset={reset}
                                key={phone.id}
                                // @ts-ignore
                                pageView={
                                  // @ts-ignore
                                  modalData?.config?.filter(
                                    (p: any) =>
                                      p.phone_number === phone.phone_number,
                                  )[0]
                                }
                                watch={watch}
                                setValue={setValue}
                                getValues={getValues}
                                phone={phone}
                                control={control}
                              />
                            );
                          })}
                        </PhoneTypes>
                      </div>
                    </ContentWrapper>
                  ),
                },
                {
                  label: (
                    <LabelWrapperSegmented>
                      <CallFrameSvg
                        width={14}
                        height={14}
                        color={bgColors.dark}
                      />{" "}
                      Call
                    </LabelWrapperSegmented>
                  ),
                  value: "callBlackList",
                  children: (
                    <CallContent
                      reset={reset}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                      control={control}
                      data={data}
                    />
                  ),
                },
              ]}
            />
          </SegmentedWrapper>
          <ButtonWrapper>
            <Button
              onClick={handleClose}
              textColor={textColors.yourShadow}
              bgColor={bgColors.wildSand}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </ButtonWrapper>
        </Spin>
      </form>
    </AntdModal>
  );
};

export default SMSBlackListModal;
