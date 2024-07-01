import React from "react";
import { Col } from "antd";
import handleInputs from "./handleInputs";
import { IElement } from "./type";

const FilterElement = ({
  item,
  selects,
  index,
  control,
}: {
  item: IElement;
  selects: any;
  index: number;
  control: any;
}) => {
  const { isVisible = true } = item;
  if (isVisible)
    return (
      <Col
        key={index}
        xl={4}
        lg={6}
        md={6}
        sm={12}
        xs={24}
        {...item?.colProps}
        className="col-end"
      >
        {
          handleInputs({
            name: item.name,
            options:
              selects?.[item.options as keyof typeof selects] ||
              item?.customOptions,
            label: item.label,
            control,
            fetchOptions: item.fetchOptions,
            placeholder: item.placeholder,
            fetchOptions: item.fetchOptions,
            args: item.args,
          })[item.elementType]
        }
      </Col>
    );
  else return null;
};

export default FilterElement;
