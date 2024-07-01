import { ESortTypes, TAssignment } from "types";

export function handleSort({
  watchAll,
  assignments,
}: {
  watchAll: any;
  assignments: TAssignment[];
}) {
  let column: any = watchAll?.sort?.field;
  let type: ESortTypes = watchAll?.sort?.type;

  if (column) {
    if (type === ESortTypes.asc) {
      return assignments
        .slice()
        .sort(
          (a, b) => +a[column as keyof typeof a] - +b[column as keyof typeof b],
        );
    }
    if (type === ESortTypes.desc) {
      return assignments
        .slice()
        .sort(
          (a, b) => +b[column as keyof typeof b] - +a[column as keyof typeof a],
        );
    }
  } else return assignments;
}
