import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetOneAssignment, useInitialData, useUpdateStaff } from "hooks";
import { Wrapper } from "./style";
import Router, { useRouter } from "next/router";
import {
  AddressForm,
  Buttons,
  EducationForm,
  ExperienceForm,
  FamilyForm,
  FormTopSide,
  GenerateDetailsModal,
  IELTSForm,
  PassportForm,
  PersonalForm,
  PhonesForm,
} from "./components";
import { defaultValues } from "./defaultValue";
import { MainPhone } from "constants/phoneTypes";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { setValues } from "./utils/setValues";

const CandidateCreate = () => {
  const router = useRouter();

  const {
    control,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: defaultValues,
  });

  const editAssignment = useUpdateStaff({
    onSuccess: () => {
      toast.success("Member edited");
      Router.back();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        callBackSetError: (err: any) => {
          const custom = err?.message;
          const field = err.field;
          if (Array.isArray(custom)) {
            for (let i = 0; i < custom?.length; i++) {
              const message: { field: string; message: string }[] = custom?.[i];
              for (let j = 0; j < message?.length; j++) {
                const current = message[j];
                setError(`${field}[${i}].${current?.field}` as any, {
                  message: current?.message as string,
                });
              }
            }
          } else {
            setError(field, {
              message: err.message,
            });
            // toast.error(err?.message);
          }
        },
      });
    },
  });

  const { data: dataOneStaff, isLoading } = useGetOneAssignment({
    id: router.query.userId,
  });

  const { data: initialData, isLoading: initialDataLoading } = useInitialData();

  const onSubmit = (res: any) => {
    const edus = res?.educations?.map((education: any) => {
      return {
        name: education?.name,
        speciality: education?.speciality,
        enter_date: education?.enterDate,
        graduate_date: education?.finishDate,
        degree: education?.degree,
      };
    });

    const data = {
      passport_front_file_id: res?.passport_front_file_id,
      passport_back_file_id: res?.passport_back_file_id,
      username: res?.username,
      passport_number: res?.passport_number,
      passport_given_date: res?.passport_given_date,
      passport_expire_date: res?.passport_expire_date,
      passport_given_by: res?.passport_given_by,
      born_address: res?.born_address,
      official_address: res?.official_address,
      live_address: res?.live_address,
      citizenship: res?.citizenship,
      first_name: res?.firstName,
      last_name: res?.lastName,
      avatar_file_id: res?.avatar_file_id,
      gender: res?.gender,
      dob: res?.dob,
      nationality: res?.nationality,
      main_phone_number: res?.phoneNumber,
      ielts_file_id: res?.ielts_file_id,
      ielts_score: res?.ielts_score,
      phone_numbers: res?.phone_numbers?.map((phone: any) => {
        return {
          type: phone?.type,
          phone_number: phone?.phone_number?.replace("+", ""),
        };
      }),
      family_status: res?.family_status,
      family_members: res?.family_members?.map((member: any) => {
        return {
          degree: member?.degree,
          fio: member?.fio,
          work_place: member?.work_place,
          position: member?.position,
          phone_number: member?.phone_number,
        };
      }),
      educations: edus,
      work_experiences: res?.work_experiences?.map((experience: any) => {
        return {
          organization_name: experience?.organization_name,
          position: experience?.position,
          start_date: experience?.startDate,
          end_date: experience?.finishDate,
        };
      }),
    };

    editAssignment.mutate({
      query_params: {
        id: router.query?.userId,
        tab: "default",
      },
      body: data,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setValues({
        dataOneStaff,
        setValue,
      });
    }
  }, [dataOneStaff, initialData, isLoading]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const fields = ["family_members", "educations", "work_experiences"];
      const item = fields?.find((i) => name?.includes(i));
      if (type === "change" && item) {
        clearErrors(item as any);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Spin spinning={isLoading || initialDataLoading}>
        <FormTopSide dataOneStaff={dataOneStaff} />
        <PersonalForm
          watch={watch}
          control={control}
          setValue={setValue}
          initialData={initialData}
          dataOneStaff={dataOneStaff}
          errors={errors}
          clearErrors={clearErrors}
        />
        <PassportForm
          control={control}
          watch={watch}
          errors={errors}
          setValue={setValue}
          initialData={initialData}
          dataOneStaff={dataOneStaff}
          clearErrors={clearErrors}
        />
        <AddressForm
          control={control}
          initialData={initialData}
          errors={errors}
        />
        <PhonesForm control={control} errors={errors} />
        <IELTSForm
          control={control}
          setValue={setValue}
          watch={watch}
          dataOneStaff={dataOneStaff}
          errors={errors}
        />
        <EducationForm
          control={control}
          initialData={initialData}
          errors={errors}
        />
        <FamilyForm
          control={control}
          initialData={initialData}
          errors={errors}
        />
        <ExperienceForm control={control} errors={errors} />
        <Buttons isLoading={editAssignment.isLoading} />
        <GenerateDetailsModal />
      </Spin>
    </Wrapper>
  );
};
export default CandidateCreate;
