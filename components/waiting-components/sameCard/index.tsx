import React, { FC } from "react";
import {
  CardWrapper,
  DateWrapper,
  GroupName,
  PaddingWrapper,
  Status,
  FlexSt,
  TeacherNameWrapper,
  GridWrapper,
  NameWrapper,
  BadgeForCard,
  NewImg,
} from "./style";
import theme, { bgColors, fontSizes, textColors } from "styles/theme";
import { NewSvg, TeacherSvg } from "components";
import { ISameCard } from "./type";
import { Tooltip, tooltipClasses } from "@mui/material";
import { Popover } from "antd";
import { useRouter } from "next/router";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { groupColors } from "layout/header/style";

export const bgLinear =
  "linear-gradient(151.75deg, #329961 -1.13%, #70D088 102.21%)";
export const boxShadow =
  "0 8px 16px -8px rgba(15, 15, 15, 0.2), inset 0 0 16px #70D088";
export const boxShadowRed =
  "0 8px 16px -8px rgba(15, 15, 15, 0.2), inset 0 0 16px #F05B71";
export const boxShadowDisabled = "inset 0 0 16px rgba(230, 232, 236, 0.5)";
export const bgLinearRed =
  "linear-gradient(151.75deg, #E92857 -1.13%, #FCADA9 102.21%)";

const TextColors: any = {
  enabled: {
    color: textColors.white,
  },
  rejected: {
    color: textColors.blueGray,
  },
  disabled: {
    color: textColors.blueGray,
  },
};

const BgColors: any = {
  enabled: {
    background: bgLinear,
    boxShadow: boxShadow,
  },
  rejected: {
    background: bgColors.white,
    boxShadow: boxShadowDisabled,
  },
  disabled: {
    background: bgColors.white,
    border: `0.5px solid ${bgColors.purpleCrystal}`,
    boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
  },
};

const IconColors: any = {
  enabled: "#DDFADC",
  rejected: textColors.pale,
  disabled: "#B1B5C4",
};

const BorderColors: any = {
  enabled: "#91E79E50",
  rejected: "#B1B5C450",
  disabled: "#B1B5C450",
};

const SameCard: FC<ISameCard> = ({
  group,
  gridStyle,
  setOpen,
  large,
  lastStyle,
  lastTwo,
}) => {
  const router = useRouter();
  const stylesList: any = {
    enabled: {
      boxShadow: group?.identify === "disabled" && boxShadow,
      background:
        group?.identify === "disabled" ? bgLinear : bgColors.serengeti,
      color: textColors.white,
      borderRadius: "5px",
      padding: "10px 7px",
      textAlign: "center",
    },
    disabled: {
      background: bgColors.brilliance,
      color: textColors.blueGray,
      boxShadow: boxShadowDisabled,
      borderRadius: "5px",
      padding: "10px 7px",
      textAlign: "center",
    },
    rejected: {
      background: bgLinearRed,
      color: textColors.white,
      boxShadow: boxShadowRed,
      borderRadius: "5px",
      padding: "10px 7px",
      textAlign: "center",
    },
  };
  return (
    <CardWrapper
      onClick={() =>
        setOpen?.(
          {
            isOpen: true,
            id: group?.id,
            fullStatus: group?.fullStatus,
          },
          group,
        )
      }
      style={{ ...TextColors[group?.identify], ...BgColors[group?.identify] }}
    >
      {group?.isNew && (
        <NewImg>
          <NewSvg width={30} height={30} />
        </NewImg>
      )}
      <PaddingWrapper
        style={{
          borderBottom: `0.5px solid ${BorderColors[group?.identify]}`,
          paddingBottom: "6px",
        }}
      >
        <FlexSt>
          <Popover
            destroyTooltipOnHide
            content={
              <p style={{ padding: "10px", fontWeight: 600 }}>{group?.name}</p>
            }
          >
            <GroupName
              style={TextColors[group?.identify]}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/groups/${group?.id}`);
              }}
            >
              {group?.name}
            </GroupName>
          </Popover>
          <BadgeForCard>
            {group?.freePlaces === 0 ? (
              "Full"
            ) : (
              <div style={{ paddingRight: "4px", paddingLeft: "4px" }}>
                {group?.freePlaces}
              </div>
            )}
          </BadgeForCard>
        </FlexSt>
        <FlexSt>
          {group?.isNew && group?.startDate ? (
            <DateWrapper style={TextColors[group?.identify]}>
              Start Date: {group?.startDate}
            </DateWrapper>
          ) : (
            <DateWrapper style={{ color: "transparent" }}>_</DateWrapper>
          )}
          <Status
            state={group.state}
            style={
              groupColors[
                groupStatusIdentifier({
                  group,
                }) as keyof typeof groupColors
              ]
            }
          >
            {groupStatusIdentifier({
              group,
            })}
          </Status>
        </FlexSt>
      </PaddingWrapper>
      <PaddingWrapper style={{ padding: "5px 12px 14px 12px" }}>
        <GridWrapper lastTwo={lastTwo} style={gridStyle}>
          {group?.fullStatus?.map((stat: any, ind: any) => {
            const styledCards = stylesList[stat.status];
            const styledNote =
              stat.status === "enabled"
                ? {
                    ...styledCards,
                    padding: 8,
                    border: "1px solid #E6E8EC60",
                    background: "#52A868",
                    fontSize: fontSizes.f10,
                    color: textColors.whiteSmoke,
                    boxShadow: "inset 0 0 16px rgba(230, 232, 236, 0.3)",
                    gridColumn: "1/3",
                    textAlign: "left",
                  }
                : {
                    ...styledCards,
                    padding: 8,
                    gridColumn: "1/3",
                    fontSize: fontSizes.f10,
                    color: textColors.blueGray,
                    textAlign: "left",
                  };

            let isLast =
              group?.fullStatus.length === ind + 1 ||
              group?.fullStatus.length - 1 === ind + 1;

            isLast = gridStyle ? group?.fullStatus.length === ind - 1 : isLast;
            if (ind == 0) {
              return (
                <div
                  key={`index_${ind}`}
                  style={{
                    ...styledCards,
                    display: "flex",
                    textAlign: "start",
                    gridColumn: "1/3",
                  }}
                >
                  {<stat.icon color={IconColors[stat.status]} />}
                  <TeacherNameWrapper>{group?.[stat.name]}</TeacherNameWrapper>
                </div>
              );
            } else {
              return stat.name !== "note" ? (
                <div
                  key={`index_${ind}`}
                  style={
                    isLast
                      ? {
                          ...styledCards,
                          gridColumn: "1/3",
                        }
                      : styledCards
                  }
                >
                  {<stat.icon color={IconColors[stat.status]} />}
                  <NameWrapper style={isLast ? { width: "150px" } : {}}>
                    {group?.[stat.name]}
                  </NameWrapper>
                </div>
              ) : (
                <div
                  key={`index_${ind}`}
                  style={{
                    ...styledNote,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Tooltip
                    placement="left"
                    title={
                      <div>
                        <span className="name">{group?.note}</span>
                      </div>
                    }
                    sx={{
                      [`& .${tooltipClasses.tooltip}`]: {
                        backgroundColor: "#f5f5f9",
                        color: "rgba(0, 0, 0, 0.87)",
                        maxWidth: 220,
                        fontSize: theme.typography.pxToRem(12),
                        border: "1px solid #dadde9",
                      },
                      overflow: "hidden",
                      width: "100%",
                    }}
                    children={
                      <span
                        className="name"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          maxWidth: "150px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {group?.note || "-"} {" ."}
                      </span>
                    }
                  />
                </div>
              );
            }
          })}
        </GridWrapper>
      </PaddingWrapper>
    </CardWrapper>
  );
};

export default SameCard;
