import React from "react";
import { IUserPhone } from "types/userPhone";

export type ColumnType =
  | {
      Header: JSX.Element;
      accessor: string;
      Footer: string;
      Cell: React.NamedExoticComponent<{
        value?: IUserPhone[];
        style?: React.CSSProperties;
      }>;
    }
  | {
      Header: JSX.Element;
      accessor: string;
      Footer: string;
      Cell: (props: any) => JSX.Element;
    }
  | {
      Header: string;
      accessor: string;
      Footer: string;
      Cell: (props: any) => JSX.Element;
    };
