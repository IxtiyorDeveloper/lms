import React from "react";
import { Box, Tab, Typography } from "@mui/material";

import { TTab } from "./type";
import { StyledTabs, TabWrapper } from "./style";
import { bgColors, borders, textColors } from "styles/theme";
import { useRouter } from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  key?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, key, ...other } = props;
  return (
    <div
      key={key}
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
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const tabWidth = props.tabWidth
    ? {
        width: props.tabWidth,
        minHeight: props.forAttendance ? "10px" : "48px",
      }
    : { width: "100%", minHeight: props.forAttendance ? "10px" : "48px" };

  return (
    <TabWrapper forAttendance={props.forAttendance}>
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="simple auto example"
          TabIndicatorProps={{
            style: {
              display: props.forAttendance ? "none" : "flex",
            },
            sx: {
              boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
              backgroundColor: bgColors.primary,
              borderRadius: borders.b6,
              height: props.forAttendance ? "0" : "100%",
              zIndex: 1,
            },
          }}
          style={{
            backgroundColor: bgColors.whiteSmoke,
            marginLeft: props.p?.pl,
            marginRight: props.p?.pr,
            borderRadius: props.forAttendance ? "50px" : "8px",
            ...tabWidth,
          }}
          TabScrollButtonProps={{
            sx: {
              display: "flex",
              alignSelf: "center",
            },
          }}
        >
          {props.menu?.map((menu, index) => {
            return (
              <Tab
                key={`${index}_key_`}
                style={{
                  padding: 0,
                }}
                sx={{
                  zIndex: 2,
                  padding: 0,
                  height: props.forAttendance ? "auto" : "50px",
                  textTransform: "none",
                  justifyContent: props.forAttendance ? "flex-start" : "",
                  minWidth: props.forAttendance ? "50%" : "92px",
                  minHeight: props.forAttendance ? "0" : "48px",
                  width: props.forAttendance
                    ? "10px"
                    : props.tabItemWidth
                      ? `${props.tabItemWidth}!important`
                      : `${100 / props.menu.length}%`,
                }}
                onClick={() =>
                  menu.isClickable &&
                  router.replace(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, ...menu.query },
                    },
                    undefined,
                    { scroll: false },
                  )
                }
                color="red"
                label={
                  <div style={{ color: textColors.sceptreBlue }}>
                    {menu.icon && (
                      <Box mb="3px">
                        {
                          <menu.icon
                            isActive={value === index}
                            color={
                              value === index
                                ? textColors.dark
                                : textColors.yourShadow
                            }
                          />
                        }
                      </Box>
                    )}
                    {!props.forAttendance && (
                      <Typography className="tabLabel">{menu.label}</Typography>
                    )}
                  </div>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </StyledTabs>
        {props.action}
      </div>
      {props.menu?.map((menu, index) => {
        return (
          <React.Fragment key={index}>
            <TabPanel value={value} index={index}>
              {menu.children}
            </TabPanel>
          </React.Fragment>
        );
      })}
    </TabWrapper>
  );
}

export default StudentTab;
