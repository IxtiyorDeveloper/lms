import { Controller, useController } from "react-hook-form";
import React, { Fragment, useEffect } from "react";

const Bool = ({
  control,
  name,
  value,
}: {
  control: any;
  name: string;
  value: boolean;
}) => {
  const { field } = useController({ control, name });
  useEffect(() => {
    field.onChange(value);
  }, [value, name]);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value || true}
      render={({}) => {
        return <Fragment></Fragment>;
      }}
    />
  );
};
export default Bool;
