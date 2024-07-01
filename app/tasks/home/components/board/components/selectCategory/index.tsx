import React, { FC, useState } from "react";
import { CategoryTitle, GridContainer, GridItem, Wrapper } from "./style";
import { useTaskCategories } from "hooks";
import { bgColors } from "styles/theme";
import { CircleSuccessSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  activeItem: number | null;
  setActiveItem: (ind: number) => void;
}

const SelectCategory: FC<IProps> = (props) => {
  const { data: dataCategories } = useTaskCategories();

  return (
    <Wrapper>
      <GridContainer>
        {dataCategories?.map((category) => {
          const active = props.activeItem === +category.id;
          return (
            <GridItem
              onClick={() => props.setActiveItem(+category.id)}
              style={{
                border: `3px solid ${
                  active ? bgColors.sunny : bgColors.transparent
                }`,
                backgroundImage: `${
                  active
                    ? "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),"
                    : ""
                } linear-gradient(to left, ${category.color.to_color}, ${
                  category.color.from_color
                }), url('${category.iconUrl}')`,
              }}
            >
              <img
                className="image"
                src={category.iconUrl}
                alt={`${category.name}_icon`}
              />
              <img
                className="imageAbs"
                src={category.iconUrl}
                alt={`${category.name}_icon`}
              />
              <CategoryTitle>
                {category.name}{" "}
                {active ? (
                  <p className="selected">
                    Selected <CircleSuccessSvg color={bgColors.white} />
                  </p>
                ) : null}
              </CategoryTitle>
            </GridItem>
          );
        })}
      </GridContainer>
    </Wrapper>
  );
};

export default SelectCategory;
