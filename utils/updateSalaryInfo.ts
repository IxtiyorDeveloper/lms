import {
  IAggregated,
  ISalaryMain,
  salaryFieldTypes,
} from "../types/finance/salary";
import { SalaryEnums, TAssignment } from "../types";

export function updateCardProperty({
  assignmentId,
  result_assignment,
  mainSalary,
}: {
  assignmentId: string | number;
  result_assignment: TAssignment;
  mainSalary: ISalaryMain[] | undefined;
}) {
  return mainSalary?.map((obj) => {
    if (obj.assignments && obj.assignments.length > 0) {
      const assignments = obj.assignments.map((assignment) => {
        if (assignment.id == assignmentId) {
          return result_assignment;
        }
        return assignment;
      });
      return {
        ...obj,
        assignments,
      };
    }
    return obj;
  });
}

export function addSalaryComponent({
  assignmentId,
  component,
  mainSalary,
}: {
  assignmentId?: string | number;
  mainSalary: ISalaryMain[] | undefined;
  component: TAssignment;
}) {
  return mainSalary?.map((obj) => {
    if (obj.assignments && obj.assignments.length > 0) {
      const assignments = obj.assignments.map((assignment) => {
        if (assignment.id == assignmentId) {
          return component;
        }
        return assignment;
      });
      return {
        ...obj,
        assignments,
      };
    }
    return obj;
  });
}

export function removeSalaryComponent({
  assignmentId,
  mainSalary,
  result_assignment,
}: {
  assignmentId: string | number;
  mainSalary: ISalaryMain[] | undefined;
  result_assignment: TAssignment;
}) {
  return mainSalary?.map((obj) => {
    if (obj.assignments && obj.assignments.length > 0) {
      const assignments = obj.assignments.map((assignment) => {
        if (assignment.id == assignmentId) {
          return result_assignment;
        }
        return assignment;
      });
      return {
        ...obj,
        assignments,
      };
    }
    return obj;
  });
}

export function giveSalaryClient({
  assignmentId,
  mainSalary,
}: {
  assignmentId: string | number;
  mainSalary: ISalaryMain[] | undefined;
}) {
  return mainSalary?.map((obj) => {
    if (obj.assignments && obj.assignments.length > 0) {
      const assignments = obj.assignments.map((assignment) => {
        if (assignment.id == assignmentId) {
          return {
            ...assignment,
            isGiven: true,
          };
        }
        return assignment;
      });
      return {
        ...obj,
        assignments,
      };
    }
    return obj;
  });
}
