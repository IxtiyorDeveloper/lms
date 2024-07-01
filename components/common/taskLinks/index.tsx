import React, { useState } from "react";
import { Dots, TaskFlex, TaskLink, Wrapper } from "./style";
import { toggleModal } from "store";
import { LinkSvg } from "components";
import { useDispatch } from "react-redux";
import { ITaskLinks } from "./type";
import { Popover } from "antd";
import AllLinks from "./components/allLinks";
import { bgColors, textColors } from "styles/theme";

const TaskLinks = ({ value }: ITaskLinks) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isMoreTwo = (value?.length || 0) > 2;
  const renderedValues = value?.slice(0, 2);

  const handleChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  return (
    <Wrapper>
      {!!value?.length ? (
        <TaskFlex>
          {renderedValues?.map((item, index) => {
            return (
              <TaskLink
                key={index}
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "taskView",
                      data: {
                        data: {
                          id: item?.model_id,
                        },
                        open: true,
                      },
                    }),
                  )
                }
              >
                <LinkSvg color={bgColors.blueGray} />
                Open {item?.model_id}
              </TaskLink>
            );
          })}
          {isMoreTwo && (
            <Popover
              content={AllLinks({ value, setOpen })}
              open={open}
              onOpenChange={handleChange}
              color={textColors.black}
            >
              <Dots>more</Dots>
            </Popover>
          )}
        </TaskFlex>
      ) : (
        "-"
      )}
    </Wrapper>
  );
};

export default TaskLinks;
