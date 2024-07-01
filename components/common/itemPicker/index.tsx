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
const ItemPicker: FC<IItemPicker> = ({ label, active, onClick }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Items>
        {data?.map((item, key) => {
          return (
            <ItemWrapper key={key}>
              <Item onClick={() => onClick?.(item?.id)}>
                <ImageWrapper className={active === item?.id ? "active" : ""}>
                  <div
                    style={{ backgroundImage: `url(${item?.img})` }}
                    key={key}
                    className={`bgImage ${item.type}`}
                  />
                </ImageWrapper>
                {active === item?.id && (
                  <div className="check">
                    <CheckSvg color="white" />
                  </div>
                )}
              </Item>
              <p>{item?.label}</p>
            </ItemWrapper>
          );
        })}
      </Items>
    </Wrapper>
  );
};

export default ItemPicker;
