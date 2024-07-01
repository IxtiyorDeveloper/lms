import { convertToArray } from "utils/convertToArray";
import { IMatchGroup } from "types";

export const getFilteredRecommendation = ({
  recommendation,
}: {
  recommendation: IMatchGroup | undefined;
}) => {
  const watchBranches: any = convertToArray({ routerKey: "branch_id" });
  let a: any = {};
  if (recommendation)
    for (const [key, value] of Object.entries(recommendation)) {
      const filtered = value?.filter((g) =>
        watchBranches?.includes(g?.room?.branch?.id?.toString()),
      );
      a = {
        ...a,
        [key]: filtered,
      };
    }
  return a;
};
