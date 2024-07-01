import React, { useCallback, useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useAddLead, useLeadValidation, usePageDataMemo } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateLeadSchema } from "validation";
import { strOnlyNumbers } from "utils/textFormat";
import { MainPhone } from "constants/phoneTypes";
import {
  AntdModal,
  Button,
  CustomSelect,
  DeleteSvg,
  ErrorLabel,
  Input,
  MySelect,
  PhoneNumberInput,
  PlusSvg,
  WarningSvg,
} from "components";
import { Alert, Buttons, Content } from "./style";
import { Grid } from "@mui/material";
import { bgColors, textColors } from "styles/theme";
import Link from "next/link";
import debounce from "lodash/debounce";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const AddLead = () => {
  const dispatch = useDispatch();
  const {
    addLead: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
    setValue,
  }: any = useForm({
    defaultValues: {
      phones: [{ type: `${MainPhone}`, phone: undefined }],
    },
    resolver: yupResolver(CreateLeadSchema as any),
  });

  const handleClose = () => {
    reset({
      phones: [{ type: `${MainPhone}`, phone: undefined }],
    });
    dispatch(
      toggleModal({
        key: "addLead",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const queryClient = useQueryClient();

  const addLead = useAddLead({
    onSuccess: () => {
      handleClose();
      toast.success("Lead created");
      queryClient.invalidateQueries({ queryKey: [queryKeys.lead_list] });
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
    addLead.mutate({
      comment: data.comment,
      note: data.comment,
      name: data.name || "" + " " + data.lastname || "",
      source_id: data.source_id,
      main_phone: strOnlyNumbers(
        data.phones?.find((e: any) => e.type == MainPhone)?.phone
      ),
      phones: data.phones
        .filter((e: any) => e?.type !== MainPhone)
        .map((phone: any) => {
          return {
            type: +phone.type,
            phone_number: strOnlyNumbers(phone.phone),
          };
        }),
    });
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "phones",
  });
  const selects = usePageDataMemo();

  const validate = useLeadValidation({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        setError,
        formHookMainField: false,
      });
    },
  });

  const check = useCallback(
    debounce((r: any, index: number) => {
      validate.mutate({
        type: r.type,
        phone_number: r.phone,
        index,
      });
    }, 1000),
    []
  );

  useEffect(() => {
    const subscription = watch((value: any, { name, type }: any) => {
      const i = name?.slice?.(name.indexOf("[") + 1, name.indexOf("]"));
      const item = value?.phones?.find?.((r: any, index: number) => index == i);
      if (item?.phone?.length >= 13) {
        check(item, i);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const inCallSource = selects.leadSourceSelect?.find(
    (e) => e.key == 100
  )?.value;

  useEffect(() => {
    open && setValue("source_id", inCallSource);
  }, [inCallSource, open]);
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Grid container spacing="14px">
            <Grid item xl={12} md={12} sm={12}>
              <Input
                label="Full name"
                name="name"
                control={control}
                placeholder="John"
                error={errors?.name?.message}
              />
            </Grid>
          </Grid>
          {fields?.map((item, index) => {
            const isErrorRow =
              errors?.phones?.[index]?.phone?.message ||
              errors?.phones?.[index]?.type?.message;
            return (
              <Grid container spacing="10px" key={item.id}>
                <Grid item xl={5} md={5} sm={5}>
                  <CustomSelect
                    control={control}
                    name={`phones[${index}].type`}
                    label="Type"
                    options={selects.phone}
                    error={errors?.phones?.[index]?.type?.message}
                  />
                </Grid>
                <Grid item xl={5} md={5} sm={5}>
                  <PhoneNumberInput
                    label="Phone"
                    name={`phones[${index}].phone`}
                    control={control}
                    placeholder="+998 (--) --- -- --"
                    error={errors?.phones?.[index]?.phone?.message}
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
                        append({ type: `${MainPhone}`, phone: undefined })
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
                      onClick={() => {
                        remove(index);
                      }}
                      style={{
                        padding: "0 24px",
                        color: textColors.blueGray,
                        backgroundColor: bgColors.pale,
                      }}
                    />
                  </Grid>
                )}
              </Grid>
            );
          })}
          <Grid container>
            <MySelect
              control={control}
              name="source_id"
              label="Source"
              options={selects.leadSourceSelect}
              error={errors?.source_id?.message}
            />
          </Grid>
          <Grid container>
            <Input
              label="Comment"
              name="comment"
              type="textarea"
              control={control}
              placeholder="Type here"
              error={errors?.comment?.message}
              rows={6}
            />
          </Grid>
        </Content>
        <ErrorLabel error={errors?.phones?.message} />
        <ErrorLabel error={errors?.main_phone?.message} />
        {errors?.user_name && (
          <Alert>
            <div>
              <WarningSvg />
            </div>
            <div className="pt">
              <div>
                Student:
                <Link
                  className="underline"
                  href={`/student/${errors?.user_id?.message}`}
                >
                  {errors?.user_name?.message}
                </Link>{" "}
                is already registered with this number
              </div>
              {errors?.group_name && (
                <div>
                  Group:
                  <Link
                    className="underline"
                    href={`/groups/${errors?.group_id?.message}`}
                  >
                    {errors?.group_name?.message}
                  </Link>
                </div>
              )}
            </div>
          </Alert>
        )}
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
            buttonLoading={addLead.isLoading}
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};

export default AddLead;
