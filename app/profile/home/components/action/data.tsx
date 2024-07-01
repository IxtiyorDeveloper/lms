import {
  BranchesMapSvg,
  ChangePasswordSvg,
  FaqSvg,
  FilesSvg,
  SettingsSvg,
} from "components";
import { bgColors } from "styles/theme";

export enum ProfileActionTypes {
  SETTINGS = "Settings",
  RULES = "Rules",
  FAQ = "Faq",
  BRANCHES = "Branches",
  PASSWORD = "Password",
}

export const data = [
  {
    type: ProfileActionTypes.SETTINGS,
    title: "Settings",
    svg: <SettingsSvg />,
  },
  {
    type: ProfileActionTypes.RULES,
    title: "Rules & Contracts",
    svg: <FilesSvg />,
  },
  {
    type: ProfileActionTypes.FAQ,
    title: "FAQ",
    svg: <FaqSvg />,
  },
  {
    type: ProfileActionTypes.BRANCHES,
    title: "Branches on the map",
    svg: <BranchesMapSvg />,
  },
  {
    type: ProfileActionTypes.PASSWORD,
    title: "Change Password",
    svg: <ChangePasswordSvg color={bgColors.yourShadow} />,
  },
];
