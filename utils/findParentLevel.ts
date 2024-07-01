import { IOption } from "../components/common/select/type";

export const findMethod = (array: { options: any }, id?: number) => {
  if (!!array) {
    for (let i = 0; i < array.options?.length; i++) {
      if (array.options[i].subLevel?.some((p: IOption) => p.value === id)) {
        return array.options[i];
      }
    }
  }
};
