import { Flex, Progress } from "antd";
import { CheckListSvg } from "components";
import { CardWrapper, IconWrapper } from "./style";
import { GroupInfoCardType } from "./type";
import { bgColors } from "styles/theme";
import { Skeleton } from "antd";

const GroupInfoCard = ({
  type,
  overall,
  value,
  loading,
}: {
  type: GroupInfoCardType;
  overall?: number;
  value?: number;
  loading?: boolean;
}) => {
  const title = () =>
    ({
      [GroupInfoCardType.PROGRESS]: "Group progress",
      [GroupInfoCardType.DONE]: "Homework done",
      [GroupInfoCardType.NOT_DONE]: "Homework not done",
    }[type]);

  return (
    <CardWrapper>
      <Flex justify="space-between">
        <div>
          <p>{title()}</p>
          {loading ? (
            <Skeleton.Button
              active
              style={{
                height: 30,
              }}
            />
          ) : (
            <h2>{value}</h2>
          )}
        </div>
        {type === GroupInfoCardType.PROGRESS ? (
          <Progress
            size={50}
            percent={overall}
            type="circle"
            strokeWidth={14}
            strokeColor={bgColors.primary}
            trailColor={bgColors.leather}
            format={(percent) => <div className="percent">{percent}%</div>}
          />
        ) : (
          <IconWrapper type={type}>
            <CheckListSvg width={14} height={14} />
          </IconWrapper>
        )}
      </Flex>
    </CardWrapper>
  );
};

export default GroupInfoCard;
