import React, { FC, Fragment } from "react";
import { Button, DeleteSvg, Input, PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { useFieldArray } from "react-hook-form";

interface IProps {
  control: any;
  index: any;
  setValue: any;
  getValues: any;
}
const Options: FC<IProps> = ({ control, index, setValue, getValues }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `notStationary.properties.${index}.options`,
  });
  const handleAddOption = () => {
    append({ name: getValues(`tools.option.name`) });
    setValue(`tools.option.name`, null);
  };

  return (
    <Fragment>
      <div className="container">
        <Input
          name={`tools.option.name`}
          control={control}
          placeholder="Type here..."
          label={`Options`}
        />
        <div className="end">
          <Button
            style={{
              alignSelf: "flex-end",
              marginTop: "auto",
              height: "37px",
              width: "48px",
            }}
            onClick={handleAddOption}
          >
            <PlusSvg width={20} height={20} />
          </Button>
        </div>
      </div>
      {fields.map((value, i) => {
        return (
          <div key={value.id} className="container">
            <Input
              name={`notStationary.properties.${index}.options.${i}.name`}
              control={control}
              placeholder="Type here..."
              label={`Options ${i + 1}`}
            />
            <div className="end">
              {/* {i == 0 ? (
                <Button
                  style={{
                    alignSelf: "flex-end",
                    marginTop: "auto",
                    height: "37px",
                    width: "48px",
                  }}
                  onClick={() => append({ name: "" })}
                >
                  <PlusSvg width={20} height={20} />
                </Button>
              ) : ( */}
              <Button
                style={{
                  alignSelf: "flex-end",
                  marginTop: "auto",
                  height: "37px",
                  width: "48px",
                  background: bgColors.pop,
                }}
                onClick={() => remove(i)}
              >
                <DeleteSvg width={20} height={20} color={bgColors.white} />
              </Button>
              {/* )} */}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default Options;
