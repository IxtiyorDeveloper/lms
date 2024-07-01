import React, { FC, useEffect } from "react";
import Router, { useRouter } from "next/router";

import { Button } from "components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { UpdateReceptionSchema } from "validation/rbac";

import { useInitialData, useUpdateStaff } from "hooks";

import { CreateWrapper, BottomSide } from "./style";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { IDataGetOne } from "../../type";
import { validationErrorHandler, strOnlyNumbers } from "utils";

import {
  StaffDetails,
  PassportDetails,
  AddressDetails,
  PhoneDetails,
} from "./components";
import { MainPhone } from "constants/phoneTypes";
import moment from "moment";

const EditMember: FC<IDataGetOne> = ({ dataGetOne, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    getValues,
    clearErrors,
    watch,
  } = useForm<any>({
    defaultValues: {
      general: {
        phone_numbers: [{ type: undefined, phone_number: undefined }],
      },
      resolver: yupResolver(UpdateReceptionSchema),
    },
  });

  const { data: initialData } = useInitialData();

  const router = useRouter();

  const editAssignment = useUpdateStaff({
    onSuccess: () => {
      toast.success("Member edited!");
      Router.back();
    },
    onError: (error) => {
      validationErrorHandler({
        err: error,
        showToast: false,
        callBackSetError: (error: any) => {
          const customMessage = error?.message;
          const field = error.field;
          if (Array.isArray(customMessage)) {
            for (let i = 0; i < customMessage?.length; i++) {
              const message: {
                field: string;
                message: string;
              }[] = customMessage?.[i];
              for (let j = 0; j < message?.length; j++) {
                const current = message[j];
                setError(`${field}[${i}].${current?.field}` as any, {
                  message: current?.message as string,
                });
              }
            }
          } else {
            setError(field, {
              message: error.message,
            });
          }
        },
      });
    },
  });

  const onSubmit = (result: any) => {
    let phone_numbers: any[] = [];
    for (let i = 0; i < result?.phone_numbers?.length; i++) {
      const current = result?.phone_numbers[i];
      if (current?.phone_number && current?.type) {
        phone_numbers = [
          ...phone_numbers,
          {
            type: current.type,
            phone_number: current.phone_number as any,
            is_confirmed: !!current.is_confirmed as any,
            code: !isNaN(current.confirmation_id)
              ? (current.confirmation_id as any)
              : (null as any),
          },
        ];
      }
    }

    editAssignment.mutate({
      query_params: {
        id: router.query?.staffId,
        tab: "main_info",
      },
      body: {
        username: result?.username,
        passport_front_file_id:
          result?.passport_front_file_id?.file_storage_item_id ||
          result?.passport_front_file_id,
        passport_back_file_id:
          result?.passport_back_file_id?.file_storage_item_id ||
          result?.passport_back_file_id,
        passport_number: result?.passport_number,
        passport_given_date: result?.passport_given_date,
        passport_expire_date: result?.passport_expire_date,
        passport_given_by: result?.passport_given_by,
        dob: result?.dob,
        family_status: result?.family_status,
        nationality: result?.nationality,
        born_address: result?.born_address,
        official_address: result?.official_address,
        live_address: result?.live_address,
        citizenship: result?.citizenship,
        first_name: result?.firstname,
        shift_id: result?.shift_id,
        hired_date: moment(result?.hired_date).format("YYYY-MM-DD"),
        last_name: result?.lastname,
        avatar_file_id: result?.avatar_file_id?.id || result?.avatar_file_id,
        gender: result?.gender,
        password: result?.password,
        phone_numbers: [...phone_numbers],
        branch_type: result?.branch_type,
        branch_ids: result?.branch_ids,
      },
    });
  };

  useEffect(() => {
    if (dataGetOne) {
      setValue("avatar_file_id", dataGetOne?.userProfile?.avatar);
      setValue("firstname", dataGetOne?.userProfile?.firstname);
      setValue("lastname", dataGetOne?.userProfile?.lastname);
      setValue("username", dataGetOne?.username);
      setValue("hired_date", dataGetOne?.staff?.hired_date);
      setValue("branch_type", `${dataGetOne?.rbacAssignment?.branch_type}`);
      setValue("gender", dataGetOne?.userProfile?.gender);
      setValue(
        "phone_number",
        (dataGetOne.userPhones?.length || 0) > 0
          ? `+${strOnlyNumbers(dataGetOne?.userPhones?.[0] || "")}`
          : null,
      );
      setValue(
        "middlename",
        `${
          !!dataGetOne?.userProfile?.middlename
            ? dataGetOne?.userProfile?.middlename
            : ""
        }`,
      );
      setValue("password", null);
      setValue(
        "branch_ids",
        dataGetOne?.rbacAssignment?.rbacAssignmentBranches?.map(
          (item: any) => `${item.branch_id}`,
        ),
      );
    }

    setValue("passport_front_file_id", dataGetOne?.passportFront);
    setValue(
      "shift_id",
      dataGetOne?.rbacAssignment?.rbac_role_shift_id?.toString(),
    );
    setValue("passport_back_file_id", dataGetOne?.passportBack);
    setValue("passport_number", dataGetOne?.staff?.passport_number);
    setValue("citizenship", dataGetOne?.staff?.citizenship);
    setValue("passport_given_date", dataGetOne?.staff?.passport_given_date);
    setValue("passport_expire_date", dataGetOne?.staff?.passport_expire_date);
    setValue("passport_given_by", dataGetOne?.staff?.passport_given_by);
    setValue("born_address", dataGetOne?.staff?.born_address);
    setValue("official_address", dataGetOne?.staff?.official_address);
    setValue("family_status", dataGetOne?.staff?.family_status);
    setValue("dob", dataGetOne?.userProfile?.dob);
    setValue("nationality", "" + dataGetOne?.staff?.nation_id);
    setValue("gender", dataGetOne?.userProfile?.gender);
    setValue("live_address", dataGetOne?.staff?.live_address);
    setValue("phoneType", `${MainPhone}`);

    setValue(
      "phone_numbers",
      dataGetOne?.userPhones?.map((phone) => {
        return {
          ...phone,
          type: phone.type + "",
          is_confirmed: phone.is_confirmed,
          confirmation_id: !!phone.is_confirmed ? "random" : undefined,
          is_active: false,
          date: undefined,
          sms: undefined,
          time: Date.now(),
          phone_number: "+" + phone.phone_number,
        };
      }),
    );
    setValue(
      "phone_number",
      `+${
        dataGetOne?.userPhones?.filter((phone) => phone?.type === MainPhone)[0]
          ?.phone_number
      }`,
    );
    setValue(
      "userFamilies",
      dataGetOne?.userFamilies?.map((member) => {
        return {
          fio: member.fio,
          degree: `${member.degree}`,
          phone_number: `+${member.phone_number}`,
          position: member.position,
          work_place: member.work_place,
        };
      }),
    );
  }, [dataGetOne]);

  return (
    <Spin spinning={isLoading}>
      <CreateWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StaffDetails
            watch={watch}
            control={control}
            setValue={setValue}
            errors={errors}
            initialData={initialData}
            dataGetOne={dataGetOne}
          />
          <PassportDetails
            errors={errors}
            watch={watch}
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
            data={dataGetOne}
            initialData={initialData}
          />
          <AddressDetails
            initialData={initialData}
            control={control}
            setValue={setValue}
            errors={errors}
          />
          <PhoneDetails
            watch={watch}
            control={control}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            error={errors}
          />
          <BottomSide>
            <Button className="btn-secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" buttonLoading={editAssignment?.isLoading}>
              Save
            </Button>
          </BottomSide>
        </form>
      </CreateWrapper>
    </Spin>
  );
};
export default EditMember;
