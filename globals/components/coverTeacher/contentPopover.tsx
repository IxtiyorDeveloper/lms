import React from "react";
import { StyledContent } from "./style";
import { ICoverTeacher } from "./type";
import { Control, UseFormWatch } from "react-hook-form";
import { Input } from "components";

const ContentPopover = ({
  index,
  control,
  watch,
}: {
  index: number;
  control: Control<ICoverTeacher, any>;
  watch: UseFormWatch<ICoverTeacher>;
}) => {
  return (
    <StyledContent>
      <p className="title">Create note</p>
      <div className="container">
        {watch("teachers")?.[index]?.group_id?.map((item, itemIndex) => {
          return (
            <div className="editor" key={itemIndex}>
              <Input
                name={`teachers[${index}].description.${item}`}
                control={control}
                placeholder="description"
                type="textarea"
                rows={5}
              />
            </div>
          );
        })}
      </div>
    </StyledContent>
  );
};

export default ContentPopover;
