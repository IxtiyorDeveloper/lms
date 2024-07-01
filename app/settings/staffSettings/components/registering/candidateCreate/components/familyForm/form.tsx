import React, { FC } from "react";
import { ItemWrapper, PlusWrapper } from "../../style";
import {
  Button,
  DeleteSvg,
  Input,
  MySelect,
  PhoneNumberInput,
  PlusSvg,
} from "components";
import {
  ButtonAdd,
  FamilyFormWrapper,
  FamilyItemTitle,
  TextSecondary,
} from "./style";
import { Control, useFieldArray } from "react-hook-form";
import { IStaffInitialData } from "types/staffSettings";

interface IProps {
  control: Control<any>;
  initialData?: IStaffInitialData;
  errors?: any;
}

const FamilyFormItem: FC<IProps> = (props) => {
  const { control, initialData, errors } = props;

  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: "family_members",
  });
  return (
    <div>
      {memberFields?.map((item, index) => {
        return (
          <FamilyFormWrapper>
            <FamilyItemTitle>
              <TextSecondary>Member ({index + 1})</TextSecondary>
              {index !== 0 && (
                <PlusWrapper onClick={() => removeMember(index)}>
                  <DeleteSvg width={24} height={24} />
                </PlusWrapper>
              )}
            </FamilyItemTitle>
            <ItemWrapper>
              <MySelect
                name={`family_members[${index}].degree`}
                control={control}
                options={initialData?.familyMemberList}
                placeholder="Select"
                label="Member degree"
                error={errors?.family_members?.[index]?.degree?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`family_members[${index}].fio`}
                control={control}
                placeholder="Type here..."
                label="FIO"
                error={errors?.family_members?.[index]?.fio?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`family_members[${index}].work_place`}
                control={control}
                placeholder="Type here..."
                label="Place of work"
                error={errors?.family_members?.[index]?.work_place?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <Input
                name={`family_members[${index}].position`}
                control={control}
                placeholder="Type here..."
                label="Position"
                error={errors?.family_members?.[index]?.position?.message}
              />
            </ItemWrapper>
            <ItemWrapper>
              <PhoneNumberInput
                name={`family_members[${index}].phone_number`}
                control={control}
                placeholder="Phone"
                label="Phone"
                error={errors?.family_members?.[index]?.phone_number?.message}
              />
            </ItemWrapper>
          </FamilyFormWrapper>
        );
      })}
      <ButtonAdd>
        <Button
          onClick={() =>
            appendMember({
              degree: undefined,
              fio: undefined,
              placeOfWork: undefined,
              position: undefined,
              phone: undefined,
            })
          }
        >
          <PlusSvg /> Add new form
        </Button>
      </ButtonAdd>
    </div>
  );
};

export default FamilyFormItem;
