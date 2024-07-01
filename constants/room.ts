export const ROOM_TYPES_ACADEMIC = 100;
export const ROOM_TYPES_ADMINISTRATIVE = 200;
export const ROOM_TYPES_OTHER = 300;

export const ROOM_STATUS_ACTIVE = 100;
export const ROOM_STATUS_ARCHIVED = 300;
export const ROOM_STATUS_MAINTENANCE = 200;

export const RoomStatus = {
  [ROOM_STATUS_ACTIVE]: "Active",
  [ROOM_STATUS_ARCHIVED]: "Archived",
  [ROOM_STATUS_MAINTENANCE]: "Maintenance",
};

export const RoomTypes = {
  [ROOM_TYPES_ACADEMIC]: "Academic",
  [ROOM_TYPES_ADMINISTRATIVE]: "Administrative",
  [ROOM_TYPES_OTHER]: "Other",
};

export const RoomTypesSelect = [
  {
    label: "Academic",
    value: `${ROOM_TYPES_ACADEMIC}`,
  },
  {
    label: "Administrative",
    value: `${ROOM_TYPES_ADMINISTRATIVE}`,
  },
  {
    label: "Other",
    value: `${ROOM_TYPES_OTHER}`,
  },
];
