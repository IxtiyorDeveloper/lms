import React, { FC } from "react";
import { Empty, Popover } from "antd";
import { StudentType } from "types";
import { ISearchStudent } from "types/globalSearch";
import { NEW_STUDENT_NOT_ATTENDED } from "constants/studentStatuses";
import { CircleImageBlackRedList, PhoneCell, SharpStarSvg } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import {
  ButtonsWrapper,
  colors,
  GroupButton,
  NameWrapper,
  PhoneAndButtonsWrapper,
  PhoneWrapper,
  ResultWrapper,
  WrapperC,
} from "../../../style";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { gender } from "constants/gender";
import Box from "@mui/material/Box";
import { TabPanelProps } from "../../tabs";
import { ITabStudents } from "./type";
import { useRouter } from "next/router";
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

const TabStudent: FC<ITabStudents> = (props) => {
  const router = useRouter();

  const { value, data, statusRender } = props;

  const phoneEditor = (phone: string) => {
    // @ts-ignore
    const arr: IUserPhone = [];
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

    return arr;
  };

  return (
    <TabPanel value={value} index={0}>
      {(data?.data?.students === undefined ||
        data?.data?.students.length === 0) && (
        <div>
          <Empty style={{ paddingTop: "45px" }} />
        </div>
      )}
      {!data && (
        <div>
          <Empty style={{ paddingTop: "45px" }} />
        </div>
      )}
      {data?.data?.students?.map((user: ISearchStudent, index: number) => {
        const isRedList = user?.isRedList == "1";
        const isBlackList = user?.isBlackList == "1";
        const abs =
          Number(user?.student_type) === StudentType.TYPE_OLD &&
          user.student_status.toString() ===
            NEW_STUDENT_NOT_ATTENDED.toString() ? (
            <div className="abs1">
              <SharpStarSvg color={bgColors.primary} />
            </div>
          ) : null;
        return (
          <ResultWrapper
            onClick={() => {
              router.replace({
                pathname: funcCheckPermission([
                  COMPONENTS_VIEWS.can_view_student,
                ])
                  ? user?.student_status == StudentType.TYPE_OLD.toString()
                    ? `/groups/${user?.group_id}`
                    : user?.student_status == StudentType.TYPE_NEW.toString()
                    ? `/student/waiting-list`
                    : user?.student_type != StudentType.TYPE_BANNED.toString()
                    ? `/student/archived-students`
                    : `/student/banned-students`
                  : "",
                query: {
                  search:
                    user?.student_status.toString() ==
                      StudentType.TYPE_NEW.toString() ||
                    (user?.student_status ===
                      StudentType.TYPE_BANNED.toString() &&
                      user?.student_type !== StudentType.TYPE_BANNED.toString())
                      ? `${user?.firstname} ${user?.lastname}`
                      : user?.student_status ===
                        StudentType.TYPE_BANNED.toString()
                      ? `${user?.firstname} ${user?.lastname}`
                      : null,
                },
              });
            }}
            key={`${user?.id}_${index}`}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <CircleImageBlackRedList
                style={{
                  borderRadius: "50%",
                }}
                abs={abs}
                isRed={isRedList}
                isBlack={isBlackList}
                alt={user?.userProfile?.firstname}
                src={{
                  full_url:
                    user?.avatar_url ||
                    (user?.gender === gender.MALE
                      ? "https://www.w3schools.com/howto/img_avatar.png"
                      : user?.gender === gender.FEMALE
                      ? "https://www.w3schools.com/howto/img_avatar2.png"
                      : gender.NOT_SET),
                }}
              />
            </div>
            <div>
              <NameWrapper
                className="dark"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={
                  funcCheckPermission([COMPONENTS_VIEWS.can_view_student])
                    ? user?.student_status.toString() ===
                      StudentType.TYPE_OLD.toString()
                      ? `/student/${user?.id}`
                      : user?.student_type.toString() ===
                        StudentType.TYPE_BANNED.toString()
                      ? `/student/banned-students?search=${user?.firstname}+${user?.lastname}`
                      : user?.student_status.toString() ===
                        StudentType.TYPE_NEW.toString()
                      ? `/student/waiting-list?search=${user?.firstname}+${user?.lastname}`
                      : `/student/archived-students?search=${user?.firstname}+${user?.lastname}`
                    : ""
                }
              >
                {user?.firstname}&nbsp;
                {user?.lastname}
              </NameWrapper>
              <PhoneAndButtonsWrapper>
                <PhoneWrapper>
                  <PhoneCell
                    style={{
                      fontSize: fontSizes.f10,
                      color: textColors.yourShadow,
                    }}
                    //@ts-ignore
                    value={phoneEditor(user?.phones)}
                  />
                </PhoneWrapper>
                {user?.student_status !== StudentType.TYPE_NEW.toString() &&
                  user?.student_status !==
                    StudentType.TYPE_BANNED.toString() && (
                    <ButtonsWrapper>
                      <Popover
                        destroyTooltipOnHide
                        content={
                          <WrapperC>{user?.group_name || "Group"}</WrapperC>
                        }
                      >
                        <GroupButton
                          href={
                            funcCheckPermission([
                              COMPONENTS_VIEWS.can_view_group,
                            ])
                              ? `/groups/${user?.group_id}`
                              : ""
                          }
                        >
                          {user?.group_name || "Group"}
                        </GroupButton>
                      </Popover>
                    </ButtonsWrapper>
                  )}
              </PhoneAndButtonsWrapper>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span
                style={colors[statusRender(user) as keyof typeof colors]}
                className="status"
              >
                {statusRender(user)}
              </span>
            </div>
          </ResultWrapper>
        );
      })}
    </TabPanel>
  );
};

export default TabStudent;
