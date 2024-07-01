import React, { FC } from "react";
import { Flex, InputsWrapper, ItemWrapper, Text } from "../../style";
import { Input, MySelect } from "components";
import { Control } from "react-hook-form";
import { AddressDetails } from "./style";
import { IStaffInitialData } from "types/staffSettings";

interface IProps {
  control: Control<any>;
  initialData?: IStaffInitialData;
  errors?: any;
}

const AddressDetailForm: FC<IProps> = (props) => {
  const { control, initialData, errors } = props;

  return (
    <AddressDetails>
      <div>
        <Text className="text">Address</Text>
        <InputsWrapper>
          <Flex>
            <ItemWrapper>
              <MySelect
                name="born_address"
                control={control}
                options={initialData?.placeList}
                error={errors?.born_address?.message}
                placeholder="Select"
                label="Born address"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <Input
                name="official_address"
                error={errors?.official_address?.message}
                control={control}
                placeholder="Type here..."
                label="Official address  (by registration)"
              />
            </ItemWrapper>
          </Flex>
          <Flex>
            <ItemWrapper>
              <Input
                name="live_address"
                error={errors?.live_address?.message}
                control={control}
                placeholder="Type here..."
                label="Live address (where do you live?)"
              />
            </ItemWrapper>
          </Flex>
        </InputsWrapper>
      </div>
    </AddressDetails>
  );
};

export default AddressDetailForm;
