import React, { useCallback, useState } from "react";
import { useGroup } from "hooks";
import { expand } from "./expand";
import debounce from "lodash/debounce";
import { STATE_CLOSING, STATE_OPENING } from "constants/groupStatus";
import Router from "next/router";
import Link from "next/link";
import { Popover } from "antd";
import { Flex } from "./style";
import { HandSvg, NewSvg } from "components";
import { IGroup } from "types";
import PopoverComponent from "../../../../../../popover";
import { calculateFreePlace } from "./components/calculateFreePlace";

const RenderedItem = ({ item, index }: { item: IGroup; index: number }) => {
  const [id, setId] = useState<string>("");
  const {
    data: popoverGroup,
    isLoading,
    isPreviousData,
  } = useGroup({
    id: id,
    expand,
  });
  const debouncedFunc = useCallback((id: any) => {
    setId(id);
  }, []);

  const handleMouseOpen = useCallback(
    debounce((id: any) => {
      debouncedFunc(id);
    }, 400),
    []
  );

  const handleMouseClose = useCallback(() => {
    handleMouseOpen.cancel();
  }, []);

  const isNewGroup = item?.state.toString() == STATE_OPENING.toString();
  const isClosing = item?.state.toString() == STATE_CLOSING.toString();

  const { freePlace } = calculateFreePlace({ group: item });

  if (!!freePlace || Router.query?.freePlace === "0") {
    return (
      <Link
        href={`groups/${item?.id}`}
        key={index}
        onMouseMove={() => handleMouseOpen(item?.id)}
        onMouseLeave={handleMouseClose}
      >
        <Popover
          destroyTooltipOnHide
          content={PopoverComponent({
            isLoading,
            isPreviousData,
            group: popoverGroup,
          })}
          title=""
          mouseEnterDelay={0.4}
          trigger="hover"
          placement="bottomRight"
          overlayStyle={{
            width: "590px",
          }}
        >
          <Flex>
            <div
              className="gr-name"
              style={{
                maxWidth:
                  isNewGroup || isClosing
                    ? "calc(100% - 55px)"
                    : "calc(100% - 25px)",
              }}
            >
              <p className="gr-inner-name">{item?.name}</p>
              <span>{item.level?.name}</span>{" "}
            </div>
            {isNewGroup && (
              <div className="new-icon">
                <NewSvg width={18} height={18} />
              </div>
            )}
            {isClosing && (
              <div className="new-icon">
                <HandSvg width={18} height={18} />
              </div>
            )}
            <div className="freePlace">{freePlace}</div>
          </Flex>
        </Popover>
      </Link>
    );
  } else return null;
};

export default RenderedItem;
