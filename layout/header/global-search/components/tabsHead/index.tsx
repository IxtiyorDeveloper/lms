import React, { FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Count, Wrapper } from "./style";
import { fontSizes } from "styles/theme";
import { ITabsHeader } from "./type";

export function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TabsHeader: FC<ITabsHeader> = (props) => {
  const { value, handleChange, data } = props;

  return (
    <Wrapper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <Tab
          label={
            <div className="capitalize">
              Student <Count>{data?.data?.students?.length || 0}</Count>
            </div>
          }
          className="tab"
          {...a11yProps(0)}
        />
        <Tab
          label={
            <div className="capitalize">
              Group <Count>{data?.data?.groups?.length || 0}</Count>
            </div>
          }
          style={{
            fontSize: fontSizes.f12,
            padding: 0,
            minHeight: "10px",
            marginTop: "22px",
          }}
          {...a11yProps(1)}
        />
        <Tab
          label={
            <div style={{ textTransform: "capitalize" }}>
              Staff <Count>{data?.data?.staff_list?.length || 0}</Count>
            </div>
          }
          style={{
            fontSize: fontSizes.f12,
            padding: 0,
            minHeight: "10px",
            marginTop: "22px",
          }}
          {...a11yProps(2)}
        />
        <Tab
          label={
            <div style={{ textTransform: "capitalize" }}>
              Lead <Count>{data?.data?.leads?.length || 0}</Count>
            </div>
          }
          style={{
            fontSize: fontSizes.f12,
            padding: 0,
            minHeight: "10px",
            marginTop: "22px",
          }}
          {...a11yProps(3)}
        />
      </Tabs>
    </Wrapper>
  );
};

export default TabsHeader;
