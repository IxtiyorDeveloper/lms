import * as React from "react";
import Box from "@mui/material/Box";
import { Wrapper } from "../style";
import { statuses } from "constants/studentStatuses";
import { StudentStat, StudentType } from "types";
import { IGlobalSearch } from "types/globalSearch";
import {
  Loader,
  TabGroups,
  TabLeads,
  TabsHead,
  TabStaff,
  TabStudent,
} from "./components";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

export default function ColorTabs({
  data = {
    data: { groups: [], staff_list: [], leads: [], students: [] },
    isLoading: true,
  },
}: {
  data: { data: IGlobalSearch; isLoading: boolean };
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const statusRender = (user: any) => {
    if (+user.student_type == StudentType.TYPE_BANNED) {
      return "Banned";
    }

    if (
      user.student_status.toString() ===
        StudentStat.STUDENT_WAITING.toString() ||
      user.student_status.toString() === StudentStat.STUDENT_ARCHIVED.toString()
    ) {
      const obj = {
        [StudentStat.STUDENT_WAITING.toString()]: "Waiting",
        [StudentStat.STUDENT_ARCHIVED.toString()]: "Archived",
      };
      return obj[user.student_status as keyof typeof obj];
    } else {
      return statuses[user.status as keyof typeof statuses];
    }
  };

  return (
    <Wrapper>
      <Box
        sx={{
          width: "100%",
          minWidth: "450px",
          position: "relative",
          maxHeight: "481px",
        }}
      >
        <Loader isLoading={data.isLoading} />
        <TabsHead value={value} handleChange={handleChange} data={data} />
        <TabStudent value={value} statusRender={statusRender} data={data} />
        <TabGroups value={value} data={data} />
        <TabStaff value={value} data={data} />
        <TabLeads value={value} data={data} />
      </Box>
    </Wrapper>
  );
}
