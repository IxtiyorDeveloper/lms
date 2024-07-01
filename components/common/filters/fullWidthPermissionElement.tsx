import React from "react";
import { Col } from "antd";
import handleInputs from "./handleInputs";
import { IElement } from "./type";
import { FullWidth } from "./style";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { CheckPermission } from "utils/guard";

const FullWidthPermissionElement = ({
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
    <CheckPermission
      permission={[
        COMPONENTS_VIEWS[
          item.permission as unknown as keyof typeof COMPONENTS_VIEWS
        ],
      ]}
    >
      <FullWidth>
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
      </FullWidth>
    </CheckPermission>
  );
};

export default FullWidthPermissionElement;
