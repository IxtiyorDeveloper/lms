import React, { FC } from "react";
import { Item, Wrapper } from "./style";
import { Button, DeleteSvg, Input, PlusSvg } from "components";
import { useFieldArray } from "react-hook-form";
import Options from "./options";

interface IProps {
  control: any;
  setValue: any;
  getValues: any;
}
const Properties: FC<IProps> = ({ control, setValue, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notStationary.properties",
  });

  const add = () => {
    append({ options: [{}, {}] });
  };
  return (
    <Wrapper>
      {fields.map((e, index) => {
        return (
          <Item key={e.id}>
            <div className="container">
              <div className="title">Property ({index + 1})</div>
              {index != 0 && (
                <DeleteSvg
                  onClick={() => {
                    remove(index);
                    // setValue(`notStationary.properties.a${index}.isDeleted`, true)
                  }}
                />
              )}
            </div>
            <div className="container">
              <Input
                name={`notStationary.properties.${index}.name`}
                control={control}
                placeholder="Type here..."
                label="Property name"
              />
            </div>
            <Options
              control={control}
              index={index}
              setValue={setValue}
              getValues={getValues}
            />
          </Item>
        );
      })}
      <Button style={{ marginTop: "20px" }} onClick={add} icon={<PlusSvg />}>
        Add property
      </Button>
    </Wrapper>
  );
};

export default Properties;
