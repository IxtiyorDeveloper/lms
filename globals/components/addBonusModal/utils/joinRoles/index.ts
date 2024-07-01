import { ISalaryMain } from "types/finance/salary";

export const joinRoles = ({ children }: { children: ISalaryMain[] }) => {
  return children.reduce((acc: ISalaryMain[], curr) => {
    const existingIndex = acc.findIndex(
      (item) => item.role.id === curr.role.id
    );
    if (existingIndex !== -1) {
      const mergedAssignments = [
        ...acc[existingIndex].assignments,
        ...curr.assignments,
      ];
      acc[existingIndex] = {
        ...acc[existingIndex],
        assignments: mergedAssignments,
      };
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);
};
