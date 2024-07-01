import React, { FC, useEffect } from "react";
import { ButtonsWrapper, PlusWrapper, Wrapper } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import { FormWrapper, ItemWrapper } from "./style";
import { Button, Input, MySelect, PhoneNumberInput } from "components";
import { CirclePlusSvg, DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IStaffInitialData, IStaffViewPageInfoData } from "types/staffSettings";
import { useUpdateStaff } from "hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";
import { Spin } from "antd";
import { queryKeys } from "../../../../../../constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  data: IStaffViewPageInfoData | undefined;
  initialData: IStaffInitialData | undefined;
  isLoading: boolean;
}

const FamilyInfo: FC<IProps> = (props) => {
  const { data, initialData, isLoading } = props;
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  }: any = useForm();

  const editAssignment = useUpdateStaff({
    onSuccess: () => {
      toast.success("Member edited");
      queryClient.invalidateQueries({ queryKey: [queryKeys.assignment_one] });
      // Router.back();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        showToast: false,
        callBackSetError: (err: any) => {
          const custom = err?.message;
          for (let i = 0; i < custom?.length; i++) {
            const message: { field: string; message: string }[] = custom?.[i];
            for (let j = 0; j < message?.length; j++) {
              const current = message[j];
              setError(`userFamilies[${i}].${current?.field}` as any, {
                message: current?.message as string,
              });
            }
          }
        },
      });
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "userFamilies",
  });
  const router = useRouter();

  const onSubmit = (result: any) => {
    editAssignment.mutate({
      query_params: {
        id: router.query?.staffId,
        tab: "family",
      },
      body: {
        family_members: result?.userFamilies,
      },
    });
  };

  useEffect(() => {
    if (!!data?.userFamilies)
      for (let i = 0; i < data?.userFamilies?.length; i++) {
        const member = data?.userFamilies?.[i];
        update(i, {
          fio: member.fio,
          degree: member.degree,
          phone_number: `+${member.phone_number}`,
          position: member.position,
          work_place: member.work_place,
        });
      }
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields?.map((item, index) => {
          return (
            <Wrapper>
              <FormWrapper>
                {index === 0 ? (
                  <PlusWrapper
                    onClick={() =>
                      append({
                        degree: undefined,
                        fio: "",
                        work_place: "",
                        position: "",
                        phone_number: "",
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
                    name={`userFamilies[${index}].degree`}
                    control={control}
                    placeholder="Select"
                    label="Member degree"
                    options={initialData?.familyMemberList}
                    error={errors?.userFamilies?.[index]?.degree?.message}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <Input
                    name={`userFamilies[${index}].fio`}
                    control={control}
                    placeholder="Type here..."
                    label="FIO"
                    error={errors?.userFamilies?.[index]?.fio?.message}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <Input
                    name={`userFamilies[${index}].work_place`}
                    control={control}
                    placeholder="Type here..."
                    label="Place of work"
                    error={errors?.userFamilies?.[index]?.work_place?.message}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <Input
                    name={`userFamilies[${index}].position`}
                    control={control}
                    placeholder="Type here..."
                    label="Position"
                    error={errors?.userFamilies?.[index]?.position?.message}
                  />
                </ItemWrapper>
                <ItemWrapper>
                  <PhoneNumberInput
                    name={`userFamilies[${index}].phone_number`}
                    control={control}
                    placeholder="+998 (--) --- -- --"
                    label="Phone number"
                    error={errors?.userFamilies?.[index]?.phone_number?.message}
                  />
                </ItemWrapper>
              </FormWrapper>
            </Wrapper>
          );
        })}
        <ButtonsWrapper>
          <Button className="btn-secondary">Cancel</Button>
          <Button type="submit" buttonLoading={editAssignment?.isLoading}>
            Save
          </Button>
        </ButtonsWrapper>
      </form>
    </Spin>
  );
};

export default FamilyInfo;
