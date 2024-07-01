import React, { FC } from "react";
import { Empty } from "antd";
import { CircleImage } from "components";
import { bgColors, textColors } from "styles/theme";
import {
  ButtonsWrapper,
  GroupButton,
  groupColors,
  NameWrapper,
  PhoneAndButtonsWrapper,
  ProfileButton,
  ResultWrapper,
} from "../../../style";
import { funcCheckPermission, groupStatusIdentifier } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";
import Box from "@mui/material/Box";
import { TabPanelProps } from "../../tabs";
import { ITabGroups } from "./type";

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

const TabStudent: FC<ITabGroups> = (props) => {
  const { value, data } = props;

  return (
    <TabPanel value={value} index={1}>
      {data?.data?.groups === undefined || data?.data?.groups.length === 0 ? (
        <div>
          <Empty style={{ paddingTop: "45px" }} />
        </div>
      ) : (
        data?.data?.groups?.map((group: any, index: number) => {
          return (
            <ResultWrapper key={`${group?.id}_${index}`}>
              <div>
                <CircleImage
                  width={40}
                  height={40}
                  style={{
                    borderRadius: "50%",
                    objectFit: "fill",
                    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.3)",
                  }}
                  alt={group?.firstname}
                  src={{ full_url: "/icon.png" }}
                />
              </div>
              <div>
                <NameWrapper
                  className="dark"
                  href={
                    funcCheckPermission([COMPONENTS_VIEWS.can_view_group])
                      ? `/groups/${group.id}`
                      : ""
                  }
                >
                  {group?.name}
                </NameWrapper>
                <PhoneAndButtonsWrapper>
                  <ButtonsWrapper>
                    <ProfileButton
                      href={``}
                      style={{
                        backgroundColor: bgColors.wildSand,
                        color: textColors.yourShadow,
                        pointerEvents: "none",
                      }}
                      tabIndex={-1}
                      onClick={() => false}
                    >
                      {group?.teacher_name}
                    </ProfileButton>
                    <GroupButton
                      href=""
                      style={{
                        cursor: "not-allowed",
                        pointerEvents: "none",
                        backgroundColor: bgColors.wildSand,
                        color: textColors.yourShadow,
                      }}
                    >
                      {group?.support_name}{" "}
                    </GroupButton>
                  </ButtonsWrapper>
                </PhoneAndButtonsWrapper>
              </div>
              <div style={{ marginLeft: "auto" }}>
                {/* @ts-ignore */}
                <span
                  className="status"
                  style={{
                    textTransform: "capitalize",

                    ...(groupColors[
                      groupStatusIdentifier({
                        group,
                      }) as keyof typeof groupColors
                    ] || {}),
                  }}
                >
                  {groupStatusIdentifier({
                    group,
                  })}
                </span>
              </div>
            </ResultWrapper>
          );
        })
      )}
    </TabPanel>
  );
};

export default TabStudent;
