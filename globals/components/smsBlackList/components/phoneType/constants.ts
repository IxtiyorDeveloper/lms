import {
  HomePhone,
  MainPhone,
  OtherPhone,
  ParentsPhone,
} from "constants/phoneTypes";
import { CircleSuccessSvg, ParentsSvg } from "components";

export const data = {
  [MainPhone]: {
    icon: CircleSuccessSvg,
    title: "Main",
    className: "circle",
  },
  [ParentsPhone]: {
    icon: ParentsSvg,
    title: "Parent",
    className: "circle circle-parents",
  },
  [HomePhone]: {
    icon: "/home.png",
    title: "Home",
    className: "circle circle-home",
  },
  [OtherPhone]: {
    icon: "/other.png",
    title: "Other",
    className: "circle circle-other",
  },
};
