import React, { FC } from "react";
import { Empty } from "antd";
import { StudentType } from "types";
import { NEW_STUDENT_NOT_ATTENDED, statuses } from "constants/studentStatuses";
import { CircleImage, PhoneCell } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import {
  ButtonsWrapper,
  NameWrapper,
  PhoneAndButtonsWrapper,
  PhoneWrapper,
  ProfileButton,
  ResultWrapper,
} from "../../../style";
import { funcCheckPermission, isDateInMonthAndYear } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import Box from "@mui/material/Box";
import { TabPanelProps } from "../../tabs";
import { ITabStaff } from "./type";
import Branch from "../../../branch";
import { IUserPhone } from "../../../../../types/userPhone";

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ overflowY: "auto", height: "430px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const TabStaff: FC<ITabStaff> = (props) => {
  const { value, data } = props;

  const phoneEditor = (phone: string) => {
    // @ts-ignore
    const arr: IUserPhone[] = [];
    phone?.split(",")?.map((p: any) => {
      const text = p.split(":");
      // @ts-ignore
      arr.push({
        id: p,
        type: text[0],
        is_confirmed: +text[2],
        phone_number: text[1],
      });
    });

    return arr?.sort((a, b) => a.type - b.type);
  };

  return (
    <TabPanel value={value} index={2}>
      {(data?.data?.staff_list === undefined ||
        data?.data?.staff_list.length === 0) && (
        <div>
          <Empty style={{ paddingTop: "45px" }} />
        </div>
      )}
      {data?.data?.staff_list?.map((user: any, index: number) => {
        const isHiredDateThisMonth = isDateInMonthAndYear({
          dateString: user?.hired_date,
        });

        return (
          <ResultWrapper key={`${user?.id}_${index}`}>
            <div>
              <CircleImage
                style={{ borderRadius: "50%" }}
                alt={user.firstname}
                src={{ full_url: user?.avatar_url }}
                showNew={isHiredDateThisMonth}
              />
            </div>
            <div>
              <NameWrapper
                className="dark"
                href={
                  funcCheckPermission([
                    COMPONENTS_VIEWS.can_manage_rbac_assignment,
                  ])
                    ? `/settings/staff-settings/edit-member/${user?.id}`
                    : ""
                }
              >
                {user.firstname}&nbsp;
                {user.lastname}
              </NameWrapper>
              <PhoneAndButtonsWrapper>
                <ButtonsWrapper>
                  <PhoneWrapper>
                    <PhoneCell
                      style={{
                        fontSize: fontSizes.f10,
                        color: textColors.yourShadow,
                      }}
                      // @ts-ignore
                      value={phoneEditor(user?.phones)}
                    />
                  </PhoneWrapper>
                  <ProfileButton
                    href={
                      funcCheckPermission([
                        COMPONENTS_VIEWS.can_manage_rbac_assignment,
                      ])
                        ? `/settings/staff-settings/edit-member/${user?.id}`
                        : ""
                    }
                    style={{
                      backgroundColor: bgColors.wildSand,
                      color: textColors.yourShadow,
                      height: "20px",
                      marginLeft: "10px",
                    }}
                    className="dark"
                  >
                    {user.role_name}
                  </ProfileButton>
                  <ProfileButton
                    href={
                      funcCheckPermission([
                        COMPONENTS_VIEWS.can_manage_rbac_assignment,
                      ])
                        ? `/settings/staff-settings/edit-member/${user?.id}`
                        : ""
                    }
                    style={{
                      backgroundColor: bgColors.wildSand,
                      color: textColors.yourShadow,
                      height: "19px",
                      alignItems: "center",
                      marginLeft: "10px",
                    }}
                    className="dark"
                  >
                    <Branch user={user} />
                  </ProfileButton>
                </ButtonsWrapper>
              </PhoneAndButtonsWrapper>
            </div>
            <div style={{ marginLeft: "auto" }}>
              {user?.status === NEW_STUDENT_NOT_ATTENDED ? (
                <span
                  className="status"
                  style={{
                    background: bgColors.transparentGreen,
                    color: textColors.eucalyptus,
                  }}
                >
                  Active
                </span>
              ) : user?.status.toString() ===
                StudentType.TYPE_OLD.toString() ? (
                <span className="status">Not Active</span>
              ) : (
                <span
                  className="status"
                  style={{
                    background: bgColors.transparentGreen,
                    color: textColors.eucalyptus,
                  }}
                >
                  {statuses[user?.student?.status as keyof typeof statuses]}
                </span>
              )}
            </div>
          </ResultWrapper>
        );
      })}
    </TabPanel>
  );
};

export default TabStaff;
