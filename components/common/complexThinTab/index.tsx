import React from "react";
import { Box, Tab } from "@mui/material";

import { TTab } from "./type";
import { StyledTabs, TabWrapper } from "./style";
import { bgColors, borders, textColors } from "styles/theme";
import { useRouter } from "next/router";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isDefault?: boolean;
  paddingTab?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, isDefault, ...other } = props;

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
      {value === index && <Box sx={{ p: isDefault ? 3 : 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ComplexThinTab(props: TTab) {
  const [value, setValue] = React.useState(props.initValue || 0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };
  return (
    <TabWrapper paddingTab={props.paddingTab}>
      <Box
        sx={{
          display: "flex",
          flexDirection: props.reversed ? "row-reverse" : "reverse",
          justifyContent: "space-between",
          padding: props.isDefault ? `${props.headPadding}px` || 10 : "unset",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          ...props.headStyle,
        }}
        style={props?.styles}
      >
        {props.label}
        <StyledTabs
          centered={props.centered}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="simple auto example"
          TabIndicatorProps={{
            sx: props.isDefault
              ? {
                  boxShadow: "0 0 1px rgba(0, 0, 0, 0.1)",
                  backgroundColor: bgColors.primary,
                  borderRadius: borders.b6,
                  height: "100%",
                  zIndex: 1,
                }
              : {},
          }}
          style={{
            backgroundColor: props.isDefault ? bgColors.whiteSmoke : "unset",
            marginLeft: props.p?.pl,
            marginRight: props.p?.pr,
          }}
        >
          {props.menu.map((e, index) => {
            return (
              <Tab
                key={`${index}_key_`}
                sx={{
                  zIndex: 2,
                  padding: 0,
                  height: props.isDefault ? props.heightTab || "28px" : "45px",
                  width: `fit-content`,
                  textTransform: "none",
                }}
                onClick={() =>
                  e.isClickable &&
                  router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, ...e.query },
                  })
                }
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
        <div style={{ paddingRight: props.isDefault ? "unset" : "20px" }}>
          {props.topLeftChildren}
        </div>
      </Box>
      {props.menu.map((e, index) => {
        return (
          <TabPanel
            isDefault={props.isDefault}
            key={`${index}_key`}
            value={value}
            index={index}
          >
            {e.children}
          </TabPanel>
        );
      })}
    </TabWrapper>
  );
}

export default ComplexThinTab;

ComplexThinTab.defaultProps = {
  isDefault: true,
  centered: false,
  paddingTab: "0 8px",
  reversed: false,
};
