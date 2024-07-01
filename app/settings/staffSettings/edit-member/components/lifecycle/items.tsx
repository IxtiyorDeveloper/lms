import { Flex, TimelineItemProps } from "antd";
import { ICandidateLifecycle } from "types/lifeCycle";
import { ActionIcons } from "./components/actionIcons";
import { CircleImage, DoubleArrowSvg } from "components";
import { bgColors } from "styles/theme";
import moment from "moment";
import {
  DATE_FORMAT_HH_mm_YYYY_MM_DD,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { ActionDate, ActionWrapper, CommentWrapper, UserInfo } from "./style";
import ActionInfo from "./components/actionInfo";
import { IStaffLifeCycle } from "types/staffSettings";

export const Items = ({
  data,
}: {
  data: IStaffLifeCycle[] | undefined;
}): TimelineItemProps[] | undefined => {
  return (
    data?.map((item) => {
      const formattedComment = item.description?.replace(/\n/g, "<br/>");
      let changed_attributes: string[] = [];

      // if (item.options?.changed_attributes) {
      //   changed_attributes = Object.keys(item.options.changed_attributes).map(
      //     (itemChild) => {
      //       const attribute =
      //         item.options.changed_attributes[
      //           itemChild as keyof typeof item.options.changed_attributes
      //         ];
      //       const old_value = attribute?.old ?? "";
      //       const new_value = attribute?.new ?? "";
      //       // return formatChangedAttribute({
      //       //   itemChild,
      //       //   old_value,
      //       //   new_value,
      //       // });
      //     }
      //   );
      // }
      const createdBy = item?.createdBy?.userProfile;
      return {
        dot: ActionIcons({ value: item?.scenario }),
        children: (
          <ActionWrapper>
            <Flex justify="space-between">
              <Flex align="center" gap={6}>
                <UserInfo>
                  <CircleImage
                    src={item?.createdBy?.userProfile.avatar_base_url}
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

                <ActionInfo action={item?.scenario} data={item} />
              </Flex>
              <ActionDate>
                {item?.datetime &&
                  moment(item?.datetime, DATE_FORMAT_YYYY_MM_DD_HH_mm).format(
                    DATE_FORMAT_HH_mm_YYYY_MM_DD
                  )}
              </ActionDate>
            </Flex>
            <CommentWrapper>
              <h4>Comment</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    changed_attributes?.length > 0
                      ? changed_attributes?.join("<br/>")
                      : formattedComment,
                }}
              />
            </CommentWrapper>
          </ActionWrapper>
        ),
      };
    }) || []
  );
};
