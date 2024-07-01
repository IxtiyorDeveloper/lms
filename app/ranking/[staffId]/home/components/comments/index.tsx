import React, { FC, useEffect } from "react";
import { Wrapper } from "./style";
import { Button, Input } from "components";
import { useForm } from "react-hook-form";
import { useAcademicCommentRankingSave } from "hooks/useAcademicControl";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";

interface IProps {
  academic_director_comment?: string;
  secret_client_comment?: string;
  studentComments?: string | null;
  id?: number | string;
  bool?: boolean;
}
const Comments: FC<IProps> = ({
  academic_director_comment,
  id,
  studentComments,
  secret_client_comment,
  bool = false,
}) => {
  const { control, watch, setValue, handleSubmit } = useForm();
  useEffect(() => {
    setValue("student_comments", studentComments);
    setValue("academic_director_comment", academic_director_comment);
    setValue("secret_client_comment", secret_client_comment);
  }, [academic_director_comment, studentComments, secret_client_comment]);

  const save = useAcademicCommentRankingSave({
    onSuccess: () => {
      toast.success("Comment saved!");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (body: any) => {
    save.mutate({
      query_params: {
        id,
      },
      body,
    });
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="title">Student Comments</div>
        <div>
          <div className="studentComment">
            {watch("student_comments") || "-"}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="title">Academic Director Comment</div>
        <div>
          <Input
            name="academic_director_comment"
            control={control}
            placeholder="comment"
            type="textarea"
          />
        </div>
        {!bool && (
          <div className="flex">
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          </div>
        )}
      </div>
      <div className="container">
        <div className="title">Secret Client Comment</div>
        <div>
          <Input
            name="secret_client_comment"
            control={control}
            placeholder="comment"
            type="textarea"
          />
        </div>
        {!bool && (
          <div className="flex">
            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Comments;
