import { CheckSvg } from "components";
import React, { FC } from "react";
import {
  Wrapper,
  Label,
  Items,
  Item,
  ItemWrapper,
  ImageWrapper,
} from "./style";
import { IItemPicker } from "./type";

const PaymentMode: FC<IItemPicker> = ({ label, name, active, onClick }) => {
  const data = [
    {
      id: 0,
      img: "/settings/scene1.png",
      label: "Light",
      type: "white",
    },
    {
      id: 1,
      img: "/settings/scene2.png",
      label: "Dark",
      type: "dark",
    },
  ];
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Items>
        {data?.map((item, key) => {
          return (
            <ItemWrapper key={key}>
              <Item
                onClick={() => onClick?.(item?.id)}
                className={active === item?.id ? "" : "inactiveWrapper"}
              >
                <ImageWrapper className={active === item?.id ? "active" : ""}>
                  <div className="top">First of the month</div>
                  <div className="center">01 June - 01 July</div>
                </ImageWrapper>
                {active === item?.id && (
                  <div className="check">
                    <CheckSvg color="white" />
                  </div>
                )}
              </Item>
            </ItemWrapper>
          );
        })}
      </Items>
    </Wrapper>
  );
};

export default PaymentMode;
