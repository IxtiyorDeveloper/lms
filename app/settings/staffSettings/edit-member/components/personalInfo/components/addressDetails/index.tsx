import React, { FC } from "react";
import { Flex, FormWrapper, ItemWrapper, Title, Wrapper } from "./style";
import { DatePicker, Input, MySelect, UploadImage } from "components";
import { UseFormSetValue } from "react-hook-form";

interface IProps {
  control: any;
  setValue: UseFormSetValue<any>;
  initialData?: any;
  errors: any;
}

const AddressDetails: FC<IProps> = (props) => {
  const { control, setValue, initialData, errors } = props;

  return (
    <Wrapper>
      <Title>Address</Title>
      <FormWrapper>
        <ItemWrapper>
          <MySelect
            name="born_address"
            control={control}
            placeholder="Type here..."
            options={initialData?.placeList}
            label="Born Address"
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            name="official_address"
            control={control}
            placeholder="Type here..."
            label="Official Address (bg registration)"
          />
        </ItemWrapper>
        <ItemWrapper>
          <Input
            name="live_address"
            control={control}
            placeholder="Type here..."
            label="Live Address (where do you live?)"
            error={(errors as any)?.live_address?.message}
          />
        </ItemWrapper>
      </FormWrapper>
    </Wrapper>
  );
};

export default AddressDetails;
