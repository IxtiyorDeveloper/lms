import React, { FC } from "react";
import { FilterWrapper, RowWrapper, Buttons } from "./style";
import { Button, InputWithIcon, MySelect, SearchSvg } from "components";
import { useForm } from "react-hook-form";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "components/antd/datePicker";

const Filter: FC = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {};

  return (
    <FilterWrapper onSubmit={handleSubmit(onSubmit)}>
      <RowWrapper>
        <InputWithIcon
          placeholder="Search"
          icon={SearchSvg}
          control={control}
          name="search"
        />
      </RowWrapper>
      <RowWrapper mt={20}>
        <MySelect
          name="student"
          placeholder="Select"
          control={control}
          label="Student"
        />
        <MySelect
          name="branch"
          placeholder="Select"
          control={control}
          label="Branch"
        />
        <MySelect
          name="teacher"
          placeholder="Select"
          control={control}
          label="Teacher"
        />
        <MySelect
          name="time"
          placeholder="Select"
          control={control}
          label="Time"
        />
        <MySelect
          name="day"
          placeholder="Select"
          control={control}
          label="Day"
        />
        <MySelect
          name="level"
          placeholder="Select"
          control={control}
          label="Level"
        />
      </RowWrapper>
      <RowWrapper mt={20}>
        <MySelect
          name="sub_level"
          placeholder="Select"
          control={control}
          label="Sub level"
        />
        <MySelect
          name="group_type"
          placeholder="Select"
          control={control}
          label="Group type"
        />
        <DatePicker
          name="start_date_periods"
          control={control}
          label="Start date periods"
        />
        <MySelect
          name="payment_statuses"
          placeholder="Select"
          control={control}
          label="Payment statuses"
        />
        <MySelect
          name="exclude_will_pay"
          placeholder="Select"
          control={control}
          label="Exclude will pay"
        />
        <Buttons>
          <Button
            style={{ width: "100%", padding: "12px" }}
            onClick={reset}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Reset
          </Button>
          <Button style={{ width: "100%", padding: "12px" }} type="submit">
            Search
          </Button>
        </Buttons>
      </RowWrapper>
    </FilterWrapper>
  );
};

export default Filter;
