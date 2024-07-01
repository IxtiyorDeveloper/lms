import { EFieldType, IObservationEnum } from "types/observation";

export function restructureObject({
  values,
  enums,
}: {
  values: { [x: string]: any };
  enums: IObservationEnum | undefined;
}) {
  const resultArray = [];

  // Iterate through the keys of the input object
  for (const key in values) {
    if (key.startsWith("input_")) {
      const [, group, keyNumber] = key.split("_").map(Number);
      const comment = values[key]; // Replace with actual comment logic
      const structure = enums?.structure?.find((f) => f.group == group);
      const type = structure?.type;
      // Find or create the group in the result array
      let groupObj: any = resultArray.find((item) => item.group === group);
      if (!groupObj) {
        groupObj = {
          group,
          type,
          aspects: [],
        };
        resultArray.push(groupObj);
      }
      if (type == EFieldType.Rating) {
        // Add the aspect to the group
        const score = values?.[`rate_${group}_${keyNumber}`];
        groupObj.aspects.push({
          key: keyNumber,
          score,
          comment,
        });
      } else {
        // Add the aspect to the group
        groupObj.aspects.push({
          key: keyNumber,
          comment,
        });
      }
    }
  }

  return resultArray;
}
