import React from "react";
import { InputWithIcon, SearchSvg, SortControl } from "components";
import { Item, StyledHeader, Text } from "./style";
import { ISalaryHeader } from "./type";

const Header = ({ control }: ISalaryHeader) => {
  return (
    <StyledHeader>
      <Item className="column">
        <InputWithIcon
          placeholder={`Search...`}
          icon={SearchSvg}
          name="full_name"
          control={control}
        />
      </Item>
      <SortControl
        control={control}
        name="sort"
        field="total_salary"
        label="Salary"
        className="column"
      />
      <SortControl
        control={control}
        name="sort"
        field="avans"
        label="Avans"
        className="column"
      />
      <SortControl
        control={control}
        name="sort"
        field="tax"
        label="Tax"
        className="column"
      />
      <SortControl
        control={control}
        name="sort"
        field="penalty"
        label="Penalty"
        className="column"
      />
      <SortControl
        control={control}
        name="sort"
        field="card"
        label="Card"
        className="column"
      />
      <SortControl
        control={control}
        name="sort"
        field="cash"
        label="Cash"
        className="column"
      />
      <Item className="column">
        <Text>Action</Text>
      </Item>
    </StyledHeader>
  );
};

export default Header;
