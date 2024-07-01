import React from "react";
import { Box, Typography } from "@mui/material";
import {
  StudentTabBody,
  StudentTabIndexText,
  StudentTabItem,
  StudentTableBox,
  StudentTableHeader,
} from "./style";
import { textColors } from "styles/theme";
import Image from "next/image";
import {
  AddNewForNewDaySvg,
  ComeSvg,
  Podo,
  StudentTableHeaderIconSvg,
} from "components";

function Attendance(props: any) {
  return (
    <StudentTableBox {...props}>
      <StudentTableHeader>
        <StudentTabItem
          minWidth="290px!important"
          sx={{ justifyContent: "flex-start!important", paddingLeft: "43px" }}
        >
          <StudentTableHeaderIconSvg />
          <StudentTabIndexText
            style={{ color: textColors.yourShadow, marginLeft: "15px" }}
          >
            Students
          </StudentTabIndexText>
        </StudentTabItem>
        <Box>
          <Box className="childBox" overflow="hidden">
            <StudentTabItem>
              <StudentTabIndexText>5</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>7</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>9</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>11</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>13</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>15</StudentTabIndexText>
            </StudentTabItem>
            <StudentTabItem>
              <StudentTabIndexText>17</StudentTabIndexText>
            </StudentTabItem>
          </Box>
        </Box>
      </StudentTableHeader>
      <StudentTabBody>
        {props.students?.map((student: any, index: number) => {
          return (
            <StudentTableHeader
              key={`student_${index}_`}
              className="scrollHide"
            >
              <StudentTabItem
                minWidth="290px!important"
                sx={{
                  justifyContent: "flex-start!important",
                  paddingLeft: "14px",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "12px",
                    lineHeight: "12px",
                    color: textColors.sceptreBlue,
                    width: "14px",
                  }}
                >
                  {index + 1}
                </Typography>
                <Image
                  src="/avatar_table.png"
                  alt="avatar"
                  width="30"
                  height="30"
                  style={{ marginLeft: "10px" }}
                />
                <StudentTabIndexText
                  style={{ color: textColors.yourShadow, marginLeft: "15px" }}
                >
                  Ibrokhim Butaev
                </StudentTabIndexText>
                <Box sx={{ marginLeft: "auto", marginRight: "10px" }}>
                  <Podo size="small" />
                </Box>
              </StudentTabItem>
              <Box>
                <Box className="childBox scrollHide">
                  <StudentTabItem>
                    <ComeSvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <ComeSvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <ComeSvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <ComeSvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <ComeSvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <AddNewForNewDaySvg />
                  </StudentTabItem>
                  <StudentTabItem>
                    <AddNewForNewDaySvg />
                  </StudentTabItem>
                </Box>
              </Box>
            </StudentTableHeader>
          );
        })}
      </StudentTabBody>
    </StudentTableBox>
  );
}

export default Attendance;
