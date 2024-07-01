import React, { FC, useState } from "react";
import { Buttons, Note, NotePopover } from "./style";
import { Button, Input } from "../index";
import {
  Control,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Popover } from "antd";
import { Type } from "../input/type";

interface INoteEditPopover {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any, event?: any) => void;
  control: Control<FieldValues, any>;
  defaultValue: string;
  note?: string;
  isNode?: boolean;
  id: number;
  error?: string;
  type?: Type["type"] | "number";
  name?: string;
  content?: React.ReactNode;
}
const components: {
  name: string;
  defaultValue: string;
  type: Type["type"];
  row?: number;
}[] = [
  {
    name: "name",
    defaultValue: "some",
    type: "input",
  },
  {
    name: "name",
    defaultValue: "some",
    type: "textarea",
    row: 4,
  },
];
const StyledPopover: FC<INoteEditPopover> = ({
  onSubmit,
  defaultValue,
  note,
  id,
  name = "note",
  isNode = false,
  content,
}) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      [`${name}_${id}`]: defaultValue,
    },
  });
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      destroyTooltipOnHide
      onOpenChange={handleOpenChange}
      content={
        <NotePopover>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              setOpen(false);
            })}
          >
            {components?.map((item, key) => {
              return (
                <Input
                  key={key}
                  name={`${item?.name}_${id}`}
                  control={control}
                  defaultValue={item?.defaultValue}
                  type={item?.type}
                  error={errors?.[`${name}_${id}`]?.message}
                />
              );
            })}
            <Buttons>
              <Button
                className="cancel"
                style={{ width: "100%" }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button className="save" style={{ width: "100%" }} type="submit">
                Save
              </Button>
            </Buttons>
          </form>
        </NotePopover>
      }
      open={open}
      title=""
      trigger="click"
      placement="bottomRight"
    >
      <Note>{isNode ? content : note || defaultValue || "-"}</Note>
    </Popover>
  );
};

export default StyledPopover;
