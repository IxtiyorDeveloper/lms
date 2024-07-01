import { Input, MySelect } from "components";
import React, { useMemo } from "react";
import { TakeBonusUserType } from "../type";
import { InitialDataHR } from "types";
import { useGetHRInitialData } from "hooks";

const BonusForm = ({
  control,
  watch,
  initialData,
  setValue,
  disabled,
}: {
  control: any;
  watch: any;
  initialData: InitialDataHR | undefined;
  setValue: any;
  disabled?: boolean;
}) => {
  const { data: staffList, isLoading } = useGetHRInitialData({
    enabled: watch("root.bonus_for_type") === TakeBonusUserType.STAFF,
    query_params: {
      expand: "staffList",
    },
  });

  const staffOptions = useMemo(() => {
    return staffList?.staffList?.map((staff) => {
      const profile = staff.userProfile;
      return {
        label: `${profile?.firstname} ${profile?.lastname}`,
        value: staff.id,
      };
    });
  }, [staffList]);

  return (
    <>
      <MySelect
        control={control}
        name="root.bonus_for_type"
        label="Bonus user type"
        placeholder="Bonus user type"
        options={initialData?.bonusForTypeList}
        disabled={disabled}
        onChange={(e) => {
          setValue("root.bonus_for_type", e);
          setValue("root.bonus_for", undefined);
          setValue("root.bonus_for_id", undefined);
        }}
      />
      {TakeBonusUserType.OTHER === watch("root.bonus_for_type") && (
        <Input
          control={control}
          type="textarea"
          name="root.bonus_for"
          label="Bonus for"
          placeholder="Type bonus for"
          disabled={disabled}
        />
      )}
      {TakeBonusUserType.STAFF === watch("root.bonus_for_type") && (
        <MySelect
          control={control}
          name="root.bonus_for_id"
          label="Bonus for"
          placeholder="Bonus"
          options={staffOptions}
          loading={isLoading}
          disabled={disabled}
        />
      )}
    </>
  );
};

export default BonusForm;
