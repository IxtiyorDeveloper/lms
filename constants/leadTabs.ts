import { bgColors, textColors } from "../styles/theme";

export enum LeadTabEnums {
  NEW_LEADS = 200,
  PROCESSING_LEADS = 300,
  REGISTERED_LEADS = 400,
  DELETED_LEADS = 100,
}

export enum DeletedFromLeads {
  NEW = 200,
  PROCESSING = 300,
}

export const deletedFromLeadsOptions = [
  {
    value: DeletedFromLeads.NEW,
    label: "New Leads",
  },
  {
    value: DeletedFromLeads.PROCESSING,
    label: "Processing Leads",
  },
];

export enum LeadSourceTypes {
  COMMUNITY_MANAGER = 100,
  OTHER = 200,
}

export const leadColors = {
  [LeadTabEnums.NEW_LEADS]: {
    backgroundColor: bgColors.primary,
    color: textColors.blueGray,
  },
  [LeadTabEnums.PROCESSING_LEADS]: {
    backgroundColor: bgColors.deep,
    color: textColors.brilliance,
  },
  [LeadTabEnums.REGISTERED_LEADS]: {
    backgroundColor: bgColors.secondary,
    color: textColors.brilliance,
  },
  [LeadTabEnums.DELETED_LEADS]: {
    backgroundColor: bgColors.pop,
    color: textColors.brilliance,
  },
};

export const leadStatusNames = {
  [LeadTabEnums.NEW_LEADS]: {
    name: "New",
  },
  [LeadTabEnums.PROCESSING_LEADS]: {
    name: "Processing",
  },
  [LeadTabEnums.REGISTERED_LEADS]: {
    name: "Registered",
  },
  [LeadTabEnums.DELETED_LEADS]: {
    name: "Deleted",
  },
};
