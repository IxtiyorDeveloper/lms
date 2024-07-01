import React, { FC, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { KPIInputs } from "../../../kpiInputs";

interface IPropsKpiForm {
  control: any;
  selects: any;
  index: number;
  removeItem: (index: number) => void;
  item: any;
}

const ExclusionItem: FC<IPropsKpiForm> = ({
  control,
  index,
  selects,
  removeItem,
  item,
}) => {
  const {
    fields: teachingFields,
    remove: teachingRemove,
    append: teachingAppend,
  } = useFieldArray({ control, name: `exclusions.${index}.ranges` });

  useEffect(() => {
    teachingFields.length === 0 && teachingAppend({});
  }, [teachingFields]);
  return (
    <div>
      {
        KPIInputs({
          control,
          index,
          name: "exclusions",
          teachingFields,
          teachingRemove,
          teachingAppend,
        })?.[item as keyof typeof KPIInputs]
      }
    </div>
  );
};

export default ExclusionItem;
