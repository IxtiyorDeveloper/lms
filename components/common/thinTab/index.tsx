import React, { useEffect } from "react";
import { Box, Tab } from "@mui/material";

import { TTab } from "./type";
import { StyledTabs, TabWrapper } from "./style";
import { bgColors, borders, textColors } from "styles/theme";
import Router from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ padding: "0!important" }}
      className="tabPanelP"
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StudentTab(props: TTab) {
  const [value, setValue] = React.useState(props.initValue || 0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  useEffect(() => {
    props.initValue != undefined && setValue(props?.initValue);
  }, [props.initValue]);

  return (
    <TabWrapper paddingTab={props.paddingTab}>
      <Box
        sx={{
          overflow: "hidden",
          position: "relative",
        }}
        style={props?.styles}
      >
        {props.label}
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="simple auto example"
          TabIndicatorProps={{
            sx: {
              boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
              backgroundColor: bgColors.primary,
              borderRadius: borders.b6,
              height: "100%",
              zIndex: 1,
            },
          }}
          style={{
            backgroundColor: bgColors.whiteSmoke,
            marginLeft: props.p?.pl,
            marginRight: props.p?.pr,
          }}
        >
          {props?.menu?.map((e, index) => {
            return (
              <Tab
                key={`${index}_key_`}
                sx={{
                  zIndex: 2,
                  padding: 0,
                  height: "28px",
                  width: `fit-content`,
                  textTransform: "none",
                }}
                onClick={() => {
                  e.isClickable &&
                    Router.replace({
                      pathname: Router.pathname,
                      query: { ...Router.query, ...e.query },
                    });
                }}
                label={
                  <div style={{ color: textColors.sceptreBlue }}>
                    <div className="tabLabel">
                      {e.icon && (
                        <Box className="icon">
                          {
                            <e.icon
                              color={
                                value === index
                                  ? textColors.dark
                                  : props.inactiveIconColor ||
                                    textColors.yourShadow
                              }
                            />
                          }
                        </Box>
                      )}
                      <p
                        className="text"
                        style={{
                          color: `${
                            value === index
                              ? textColors.blueGray
                              : textColors.yourShadow
                          }`,
                        }}
                      >
                        {e.label}
                      </p>
                    </div>
                  </div>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </StyledTabs>
      </Box>
      {props?.menu?.map((e, index) => {
        return (
          <TabPanel key={`${index}_key`} value={value} index={index}>
            {e.children}
          </TabPanel>
        );
      })}
    </TabWrapper>
  );
}

export default StudentTab;

StudentTab.defaultProps = {
  paddingTab: "0 8px",
};
