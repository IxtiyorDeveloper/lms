import React from "react";
import {
  Wrapper,
  SubContent,
  IconWrapper,
  Flex,
  Box,
  RadioWrapper,
  ContentItem,
  SubContentBottom,
} from "./style";
import { IType } from "./type";
import {
  Gender,
  Input,
  InputNumber,
  MySelect,
  PhoneNumberInput,
} from "components";
import { Divider } from "antd";
import { PAYMENT_CARD, PAYMENT_CASH, PAYMENT_MOT } from "constants/payment";
import { CardSvg, CoinsSvg, DollarsSvg } from "components";

const IncomeContent = ({ control, errors, watch, selects }: IType) => {
  return (
    <Wrapper>
      <SubContent>
        <ContentItem>
          <Input
            placeholder="-"
            control={control}
            name="general.full_name"
            error={(errors as any)?.general?.full_name?.message}
            label="Guest name"
          />
        </ContentItem>
        <ContentItem>
          <PhoneNumberInput
            placeholder="-"
            control={control}
            name="general.phone_number"
            label="Phone number"
            error={(errors as any)?.general?.phone_number?.message}
          />
        </ContentItem>
      </SubContent>
      <Divider />
      <SubContent>
        <MySelect
          placeholder="Select"
          control={control}
          name="general.branch_id"
          label="Branch"
          options={selects.ownAllBranches}
          error={(errors as any)?.general?.branch_id?.message}
        />
      </SubContent>
      <Divider />
      <SubContentBottom>
        <Input
          placeholder="-"
          control={control}
          name="general.comment"
          error={(errors as any)?.general?.comment?.message}
          label="Description"
          type="textarea"
        />
      </SubContentBottom>
      <SubContent>
        <Box>
          <Flex>
            <RadioWrapper>
              <Gender
                value={PAYMENT_CARD}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <CardSvg /> Card
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </RadioWrapper>
            <RadioWrapper>
              <Gender
                value={PAYMENT_CASH}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <DollarsSvg height={24} width={30} /> Cash
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </RadioWrapper>
            <RadioWrapper>
              <Gender
                value={PAYMENT_MOT}
                name="general.payment_type"
                control={control}
                icon={() => {
                  return (
                    <IconWrapper>
                      <CoinsSvg />
                      MOT
                    </IconWrapper>
                  );
                }}
                error={(errors as any)?.general?.payment_type?.message}
              />
            </RadioWrapper>
          </Flex>
          <InputNumber
            name="general.amount"
            label="Payment amount"
            control={control}
            suffix={<div className="suffix">UZS</div>}
            error={(errors as any)?.general?.amount?.message}
          />
        </Box>
      </SubContent>
    </Wrapper>
  );
};

export default IncomeContent;
