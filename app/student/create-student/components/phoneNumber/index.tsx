import React, { FC, Fragment, useEffect } from "react";
import { Grid } from "@mui/material";
import {
  Button,
  ComeSvg,
  DeleteSvg,
  ErrorLabel,
  MySelect,
  PhoneNumberInput2,
  PlusSvg,
  RefreshSvg,
  SmsCheck,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useFieldArray } from "react-hook-form";
import { TCreateStudentPhoneNumber } from "./type";
import { strOnlyNumbers } from "utils/textFormat";
import {
  useCheckSms,
  useResendSms,
  useSendSms,
  useValidatePhoneNumber,
} from "hooks";
import PhoneMessage from "../phoneMessage";
import { MainPhone } from "constants/phoneTypes";
import Timer from "./components/timer";
import { validationErrorHandler } from "utils";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { IStore } from "store";

const CreateStudentPhoneNumber: FC<TCreateStudentPhoneNumber> = ({
  control,
  error,
  options,
  watch,
  setValue,
  setError,
  getValues,
  clearError,
  balance = 0,
}) => {
  const router = useRouter();
  const { fields, append, remove, update, move } = useFieldArray({
    name: "root.phones",
    control,
  });
  const adminNumber = useSelector(
    (state: IStore) =>
      state.user?.user?.userPhones?.find((r) => r.is_confirmed == 1)
        ?.phone_number
  );
  const isUpdate =
    router.query?.type == "update" &&
    router.query.back_to_waiting_list != "true";
  const getItemOfPhones = (i: number) => {
    return getValues(`root.phones[${i}]`) as any;
  };
  const sendSms = useSendSms({
    onSuccess: () => {
      const index = getValues("root.index") as number;
      setValue(`root.phones[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: true,
        is_active: false,
        date: Date.now(),
      });
      setError(
        `root.phones[${index}].phone_number`,
        { message: null },
        { shouldFocus: true }
      );
    },
    onError: (err) => {
      const index = getValues("root.index") as number;
      setValue(
        `root.phones[${index}]`,
        err.status == 422
          ? {
              ...getItemOfPhones(index),
              is_confirmed: false,
              is_active: true,
              date: null,
              is_finished: true,
            }
          : {
              ...getItemOfPhones(index),
              is_confirmed: true,
              is_active: false,
              date: Date.now(),
            }
      );

      validationErrorHandler({
        err,
        setError,
        showToast: true,
        callBackSetError: (err) =>
          setError(
            `root.${
              err.field === "first_name"
                ? "first_name"
                : `phones[${index}].${err.field}`
            }`,
            { message: err.message }
          ),
      });
    },
  });

  const resendSms = useResendSms({
    onSuccess: () => {
      const index = getValues("root.index") as number;
      setValue(`root.phones[${index}]`, {
        ...getItemOfPhones(index),
        is_confirmed: true,
        is_active: false,
        date: Date.now(),
      });
    },
    onError: (err) => {
      const index = getValues("root.index") as number;

      setValue(
        `root.phones[${index}]`,
        err.status == 422
          ? {
              ...getItemOfPhones(index),
              is_confirmed: false,
              is_active: true,
              date: null,
              is_finished: true,
            }
          : {
              ...getItemOfPhones(index),
              is_confirmed: true,
              is_active: false,
              date: Date.now(),
            }
      );
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: `root.phones[${index}]`,
      });
    },
  });

  const checkSms = useCheckSms({
    onSuccess: (data) => {
      const index = getValues("root.index");
      fields.map((e, i) => {
        setValue(
          `root.phones[${i}]`,
          i === index
            ? {
                ...getItemOfPhones(i),
                // is_confirmed: !!getValues(
                //   `root.phones[${i}].admin_confirmation_id`
                // ),
                is_confirmed: true,
                is_active: false,
                date: Date.now(),
                confirmation_id: data.id,
              }
            : {
                ...getItemOfPhones(i),
                is_confirmed: false,
                is_active: true,
                date: Date.now(),
                confirmation_id: null,
              }
        );
        i === index && clearError(`root.phones[${i}].code`);
      });
    },
    onError: (err) => {
      const index = getValues("root.index");
      setValue(`root.phones[${index}].is_active`, true);
      validationErrorHandler({
        err,
        callBackSetError: (err) =>
          setError(
            `root.${
              err.field === "first_name"
                ? "first_name"
                : `phones[${index}].${err.field}`
            }`,
            { message: err.message }
          ),
        showToast: false,
      });
    },
  });
  const adminCheckSms = useCheckSms({
    onSuccess: (data) => {
      const index = getValues("root.index");
      fields.map((e, i) => {
        setValue(
          `root.phones[${i}]`,
          i === index
            ? {
                ...getItemOfPhones(i),
                // is_confirmed: !!getValues(`root.phones[${i}].confirmation_id`),
                is_confirmed: true,
                is_active: false,
                date: Date.now(),
                admin_confirmation_id: data.id,
              }
            : {
                ...getItemOfPhones(i),
                is_confirmed: false,
                is_active: true,
                date: Date.now(),
                admin_confirmation_id: null,
              }
        );
        i === index && clearError(`root.phones[${i}].code`);
      });
    },
    onError: (err) => {
      const index = getValues("root.index");
      setValue(`root.phones[${index}].is_active`, true);
      validationErrorHandler({
        err,
        callBackSetError: (err) =>
          setError(
            `root.${
              err.field === "first_name"
                ? "first_name"
                : `phones[${index}].${err.field}`
            }`,
            { message: err.message }
          ),
        showToast: false,
      });
    },
  });
  const validate = useValidatePhoneNumber({
    onSuccess: (data) => {
      setError(`phones1.${data.id}.messageValidate`, data);
      // setPhoneValue("root", data);
    },
    onError: (err: any) => {
      const validationErrors = err.data.client_error.errors as any[];
      validationErrors.map((err: any) => {
        setError(`root.${err.field}`, { message: err.message });
      });
    },
  });
  const handlePressConfirm = (i: number) => {
    sendSms.mutate({
      phone_number: strOnlyNumbers(
        getValues(`root.phones.${i}.phone_number`) as string
      ),
      phone_type: strOnlyNumbers(getValues(`root.phones.${i}.type`) as string),
      name: getValues(`root.first_name`),
      user_id: router.query.id,
      is_update: balance == 0 ? undefined : isUpdate ? 1 : undefined,
    });
    setValue(`root.phones[${i}]`, {
      ...getItemOfPhones(i),
      is_confirmed: true,
      is_active: false,
      date: Date.now(),
      is_finished: false,
      confirmation_id: null,
      admin_confirmation_id: null,
    });
    setValue("root.index", i);
  };

  const handleRefresh = (i: number) => {
    resendSms.mutate({
      phone_number: strOnlyNumbers(
        getValues(`root.phones.${i}.phone_number`) as string
      ),
      name: getValues(`root.first_name`),
      is_update: balance == 0 ? undefined : isUpdate ? 1 : undefined,
    });
    setValue("root.index", i);
    setValue(`root.phones.${i}.is_active`, false);
  };

  const onFinishedTime = (index: number | undefined) => {
    update(index as number, {
      ...getItemOfPhones(index as number),
      time_started: false,
    });
    setValue(`root.phones[${index}]`, {
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
    setValue(`root.phones[${index}]`, {
      ...getItemOfPhones(index as number),
      time_started: true,
    });
  };

  const onCompleteSms = (index: number, value: string) => {
    setValue("root.index", index);
    checkSms.mutate({
      phone_number: strOnlyNumbers(
        getValues(`root.phones.${index}.phone_number`) as string
      ),
      code: value,
    });
    clearError(`root.phones[${index}].code`);
  };
  const onAdminCompleteSms = (index: number, value: string) => {
    setValue("root.index", index);
    adminCheckSms.mutate({
      // phone_number: strOnlyNumbers(
      //   getValues(`root.phones.${index}.phone_number`) as string
      // ),
      phone_number: adminNumber,
      code: value,
      is_admin: 1,
    });
    clearError(`root.phones[${index}].code`);
  };
  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      if (type === "change") {
        fields.map((e, i) => {
          if (
            name === `root.phones.${i}.type` ||
            name === `root.phones.${i}.is_confirmed` ||
            name === `root.phones.${i}.confirmation_id`
          ) {
            clearError(`root.phones`);
          }
          if (
            name === `root.phones.${i}.type` ||
            name === `root.phones.${i}.phone_number`
          ) {
            setValue("root.index", i);
            setValue(`root.phones[${i}]`, {
              ...getItemOfPhones(i),
              is_active: false,
              time_started: false,
              date: Date.now(),
              is_finished: false,
              is_confirmed: false,
              confirmation_id: null,
            });
            clearError(`root.phones`);
            value.root?.phones?.[i]?.phone_number?.length >= 12 &&
              validate.mutate({
                phones: value.root?.phones.map((r: any, index: number) => {
                  return {
                    ...r,
                    index,
                  };
                }),
                id: router.query?.id,
                index: i,
                dob: value.root.dob,
                group_type_id: value.root.group_type_id,
                phone_number: value.root?.phones?.[i]?.phone_number,
              });
          }
          if (name === `root.phones.${i}.checked`) {
            setValue(`root.phones.${i}.checked`, true);
          } else if (
            name.split(".")?.[name.split(".").length - 1] === "checked"
          ) {
            setValue(`root.phones.${i}.checked`, false);
          }
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [fields]);

  return (
    <div>
      {fields?.map((field, i) => {
        const a = watch(`root.phones.${i}`);
        if (!a) {
          return null;
        }
        const value = a.phone_number;
        const isShow = a.is_confirmed;
        const confirmation_id = a.confirmation_id;
        const admin_confirmation_id = a.admin_confirmation_id;
        const isConfirmed = isUpdate
          ? !!confirmation_id && !!admin_confirmation_id
          : !!confirmation_id;
        const showRefresh = a.is_finished;
        const time_started = a.time_started;
        const date = a.date;
        const isFilled = strOnlyNumbers(value as string)?.length === 12;
        // const studentId = error?.root?.phones?.[i]?.messageValidate?.student_id;
        return (
          <Grid
            key={field.id}
            container
            sx={{ marginTop: i == 0 ? 0 : "16px" }}
            spacing="24px"
            display="flex"
            alignItems="flex-start"
          >
            <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
              <MySelect
                control={control}
                name={`root.phones.${i}.type`}
                label="Type"
                options={options}
                error={error?.root?.phones?.[i]?.type?.message}
              />
            </Grid>
            <Grid item xl={3} lg={6} md={6} sm={12} xs={12}>
              <PhoneNumberInput2
                control={control}
                placeholder="+998 (--) --- -- --"
                label="Phone number"
                onFocus={() => setValue("root.index", i)}
                error={
                  error?.root?.phones?.[i]?.phone_number?.message ||
                  error?.root?.phones?.[i]?.confirmation_id?.message ||
                  error?.root?.phones?.[i]?.code?.message
                }
                name={`root.phones.${i}.phone_number`}
                autoComplete="off"
                onBlur={() => {
                  if (
                    getValues(`root.phones.${i}.phone_number`)?.length !== 12
                  ) {
                    setError(`root.phones.${i}.phone_number`, {
                      message: "Phone number is not completed",
                    });
                  }
                }}
                autoFocus
              />
            </Grid>
            <Grid item xl={6} lg={12} md={12} sm={12} xs={12}>
              <div
                style={{
                  display: "flex",
                  marginTop: "auto",
                  height: "62px",
                  alignItems: "flex-end",
                  gap: "10px",
                  paddingTop: "22px",
                }}
              >
                <div style={{ display: "flex", gap: "15px" }}>
                  <Button
                    bgColor={isFilled ? bgColors.primary : bgColors.yukon}
                    text="Confirm"
                    disabled={isFilled && !time_started ? isConfirmed : true}
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
                        append({
                          type:
                            options?.length > 0
                              ? options.find((e) => e.value == MainPhone)?.value
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
                    <div className="del" onClick={() => remove(i)}>
                      <DeleteSvg width={20} height={20} />
                    </div>
                  )}
                </div>
                {isShow ? (
                  isConfirmed ? (
                    <Fragment>
                      <div
                        style={{
                          display: "flex",
                          alignSelf: "center",
                        }}
                      >
                        <ComeSvg />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {!confirmation_id ? (
                        <SmsCheck
                          onCompleted={(value: string) =>
                            onCompleteSms(i, value)
                          }
                          label="Student confirmation"
                        />
                      ) : (
                        <ComeSvg />
                      )}
                      {!isUpdate && (
                        <Timer
                          total={120}
                          defaultValue={date}
                          interval={1200}
                          onComplete={() => {}}
                          onStarted={
                            time_started ? () => {} : () => onStartedTime(i)
                          }
                        />
                      )}
                      {isUpdate && (
                        <>
                          <div style={{ width: "6px" }} />
                          {balance > 0 ? (
                            !admin_confirmation_id ? (
                              <>
                                <SmsCheck
                                  onCompleted={(value: string) =>
                                    onAdminCompleteSms(i, value)
                                  }
                                  label="Staff confirmation"
                                />
                              </>
                            ) : (
                              <ComeSvg />
                            )
                          ) : null}
                          <Timer
                            total={120}
                            defaultValue={date}
                            interval={1200}
                            onComplete={() => onFinishedTime(i)}
                            onStarted={
                              time_started ? () => {} : () => onStartedTime(i)
                            }
                          />
                        </>
                      )}
                      {showRefresh && (
                        <Button
                          icon={<RefreshSvg />}
                          style={{
                            height: "37px",
                            width: "34px",
                            backgroundColor: bgColors.yukon,
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
            <PhoneMessage error={error?.phones1?.[i]?.messageValidate} />
          </Grid>
        );
      })}
      <ErrorLabel error={error?.root?.phones?.message} />
    </div>
  );
};

export default CreateStudentPhoneNumber;
