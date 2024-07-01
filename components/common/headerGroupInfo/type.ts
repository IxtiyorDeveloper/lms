import React from "react";

export type TGroupInfoItem = {
  title: string;
  text?: string;
  svg?: React.ReactNode;
  url?: {
    full_url: string;
    children: { full_url: string; resolution: string }[];
  };
};
