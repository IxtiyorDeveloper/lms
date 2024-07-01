import { FC } from "react";
import { Wrapper } from "./style";
import { IErrorLabelProps } from "./type";

const ErrorLabel: FC<IErrorLabelProps> = ({ error }) => {
  if (!error) return null;
  return (
    <Wrapper>
      <p>{error}</p>
    </Wrapper>
  );
};

export default ErrorLabel;
