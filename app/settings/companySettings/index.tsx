import React, { useEffect, useState } from "react";
import {
  Wrapper,
  Content,
  SubContent,
  Inputs,
  OfferWrapper,
  Buttons,
} from "./style";
import { useForm } from "react-hook-form";
import {
  Button,
  ComplexThinTab,
  Input,
  ItemPicker,
  PhoneNumberInput,
  PlusSvg,
  UploadImage,
} from "components";
import { WorkingPeriod, PaymentMode, ModeModal } from "./components";
import { bgColors, textColors } from "styles/theme";
import Tabs from "./components/tabs";
import { SourceModal } from "globals/components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import DeleteSource from "globals/components/deleteSource";
import {
  useCurrentCompany,
  useUpdateCurrentCompany,
} from "hooks/useCompanySettings";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import Spin from "antd/lib/spin";
import RestrictAccess from "./components/restrictAccess";
import RestrictAccessModal from "../../../globals/components/restrictAccess";

export type TModal = "source" | "mode";

const CompanySettings = () => {
  const dispatch = useDispatch();
  const [modals, setModals] = useState({
    source: false,
    mode: false,
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const {
    control: modeControl,
    handleSubmit: handleModeSubmit,
    formState: { errors: modeErrors },
    reset: modeReset,
  } = useForm();

  const [active, setActive] = useState(0);

  const { data, isLoading } = useCurrentCompany({
    query_params: {
      expand: "publicOfferFile,restrict_access",
    },
  });
  const queryClient = useQueryClient();

  const updateCurrentCompany = useUpdateCurrentCompany({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_company_current]);
      toast.success("Success");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const handleChooseItem = (id: number) => {
    setActive(id);
  };

  const handleClose = (type: TModal) => {
    switch (type) {
      case "source":
        return setModals({
          ...modals,
          source: false,
        });
      case "mode":
        modeReset();
        return setModals({
          ...modals,
          mode: false,
        });
    }
  };
  const onSubmit = (data: any) => {
    updateCurrentCompany.mutate({
      body: data,
    });
  };
  const onModeSubmit = () => {};

  useEffect(() => {
    if (data) {
      setValue("name", data?.name);
      setValue("phone_number", data?.phone_number);
      setValue("public_offer_file_id", data?.public_offer_file_id);
    }
  }, [data]);

  const acceptType = {
    "image/*": [],
    "application/pdf": [".pdf"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "audio/*": [],
    "video/*": [],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
  };

  return (
    <Wrapper>
      <SourceModal />
      <DeleteSource />
      <RestrictAccessModal />
      <ModeModal
        control={modeControl}
        onSubmit={onModeSubmit}
        open={modals.mode}
        handleSubmit={handleModeSubmit}
        errors={modeErrors}
        handleClose={() => handleClose("mode")}
      />
      <Content>
        <SubContent>
          <Spin spinning={isLoading}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <UploadImage
                text="Upload file"
                name="public_offer_file_id"
                control={control}
                setValue={setValue}
                image={data?.publicOfferFile?.full_url}
                canCheckFileType
                filename={data?.publicOfferFile?.name}
                watch={watch("public_offer_file_id")}
                action="update"
                frontDelete
                label="Public offer file"
                accept={acceptType}
              />
              <Inputs>
                <div className="column">
                  <Input
                    label="Name"
                    name="name"
                    control={control}
                    placeholder="John"
                    error={errors?.name?.message}
                  />
                </div>
                <div className="column">
                  <PhoneNumberInput
                    label="Phone"
                    name="phone_number"
                    control={control}
                    placeholder="+998 (--) --- -- --"
                    error={errors?.phone_number?.message}
                  />
                </div>
              </Inputs>
              <Buttons>
                <Button
                  className="cancel"
                  style={{
                    backgroundColor: bgColors.wildSand,
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="save"
                  type="submit"
                  buttonLoading={updateCurrentCompany.isLoading}
                >
                  Save
                </Button>
              </Buttons>
            </form>
          </Spin>
          <ItemPicker
            label="Color of system"
            onClick={handleChooseItem}
            active={active}
          />
          <WorkingPeriod label="Working Period" control={control} />
          <OfferWrapper>
            <UploadImage name="offer" control={control} setValue={setValue} />
          </OfferWrapper>
          <PaymentMode
            label="Color of system"
            onClick={handleChooseItem}
            active={active}
          />
          <div className="buttonWrapper">
            <ComplexThinTab
              menu={Tabs()}
              topLeftChildren={
                <Button
                  icon={<PlusSvg />}
                  style={{
                    padding: "0 24px",
                    color: textColors.blueGray,
                  }}
                  onClick={() =>
                    dispatch(
                      toggleModal({
                        key: "source",
                        data: {
                          data: {
                            type: "create",
                          },
                          open: true,
                        },
                      })
                    )
                  }
                >
                  Create Source
                </Button>
              }
            />
          </div>
          <RestrictAccess data={data} />
          <div className="line" />
          <Buttons>
            <Button
              className="cancel"
              style={{
                backgroundColor: bgColors.wildSand,
              }}
            >
              Cancel
            </Button>
            <Button className="save" type="submit">
              Save
            </Button>
          </Buttons>
        </SubContent>
      </Content>
    </Wrapper>
  );
};

export default CompanySettings;
