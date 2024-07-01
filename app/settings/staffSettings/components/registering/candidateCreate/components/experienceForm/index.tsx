import React, { FC } from "react";
import { Text } from "../../style";
import { Control } from "react-hook-form";
import { Wrapper } from "./style";
import ExperienceFormItem from "./form";
import { ErrorLabel } from "components";

interface IProps {
  control: Control<any>;
  errors: any;
}

const ExperienceForm: FC<IProps> = (props) => {
  const { control, errors } = props;

  return (
    <Wrapper>
      <Text>Experience</Text>
      <ExperienceFormItem control={control} errors={errors} />{" "}
    </Wrapper>
  );
};

export default ExperienceForm;
