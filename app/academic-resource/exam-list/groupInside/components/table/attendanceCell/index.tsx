import React, { useEffect, useState } from "react";
import { AddNewForNewDaySvg, ComeSvg, NotComeSvg } from "components";
import { useSetExamAttendance } from "hooks";
import { toast } from "react-toastify";
import { Container } from "./style";
import { Popover } from "antd";
import PopoverComponent from "./popover";
import { EnumExamAbs, EnumExamParts } from "constants/exam";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { IExamPart } from "types/exam/exam";
import { validationErrorHandler } from "utils";

const icons = {
  [EnumExamAbs.ATTENDED]: <ComeSvg width={30} height={30} />,
  [EnumExamAbs.ABSENT]: <NotComeSvg width={30} height={30} />,
  [EnumExamAbs.ADD]: <AddNewForNewDaySvg width={30} height={30} />,
};

const AttendanceCell = ({
  data,
  exam_part,
  isHasPermission = false,
  callBack = () => ({}),
}: {
  data: any;
  type?: EnumExamParts;
  exam_part: IExamPart;
  isHasPermission?: boolean;
  callBack?: any;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  // const queryClient = useQueryClient();

  const attend = useSetExamAttendance({
    onSuccess: () => {
      // queryClient.invalidateQueries(["group-exam-data"]);
      toast.info("Successfully updated");
      let a = {};
      let b = {};
      exam_part.config.components.map((e: any) => {
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
      callBack({ ...a, bool: b });
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const attendance = data?.process?.data?.attendance?.find(
    (item: { id: number }) => item?.id == exam_part?.config?.id
  );

  const status: EnumExamAbs = attendance?.status ?? EnumExamAbs.ADD;
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleChange = (status: EnumExamAbs) => {
    setOpen(false);
    // setCurrentStatus(status);

    if (status == EnumExamAbs.ATTENDED) {
      attend.mutate({
        body: {
          users: [
            {
              id: data?.id,
              attendance: [
                {
                  id: exam_part?.config?.id,
                  absent: false,
                },
              ],
            },
          ],
        },
      });
    } else {
      dispatch(
        toggleModal({
          key: "examAttendance",
          data: {
            data: {
              id: data.id,
              main_id: data?.id,
              config_id: exam_part?.config?.id,
              exam_part: exam_part,
            },
            open: true,
          },
        })
      );
    }
  };
  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };
  useEffect(() => {
    if (status) setCurrentStatus(status);
  }, [status]);
  return (
    <Container>
      {isHasPermission ? (
        <Popover
          destroyTooltipOnHide
          open={open}
          onOpenChange={handleOpenChange}
          content={
            <PopoverComponent
              status={status as EnumExamAbs}
              handleChange={handleChange}
            />
          }
          trigger="click"
        >
          <div className="inner">
            {icons[currentStatus as keyof typeof icons]}
          </div>
        </Popover>
      ) : (
        <div className="inner">
          {icons[currentStatus as keyof typeof icons]}
        </div>
      )}
    </Container>
  );
};

export default AttendanceCell;
