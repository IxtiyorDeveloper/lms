import { TStudent } from "types";
import { Box, Typography } from "@mui/material";
import React from "react";
import { StyledStudentPageCard } from "../../../style";

function StudentPageCard(props: TStudent) {
  return (
    <StyledStudentPageCard style={props?.style}>
      <Box mb="5px" sx={{ padding: "24px 24px 10px 24px" }}>
        <Typography className="title">{props.title}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>{props.children}</Box>
    </StyledStudentPageCard>
  );
}

export default StudentPageCard;
