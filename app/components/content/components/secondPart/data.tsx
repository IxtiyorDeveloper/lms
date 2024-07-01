import { Cell, TableHeading } from "components";
import * as React from "react";
import { useMemo } from "react";
import { PersonSvg } from "@jasurbekyuldashov/lms-web-icons";

export const options = [
  {
    label: "Label 1",
    icon: <PersonSvg />,
    value: "1",
    key: "1",
  },
  {
    label: "Label 2",
    icon: <PersonSvg />,
    value: "2",
    key: "2",
  },
];

export const circle_options = [
  {
    icon: <PersonSvg />,
    value: "1",
  },
  {
    icon: <PersonSvg />,
    value: "2",
  },
];
export const tabs = [
  {
    title: () => {
      return "Label 1";
    },
  },
  {
    title: () => {
      return "Label 2";
    },
  },
];
export const Columns = () => {
  return useMemo(() => {
    return [
      {
        title: <TableHeading>Name</TableHeading>,
        render: (props: any) => {
          return <Cell>some ting</Cell>;
        },
      },
      {
        title: <TableHeading>Surname</TableHeading>,
        render: (props: any) => {
          return <Cell>some ting</Cell>;
        },
      },
    ];
  }, []);
};
