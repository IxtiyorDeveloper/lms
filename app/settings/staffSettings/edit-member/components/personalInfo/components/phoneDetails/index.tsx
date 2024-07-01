import React, { FC, Fragment, useEffect } from "react";
import { FormWrapper, Title, Wrapper } from "./style";
import {
  Button,
  MySelect,
  ComeSvg,
  DeleteSvg,
  PlusSvg,
  SmsCheck,
  PhoneNumberInput2,
  ErrorLabel,
} from "components";
import {
  useFieldArray,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { MainPhone } from "constants/phoneTypes";
import {
  useCheckSmsStaff,
  usePageDataMemo,
  useResendSmsStaff,
  useSendSmsStaff,
  useValidatePhoneNumberStaff,
} from "hooks";
import { strOnlyNumbers, validationErrorHandler } from "utils";
import Router from "next/router";
import { Grid } from "@mui/material";
import { bgColors, textColors } from "styles/theme";
import Timer from "../../../../../../../student/create-student/components/phoneNumber/components/timer";
import PhoneMessage from "../../../../../../../student/create-student/components/phoneMessage";
import { RefreshSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  control: any;
  setValue: UseFormSetValue<any>;
  getValues: UseFormGetValues<any>;
  setError: UseFormSetError<any>;
  clearErrors: UseFormClearErrors<any>;
  error: any;
  watch: UseFormWatch<any>;
}

const PhoneDetails: FC<IProps> = (props) => {
  const { control, error, watch, getValues, setValue, setError, clearErrors } =
    props;

  const selects = usePageDataMemo();

  const {
    fields: phoneFields,
    append: appendPhone,
    update,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phone_numbers",
  });

  const getItemOfPhones = (i: number) => {
    return getValues(`phone_numbers[${i}]`) as any;
  };

  const sendSms = useSendSmsStaff({
    onSuccess: () => {
      const index = getValues("index") as number;
      setValue(`phone_numbers[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: true,
        is_active: false,
        date: Date.now(),
      });
    },
    onError: (err) => {
      const index = getValues("index") as number;
      setValue(`phone_numbers[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: false,
        is_active: true,
        date: null,
        is_finished: true,
      });

      validationErrorHandler({
        err,
        showToast: true,
        callBackSetError: (err) =>
          setError(`phone_numbers.${index}.${err.field}`, {
            message: err.message,
          }),
      });
    },
  });

  const resendSms = useResendSmsStaff({
    onSuccess: () => {
      const index = getValues("index") as number;
      setValue(`phone_numbers[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: true,
        is_active: false,
        date: Date.now(),
      });
    },
    onError: (err) => {
      const index = getValues("index") as number;
      setValue(`phone_numbers[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: false,
        is_active: true,
        date: null,
        is_finished: true,
      });
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: `phone_numbers[${index}]`,
      });
    },
  });

  const checkSms = useCheckSmsStaff({
    onSuccess: () => {
      const index = getValues("index");
      setValue(
        `phone_numbers[${index}].confirmation_id`,
        getValues(`phone_numbers[${index}].confirmation_id`)
      );
      phoneFields.map((e, i) => {
        setValue(
          `phone_numbers[${i}]`,
          i === index
            ? {
                ...getItemOfPhones(i),
                is_confirmed: true,
                is_active: false,
                date: Date.now(),
              }
            : {
                ...getItemOfPhones(i),
              }
        );
        i === index && clearErrors(`phone_numbers[${i}].code`);
      });
    },
    onError: (err) => {
      const index = getValues("index");
      setValue(`phone_numbers.${index}.confirmation_id`, null);
      setValue(`phone_numbers[${index}].is_active`, true);
      setError(`phone_numbers`, {
        message: err?.data?.client_error?.errors?.message,
      });
      validationErrorHandler({
        err,
        callBackSetError: (err) => {
          setError(`phone_numbers[${index}].${err.field}`, {
            message: err.message,
          });
        },
        showToast: false,
      });
    },
  });

  const validate = useValidatePhoneNumberStaff({
    onSuccess: (data) => {
      setError(`phones1.${data.id}.messageValidate`, data);
    },
    onError: (err: any) => {
      const validationErrors = err.data.client_error.errors as any[];
      validationErrors.map((err: any) => {
        setError(`${err.field}`, { message: err.message });
      });
    },
  });

  const handlePressConfirm = (i: number) => {
    sendSms.mutate({
      body: {
        phone_number: strOnlyNumbers(
          getValues(`phone_numbers.${i}.phone_number`) as string
        ),
      },
    });
    setValue(`phone_numbers[${i}]`, {
      ...getItemOfPhones(i),
      is_confirmed: true,
      is_active: false,
      date: Date.now(),
      is_finished: false,
      confirmation_id: null,
    });
    setValue("index", i);
  };

  const handleRefresh = (i: number) => {
    resendSms.mutate({
      body: {
        phone_number: strOnlyNumbers(
          getValues(`phone_numbers.${i}.phone_number`) as string
        ),
      },
    });
    setValue("index", i);
    setValue(`phone_numbers.${i}.is_active`, false);
  };

  const onFinishedTime = (index: number | undefined) => {
    update(index as number, {
      ...getItemOfPhones(index as number),
      time_started: false,
    });
    setValue(`phone_numbers[${index}]`, {
      ...getItemOfPhones(index as number),
      time_started: false,
      is_active: true,
      is_finished: true,
    });
  };

  const onStartedTime = (index: number | undefined) => {
    update(index as number, {
      ...getItemOfPhones(index as number),
      time_started: true,
    });
    setValue(`phone_numbers[${index}]`, {
      ...getItemOfPhones(index as number),
      time_started: true,
    });
  };

  const onCompleteSms = (index: number, value: string) => {
    setValue("index", index);
    setValue(`phone_numbers.${index}.confirmation_id`, value);
    checkSms.mutate({
      body: {
        phone_number: strOnlyNumbers(
          getValues(`phone_numbers.${index}.phone_number`) as string
        ),
        code: value,
      },
    });
    clearErrors(`phone_numbers[${index}].code`);
  };

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (type === "change") {
        phoneFields.map((e, i) => {
          if (
            name === `phone_numbers.${i}.type` ||
            name === `phone_numbers.${i}.is_confirmed` ||
            name === `phone_numbers.${i}.confirmation_id`
          ) {
            clearErrors(`phone_numbers`);
          }
          if (
            name === `phone_numbers.${i}.type` ||
            name === `phone_numbers.${i}.phone_number`
          ) {
            setValue("index", i);
            setValue(`phone_numbers[${i}]`, {
              ...getItemOfPhones(i),
              is_active: false,
              time_started: false,
              date: Date.now(),
              is_finished: false,
              is_confirmed: false,
              confirmation_id: null,
            });
            clearErrors(`phone_numbers`);
            value.phone_numbers?.[i]?.phone_number?.length >= 12 &&
              validate.mutate({
                phones: value.phone_numbers.map((r: any, index: number) => {
                  return {
                    ...r,
                    index,
                  };
                }),
                id: Router.query?.id,
                index: i,
                dob: value.dob,
                group_type_id: value.group_type_id,
                phone_number: value.phone_numbers?.[i]?.phone_number,
              });
          }
          if (name === `phone_numbers.${i}.checked`) {
            setValue(`phone_numbers.${i}.checked`, true);
          } else if (
            name.split(".")?.[name.split(".").length - 1] === "checked"
          ) {
            setValue(`phone_numbers.${i}.checked`, false);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [phoneFields]);

  return (
    <Wrapper>
      <Title>Phone number</Title>
      <FormWrapper>
        {phoneFields?.map((field, i) => {
          const currentPhone = watch(`phone_numbers.${i}`);

          if (!currentPhone) {
            return null;
          }
          const value = currentPhone.phone_number;
          const isShow = currentPhone.is_confirmed;
          const confirmation_id = currentPhone.confirmation_id;
          const showRefresh = currentPhone.is_finished;
          const time_started = currentPhone.time_started;
          const date = currentPhone.date;
          const isFilled = strOnlyNumbers(value as string)?.length === 12;

          return (
            <Grid
              key={field.id}
              container
              sx={{ marginTop: i == 0 ? 0 : "16px" }}
              spacing="24px"
              display="flex"
              alignItems="flex-start"
            >
              <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                <MySelect
                  control={control}
                  name={`phone_numbers.${i}.type`}
                  label="Type"
                  onChange={(e) => {
                    setValue(`phone_numbers.${i}.type`, e);
                    clearErrors("phone_numbers");
                  }}
                  options={selects.phone}
                  error={error?.phone_numbers?.[i]?.type?.message}
                />
              </Grid>
              <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                <PhoneNumberInput2
                  control={control}
                  placeholder="+998 (--) --- -- --"
                  label="Phone number"
                  onFocus={() => setValue("index", i)}
                  error={
                    error?.phone_numbers?.[i]?.phone_number?.message ||
                    error?.phone_numbers?.[i]?.confirmation_id?.message ||
                    error?.phone_numbers?.[i]?.code?.message
                  }
                  name={`phone_numbers.${i}.phone_number`}
                  autoComplete="off"
                  onBlur={() => {
                    if (
                      getValues(`phone_numbers.${i}.phone_number`)?.length !==
                      12
                    ) {
                      setError(`phone_numbers.${i}.phone_number`, {
                        message: "Phone number is not completed",
                      });
                    }
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
                <div
                  style={{
                    display: "flex",
                    marginTop: "auto",
                    height: "100%",
                    alignItems: "flex-end",
                    gap: "10px",
                    paddingTop: "22px",
                  }}
                >
                  <div style={{ display: "flex", gap: "15px" }}>
                    {i <= 1 && (
                      <Button
                        bgColor={isFilled ? bgColors.primary : bgColors.yukon}
                        text="Confirm"
                        disabled={
                          isFilled && !time_started ? !!confirmation_id : true
                        }
                        textStyle={{
                          fontWeight: "700",
                          color: isFilled
                            ? textColors.sceptreBlue
                            : bgColors.yourShadow,
                        }}
                        args={{
                          sx: {
                            textTransform: "none",
                            width: "50%",
                            height: "37px",
                          },
                        }}
                        onClick={() => handlePressConfirm(i)}
                      />
                    )}

                    {i === 0 ? (
                      <Button
                        bgColor={bgColors.primary}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                        args={{
                          sx: {
                            textTransform: "none",
                            width: "100%",
                            height: "37px",
                          },
                        }}
                        disabled={sendSms.isLoading}
                        type="button"
                        onClick={() =>
                          appendPhone({
                            type:
                              selects?.phone!?.length > 0
                                ? selects?.phone?.find(
                                    (e) => +e.value === +MainPhone
                                  )?.value
                                : null,
                            phone_number: undefined,
                            is_confirmed: false,
                            confirmation_id: undefined,
                            is_active: false,
                            date: undefined,
                            sms: undefined,
                            time: Date.now(),
                          })
                        }
                      >
                        <PlusSvg color={bgColors.black} />
                      </Button>
                    ) : (
                      <div
                        className="del"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={() => removePhone(i)}
                      >
                        <DeleteSvg width={20} height={20} />
                      </div>
                    )}
                  </div>
                  {isShow ? (
                    !!confirmation_id ? (
                      <Fragment>
                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            flexGrow: 1,
                            flexShrink: 1,
                            alignSelf: "center",
                            marginTop: "10px",
                            marginBottom: "4px",
                          }}
                        >
                          <ComeSvg />
                        </div>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <SmsCheck
                          onChange={() => {
                            clearErrors("phone_numbers");
                          }}
                          length={6}
                          onCompleted={(value: string) => {
                            clearErrors("phone_numbers");
                            onCompleteSms(i, value);
                          }}
                        />
                        <Timer
                          total={120}
                          defaultValue={date}
                          interval={1200}
                          onComplete={() => onFinishedTime(i)}
                          onStarted={
                            time_started ? () => {} : () => onStartedTime(i)
                          }
                        />
                        {showRefresh && (
                          <Button
                            icon={<RefreshSvg />}
                            style={{
                              height: "37px",
                              backgroundColor: bgColors.yukon,
                              width: "34px",
                              marginLeft: "16px",
                            }}
                            onClick={() => handleRefresh(i)}
                          />
                        )}
                      </Fragment>
                    )
                  ) : null}
                </div>
              </Grid>
              <PhoneMessage
                error={error?.phone_numbers?.[i]?.messageValidate}
              />
            </Grid>
          );
        })}
        <ErrorLabel error={error?.phone_numbers?.message} />
      </FormWrapper>
    </Wrapper>
  );
};

export default PhoneDetails;
