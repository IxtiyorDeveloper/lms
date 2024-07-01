import { IStaffInitialData } from "types/staffSettings";
import { ageOptions } from "utils/age";

interface IArgs {
  data?: IStaffInitialData;
  optionName: "created_by" | "age" | "gender";
}

type ISelectObj = {
  [key in "created_by" | "age" | "gender"]?: {
    label: string;
    value: string | number;
  }[];
};

export const getOptions = ({ data, optionName = "created_by" }: IArgs) => {
  const selects: ISelectObj = {
    created_by: data?.createdByList.map((person) => {
      const fullName = `${person.userProfile.firstname} ${person.userProfile.lastname}`;
      return {
        label: fullName,
        value: "" + person.userProfile.user_id,
      };
    }),
    age: ageOptions({}),
    gender: [
      { value: "1", label: "Male" },
      { value: "0", label: "Female" },
    ],
  };

  if (Object.hasOwn(selects, optionName)) {
    return selects[optionName];
  } else {
    return [{ value: "", label: "" }];
  }
};
