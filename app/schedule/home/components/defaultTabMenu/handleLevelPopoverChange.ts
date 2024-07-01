import { FieldValues, UseFormSetValue } from "react-hook-form";

export const handleLevelPopoverChange = ({
  newValue,
  groupStatus,
  setLevelValue,
  groupType,
  subLevel,
  freePlace,
  freePlaceCalculation,
  level,
  exclude_new_opening_group,
  exclude_new_opened_group,
  exclude_closing_group,
}: {
  newValue: boolean;
  groupStatus?: string;
  setLevelValue: UseFormSetValue<FieldValues>;
  groupType?: string;
  subLevel?: string;
  freePlace?: string;
  freePlaceCalculation?: string;
  level?: string;
  exclude_new_opening_group?: string;
  exclude_new_opened_group?: string;
  exclude_closing_group?: string;
}) => {
  if (!newValue) {
    if (!groupStatus) {
      setLevelValue("groupStatus", undefined);
    }
    if (!groupType) {
      setLevelValue("groupType", undefined);
    }
    if (!subLevel) {
      setLevelValue("subLevel", undefined);
    }
    if (!freePlace) {
      setLevelValue("freePlace", undefined);
    }
    if (!freePlaceCalculation) {
      setLevelValue("freePlaceCalculation", undefined);
    }
    if (!level) {
      setLevelValue("level", undefined);
    }
    if (!exclude_new_opening_group) {
      setLevelValue("exclude_new_opening_group", undefined);
    }
    if (!exclude_new_opened_group) {
      setLevelValue("exclude_new_opened_group", undefined);
    }
    if (!exclude_closing_group) {
      setLevelValue("exclude_closing_group", undefined);
    }
  }
};
