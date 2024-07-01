import React, { FC } from "react";
import { Wrapper } from "./style";
import { AntdSwitch, Input, InputNumber, MySelect } from "components";
import { StockSellPlace, StockStationary } from "constants/stock";
import Cashbox from "./components/cashbox";
import Platform from "./components/platform";
import { usePageDataMemo } from "hooks";

interface IProps {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
  errors: any;
}
const StudentTypeForm: FC<IProps> = ({
  control,
  watch,
  errors,
  getValues,
  setValue,
}) => {
  const switchValue = watch("is_stationary");
  const sell_place = watch("notStationary.sell_place");
  const data = usePageDataMemo();
  return (
    <Wrapper>
      <Input
        label="Description"
        name="description"
        control={control}
        type="textarea"
        rows={3}
        error={errors?.description?.message}
      />
      <AntdSwitch
        label="Student’s stationery"
        name="is_stationary"
        control={control}
      />
      {!switchValue ? (
        <>
          <MySelect
            label="Sell place"
            name="notStationary.sell_place"
            placeholder="Select"
            control={control}
            options={[
              { label: "Cashbox", value: StockSellPlace.Cashbox },
              {
                label: "Student platform",
                value: StockSellPlace.StudentPlatform,
              },
            ]}
            error={errors?.sell_places?.message}
          />
          {sell_place == StockSellPlace.Cashbox ? (
            <Cashbox control={control} watch={watch} />
          ) : (
            sell_place == StockSellPlace.StudentPlatform && (
              <Platform
                control={control}
                setValue={setValue}
                getValues={getValues}
              />
            )
          )}
        </>
      ) : (
        <>
          <Input
            label="Barcode"
            name="barcode"
            placeholder="barcode"
            control={control}
            error={errors?.name?.message}
          />
          <MySelect
            label="Choose product"
            name="stationary.sell_place"
            error={errors?.stationary_type?.message}
            placeholder="Select"
            control={control}
            options={[
              { label: "Book", value: StockStationary.Book },
              {
                label: "Notebook",
                value: StockStationary.Notebook,
              },
            ]}
          />
          {watch("stationary.sell_place") == StockStationary.Book && (
            <MySelect
              label="Choose level"
              name="stationary.level_id"
              placeholder="Select"
              control={control}
              options={data.level.options}
            />
          )}
          <InputNumber
            label="Enter price for cashbox"
            name="stationary.price"
            control={control}
            suffix="UZS"
          />
        </>
      )}
    </Wrapper>
  );
};

export default StudentTypeForm;
