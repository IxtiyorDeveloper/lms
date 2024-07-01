import React, { FC, useEffect } from "react";
import { ButtonsWrapper, PlusWrapper, Wrapper } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import { FormWrapper, ItemWrapper } from "./style";
import { Button, DatePicker, Input, MySelect } from "components";
import { CirclePlusSvg, DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IDataGetOne } from "../../type";
import { useUpdateStaff } from "hooks";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import { queryKeys } from "../../../../../../constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

const ExperienceInfo: FC<IDataGetOne> = (props) => {
  const { dataGetOne } = props;
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  }: any = useForm({
    defaultValues: {
      work_experience: [] as any,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

  const editExperience = useUpdateStaff({
    onSuccess: () => {
      toast.success("Member edited");
      queryClient.invalidateQueries({ queryKey: [queryKeys.assignment_one] });
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

  const onSubmit = (result: any) => {
    editExperience.mutate({
      query_params: {
        id: router.query.staffId,
        tab: "work_experience",
      },
      body: {
        work_experiences: result?.work_experience,
      },
    });
  };

  useEffect(() => {
    setValue("work_experience", dataGetOne?.userExperiences as any);
  }, [dataGetOne]);

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
                organization_name: undefined,
                position: undefined,
                start_date: undefined,
                end_date: undefined,
              })
            }
          >
            +
          </Button>
        </div>
      )}
      {fields?.map((item, index) => {
        return (
          <Wrapper>
            <FormWrapper>
              {index === 0 ? (
                <PlusWrapper
                  onClick={() =>
                    append({
                      organization_name: undefined,
                      position: undefined,
                      start_date: undefined,
                      end_date: undefined,
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
                <Input
                  name={`work_experience[${index}].organization_name`}
                  control={control}
                  placeholder="Select"
                  label="Name of organization"
                  error={
                    errors?.work_experience?.[index]?.organization_name?.message
                  }
                />
              </ItemWrapper>
              <ItemWrapper>
                <Input
                  name={`work_experience[${index}].position`}
                  control={control}
                  placeholder="Type here..."
                  label="Position"
                  error={errors?.work_experience?.[index]?.position?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`work_experience[${index}].start_date`}
                  control={control}
                  placeholder="Select date"
                  label="Start date"
                  error={errors?.work_experience?.[index]?.start_date?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`work_experience[${index}].end_date`}
                  control={control}
                  placeholder="Select date"
                  label="End"
                  error={errors?.work_experience?.[index]?.end_date?.message}
                />
              </ItemWrapper>
            </FormWrapper>
          </Wrapper>
        );
      })}
      <ButtonsWrapper>
        <Button className="btn-secondary">Cancel</Button>
        <Button type="submit" buttonLoading={editExperience.isLoading}>
          Save
        </Button>
      </ButtonsWrapper>
    </form>
  );
};

export default ExperienceInfo;
