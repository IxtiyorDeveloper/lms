import React, { useEffect } from "react";
import {
  Wrapper,
  SubContent,
  IconWrapper,
  Flex,
  Box,
  RadioWrapper,
  ContentItem,
} from "./style";
import TopCard from "./components/topCard";
import { IType } from "./type";
import {
  Gender,
  Input,
  InputNumber,
  MySelect,
  PhoneNumberInput,
  ProductList,
} from "components";
import { Divider, Spin } from "antd";
import { PAYMENT_CARD, PAYMENT_CASH, PAYMENT_MOT } from "constants/payment";
import { CardSvg, CoinsSvg, DollarsSvg } from "components";
import { useProductCashBox } from "hooks";

const GuestContent = ({
  control,
  errors,
  watch,
  selects,
  clearErrors,
  setError,
  setValue,
}: IType) => {
  const { data: products, isInitialLoading: isLoading } = useProductCashBox({
    query_params: {
      branch_id: watch("general.branch_id"),
      expand: "createdBy,variation.options,count,price,coverFile.resolutions",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      clearErrors();
      if (type === "change" && name === "general.product_id") {
        const price = products?.find(
          (li) => li?.id == value.general?.product_id
        )?.price;
        setValue("general.amount", price);
        if (price) {
          setError("general.amount", null as any);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, products]);

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
      <SubContent>
        <Spin spinning={isLoading}>
          <ProductList
            name="general.product_id"
            data={products ?? []}
            control={control}
            label=""
            error={(errors as any)?.general?.product_id?.message}
          />
        </Spin>
      </SubContent>
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

export default GuestContent;
