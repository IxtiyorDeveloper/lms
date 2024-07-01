import React, { useMemo } from "react";

import { RoleMenuWrapper, StyledChildrenCollapse, Label } from "./style";
import { IRoleMenu } from "./type";
import { Anchor } from "antd";

const { Link } = Anchor;

const RoleMenu = ({
  sidebarItems,
  item,
  onChildChange,
  activeChildKey,
}: IRoleMenu) => {
  const myItems = useMemo(() => {
    const role = item?.children;
    let items: any = [];
    if (role) {
      for (let i = 0; i < role?.length; i++) {
        const tableData = role[i];
        const shift_id = tableData?.shift ? tableData?.shift?.id : 0;
        const part_id = `${tableData?.role?.id}_${shift_id}`;
        const shift_name = tableData?.shift
          ? ` (${tableData?.shift?.name})`
          : "";
        items = [
          ...items,
          {
            key: i,
            label: (
              <Link
                href={`#part-${part_id}`}
                title={
                  <Label className="active">
                    <p className="name">
                      {tableData?.role?.name}
                      {shift_name}
                    </p>
                    {/*<div className="arrow">*/}
                    {/*  <ArrowSvg />*/}
                    {/*</div>*/}
                  </Label>
                }
              />
            ),
            children: [],
          },
        ];
      }
      return items;
    } else return [];
  }, [item]);
  return (
    <RoleMenuWrapper>
      <div className="role-container">
        <StyledChildrenCollapse
          items={myItems}
          accordion
          onChange={onChildChange}
          activeKey={activeChildKey}
        />
      </div>
    </RoleMenuWrapper>
  );
};

export default RoleMenu;
