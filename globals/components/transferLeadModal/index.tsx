import * as React from "react";
import { Alert, Buttons, Content, ContentFirst, SelectTab } from "./style";
import {
  AntdModal,
  Button,
  CustomSelect,
  DeleteSvg,
  ErrorLabel,
  Input,
  LittleShareSvg,
  MySelect,
  PhoneNumberInput,
  PlusSvg,
  WarningSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { Grid } from "@mui/material";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  useLeadTabs,
  useLeadValidation,
  usePageDataMemo,
  useUpdateLead,
} from "hooks";
import { useCallback, useEffect } from "react";
import { IconWrapper, Text } from "components/common/actionModal/style";
import { HexToRgbA } from "utils/hexToRgba";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneSchema } from "validation";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { MainPhone } from "constants/phoneTypes";
import { strOnlyNumbers } from "utils/textFormat";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { LeadTabEnums } from "constants/leadTabs";
import * as yup from "yup";
import { Label } from "components/common/input/style";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

const TransferModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    transferLead: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const oldData = data?.oldData;
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "transferLead",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };
  const TransferLeadSchema: { [x: string]: any } = yup.object().shape({
    general: yup.object().shape({
      name: yup.string().required("Name is a required field"),
      source_id: yup.string().nullable().required("Source is a required field"),
      comment: yup.string().nullable(),
      tab_id: yup
        .string()
        .nullable()
        .when("customer_type", {
          is: (type: any) => !!tabs?.length,
          then: yup.string().nullable().required("New Tab is a required field"),
          otherwise: yup.string().nullable(),
        }),
      phones: yup
        .array()
        .of(yup.object().shape(PhoneSchema))
        .required("Must have fields")
        .min(1, "Minimum of 1 field"),
    }),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
    watch,
    clearErrors,
  }: any = useForm<any>({
    resolver: yupResolver(TransferLeadSchema as any),
  });
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "general.phones",
  });

  const { data: tabs } = useLeadTabs();

  const selects = usePageDataMemo();

  const validate = useLeadValidation({
    onSuccess: (data: any) => {
      const id = data.config?.meta?.id;
      clearErrors(`general.phones[${id}]`);
    },
    onError: (err: any) => {
      const id = err.config?.meta?.id;
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: `general.phones[${id}]`,
      });
    },
  });

  const validationFunc = useCallback(
    (value: any, i: number, lead_id?: number) => {
      value?.phone?.length >= 12 &&
        validate.mutate({
          type: value.type,
          phone_number: value.phone,
          id: i,
          index: i,
          lead_id,
        });
    },
    [],
  );
  useEffect(() => {
    if (open) {
      if (oldData) {
        setValue("general", {
          ...oldData,
          name: oldData.name,
          source_id: oldData.source_id?.toString(),
        });
        [
          {
            type: MainPhone,
            phone: `${oldData.main_phone}`,
          },
          ...oldData?.leadPhones,
        ].map((e, index) => {
          validationFunc(e, index, oldData?.id);
          update(index, { type: `${e.type}`, phone: `+${e.phone}` });
        });
      } else {
        setValue("general", {
          source_id: selects.leadSourceSelect?.find((e) => e.key == 100)?.value,
        });
      }
    } else {
      reset();
    }
  }, [open, oldData]);

  const updateLead = useUpdateLead({
    onSuccess: () => {
      handleClose();
      toast.success("Lead update");
      queryClient.invalidateQueries([queryKeys.lead_list]);
      queryClient.invalidateQueries([queryKeys.lead_tabs]);
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: false,
        formHookMainField: true,
      });
    },
  });

  console.log(errors, "error");

  const onTransferSubmit = (data: any) => {
    const main_phone = data.general.phones.find(
      (e: any) => e.type == MainPhone,
    )?.phone;
    updateLead.mutate({
      ...data.general,
      tab_id: data.general.tab_id === "null" ? null : data.general.tab_id,
      main_phone: strOnlyNumbers(main_phone),
      source_id: data.general.source_id,
      phones: data.general.phones
        .filter((e: any) => e.phone !== main_phone)
        .map((r: any) => {
          return {
            type: r.type,
            phone_number: strOnlyNumbers(r.phone),
          };
        }),
      id: data.general?.id,
      status: 300,
    });
  };

  const type = data?.type;
  const isCreatedTabs = data?.isCreatedTabs;
  const [currentTab, setCurrentTab] = React.useState<any>(undefined);

  useEffect(() => {
    if (tabs?.length) {
      if (
        type === LeadTabEnums.NEW_LEADS ||
        type === LeadTabEnums.DELETED_LEADS
      ) {
        setCurrentTab([
          { name: "Processing", id: "null", color: bgColors.deep },
          ...(tabs || []),
        ]);
      }
      if (type === LeadTabEnums.PROCESSING_LEADS) {
        if (isCreatedTabs) {
          setCurrentTab([
            { name: "Processing", id: "null", color: bgColors.deep },
            ...(tabs?.filter(
              (tab) =>
                tab.id.toString() !== data?.oldData?.lead_tab_id?.toString(),
            ) || []),
          ]);
        } else {
          setCurrentTab(tabs);
        }
      }
    }
  }, [tabs, open, type]);

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      fields.map((r, i) => {
        if (
          name === `general.phones[${i}].phone` ||
          name === `general.phones[${i}].type`
        ) {
          clearErrors(name);
          validationFunc(value?.general?.phones?.[i], i);
        }
      });
    });
    return () => subscription.unsubscribe();
  }, [fields]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onTransferSubmit)}>
        <ContentFirst>
          <p className="takeLead">Take lead</p>
          <IconWrapper>
            <div className="svg">
              <LittleShareSvg width={50} height={50} />
            </div>
            <div className="blur" style={{ backgroundColor: bgColors.deep }} />
          </IconWrapper>
          <Text>
            <div>You can edit and take a lead to your tabs.</div>
          </Text>
        </ContentFirst>
        <Content>
          <Grid container spacing="14px">
            <Grid item xl={12} md={12} sm={12}>
              <Input
                label="Name"
                name="general.name"
                control={control}
                placeholder="John"
                error={errors?.general?.name?.message}
              />
            </Grid>
          </Grid>
          {fields?.map((item, index) => {
            const isErrorRow =
              errors?.general?.phones?.[index]?.phone?.message ||
              errors?.general?.phones?.[index]?.type?.message;
            return (
              <Grid container spacing="10px" key={item.id}>
                <Grid item xl={5} md={5} sm={5}>
                  <CustomSelect
                    control={control}
                    name={`general.phones[${index}].type`}
                    label="Type"
                    options={selects.phone}
                    error={errors?.general?.phones?.[index]?.type?.message}
                  />
                </Grid>
                <Grid item xl={5} md={5} sm={5}>
                  <PhoneNumberInput
                    label="Phone"
                    name={`general.phones[${index}].phone`}
                    control={control}
                    placeholder="+998 (--) --- -- --"
                    error={
                      errors?.general?.phones?.[index]?.phone?.message ||
                      errors?.general?.phones?.[0]?.phones?.[0]?.phone?.message
                    }
                  />
                </Grid>
                {index === 0 ? (
                  <Grid
                    item
                    xl={2}
                    className={`button ${isErrorRow ? "eRow" : ""}`}
                  >
                    <Button
                      onClick={() =>
                        append({ type: undefined, phone: undefined })
                      }
                      icon={<PlusSvg />}
                      style={{
                        padding: "0 24px",
                        color: textColors.blueGray,
                      }}
                    />
                  </Grid>
                ) : (
                  <Grid
                    item
                    xl={2}
                    className={`button ${isErrorRow ? "eRow" : ""}`}
                  >
                    <Button
                      icon={<DeleteSvg width={20} height={20} />}
                      onClick={() => remove(index)}
                      style={{
                        padding: "0 24px",
                        color: textColors.blueGray,
                        backgroundColor: bgColors.pale,
                      }}
                    />
                  </Grid>
                )}
                <div className="content">
                  {(errors?.general?.phones?.[index]?.user_name ||
                    errors?.general) && (
                    <Alert>
                      <div>
                        <WarningSvg />
                      </div>
                      <div className="pt">
                        <div>
                          Student:
                          <Link
                            className="underline"
                            href={`/student/${errors?.general?.phones?.[index]?.user_id?.message || errors?.general?.user_id?.message}`}
                          >
                            {errors?.general?.phones?.[index]?.user_name
                              ?.message || errors?.general?.user_name?.message}
                          </Link>{" "}
                          is already registered with this number
                        </div>
                        {errors?.general?.phones?.[index]?.group_name && (
                          <div>
                            Group:
                            <Link
                              className="underline"
                              href={`/groups/${errors?.general?.phones?.[index]?.group_id?.message}`}
                            >
                              {
                                errors?.general?.phones?.[index]?.group_name
                                  ?.message
                              }
                            </Link>
                          </div>
                        )}
                      </div>
                    </Alert>
                  )}
                </div>
              </Grid>
            );
          })}
          <Grid container>
            <MySelect
              control={control}
              name="general.source_id"
              label="Source"
              options={selects.leadSourceSelect}
              error={errors?.general?.source_id?.message}
            />
          </Grid>
          <Grid container>
            <Input
              label="Comment"
              name="general.comment"
              type="textarea"
              control={control}
              placeholder="Type here"
              error={errors?.general?.comment?.message}
              rows={2}
            />
          </Grid>
          <div>
            <div className="mb10">
              <Label>New Tab</Label>
            </div>
            <Grid container spacing="6px">
              {!!currentTab && currentTab?.length > 0 ? (
                <Controller
                  render={({ field }) => {
                    return (
                      <>
                        {currentTab.map((tab: any) => (
                          <Grid
                            onClick={() => field.onChange(tab.id)}
                            item
                            xl={4}
                            md={4}
                            sm={12}
                          >
                            <SelectTab
                              color={HexToRgbA(tab.color, 0.8)}
                              active={field.value === tab.id}
                            >
                              <p className="title">{tab.name}</p>
                              <div className="color" />
                            </SelectTab>
                          </Grid>
                        ))}
                      </>
                    );
                  }}
                  name="general.tab_id"
                  control={control}
                />
              ) : null}
            </Grid>
            <ErrorLabel error={errors?.general?.tab_id?.message} />
          </div>
        </Content>
        <ErrorLabel error={errors?.general?.phones?.message} />
        <ErrorLabel error={errors?.general?.main_phone?.message} />
        <Buttons>
          <Button
            style={{
              backgroundColor: bgColors.wildSand,
              width: "fit-content",
            }}
            className="cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: bgColors.primary,
              width: "fit-content",
            }}
            className="save"
            type="submit"
            buttonLoading={updateLead.isLoading}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default TransferModal;
