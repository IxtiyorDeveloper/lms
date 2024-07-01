import React from "react";
import { AlerCuntWrapper, Item } from "./style";
import {
  AntdSwitch,
  BellSvg,
  CirclePlusSvg,
  DeleteSvg,
  InputNumber,
  MySelect,
} from "components";
import { useFieldArray } from "react-hook-form";
import { IStockPage } from "types";

interface IProps {
  control: any;
  data?: IStockPage;
}

function AlterCount({ control, data }: IProps) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: "alert_counts",
  });

  return (
    <AlerCuntWrapper>
      <div className="flex-container">
        <div className="flex-container w-80">
          <BellSvg />
          <div className="w-100">Alert count</div>
        </div>
        <div className="flex-container w-20">
          <div className="off">On/Off</div>
          <div>
            <AntdSwitch control={control} name="notification_status" />
          </div>
        </div>
      </div>

      <div className="items">
        {fields.map((e, index) => {
          return (
            <Item key={`alert_count-asd-${index}`}>
              <div className="w-100">
                <MySelect
                  control={control}
                  name={`alert_counts[${index}].location_id`}
                  options={data?.locations?.map((e) => {
                    return {
                      label: e.name,
                      value: e.id,
                    };
                  })}
                  label="Location"
                />
              </div>
              <div className="w-100">
                <InputNumber
                  control={control}
                  name={`alert_counts[${index}].min_count`}
                  label="Min alert count"
                />
              </div>
              <div className="w-100">
                <InputNumber
                  control={control}
                  name={`alert_counts[${index}].max_count`}
                  label="Max alert count"
                />
              </div>
              {index == 0 ? (
                <div className="mt" onClick={() => append({})}>
                  <CirclePlusSvg />
                </div>
              ) : (
                <div className="mt" onClick={() => remove(index)}>
                  <DeleteSvg />
                </div>
              )}
            </Item>
          );
        })}
      </div>
    </AlerCuntWrapper>
  );
}

export default AlterCount;
