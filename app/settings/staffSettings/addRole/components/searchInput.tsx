import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import React, { FC, useState } from "react";
import Image from "next/image";

export const SearchInputStyled = styled("input")`
  border: 0 !important;
  outline: 0;
  display: flex;
  flex: 1;
  height: 100%;
  font-weight: 400;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  background-color: ${bgColors.wildSand};
  padding: 10px 0;
  width: 185px !important;

  SearchInputStyledBox ::placeholder {
    color: ${textColors.brotherBlue};
    opacity: 1;
  }
`;

const SearchInputStyledBox = styled.div`
  width: 180px !important;
  height: 30px !important;
  background-color: ${bgColors.wildSand};
  display: flex;
  align-items: center;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 20px;
  .container {
    padding: 8px 6px 6px 6px;
  }
`;

export const SearchInput: FC<{
  defaultValue?: string;
  onChange?: (e: any) => void;
}> = ({ onChange, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const change = (e: any) => {
    setValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <SearchInputStyledBox>
      <div className="container">
        <Image
          style={{ marginTop: "-4px" }}
          src="/header/search.svg"
          alt="search"
          width="16"
          height="16"
        />
      </div>
      <SearchInputStyled onChange={change} value={value} placeholder="Search" />
    </SearchInputStyledBox>
  );
};
