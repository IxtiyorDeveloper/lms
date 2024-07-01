import React, { FC } from "react";
import { Flex, InputsWrapper, ItemWrapper, Text } from "../../style";
import {
  DatePicker,
  FemaleSvg,
  Gender,
  Input,
  MaleSvg,
  MySelect,
  UploadImage,
} from "components";
import { bgColors } from "styles/theme";
import { Control, UseFormWatch } from "react-hook-form";
import { PDataInputs, PersonalData, UserAvatarSide, TextLabel } from "./style";
import { IStaffInitialData, IStaffViewPageInfoData } from "types/staffSettings";
import ErrorLabel from "components/common/input/errorLabel";

interface IProps {
  control: Control<any>;
  setValue: any;
  initialData?: IStaffInitialData;
  watch: UseFormWatch<any>;
  errors: any;
  clearErrors: any;
  dataOneStaff: IStaffViewPageInfoData | undefined;
}

const PersonalInfoForm: FC<IProps> = (props) => {
  const {
    dataOneStaff,
    control,
    setValue,
    initialData,
    watch,
    errors,
    clearErrors,
  } = props;

  return (
    <PersonalData>
      <Text>Personal data</Text>
      <PDataInputs>
        <UserAvatarSide>
          <UploadImage
            height="200px"
            clearError={clearErrors}
            name="avatar_file_id"
            image={dataOneStaff?.userProfile.avatar?.full_url}
            control={control}
            setValue={(param1: any, param2: any) => {
              setValue(param1, param2);
              clearErrors("avatar_file_id");
            }}
            frontDelete
            watch={watch}
            error={errors?.avatar_file_id?.message}
          />
        </UserAvatarSide>
        <InputsWrapper>
          <Flex>
            <ItemWrapper>
              <Input
                name="firstName"
                control={control}
                placeholder="Type here..."
                label="First name"
                error={errors?.firstName?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name="lastName"
                control={control}
                placeholder="Type here..."
                label="Last name"
                error={errors?.lastName?.message}
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <Input
                name="secondName"
                control={control}
                placeholder="Type here..."
                label="Second name"
                error={errors?.secondName?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker
                name="dob"
                control={control}
                label="Date of birth"
                error={errors?.dob?.message}
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper className="gender">
              <div>
                <TextLabel>Gender</TextLabel>
                <Gender
                  label="Male"
                  value={1}
                  name="gender"
                  control={control}
                  error={errors?.gender?.message}
                  icon={(checked) => (
                    <MaleSvg
                      color={checked ? bgColors.black : bgColors.brotherBlue}
                    />
                  )}
                  checkedColor={bgColors.primary}
                />
              </div>
              <div>
                <Gender
                  label="Female"
                  value={0}
                  name="gender"
                  control={control}
                  icon={(checked) => (
                    <FemaleSvg
                      color={checked ? bgColors.black : bgColors.brotherBlue}
                    />
                  )}
                  checkedColor={bgColors.primary}
                  error={errors?.gender?.message}
                />
              </div>
            </ItemWrapper>
            <ItemWrapper>
              <MySelect
                name="nationality"
                control={control}
                placeholder="Select..."
                label="Nationality"
                error={errors?.nationality?.message}
                options={initialData?.nationList as any}
              />
            </ItemWrapper>
          </Flex>
        </InputsWrapper>
      </PDataInputs>
    </PersonalData>
  );
};

export default PersonalInfoForm;
