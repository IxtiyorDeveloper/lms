import React from "react";
import { ActionModal, NotComeSvg } from "components";
import { bgColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useChangeExamScore, useSetExamAttendance } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRouter } from "next/router";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";

const ExamAttendance = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    examAttendance: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "examAttendance",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const changeScore = useChangeExamScore({
    onSuccess: () => {
      toast.success("Scores changed!");
      queryClient.invalidateQueries([queryKeys.group_exam_data]);
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (formData: any) => {
    const dataArr: any[] = [];
    Object.keys(formData).map((s: string) => {
      const a = s.split("-");
      if (
        a[2] !== "undefined" &&
        Number.isInteger(formData[s]) &&
        !formData?.[`bool-${s}`]
      )
        dataArr.push({
          user_id: +a[1],
          component_id: +a[2],
          point: formData[s],
        });
    });
    changeScore.mutate({
      body: {
        scores: dataArr,
      },
      query_params: {
        id: router.query?.groupExamId,
      },
    });
  };

  const queryClient = useQueryClient();
  const attend = useSetExamAttendance({
    onSuccess: () => {
      toast.info("Successfully updated");
      // queryClient.invalidateQueries(["group-exam-data"]);
      handleClose();
      let a = {};
      let b = {};
      data?.exam_part.config.components.map((e: any) => {
        a = {
          ...a,
          [`${e.label.toString().toLocaleLowerCase()}-${data.id}-${e.id}`]: 0,
        };
        b = {
          ...a,
          [`${e.label.toString().toLocaleLowerCase()}-${data.id}-${e.id}`]:
            false,
        };
      });
      onSubmit({ ...a, bool: b });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { main_id, config_id } = data;
  const onDeleteSubmit = () => {
    attend.mutate({
      body: {
        users: [
          {
            id: main_id,
            attendance: [
              {
                id: config_id,
                absent: true,
              },
            ],
          },
        ],
      },
    });
  };
  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<NotComeSvg width={50} height={50} />}
      text={
        <div>
          <p> Are you sure to change attendance to not ticked ? </p>
          <p>All points will be deleted.</p>
        </div>
      }
      errors={errors}
      submitButtonText="Yes"
    />
  );
};

export default ExamAttendance;
