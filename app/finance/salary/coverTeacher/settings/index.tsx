import React, { useEffect } from "react";
import { Wrapper, Content } from "./style";
import { Button, ChevronLeftSvg, CourseTypeSvg, InputNumber } from "components";
import { useForm } from "react-hook-form";
import { useCoverTeacherSettings, useSaveDetailedConfig } from "hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { IShare } from "types/finance/salary";
import { useRouter } from "next/router";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const generateDynamicSchema = (shares: IShare[] | undefined) => {
  const schema: any = {};
  if (shares)
    for (let i = 0; i < shares?.length; i++) {
      const share = shares?.[i];
      schema[`due_${share?.groupType?.id}`] = yup
        .string()
        .nullable()
        .required("Due is a required field");
      schema[`reward_${share?.groupType?.id}`] = yup
        .string()
        .nullable()
        .required("Reward is a required field");
    }
  return yup.object().shape(schema);
};
const Settings = () => {
  const router = useRouter();
  const { data, isLoading, isPreviousData } = useCoverTeacherSettings();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(generateDynamicSchema(data?.shares)),
  });
  const queryClient = useQueryClient();

  const saveDetailedConfig = useSaveDetailedConfig({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.redList],
      });
      router.back();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onSubmit = (fieldValues: any) => {
    let array: {
      group_type_id: number;
      due_amount: number;
      reward_amount: number;
    }[] = [];
    data?.shares?.map((item) => {
      array = [
        ...array,
        {
          group_type_id: item?.groupType?.id,
          due_amount: -Number(fieldValues?.[`due_${item?.groupType?.id}`]),
          reward_amount: +fieldValues?.[`reward_${item?.groupType?.id}`],
        },
      ];
    });
    saveDetailedConfig.mutate({
      body: {
        shares: array,
      },
    });
  };
  const setFieldValues = () => {
    data?.shares?.map((item) => {
      setValue(
        `due_${item?.groupType?.id}`,
        Math.abs(item?.from?.due_amount || 0)
      );
      setValue(
        `reward_${item?.groupType?.id}`,
        +(item?.to?.reward_amount || 0)
      );
    });
  };
  useEffect(() => {
    if (data) {
      setFieldValues();
    }
  }, [data]);
  const handleCancel = () => {
    setFieldValues();
    clearErrors();
  };
  return (
    <Wrapper>
      <Spin spinning={isLoading || isPreviousData}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <div className="m-r">
              <p className="title">Settings</p>
              {data?.shares?.map((item, index) => {
                return (
                  <div className="share" key={index}>
                    <p className="r-t">{item?.groupType?.name}</p>
                    <div className="flex">
                      <div className="left">
                        <div className="box">
                          <p className="label">Teacher</p>
                          <InputNumber
                            name={`due_${item?.groupType?.id}`}
                            control={control}
                            suffix={<div className="suffix">UZS</div>}
                            className="currency"
                            prefix={<p className="minus">-</p>}
                            error={
                              errors?.[`due_${item?.groupType?.id}`]?.message
                            }
                          />
                        </div>
                      </div>
                      <div className="middle">
                        <div className="t-c">
                          <CourseTypeSvg width={40} height={40} />
                          <p className="one-lesson">One lesson</p>
                        </div>
                        <div className="arrow">
                          <div className="s-l">
                            <ChevronLeftSvg />
                          </div>
                          <div className="line" />
                          <div className="s-r">
                            <ChevronLeftSvg />
                          </div>
                        </div>
                      </div>
                      <div className="right">
                        <div className="box">
                          <p className="label">Cover Teacher</p>
                          <InputNumber
                            name={`reward_${item?.groupType?.id}`}
                            control={control}
                            suffix={<div className="suffix">UZS</div>}
                            className="currency"
                            prefix={<p className="plus">+</p>}
                            error={
                              errors?.[`reward_${item?.groupType?.id}`]?.message
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bottom">
              {/*<Button*/}
              {/*  className="cancel"*/}
              {/*  bgColor={bgColors.purpleCrystal}*/}
              {/*  onClick={() => handleCancel()}*/}
              {/*>*/}
              {/*  Cancel*/}
              {/*</Button>*/}
              <Button
                className="submit"
                type="submit"
                buttonLoading={saveDetailedConfig.isLoading}
              >
                Save
              </Button>
            </div>
          </Content>
        </form>
      </Spin>
    </Wrapper>
  );
};

export default Settings;
