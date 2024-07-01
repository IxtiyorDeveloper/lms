import React, { FC } from "react";
import { Button } from "components";
import { useForm } from "react-hook-form";
import { ISelect } from "./type";
import { MySelectC } from "./style";
import { bgColors } from "styles/theme";

const Select: FC<ISelect> = ({ options }) => {
  const { control } = useForm();
  return (
    <div>
      <div style={{ padding: "8px" }}>
        <MySelectC
          name="name"
          control={control}
          placeholder="Search"
          options={options}
          style={{ width: "220px", height: "40px" }}
          mode="multiple"
        />
      </div>
      <hr color={bgColors.wildSand} />
      <div
        style={{ padding: "8px", display: "flex", justifyContent: "flex-end" }}
      >
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default Select;
