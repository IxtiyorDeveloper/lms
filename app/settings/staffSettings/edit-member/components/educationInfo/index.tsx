import React, { FC, useEffect } from "react";
import { ButtonsWrapper, PlusWrapper, Wrapper } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import { FormWrapper, ItemWrapper } from "./style";
import { Button, DatePicker, Input, MySelect } from "components";
import { CirclePlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { DeleteSvg } from "components";
import { IDataGetOne } from "../../type";
import { useInitialData, useUpdateStaff } from "hooks";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../../../../constants/queryKeys";

const EducationInfo: FC<IDataGetOne> = (props) => {
  const { dataGetOne } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: initialData } = useInitialData();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  }: any = useForm({
    defaultValues: {
      educations: [] as any,
    },
  });

  const editEducation = useUpdateStaff({
    onSuccess: () => {
      toast.success("Member edited");
      queryClient.invalidateQueries({ queryKey: [queryKeys.assignment_one] });
      Router.back();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        callBackSetError: (err) => {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  useEffect(() => {
    setValue("educations", dataGetOne?.userEducations as any);
  }, [dataGetOne]);

  const onSubmit = (result: any) => {
    editEducation.mutate({
      query_params: {
        id: router.query.staffId,
        tab: "education",
      },
      body: result,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields?.length === 0 && (
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={() =>
              append({
                degree: undefined,
                name: undefined,
                speciality: undefined,
                enter_date: undefined,
                graduate_date: undefined,
              })
            }
          >
            +
          </Button>
        </div>
      )}
      {fields?.map((item, index) => {
        return (
          <Wrapper key={item?.id}>
            <FormWrapper>
              {index === 0 ? (
                <PlusWrapper
                  onClick={() =>
                    append({
                      degree: undefined,
                      name: undefined,
                      speciality: undefined,
                      enter_date: undefined,
                      graduate_date: undefined,
                    })
                  }
                >
                  <CirclePlusSvg height={24} width={24} />
                </PlusWrapper>
              ) : (
                <PlusWrapper onClick={() => remove(index)}>
                  <DeleteSvg width={24} height={24} />
                </PlusWrapper>
              )}
              <ItemWrapper>
                <MySelect
                  name={`educations[${index}].degree`}
                  control={control}
                  placeholder="Select"
                  label="Degree"
                  options={initialData?.educationPlaceList}
                  error={errors?.educations?.[index]?.degree?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <Input
                  name={`educations[${index}].name`}
                  control={control}
                  placeholder="Type here..."
                  label="Name educational insitution"
                  error={errors?.educations?.[index]?.name?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <Input
                  name={`educations[${index}].speciality`}
                  control={control}
                  placeholder="Type here..."
                  label="Speciality"
                  error={errors?.educations?.[index]?.speciality?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`educations[${index}].enter_date`}
                  control={control}
                  placeholder="Select date"
                  label="Enter date"
                  error={errors?.educations?.[index]?.enter_date?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`educations[${index}].graduate_date`}
                  control={control}
                  placeholder="Graduate date"
                  label="Graduate date"
                  error={errors?.educations?.[index]?.graduate_date?.message}
                />
              </ItemWrapper>
            </FormWrapper>
          </Wrapper>
        );
      })}
      <ButtonsWrapper>
        <Button className="btn-secondary">Cancel</Button>
        <Button type="submit" buttonLoading={editEducation.isLoading}>
          Save
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

export default EducationInfo;
