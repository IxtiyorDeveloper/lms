import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import {
  STATE_CLOSING,
  STATE_OPENED,
  STATE_RUNNING,
} from "../../../../../../../constants/groupStatus";

export const defaultGroupTab = [
  {
    label: "All",
    value: "0",
  },
  {
    label: "Group",
    value: `${GROUP_FORM_GROUP}`,
  },
  {
    label: "Individual",
    value: `${GROUP_FORM_INDIVIDUAL}`,
  },
];

export const statusesGroupTab = [
  {
    label: "All",
    value: "0",
  },
  {
    label: "Opened",
    value: `${STATE_OPENED}`,
  },
  {
    label: "Running",
    value: `${STATE_RUNNING}`,
  },
  {
    label: "Closing",
    value: `${STATE_CLOSING}`,
  },
];
