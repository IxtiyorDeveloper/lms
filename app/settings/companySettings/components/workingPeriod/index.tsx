import React, { FC, useMemo } from "react";
import { Wrapper, Label, Content } from "./style";
import { IWPeriod } from "./type";
import Table from "./table";
import { Stack, styled, Switch } from "@mui/material";
import { bgColors } from "styles/theme";

const data = [
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Monday",
    action: true,
    from: "07:30",
    to: "20:00",
  },
];

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: bgColors.white,
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? bgColors.primary : bgColors.primary,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark" ? bgColors.midnight : bgColors.midnight,
    boxSizing: "border-box",
  },
}));

const WorkingPeriod: FC<IWPeriod> = ({ label, control }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Days",
        accessor: "day",
        Footer: "Days",
      },
      {
        Header: "Actions",
        accessor: "action",
        Footer: "Actions",
        Cell: (boolean: boolean) => {
          return (
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                defaultChecked={boolean}
                inputProps={{ "aria-label": "ant design" }}
              />
            </Stack>
          );
        },
      },
      {
        Header: "From",
        accessor: "from",
        Footer: "from",
      },

      {
        Header: "To",
        accessor: "to",
        Footer: "to",
      },
    ],
    [data]
  );
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Content>
        <Table columns={columns} data={data} control={control} />
      </Content>
    </Wrapper>
  );
};

export default WorkingPeriod;
