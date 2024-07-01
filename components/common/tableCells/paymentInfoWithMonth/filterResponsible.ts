import { IContactResponsible } from "types/contactResponsible";
import { ADDED_BY, TRANSFERRED_BY } from "constants/contactResponsibles";
import { SvgTypes } from "./type";

export const filterResponsible = (
  contactResponsibles: IContactResponsible[] | undefined
) => {
  if (contactResponsibles) {
    const added_by = contactResponsibles?.find((res) => res?.type == ADDED_BY);
    const transferred_by = contactResponsibles?.find(
      (res) => res?.type == TRANSFERRED_BY
    );
    if (added_by?.user?.id == transferred_by?.user?.id || !transferred_by) {
      return [
        {
          person: added_by,
          type: SvgTypes.TRANSFER,
        },
        {
          person: added_by,
          type: SvgTypes.GIFT,
        },
      ];
    } else {
      if (transferred_by && added_by) {
        return [
          {
            person: added_by,
            type: SvgTypes.GIFT,
          },
          {
            person: transferred_by,
            type: SvgTypes.TRANSFER,
          },
        ];
      }
    }
  }
};
