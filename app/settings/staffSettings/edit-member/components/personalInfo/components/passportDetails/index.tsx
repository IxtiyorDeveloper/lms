import React, { FC } from "react";
import { Flex, FormWrapper, ItemWrapper, Title, Wrapper } from "./style";
import { DatePicker, Input, MySelect, UploadImage } from "components";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { IStaffInitialData, IStaffViewPageInfoData } from "types/staffSettings";

interface IProps {
  control: any;
  setValue: UseFormSetValue<any>;
  data?: IStaffViewPageInfoData;
  clearErrors?: any;
  watch: UseFormWatch<any>;
  initialData?: IStaffInitialData | undefined;
  errors: any;
}

const PassportDetails: FC<IProps> = (props) => {
  const { initialData, control, setValue, watch, errors, clearErrors } = props;

  return (
    <Wrapper>
      <Title>Passport details</Title>
      <Flex>
        <ItemWrapper>
          <UploadImage
            frontDelete
            name="passport_front_file_id"
            control={control}
            height="120px"
            clearError={clearErrors}
            filename={
              watch()?.passport_front_file_id?.fileStorageItem?.filename
            }
            image={watch()?.passport_front_file_id?.fileStorageItem?.full_url}
            setValue={setValue}
            accept={{
              "image/*": [],
              "application/pdf": [".pdf"],
            }}
            text="Passport / ID Card Front"
            error={(errors.general as any)?.passport_front_file_id?.message}
          />
        </ItemWrapper>
        <ItemWrapper>
          <UploadImage
            frontDelete
            name="passport_back_file_id"
            control={control}
            height="120px"
            clearError={clearErrors}
            filename={watch()?.passport_back_file_id?.fileStorageItem?.filename}
            image={watch()?.passport_back_file_id?.fileStorageItem?.full_url}
            setValue={setValue}
            accept={{
              "image/*": [],
              "application/pdf": [".pdf"],
            }}
            text="Passport / ID Card Back"
            error={(errors as any)?.passport_back_file_id?.message}
          />
        </ItemWrapper>
      </Flex>
      <FormWrapper>
        <ItemWrapper>
          <Input
            name="passport_number"
            control={control}
            placeholder="Type here..."
            label="Passport / ID Card number"
            error={(errors as any)?.passport_number?.message}
          />
        </ItemWrapper>
        <ItemWrapper>
          <MySelect
            name="citizenship"
            control={control}
            placeholder="Select"
            label="Citizenship"
            options={initialData?.citizenList}
            error={(errors as any)?.citizenship?.message}
          />
        </ItemWrapper>
        <ItemWrapper>
          <DatePicker
            name="passport_given_date"
            control={control}
            placeholder="Select date"
            label="Passport / ID Card given date"
            error={(errors as any)?.passport_given_date?.message}
          />
        </ItemWrapper>
        <ItemWrapper>
          <DatePicker
            name="passport_expire_date"
            control={control}
            placeholder="Select date"
            label="Passport / ID Card expire"
            error={(errors as any)?.passport_expire_date?.message}
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            name="passport_given_by"
            control={control}
            placeholder="Type here..."
            label="Passport / ID Card given by"
            error={(errors as any)?.passport_given_by?.message}
          />
        </ItemWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default PassportDetails;
