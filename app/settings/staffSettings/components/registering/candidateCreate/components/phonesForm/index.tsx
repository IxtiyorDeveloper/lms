import React, { FC } from "react";
import { Text } from "../../style";
import {
  Button,
  CustomSelect,
  DeleteSvg,
  PhoneNumberInput,
  PlusSvg,
} from "components";
import { MainPhone } from "constants/phoneTypes";
import { bgColors, textColors } from "styles/theme";
import { usePageDataMemo } from "hooks";
import { Control, useFieldArray } from "react-hook-form";
import { PhoneNumbers } from "./style";
import { Row, Col } from "antd";

interface IProps {
  control: Control<any>;
  errors: any;
}

const PhonesForm: FC<IProps> = (props) => {
  const { control, errors } = props;
  const selects = usePageDataMemo();

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control,
    name: "phone_numbers",
  });

  return (
    <PhoneNumbers>
      <div>
        <Text className="text">Phone numbers</Text>

        {phoneFields?.map((item, index) => {
          const isErrorRow =
            errors?.phones?.[index]?.phone?.message ||
            // @ts-ignore
            errors?.phones?.[index]?.type?.message;
          return (
            <Row key={item?.id} gutter={[10, 10]} style={{ marginTop: 16 }}>
              <Col span={11}>
                <CustomSelect
                  control={control}
                  name={`phone_numbers[${index}].type`}
                  label="Type"
                  options={selects.phone}
                  // @ts-ignore
                  error={errors?.extra_phone_numbers?.[index]?.type?.message}
                />
              </Col>
              <Col span={11}>
                <PhoneNumberInput
                  label="Phone"
                  name={`phone_numbers[${index}].phone_number`}
                  control={control}
                  placeholder="+998 (--) --- -- --"
                  error={
                    errors?.extra_phone_numbers?.[index]?.phone_number?.message
                  }
                />
              </Col>
              <Col span={2}>
                {index === 0 ? (
                  <Button
                    onClick={() =>
                      appendPhone({ type: `${MainPhone}`, phone: undefined })
                    }
                    icon={<PlusSvg />}
                    style={{
                      padding: "0 24px",
                      color: textColors.blueGray,
                      marginTop: 24,
                    }}
                  />
                ) : (
                  <Button
                    icon={<DeleteSvg width={20} height={20} />}
                    onClick={() => {
                      removePhone(index);
                    }}
                    style={{
                      padding: "0 24px",
                      color: textColors.blueGray,
                      backgroundColor: bgColors.pale,
                      marginTop: 24,
                    }}
                  />
                )}
              </Col>
            </Row>
          );
        })}
      </div>
    </PhoneNumbers>
  );
};

export default PhonesForm;
