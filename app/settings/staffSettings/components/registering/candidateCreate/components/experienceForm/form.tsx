import React, { FC } from "react";
import { ItemWrapper, PlusWrapper } from "../../style";
import { Button, DatePicker, DeleteSvg, Input, PlusSvg } from "components";
import {
  ButtonAdd,
  ExperienceFormWrapper,
  FamilyItemTitle,
  Flex,
  TextSecondary,
} from "./style";
import { Control, useFieldArray } from "react-hook-form";

interface IProps {
  control: Control<any>;
  errors: any;
}

const ExperienceFormItem: FC<IProps> = (props) => {
  const { control, errors } = props;

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "work_experiences",
  });

  return (
    <div>
      {experienceFields?.map((item, index) => {
        return (
          <ExperienceFormWrapper>
            <FamilyItemTitle>
              <TextSecondary>Working place ({index + 1})</TextSecondary>
              {index !== 0 && (
                <PlusWrapper onClick={() => removeExperience(index)}>
                  <DeleteSvg width={24} height={24} />
                </PlusWrapper>
              )}
            </FamilyItemTitle>
            <ItemWrapper>
              <Input
                name={`work_experiences[${index}].organization_name`}
                control={control}
                placeholder="Select"
                label="Name of organization"
                error={
                  errors?.work_experiences?.[index]?.organization_name?.message
                }
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`work_experiences[${index}].position`}
                control={control}
                placeholder="Type here..."
                label="Position"
                error={errors?.work_experiences?.[index]?.position?.message}
              />
            </ItemWrapper>
            <Flex>
              <ItemWrapper>
                <DatePicker
                  name={`work_experiences[${index}].startDate`}
                  control={control}
                  placeholder="Select date"
                  label="Start"
                  error={errors?.work_experiences?.[index]?.startDate?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`work_experiences[${index}].finishDate`}
                  control={control}
                  placeholder="Select date"
                  label="End"
                  error={errors?.work_experiences?.[index]?.finishDate?.message}
                />
              </ItemWrapper>
            </Flex>
          </ExperienceFormWrapper>
        );
      })}
      <ButtonAdd>
        <Button
          onClick={() =>
            appendExperience({
              organization_name: undefined,
              position: undefined,
              startDate: undefined,
              finishDate: undefined,
            })
          }
        >
          <PlusSvg /> Add new form
        </Button>
      </ButtonAdd>
    </div>
  );
};

export default ExperienceFormItem;
