import React, { FC } from "react";
import { Flex, InputsWrapper, ItemWrapper, Text } from "../../style";
import { DatePicker, Input, MySelect, UploadImage } from "components";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { PassportDetails } from "./style";
import { IStaffInitialData, IStaffViewPageInfoData } from "types/staffSettings";

interface IProps {
  control: Control<any>;
  setValue: any;
  initialData?: IStaffInitialData;
  watch: UseFormWatch<any>;
  errors: any;
  clearErrors: any;
  dataOneStaff: IStaffViewPageInfoData | undefined;
}

const PassportForm: FC<IProps> = (props) => {
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
    <PassportDetails>
      <div>
        <Text>Passport details</Text>
        <Flex>
          <ItemWrapper>
            <UploadImage
              error={errors?.passport_front_file_id?.message}
              height="200px"
              frontDelete
              clearError={clearErrors}
              name="passport_front_file_id"
              image={dataOneStaff?.passportFront?.fileStorageItem?.full_url}
              filename={dataOneStaff?.passportFront?.fileStorageItem?.name}
              control={control}
              setValue={(param1: any, param2: any) => {
                setValue(param1, param2);
                clearErrors("passport_front_file_id");
              }}
              watch={watch}
              text="Passport / ID Card Front"
            />
          </ItemWrapper>
          <ItemWrapper>
            <UploadImage
              error={errors?.passport_back_file_id?.message}
              height="200px"
              frontDelete
              clearError={clearErrors}
              name="passport_back_file_id"
              image={dataOneStaff?.passportBack?.fileStorageItem?.full_url}
              filename={dataOneStaff?.passportBack?.fileStorageItem?.name}
              control={control}
              setValue={(param1: any, param2: any) => {
                setValue(param1, param2);
                clearErrors("passport_back_file_id");
              }}
              watch={watch}
              text="Passport / ID Card Back"
            />
          </ItemWrapper>
        </Flex>
        <InputsWrapper>
          <Flex>
            <ItemWrapper>
              <Input
                name="passport_number"
                error={errors?.passport_number?.message}
                control={control}
                placeholder="Type here..."
                label="Passport / ID Card number"
              />
            </ItemWrapper>
            <ItemWrapper>
              <MySelect
                name="citizenship"
                control={control}
                options={initialData?.citizenList}
                placeholder="Select"
                error={errors?.citizenship?.message}
                label="Citizenship"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <DatePicker
                name="passport_given_date"
                error={errors?.passport_given_date?.message}
                control={control}
                placeholder="Select date"
                label="Passport / ID Card given date"
              />
            </ItemWrapper>
            <ItemWrapper>
              <DatePicker
                name="passport_expire_date"
                control={control}
                error={errors?.passport_expire_date?.message}
                placeholder="Select date"
                label="Passport / ID Card expire"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <Input
                name="passport_given_by"
                error={errors?.passport_given_by?.message}
                control={control}
                placeholder="Type here..."
                label="Passport / ID Card given by"
              />
            </ItemWrapper>
          </Flex>
        </InputsWrapper>
      </div>
    </PassportDetails>
  );
};

export default PassportForm;
