import { IGroup } from "types";
import { STATE_CLOSING, STATE_OPENING } from "constants/groupStatus";

export const identifyGroup = ({
  groups,
}: {
  groups: IGroup[] | undefined;
}): {
  main_group: IGroup | undefined;
  shadow_group?: IGroup;
  l: number;
} => {
  if (groups) {
    if (groups?.length == 1) {
      return {
        main_group: groups[0],
        l: 1,
      };
    } else {
      const allClosing = groups?.every(
        (s) => s.state?.toString() === STATE_CLOSING?.toString()
      );
      if (allClosing) {
        let main_group = groups[0];
        let shadow_group = groups[1];
        return {
          main_group,
          shadow_group,
          l: 2,
        };
      } else {
        let main_group = groups?.find(
          (g) => g.state?.toString() !== STATE_CLOSING?.toString()
        );
        let shadow_group = groups?.find(
          (g) => g.state?.toString() == STATE_CLOSING?.toString()
        );
        return {
          main_group,
          shadow_group,
          l: 2,
        };
      }
    }
  } else
    return {
      main_group: undefined,
      l: 0,
    };
};
