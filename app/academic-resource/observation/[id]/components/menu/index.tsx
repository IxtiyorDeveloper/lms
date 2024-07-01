import { IObservationEnum } from "types/observation";

const Menu = ({ enums }: { enums: IObservationEnum | undefined }) => {
  let array: any = [];
  if (enums?.structure?.length)
    for (let i = 0; i < enums?.structure?.length; i++) {
      const sEnum = enums.structure[i];
      array = [
        ...array,
        {
          label: sEnum.group_label,
          value: sEnum.group?.toString(),
        },
      ];
    }
  return array;
};

export default Menu;
