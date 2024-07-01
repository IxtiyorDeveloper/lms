import { CreateStudentWrapper, Divider } from "./style";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Button,
  FemaleSvg,
  Input,
  MaleSvg,
  MySelect,
  Gender,
  UploadImage,
  BanUserSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import CreateStudentPhoneNumber from "./components/phoneNumber";
import { DatePickerAnt } from "components";
import { Label } from "components/common/input/style";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { DATE_FORMAT_STANDARD } from "constants/dates";
import {
  useBackToWaiting,
  useDeleteStudentAvatar,
  useGetOneStudent,
  usePageDataMemo,
  useSaveStudent,
  useUpdateStudent,
} from "hooks";
import { AddStudentSchema } from "validation";
import { TCreateStudent } from "types";
import { STUDYING_STUDENT } from "constants/studentStatuses";
import { useSetUpdate } from "./components/hooks";
import { useWatchAll } from "./components/hooks/useWatchAll";
import { onSubmit } from "./components/common";
import { MainPhone } from "constants/phoneTypes";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import lodash from "lodash";
import SourceSelect from "./components/sourceSelect";
import GroupLevelSelect from "./components/groupLevel";
import BranchSelect from "./components/branchSelect";
import DaySelect from "./components/daySelect";
import TimeSelect from "./components/timeSelect";
import AdditionalPreferences from "./components/additionalPreferences";
import GroupMatches from "./components/groupMatches";

const CreateStudent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const id = router.query?.id;

  const {
    isInitialLoading: isLoading,
    isPreviousData,
    data,
  } = useGetOneStudent(router.query);

  const [is_ban, setIsBan] = useState(0);
  const [levelIdWatch, setLevelIdWatch] = useState<any>();
  // const defaultBranchId = useSelector((state: IStore) => {
  //   let a = state.user?.user?.defaultBranches;
  //   return a && a?.length > 0 ? a[0] : null;
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    register,
    setValue,
    setError,
    getValues,
    clearErrors,
  } = useForm<{
    root: TCreateStudent;
  }>({
    defaultValues: {
      root: {
        // ...((defaultBranchId
        //   ? {
        //       branch_id: defaultBranchId,
        //     }
        //   : {}) as any),
        phones: !id
          ? [
              {
                type: MainPhone.toString(),
                phone_number: undefined,
                is_confirmed: false,
                is_finished: false,
                confirmation_id: undefined,
                is_active: false,
                date: undefined,
                sms: undefined,
                time: Date.now(),
              },
            ]
          : [],
      },
    },
    resolver: yupResolver(AddStudentSchema),
  });
  const selects = usePageDataMemo();
  const saveUser = useSaveStudent({
    onSuccess: async (data) => {
      toast.success("Student created!");
      await router.push({
        pathname:
          is_ban || data?.type == STUDYING_STUDENT
            ? "/student/banned-students"
            : `/student/recommendation/${data.user_id}`,
      });
    },
    onError: async (e) => {
      if (e.status === 422) {
        const validationErrors = e.data.client_error.errors as any[];
        let text = "";
        validationErrors.map((err, index) => {
          text += `${err.message}\n`;
          // @ts-ignore
          setError(`root.${err.field}`, { message: err.message });
        });
        toast.error(text);
      }
    },
  });
  const backToWaiting = useBackToWaiting({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries([queryKeys.waiting_list]);
      queryClient.invalidateQueries([queryKeys.admin_student_list]);

      router.push("/student/waiting-list");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const updateUser = useUpdateStudent({
    onSuccess: async (data) => {
      toast.success("Student updated!");
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.get_one_student],
      });
      if (router.query?.back_to_waiting_list === "true") {
        backToWaiting.mutate({
          query_params: {
            id,
          },
        });
      } else {
        data?.is_ban == 1
          ? await router.push({
              pathname: "/student/banned-students",
            })
          : router.back();
      }
    },
    onError: async (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: "root",
      });
    },
  });
  useSetUpdate({ setValue, isLoading, data, router });

  useWatchAll({
    watch,
    clearErrors,
    setLevelIdWatch,
    setValue,
    selects,
    setError,
  });

  useEffect(() => {
    if (router.query.type !== "update" && selects.course?.length === 1) {
      setValue("root.course_id", selects.course[0].value as any);
    }
  }, [selects.course?.length]);

  const save = (isBan?: any) =>
    onSubmit({ saveUser, is_ban, isBan, updateUser, router, getValues });

  const deleteStudentAvatar = useDeleteStudentAvatar({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onClear = ({
    field,
    path,
    setUrl,
  }: {
    field: ControllerRenderProps<FieldValues, string>;
    path?: string;
    setUrl?: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  }) => {
    field.onChange("");
    setUrl?.("");
    deleteStudentAvatar.mutate({
      query_params: {
        user_id: id,
      },
    });
  };

  return (
    <CreateStudentWrapper mx="40px" py="60px" bgcolor="red" px="40px">
      <Spin spinning={isPreviousData || isLoading}>
        <form onSubmit={handleSubmit(save)}>
          <Label className="main-title">Personal details</Label>
          <div className="flex-container">
            <div className="">
              <UploadImage
                control={control}
                name="root.avtar_file_id"
                error={errors?.root?.avtar_file_id?.message}
                setValue={setValue}
                image={data?.user?.userProfile?.avatar?.full_url}
                onClear={({ path, field, setUrl }) =>
                  onClear({ path, field, setUrl })
                }
                isCircle
              />
            </div>
            <div className="w-100 flex" style={{ flexDirection: "column" }}>
              <div className="flex">
                <Input
                  label="First name"
                  placeholder="John"
                  name="root.first_name"
                  control={control}
                  error={errors?.root?.first_name?.message}
                  autoComplete="off"
                  onlyText
                />
                <Input
                  label="Last name"
                  placeholder="Smith"
                  name="root.last_name"
                  control={control}
                  error={errors?.root?.last_name?.message}
                  autoComplete="off"
                  onlyText
                />
              </div>
              <div className="flex">
                <div
                  className="w-100"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Label required={true}>Gender</Label>
                  <div className="flex">
                    <Gender
                      label="Male"
                      value={1}
                      name="root.gender"
                      control={control}
                      icon={(checked) => (
                        <MaleSvg
                          color={
                            checked ? bgColors.black : bgColors.brotherBlue
                          }
                        />
                      )}
                      error={errors?.root?.gender?.message}
                      checkedColor={bgColors.primary}
                    />
                    <Gender
                      label="Female"
                      value={0}
                      name="root.gender"
                      control={control}
                      icon={(checked) => (
                        <FemaleSvg
                          color={
                            checked ? bgColors.black : bgColors.brotherBlue
                          }
                        />
                      )}
                      error={errors?.root?.gender?.message}
                      checkedColor={bgColors.primary}
                    />
                  </div>
                </div>
                <DatePickerAnt
                  control={control}
                  name="root.dob"
                  label="Day of birth"
                  error={errors?.root?.dob?.message}
                  format={DATE_FORMAT_STANDARD}
                  placeholder="31-12-2000"
                  stepBySelect
                />
              </div>
              <div className="lang">
                <MySelect
                  label="Native language"
                  name="root.locale"
                  control={control}
                  options={selects.lang}
                  error={errors?.root?.locale?.message}
                  showSearch={false}
                  isSelectAll={false}
                />
              </div>
            </div>
          </div>
          <Divider style={{ margin: "20px 0" }} />
          <SourceSelect
            control={control}
            name="root.source_id"
            data={selects.source as any[]}
            error={errors?.root?.source_id?.message}
            size="small"
          />
          <div className="phone-title">
            <Label className="main-title">Phone numbers</Label>
          </div>
          <CreateStudentPhoneNumber
            control={control}
            error={errors}
            options={selects.phone as any[]}
            register={register}
            watch={watch}
            setValue={setValue}
            setError={setError}
            getValues={getValues}
            clearError={clearErrors}
            balance={
              lodash.sumBy(
                data?.dividedBalance?.green,
                (e) => e.actual_balance,
              ) +
              lodash.sumBy(
                data?.dividedBalance?.yellow,
                (e) => e.actual_balance,
              )
            }
          />
          <div className="strick-container">
            <div>
              <div className="title">General preferences</div>
            </div>
            <GroupLevelSelect
              selects={selects}
              control={control}
              errors={errors}
              levelIdWatch={levelIdWatch}
              watch={watch}
            />
            <BranchSelect
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
            <div className="flex w-100">
              <DaySelect
                selects={selects}
                control={control}
                errors={errors}
                levelIdWatch={levelIdWatch}
                watch={watch}
              />
              <TimeSelect
                selects={selects}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            </div>
          </div>
          <AdditionalPreferences
            control={control}
            setValue={setValue}
            watch={watch}
          />
          <div className="mt">
            <Input
              name="root.note"
              label="Comment"
              control={control}
              type="textarea"
              rows={4}
              error={
                errors?.root?.note?.message || (errors as any)?.locale?.message
              }
              placeholder="Type here..."
            />
          </div>
          <GroupMatches watch={watch} />

          <div className="flex buttons">
            {router.query.back_to_waiting_list !== "true" ? (
              <Button
                icon={<BanUserSvg color={bgColors.white} />}
                style={{
                  backgroundColor: bgColors.pop,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84",
                  color: bgColors.white,
                  borderRadius: "10px",
                }}
                onClick={() => {
                  setIsBan(1);
                  // setTimeout(() => , 1000);
                  save(1);
                }}
                buttonLoading={
                  is_ban === 1 && (saveUser?.isLoading || updateUser?.isLoading)
                }
              >
                <span className="bannedText" style={{ marginLeft: "4px" }}>
                  Ban Student
                </span>
              </Button>
            ) : (
              <div></div>
            )}
            <div style={{ display: "flex" }}>
              <Button
                bgColor={bgColors.yukon}
                textColor={textColors.yourShadow}
                args={{
                  sx: {
                    textTransform: "none",
                    width: "100%",
                    height: "100%",
                    padding: "0 25px",
                  },
                }}
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                bgColor={bgColors.primary}
                style={{
                  height: "100%",
                  marginLeft: "14px",
                }}
                buttonLoading={
                  is_ban === 0 && (saveUser?.isLoading || updateUser?.isLoading)
                }
                args={{
                  sx: {
                    textTransform: "none",
                    width: "100%",
                    padding: "0 25px",
                    height: "100%",
                  },
                }}
                type="submit"
                onClick={() => setIsBan(0)}
              >
                {router.query.type === "update" ? "Save" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      </Spin>
    </CreateStudentWrapper>
  );
};

export default CreateStudent;
