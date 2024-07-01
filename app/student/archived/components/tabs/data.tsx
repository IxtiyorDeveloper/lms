import { AttendSvg, ColoredAttendSvg } from "components";
import React from "react";

export const tabContent = [
  {
    previous_place: 100,
    title: "Waiting List",
    svg: "",
    columns: [
      "profile",
      "phone",
      "stoppedReason",
      "note",
      "level",
      "branch",
      "archivedDate",
      "labels",
      "actions",
    ],
  },
  {
    previous_place: 200,
    title: "Regularly",
    svg: "",
    columns: [
      "profile",
      "phone",
      "info",
      "stoppedCategory",
      "stoppedReason",
      "note",
      "archivedDate",
      "labels",
      "actions",
    ],
  },
  {
    previous_place: 300,
    title: "Not Attend (New Student)",
    svg: <AttendSvg width={20} height={20} />,
    columns: [
      "profile",
      "phone",
      "info",
      "stoppedCategory",
      "stoppedReason",
      "note",
      "archivedDate",
      "labels",
      "actions",
    ],
  },
  {
    previous_place: 400,
    title: "Attend (New Student)",
    svg: <ColoredAttendSvg width={20} height={20} />,
    columns: [
      "profile",
      "phone",
      "info",
      "stoppedCategory",
      "stoppedReason",
      "note",
      "archivedDate",
      "labels",
      "actions",
    ],
  },
];
