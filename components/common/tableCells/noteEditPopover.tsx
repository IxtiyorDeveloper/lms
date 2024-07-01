import React, { FC, useEffect, useMemo, useState } from "react";
import { Buttons, Label, Note, NotePopover } from "./style";
import { Button, Input } from "../index";
import {
  Control,
  FieldValues,
  useForm,
  UseFormHandleSubmit,
} from "react-hook-form";
import { InputProps, Popover, Tooltip } from "antd";
import { Type } from "../input/type";
import InputNumber from "../../antd/inputNumber";
import { textAddBreakTag } from "utils";

interface INoteEditPopover extends Omit<InputProps, "id"> {
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: (data: any, event?: any) => void;
  control: Control<FieldValues, any>;
  defaultValue: string | number;
  note?: string;
  isNode?: boolean;
  id: number;
  error?: string;
  type?: Type["type"] | "number";
  name?: string;
  content?: React.ReactNode;
  disabled?: boolean;
  trigger?: "click" | "hover";
  isToolTipDisabled?: boolean;
  title?: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  isCancel?: boolean;
  handleEdit?: (newOpen: boolean) => void;
}

const NoteEditPopover: FC<INoteEditPopover> = ({
  title,
  onSubmit,
  defaultValue,
  note,
  id,
  type = "textarea",
  name = "note",
  isNode = false,
  content,
  disabled = false,
  trigger = "click",
  isToolTipDisabled = false,
  setLoading,
  width,
  handleEdit,
  isCancel = true,
  ...rest
}) => {
  const value = useMemo(() => note || defaultValue, [note, defaultValue]);
  const [open, setOpen] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
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
    handleEdit?.(newOpen);
    if (newOpen) {
      setToolTip(false);
    }
    if (isCancel) {
      setOpen(newOpen);
    } else {
      setOpen(true);
    }
  };
  const handleOpenToolTipChange = (newOpen: boolean) => {
    setToolTip(newOpen);
  };
  useEffect(() => {
    setValue(`${name}_${id}`, value);
  }, [value, open]);

  return (
    <Tooltip
      destroyTooltipOnHide
      trigger="hover"
      title={
        <div
          dangerouslySetInnerHTML={{
            __html: (textAddBreakTag(note) || defaultValue?.toString()) ?? "",
          }}
        ></div>
      }
      onOpenChange={handleOpenToolTipChange}
      open={toolTip && !isToolTipDisabled}
      // @ts-ignore
      onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
    >
      <Popover
        destroyTooltipOnHide
        onOpenChange={handleOpenChange}
        trigger={trigger}
        // @ts-ignore
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
        content={
          <NotePopover
            onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
          >
            {title && <Label>{title}</Label>}
            <form
              onSubmit={handleSubmit((data, event) => {
                event?.stopPropagation();
                onSubmit(data);
                setOpen(false);
                if (setLoading) {
                  setLoading(true);
                }
              })}
            >
              {type === "number" ? (
                <InputNumber
                  name={`${name}_${id}`}
                  control={control}
                  defaultValue={+value}
                  error={errors?.[`${name}_${id}`]?.message}
                  suffix="UZS"
                  min={rest.min}
                />
              ) : (
                <Input
                  name={`${name}_${id}`}
                  control={control}
                  defaultValue={value}
                  type={type}
                  error={errors?.[`${name}_${id}`]?.message}
                  rows={4}
                  style={{
                    width,
                    maxHeight: 420,
                  }}
                />
              )}

              <Buttons>
                <Button
                  className="cancel"
                  style={{ width: "100%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="save"
                  style={{ width: "100%" }}
                  type="submit"
                  disabled={disabled}
                >
                  Save
                </Button>
              </Buttons>
            </form>
          </NotePopover>
        }
        open={open}
        title=""
        placement="bottomRight"
      >
        <Note id={id?.toString()} className="note-editor">
          {isNode
            ? content
            : (note || defaultValue)?.toString()?.trim()?.length > 0
              ? note || defaultValue
              : "-"}
        </Note>
      </Popover>
    </Tooltip>
  );
};

export default NoteEditPopover;
