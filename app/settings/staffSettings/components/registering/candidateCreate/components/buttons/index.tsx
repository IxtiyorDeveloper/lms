import React, { FC } from "react";
import { ButtonGroup, Wrapper } from "./style";
import { Button } from "components";
import Router from "next/router";

interface IProps {
  isLoading: boolean;
}

const ButtonsComp: FC<IProps> = (props) => {
  const { isLoading } = props;

  return (
    <Wrapper>
      <ButtonGroup>
        <Button onClick={() => Router.back()} className="btn-secondary">
          Cancel
        </Button>
        <Button type="submit" buttonLoading={isLoading}>
          Save
        </Button>
      </ButtonGroup>
    </Wrapper>
  );
};

export default ButtonsComp;
