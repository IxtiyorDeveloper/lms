import React from "react";
import { Wrapper } from "./style";
import { Button } from "components";

interface IProps {
  control: any;
  onSubmit: any;
  handleSubmit: any;
  children?: any;
  info: any;
}

const ContainerPayment = ({
  control,
  onSubmit,
  handleSubmit,
  children,
  info,
}: IProps) => {
  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <p className="info">{info}</p>
      <div className="divider" />
      <div>{children}</div>
      <div className="buttons">
        <Button type="submit">Save</Button>
      </div>
    </Wrapper>
  );
};

export default ContainerPayment;
