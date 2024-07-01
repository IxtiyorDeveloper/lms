import { Flex, Timeline, TimelineItemProps } from "antd";
import { CheckBox } from "components";
import { ItemTitle, ItemWrapper, OrderWrapper } from "./style";
import { bgColors } from "styles/theme";

export const Items = ({
  data,
  control,
}: {
  data: any[] | undefined;
  control?: any;
}) => {
  return data?.map((item) => (
    <Timeline.Item
      key={item.id}
      className={`timeline-item ${item.checked ? "checked" : "unchecked"}`}
      dot={<OrderWrapper passed={item.checked}>{item.id}</OrderWrapper>}
      children={
        <ItemWrapper>
          <Flex justify="space-between" align="center">
            <ItemTitle>{item.title}</ItemTitle>
            <CheckBox
              control={control}
              name={`item_${item.id}`}
              colorPrimary={bgColors.midori}
            />
          </Flex>
        </ItemWrapper>
      }
    />
  ));
};
