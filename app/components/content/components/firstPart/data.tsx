import { bgColors, textColors } from "styles/theme";
import {
  Cell,
  LittleShareOutlineSvg,
  TableHeading,
  UserRoundSvg,
} from "components";
import * as React from "react";
import { useMemo } from "react";

export const takeModalData = [
  {
    tabId: 1,
    title: "Continue",
    color: textColors.sceptreBlue,
    svg: <UserRoundSvg color={bgColors.orange} height={50} width={50} />,
    styles: {
      backgroundColor: bgColors.brilliance,
      boxShadow: "inset 0 0 50px rgba(253, 191, 118, 0.2)",
      borderRadius: "4px",
    },
    activeStyles: {
      boxShadow: "inset 0 0 110px rgba(253, 191, 118, 0.5)",
    },
  },
  {
    tabId: 2,
    title: "Transfer",
    color: textColors.sceptreBlue,
    svg: <LittleShareOutlineSvg color={bgColors.deep} height={50} width={50} />,
    styles: {
      backgroundColor: bgColors.brilliance,
      boxShadow: "inset 0 0 50px rgba(191, 209, 255, 0.2)",
      borderRadius: "4px",
    },
    activeStyles: {
      boxShadow: "inset 0 0 110px rgba(191, 209, 255, 0.5)",
    },
  },
];
export const options = [
  {
    label: "Label 1",
  },
  {
    label: "Label 2",
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
        accessor: "name",
        Footer: "name",
        Header: <TableHeading>Name</TableHeading>,
        Cell: (props: any) => {
          return <Cell>some ting</Cell>;
        },
      },
      {
        accessor: "Surname",
        Footer: "Surname",
        Header: <TableHeading>Surname</TableHeading>,
        Cell: (props: any) => {
          return <Cell>some ting</Cell>;
        },
      },
    ];
  }, []);
};
