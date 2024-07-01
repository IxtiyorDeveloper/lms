import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AntdModal,
  Button,
  CircleSegment,
  Input,
  NotComeSvg,
  DetailedStudentCard,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useUpdateAttendance } from "hooks";
import { toast } from "react-toastify";
import moment from "moment";
import { DATE_FORMAT_SHOW_MMMM } from "constants/dates";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { ActionPlace, BottomSite, Content } from "./style";
import { EAttendanceStatuses } from "types";
import { validationErrorHandler } from "utils";

const AbsentModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [attendanceType, setAttendanceType] = useState(
    EAttendanceStatuses?.NOT_CAME?.toString()
  );
  const {
    absModal: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const update = useUpdateAttendance({
    onSuccess: () => {
      toast.success("Success");
      queryClient.invalidateQueries(data?.queryKeys);
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
    setValue,
  } = useForm<any>();
  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "absModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const onSubmit = ({ reason }: { reason: string }) => {
    update.mutate({
      query_params: {
        id: data?.item?.id,
      },
      body: {
        reason: reason,
        date: data?.item?.date,
        status: attendanceType,
      },
    });
  };

  useEffect(() => {
    setValue("reason", data?.item?.reason);
    if (open) {
      setAttendanceType(EAttendanceStatuses?.NOT_CAME?.toString());
    }
  }, [open]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      padding="0"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <DetailedStudentCard data={data?.original} />
          <ActionPlace>
            <p className="date">
              {moment(data?.item?.date).format(DATE_FORMAT_SHOW_MMMM)}
            </p>
            {data?.item?.status == EAttendanceStatuses?.ABS ? (
              <NotComeSvg bgColor={bgColors.primary} width={30} height={30} />
            ) : (
              <CircleSegment
                onChange={(e) => setAttendanceType(e)}
                options={[
                  {
                    value: EAttendanceStatuses?.NOT_CAME?.toString(),
                    icon: <NotComeSvg width={30} height={30} />,
                  },
                  {
                    value: EAttendanceStatuses?.ABS?.toString(),
                    icon: (
                      <NotComeSvg
                        bgColor={bgColors.primary}
                        width={30}
                        height={30}
                      />
                    ),
                  },
                ]}
                initValue={attendanceType}
                tabPlace="right"
              />
            )}
          </ActionPlace>
          <div className="inp">
            <Input
              label="Reason"
              type="textarea"
              name="reason"
              control={control}
              rows={4}
              disabled={data?.item?.status == EAttendanceStatuses?.ABS}
            />
          </div>
        </Content>

        <BottomSite>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit" buttonLoading={update?.isLoading}>
            Save
          </Button>
        </BottomSite>
      </form>
    </AntdModal>
  );
};

export default AbsentModal;
