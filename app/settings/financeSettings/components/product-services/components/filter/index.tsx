import React, { FC, useEffect } from "react";
import { ButtonWrapper, FilterWrapper, FormWrapper } from "./style";
import { Button, InputWithIcon, MySelect, SearchSvg } from "components";
import { useForm } from "react-hook-form";
import { bgColors, textColors } from "styles/theme";
import { filterQuery } from "utils/filterQuery";
import { resetQuery } from "utils/resetQuery";
import { excludeObjectFields } from "utils/excludeObjectFields";
import { IFilter } from "./type";

const ProductServices: FC<IFilter> = ({ data, selects }) => {
  const { control, handleSubmit, setValue, reset } = useForm();

  const onSubmit = (data: any) => {
    filterQuery({ ...data.general });
  };

  const onReset = () => {
    resetQuery(["page", "pageSize"]);
    reset({});
  };

  useEffect(() => {
    /**
     * after loading data renders router values to filter inputs
     */
    if (data)
      for (const [key, value] of Object.entries(
        excludeObjectFields([
          "page",
          "pageSize",
          "roundedTabIndex",
          "tab_id",
          "with_tabs",
        ])
      )) {
        if (!!value)
          setValue("general", {
            [key]: value,
          });
      }
  }, [data]);

  return (
    <>
      <FilterWrapper onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <InputWithIcon
            placeholder="Search"
            icon={SearchSvg}
            name="general.name"
            control={control}
            style={{ width: "200px" }}
          />
          <MySelect
            style={{ width: "170px" }}
            name="general.type"
            control={control}
            options={selects?.types}
            placeholder="Search"
          />
        </FormWrapper>
        <ButtonWrapper>
          <Button
            bgColor={bgColors.wildSand}
            textColor={textColors.yourShadow}
            onClick={onReset}
          >
            Reset
          </Button>
          <Button type="submit">Search</Button>
        </ButtonWrapper>
      </FilterWrapper>
    </>
  );
};

export default ProductServices;
