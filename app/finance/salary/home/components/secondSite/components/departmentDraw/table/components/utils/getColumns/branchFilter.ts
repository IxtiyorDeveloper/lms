import { TAssignment } from "types";

export function filterDataByBranches({
  data,
  branchIds,
}: {
  data: TAssignment[] | undefined;
  branchIds: string[];
}) {
  if (!!branchIds?.length)
    return data?.filter((item) => {
      return item.receiver.branch_ids?.some((id) =>
        branchIds?.includes(id?.toString()),
      );
    });
  else return data;
}
