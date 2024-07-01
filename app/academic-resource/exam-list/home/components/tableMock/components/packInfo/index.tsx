import { Flex, Popover } from "antd";
import moment from "moment";
import { TooltipWrapper, Wrapper } from "./style";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import { bgColors } from "styles/theme";
import { XMoreInfoIcon } from "components";

export const TooltipInfo = ({ data }: { data: any }) => {
  const old = data?.old;
  const items = [
    {
      title: "Pack number",
      value: data?.current?.name,
    },
    {
      title: "Branch",
      value: old?.room?.branch?.name,
    },
    {
      title: "Room",
      value: old?.room?.name,
    },
    {
      title: "Time",
      value:
        old?.time &&
        moment(old?.time, DATE_FORMAT_HH_mm_ss).format(DATE_FORMAT_HH_mm),
    },
    {
      title: "Staff",
      value: old?.supervisor?.userProfile
        ? `${old?.supervisor?.userProfile?.firstname ?? ""} ${
            old?.supervisor?.userProfile?.lastname ?? ""
          }`
        : "-",
    },
  ];

  return (
    <TooltipWrapper>
      <h2 className="title">Last used info</h2>
      {items?.map((item, index) => {
        return (
          <Flex
            gap={4}
            key={index}
            align="center"
            justify="space-between"
            className="item"
          >
            <div className="label">{item.title}</div>
            <div className="value">{item.value ?? "-"}</div>
          </Flex>
        );
      })}
    </TooltipWrapper>
  );
};
const PackInfo = ({ data }: { data: any }) => {
  return (
    <Popover
      title={<TooltipInfo data={data} />}
      placement="bottom"
      color={bgColors.cedat}
    >
      <Wrapper>
        <XMoreInfoIcon color={bgColors.primary} />
        <p>{data?.current?.name}</p>
      </Wrapper>
    </Popover>
  );
};

export default PackInfo;
