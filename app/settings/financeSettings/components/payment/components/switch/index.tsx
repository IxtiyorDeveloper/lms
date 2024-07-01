import React from "react";
import Switch from "components/antd/switch";
import { Switcher } from "../../style";
import { Wrapper } from "./style";
import { Button } from "components";
import { useController } from "react-hook-form";

interface IProps {
  control: any;
  name: string;
  label: string;
  info: string;
  onSubmit: any;
  handleSubmit: any;
}

const SwitchPayment = ({
  control,
  name,
  label,
  info,
  onSubmit,
  handleSubmit,
}: IProps) => {
  const {
    formState: { errors },
  } = useController({ control, name });
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <p className="info">{info}</p>
      <div className="divider" />
      <Switcher className="switcher">
        <div className="switch-wrap">
          <Switch
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            labelStyle={{ marginTop: "10px" }}
            label={label}
            name={name}
            control={control}
            error={errors.root?.message}
          />
        </div>
      </Switcher>
      <div className="buttons">
        <Button type="submit">Save</Button>
      </div>
    </Wrapper>
  );
};

export default SwitchPayment;
