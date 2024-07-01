import { Flex, TimelineItemProps } from "antd";
import { ICandidateLifecycle } from "types/lifeCycle";
import { ActionIcons } from "./components/actionIcons";
import { ArrowBigSvg, CircleImage, DoubleArrowSvg, PaintSvg } from "components";
import { bgColors, textColors } from "styles/theme";
import moment from "moment";
import {
  DATE_FORMAT_HH_mm_YYYY_MM_DD,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { ActionDate, ActionWrapper, CommentWrapper, UserInfo } from "./style";
import ActionInfo from "./components/actionInfo";
import { InitialDataHR } from "types";
import { formatChangedAttribute } from "./utils/format";
import { CandidateAction } from "constants/hr";
import { ActionInfoWrapper } from "./components/actionInfo/style";

export const Items = ({
  data,
  initialData,
}: {
  data: ICandidateLifecycle[] | undefined;
  initialData: InitialDataHR | undefined;
}): TimelineItemProps[] | undefined => {
  return (
    data?.map((item) => {
      const formattedComment = item.comment?.replace(/\n/g, "<br/>");
      let changed_old_attributes: string[] = [];
      let changed_new_attributes: string[] = [];

      if (item.options?.changed_attributes) {
        changed_old_attributes = Object.keys(
          item.options.changed_attributes
        ).map((itemChild) => {
          const attribute =
            item.options.changed_attributes[
              itemChild as keyof typeof item.options.changed_attributes
            ];
          const old_value = attribute?.old ?? "";

          return formatChangedAttribute({
            itemChild,
            value: old_value,
          });
        });

        changed_new_attributes = Object.keys(
          item.options.changed_attributes
        ).map((itemChild) => {
          const attribute =
            item.options.changed_attributes[
              itemChild as keyof typeof item.options.changed_attributes
            ];
          const new_value = attribute?.new ?? "";

          return formatChangedAttribute({
            itemChild,
            value: new_value,
          });
        });
      }

      const createdBy = item?.createdBy?.userProfile;
      const oldColor = item?.options?.old_color;
      const newColor = item?.options?.new_color;

      return {
        dot: ActionIcons({ value: item?.action }),
        children: (
          <ActionWrapper>
            <Flex justify="space-between">
              <Flex align="center" gap={6}>
                <UserInfo>
                  <CircleImage
                    src={item?.createdBy?.avatar}
                    alt=""
                    width={20}
                    height={20}
                  />
                  <p>
                    {createdBy?.firstname} {createdBy?.lastname}
                  </p>
                </UserInfo>
                <DoubleArrowSvg
                  color={bgColors.midori}
                  width={14}
                  height={14}
                />

                <ActionInfo
                  data={item?.options}
                  action={item?.action}
                  initialData={initialData}
                />
              </Flex>
              <ActionDate>
                {item?.datetime &&
                  moment(item?.datetime, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
                    DATE_FORMAT_HH_mm_YYYY_MM_DD
                  )}
              </ActionDate>
            </Flex>
            <Flex gap={4} align="center">
              <CommentWrapper>
                <h4>
                  {!!changed_new_attributes?.length ? "Old comment" : "Comment"}
                </h4>
                {item?.action === CandidateAction.COLOR_CHANGED ? (
                  <div className="comment">
                    <Flex align="center" gap={6}>
                      <ActionInfoWrapper
                        bgColor={oldColor}
                        color={oldColor ? textColors.white : textColors.dark}>
                        <PaintSvg
                          width={16}
                          height={16}
                          color={oldColor ? bgColors.white : bgColors.dark}
                        />
                        <span>Color</span>
                      </ActionInfoWrapper>
                      <ArrowBigSvg width={14} height={14} />

                      <ActionInfoWrapper
                        bgColor={newColor}
                        color={newColor ? textColors.white : textColors.dark}>
                        <PaintSvg
                          width={16}
                          height={16}
                          color={newColor ? bgColors.white : bgColors.dark}
                        />
                        <span>Color</span>
                      </ActionInfoWrapper>
                    </Flex>
                  </div>
                ) : changed_new_attributes?.length > 0 ? (
                  <div
                    className="comment"
                    dangerouslySetInnerHTML={{
                      __html: changed_old_attributes?.join("<br/>"),
                    }}
                  />
                ) : (
                  <div
                    className="comment"
                    dangerouslySetInnerHTML={{
                      __html: formattedComment,
                    }}
                  />
                )}
              </CommentWrapper>
              {!!changed_new_attributes?.length && (
                <>
                  <div className="double_arrow">
                    <DoubleArrowSvg
                      color={bgColors.midori}
                      width={14}
                      height={14}
                    />
                  </div>
                  <CommentWrapper>
                    <h4>New comment</h4>
                    <div
                      className="comment"
                      dangerouslySetInnerHTML={{
                        __html: changed_new_attributes?.join("<br/>"),
                      }}
                    />
                  </CommentWrapper>
                </>
              )}
            </Flex>
          </ActionWrapper>
        ),
      };
    }) || []
  );
};
