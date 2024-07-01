import React, { FC } from "react";
import {
  Gender,
  Input,
  MySelect,
  RedBadgeTitle,
  UploadImage,
  FemaleSvg,
  MaleSvg,
  DatePicker,
} from "components";
import {
  CardWrapper,
  FlexWrapper,
  GridContainer,
  Flex,
  ItemWrapper,
  TextLabel,
} from "./style";
import { ALL_BRANCH, NO_BRANCH, WITH_BRANCH } from "constants/branch";
import { bgColors } from "styles/theme";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { usePageDataMemo } from "hooks";
import { IStaffInitialData, IStaffViewPageInfoData } from "types/staffSettings";
import { makeArrayOptions } from "utils/functions/makeArrayOptions";
import { funcCheckPermission } from "../../../../../../../../utils";
import { COMPONENTS_VIEWS } from "../../../../../../../../constants/permissions";

interface IProps {
  control: Control;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  errors: any;
  initialData?: IStaffInitialData;
  dataGetOne: IStaffViewPageInfoData | undefined;
}

const StaffDetails: FC<IProps> = (props) => {
  const { control, setValue, errors, watch, initialData, dataGetOne } = props;

  const selects = usePageDataMemo();

  return (
    <CardWrapper>
      <div className="title">
        <RedBadgeTitle title="Personal info" />
      </div>
      <FlexWrapper>
        <div className="image-wr">
          <UploadImage
            frontDelete
            name="avatar_file_id"
            image={watch()?.avatar_file_id?.full_url}
            height="240px"
            control={control}
            setValue={setValue}
            error={errors?.avatar_file_id?.message}
          />
        </div>
        <GridContainer>
          <div className="col">
            <Input
              name="firstname"
              control={control}
              placeholder="John"
              label="First name"
              error={errors?.firstname?.message}
            />
          </div>
          <div className="col">
            <Input
              name="lastname"
              control={control}
              placeholder="Doe"
              label="Last name"
              error={errors?.lastname?.message}
            />
          </div>
          <div className="col">
            <Input
              name="middlename"
              control={control}
              placeholder="Type here..."
              label="Second name"
              error={errors?.middlename?.message}
            />
          </div>
          <div className="col">
            <MySelect
              name="nationality"
              control={control}
              placeholder="Type here..."
              label="Nationality"
              options={initialData?.nationList as any}
              error={errors?.nationality?.message}
            />
          </div>
          <div className="col">
            <DatePicker
              name="dob"
              control={control}
              placeholder="Select date"
              label="Date of birth"
              error={errors?.dob?.message}
            />
          </div>
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
                />
              </div>
            </ItemWrapper>
          </Flex>
          <div className="col">
            <Input
              name="username"
              control={control}
              placeholder="john_doe"
              label="Username"
              error={errors?.username?.message}
              autoComplete="off"
            />
          </div>
          <div className="col">
            <Input
              name="password"
              type="password"
              control={control}
              style={{
                backgroundColor: `${bgColors.purpleCrystal} !important`,
              }}
              placeholder="Type here..."
              label="Password"
              error={errors?.password?.message}
              autoComplete="new-password"
            />
          </div>
          <div className="col">
            <MySelect
              name="branch_type"
              control={control}
              placeholder="No branch"
              label="Branch type"
              options={[
                { label: "No branch", value: `${NO_BRANCH}` },
                { label: "All branch", value: `${ALL_BRANCH}` },
                { label: "With branch", value: `${WITH_BRANCH}` },
              ]}
              error={errors?.branch_type?.message}
            />
          </div>
          <div className="col">
            <MySelect
              name="branch_ids"
              control={control}
              placeholder="C1"
              label="Branches"
              options={selects.branch}
              mode="multiple"
              error={errors?.branch_ids?.message}
            />
          </div>
          <div className="col">
            <MySelect
              name="family_status"
              control={control}
              placeholder="Select"
              label="Family status"
              options={initialData?.familyStatusList}
              error={errors?.family_status?.message}
            />
          </div>
          <div className="col">
            <MySelect
              name="shift_id"
              control={control}
              placeholder="Select"
              label="Shift"
              options={
                makeArrayOptions({
                  arr: initialData?.shifts?.filter(
                    (role) =>
                      +role.rbac_role_id ==
                      dataGetOne?.rbacAssignment?.rbac_role_id
                  ),
                  label: "name",
                  value: "id",
                }) as any
              }
              error={errors?.shift_id?.message}
            />
          </div>
          <div className="col">
            <DatePicker
              name="hired_date"
              control={control}
              disabled={
                !funcCheckPermission([COMPONENTS_VIEWS.can_change_hired_date])
              }
              placeholder="Select date"
              label="Hired date"
              error={errors?.hired_date?.message}
            />
          </div>
        </GridContainer>
      </FlexWrapper>
    </CardWrapper>
  );
};

export default StaffDetails;
