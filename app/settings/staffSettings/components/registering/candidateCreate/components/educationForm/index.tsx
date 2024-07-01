import React, { FC } from "react";
import { ButtonAdd, Flex, ItemWrapper, Text, TextSecondary } from "../../style";
import { EducationForm, EducationWrapper, EducationTitle } from "./style";
import { PlusWrapper } from "../../style";
import {
  Button,
  DatePicker,
  DeleteSvg,
  ErrorLabel,
  Input,
  MySelect,
  PlusSvg,
} from "components";
import { Control, useFieldArray } from "react-hook-form";
import { IStaffInitialData } from "../../../../../../../../types/staffSettings";

interface IProps {
  control: Control<any>;
  initialData?: IStaffInitialData;
  errors: any;
}

const EducationalForm: FC<IProps> = (props) => {
  const { control, initialData, errors } = props;

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "educations",
  });
 
  return (
    <EducationWrapper>
      <Text className="text">Education</Text>
      {educationFields?.map((item, index) => {
        return (
          <EducationForm>
            <EducationTitle>
              <TextSecondary>
                Educational institution ({index + 1})
              </TextSecondary>
              {index !== 0 && (
                <PlusWrapper onClick={() => removeEducation(index)}>
                  <DeleteSvg width={24} height={24} />
                </PlusWrapper>
              )}
            </EducationTitle>
            <ItemWrapper>
              <MySelect
                name={`educations[${index}].degree`}
                control={control}
                options={initialData?.educationPlaceList}
                placeholder="Select"
                label="Degree"
                error={errors?.educations?.[index]?.degree?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`educations[${index}].name`}
                control={control}
                placeholder="Type here..."
                label="Name educational insitution"
                error={errors?.educations?.[index]?.name?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`educations[${index}].speciality`}
                control={control}
                placeholder="Type here..."
                label="Speciality"
                error={errors?.educations?.[index]?.speciality?.message}
              />
            </ItemWrapper>
            <Flex>
              <ItemWrapper>
                <DatePicker
                  name={`educations[${index}].enterDate`}
                  control={control}
                  placeholder="Select date"
                  label="Enter date"
                  error={errors?.educations?.[index]?.enterDate?.message}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DatePicker
                  name={`educations[${index}].finishDate`}
                  control={control}
                  placeholder="Graduate date"
                  label="Graduate date"
                  error={errors?.educations?.[index]?.finishDate?.message}
                />
              </ItemWrapper>
            </Flex>
          </EducationForm>
        );
      })}
      <ErrorLabel error={errors?.educations?.message} />
      <ButtonAdd>
        <Button
          onClick={() =>
            appendEducation({
              degree: undefined,
              name: undefined,
              speciality: undefined,
              enterDate: undefined,
              finishDate: undefined,
            })
          }>
          <PlusSvg /> Add new form
        </Button>
      </ButtonAdd>
    </EducationWrapper>
  );
};

export default EducationalForm;
