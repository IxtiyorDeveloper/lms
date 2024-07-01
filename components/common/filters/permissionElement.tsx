import React from "react";
import { CheckPermission } from "utils/guard";
import { Col } from "antd";
import handleInputs from "./handleInputs";
import { IElement } from "./type";

const PermissionElement = ({
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
  return (
    <CheckPermission permission={item.permission}>
      <Col
        key={index}
        lg={4}
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
            placeholder: item.placeholder,
            args: item.args,
          })[item.elementType]
        }
      </Col>
    </CheckPermission>
  );
};

export default PermissionElement;
