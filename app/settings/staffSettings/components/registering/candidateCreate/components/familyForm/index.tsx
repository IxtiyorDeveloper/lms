import React, { FC } from "react";
import { Text } from "../../style";
import { Control } from "react-hook-form";
import { ItemWrapper, Wrapper } from "./style";
import { MySelect } from "components";
import FamilyFormItem from "./form";
import { IStaffInitialData } from "types/staffSettings";
import ErrorLabel from "components/common/input/errorLabel";

interface IProps {
  control: Control<any>;
  initialData?: IStaffInitialData;
  errors?: any;
}

const FamilyForm: FC<IProps> = (props) => {
  const { control, initialData, errors } = props;

  return (
    <Wrapper>
      <Text>Family</Text>
      <ItemWrapper>
        <MySelect
          error={errors?.family_status?.message}
          name="family_status"
          control={control}
          placeholder="Select"
          options={initialData?.familyStatusList}
          label="Family status"
        />
      </ItemWrapper>
      <FamilyFormItem
        initialData={initialData}
        control={control}
        errors={errors}
      />
    </Wrapper>
  );
};

export default FamilyForm;
