import React, { useState } from "react";
import { Wrapper } from "./style";
import { NoteEditPopover } from "components";
import { useChangeExamComment } from "hooks";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useForm } from "react-hook-form";
import { CircleSmsSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Popover } from "antd";
import Changer from "./changer";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";

const update_keys = [
  queryKeys.admin_statistics_podo_index,
  queryKeys.group_exam_students_contacts,
  queryKeys.group_exam_students,
  queryKeys.admin_group_view,
  queryKeys.group_exam_data,
];
const NoteCell = ({ record, value }: { record: any; value: any }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { control: customControl, handleSubmit } = useForm();

  const changeComment = useChangeExamComment({
    onSuccess: () => {
      toast.success("Student comment changed");
      for (let i = 0; i < update_keys.length; i++) {
        queryClient.invalidateQueries({
          queryKey: [update_keys[i]],
        });
      }
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (id: string, comment: string) => {
    changeComment.mutate({
      body: {
        comment,
      },
      query_params: {
        process_id: id,
      },
    });
  };
  const id = record?.process?.id || null;
  const handleEdit = (newOpen: boolean) => {
    if (newOpen) {
      setOpen(false);
    }
  };
  const handleChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Wrapper>
      <NoteEditPopover
        id={id}
        control={customControl}
        isToolTipDisabled
        defaultValue={value}
        handleEdit={handleEdit}
        isNode
        name="note"
        type="textarea"
        content={
          <Popover
            content={Changer({ record })}
            color={bgColors.dark}
            onOpenChange={handleChange}
            open={open}
          >
            <div style={{ width: "30px" }}>
              <CircleSmsSvg color={bgColors.blueGray} />
            </div>
          </Popover>
        }
        handleSubmit={handleSubmit}
        onSubmit={(p: any) => {
          onSubmit(id, p?.[`note_${id}`]);
        }}
      />
    </Wrapper>
  );
};

export default NoteCell;
