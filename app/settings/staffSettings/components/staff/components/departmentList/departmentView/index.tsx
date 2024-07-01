import React, { FC, useState } from "react";
import { DeleteSvg, EditSvg, Staff, StarFillSvg } from "components";
import {
  DepartmentName,
  StaffWrapper,
  StarsWrapper,
  DropMenu,
  Wrapper,
  Badge,
} from "./style";
import { useRouter } from "next/router";
import { IRbacRole } from "types/department";
import {
  DIRECTOR_DEGREE,
  HEAD_DEGREE,
  STAFF_DEGREE,
} from "constants/department";
import { bgColors, textColors } from "styles/theme";
import { Dropdown, MenuProps } from "antd";
import { DepartmentModalsType } from "../index";
import Link from "next/link";

const colors = {
  [DIRECTOR_DEGREE]: bgColors.pop,
  [HEAD_DEGREE]: bgColors.orange,
  [STAFF_DEGREE]: bgColors.primary,
};
const count = {
  [DIRECTOR_DEGREE]: 3,
  [HEAD_DEGREE]: 2,
  [STAFF_DEGREE]: 1,
};

interface IProps {
  staff: IRbacRole;
  id: number;
  status: number;
  handleOpenModal: (type: DepartmentModalsType, id?: number) => void;
}

const DepartmentView: FC<IProps> = (props) => {
  const { staff, handleOpenModal, id, status } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <DropMenu
          onClick={(e) => {
            e.stopPropagation();
            router
              .push({
                pathname: `/settings/staff-settings/create-role/${staff?.id}`,
                query: {
                  type: "update",
                  roleId: staff.id,
                  dep_id: staff?.department_id,
                },
              })
              .then();
          }}
        >
          <EditSvg color={textColors.yourShadow} width={16} height={16} /> Edit
        </DropMenu>
      ),
    },
    {
      key: "2",
      label: (
        <DropMenu
          onClick={(e) => {
            e.stopPropagation();
            handleOpenModal("deleteMethod", staff.id);
          }}
        >
          <DeleteSvg height={16} width={16} /> Delete
        </DropMenu>
      ),
    },
  ];

  const { roundedTabIndex, open_department, ...rest } = router.query;

  return (
    <Wrapper>
      <StaffWrapper
        onMouseEnter={() => setIsOpen(!isOpen)}
        onMouseLeave={() => setIsOpen(!isOpen)}
      >
        {(isOpen || visible) && (
          <Dropdown
            trigger={["click"]}
            overlayStyle={{ width: "100px" }}
            menu={{ items }}
            placement="bottomRight"
            open={visible}
            onOpenChange={() => setVisible(!visible)}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                right: "10px",
                padding: "0 0 5px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setVisible(true);
              }}
            >
              ...
            </div>
          </Dropdown>
        )}
        <Link
          href={{
            pathname: `/settings/staff-settings/${staff.id}`,
            query: {
              ...rest,
              "create-role": id,
              status,
            },
          }}
        >
          <div className="staff_icon">
            <Staff color={colors[staff.degree]} height={43} width={43} />
            <Badge style={{ position: "absolute", top: "-5px", right: "0px" }}>
              {staff.rbacAssignmentCount}
            </Badge>
          </div>
          <StarsWrapper>
            {Array(count[staff.degree])
              .fill(null)
              .map((_, ind) => {
                return (
                  <StarFillSvg
                    color={colors[staff.degree]}
                    key={`${staff.id}${ind}`}
                  />
                );
              })}
          </StarsWrapper>
          <DepartmentName>{staff.name}</DepartmentName>
        </Link>
      </StaffWrapper>
    </Wrapper>
  );
};

export default DepartmentView;
