import React, { FC } from "react";
import { Empty } from "antd";
import { ISearchLead } from "types/globalSearch";
import { CircleImage, PhoneCell } from "components";
import { fontSizes, textColors } from "styles/theme";
import {
  ButtonsWrapper,
  NameWrapper,
  PhoneAndButtonsWrapper,
  PhoneWrapper,
  ResultWrapper,
  Left,
  Right,
  StatusBox,
} from "../../../style";
import Box from "@mui/material/Box";
import { TabPanelProps } from "../../tabs";
import { ITabLeads } from "./type";
import { IUserPhone } from "types/userPhone";
import { leadColors, leadStatusNames } from "../../../../../constants";

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

const TabStudent: FC<ITabLeads> = (props) => {
  const { value, data } = props;

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
    <TabPanel value={value} index={3}>
      {(data?.data?.leads === undefined || data?.data?.leads.length === 0) && (
        <div>
          <Empty style={{ paddingTop: "45px" }} />
        </div>
      )}
      {data?.data?.leads?.map((user: ISearchLead, index: number) => {
        return (
          <ResultWrapper key={`${user?.id}_${index}`}>
            <Left>
              <div>
                <CircleImage style={{ borderRadius: "50%" }} alt={user.name} />
              </div>
              <div>
                <NameWrapper
                  className="dark"
                  href={{
                    pathname: `/leads`,
                    query: {
                      search: user.main_phone ?? user?.phones,
                    },
                  }}
                >
                  {user.name}
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
                        value={phoneEditor(
                          `${
                            user.main_phone && user?.phones
                              ? `100:${user.main_phone}:1,`
                              : `100:${user.main_phone}:1`
                          }${
                            user.main_phone && user?.phones
                              ? `${user?.phones}:0`
                              : user?.phones
                                ? `${user?.phones}`
                                : ""
                          }`,
                        )}
                      />
                    </PhoneWrapper>
                  </ButtonsWrapper>
                </PhoneAndButtonsWrapper>
              </div>
            </Left>
            <Right>
              <StatusBox
                style={
                  leadColors[user?.status as unknown as keyof typeof leadColors]
                }
              >
                {
                  leadStatusNames?.[
                    user?.status as unknown as keyof typeof leadStatusNames
                  ]?.name
                }
              </StatusBox>
            </Right>
          </ResultWrapper>
        );
      })}
    </TabPanel>
  );
};

export default TabStudent;
