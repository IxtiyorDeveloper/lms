import { FilterWrapper, Left, Right, TopFilterWrapper } from "./style";
import {
  Button,
  CalendarSimpleSvg,
  IncomingPersonSvg,
  OutgoingPersonSvg,
  PlusSvg,
  SelectMonth,
  SettingsSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import moment from "moment";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import React, { FC } from "react";
import { coverTab } from "../../index";
import { useRouter } from "next/router";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { ITopFilter } from "./type";
import CalendarHeader from "../calendarFilter/header";
import { CoverActions } from "types/finance/salary";
import IncomingHeader from "../incoming/header";
import OutgoingHeader from "../outgoing/header";
import Link from "next/link";

const TopFilter: FC<ITopFilter> = ({ data, settings, restructured }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleActivate = (type: coverTab) => {
    const { year, month } = router.query;
    router.replace({
      pathname: router.pathname,
      query: {
        year,
        month,
        coverType: type,
      },
    });
  };

  const handleCreate = () => {
    dispatch(
      toggleModal({
        key: "coverTeacher",
        data: {
          data: {
            data,
            settings,
            type: CoverActions.CREATE,
          },
          open: true,
        },
      })
    );
  };

  const headers = {
    [coverTab.CALENDAR]: (
      <CalendarHeader
        data={data}
        restructured={restructured.calendarRestructured}
      />
    ),
    [coverTab.INCOMING]: (
      <IncomingHeader
        data={data}
        restructured={restructured.incomingRestructured}
      />
    ),
    [coverTab.OUTGOING]: (
      <OutgoingHeader
        data={data}
        restructured={restructured.outgoingRestructured}
      />
    ),
  };

  return (
    <TopFilterWrapper>
      <FilterWrapper>
        <Left>
          <Button
            className={
              router.query.coverType === coverTab.CALENDAR ||
              !router.query.coverType
                ? "active"
                : "inactive"
            }
            onClick={() => handleActivate(coverTab.CALENDAR)}
          >
            <CalendarSimpleSvg
              color={
                router.query.coverType === coverTab.CALENDAR ||
                !router.query.coverType
                  ? bgColors.dark
                  : bgColors.yourShadow
              }
            />
          </Button>
          <Button
            className={
              router.query.coverType === coverTab.INCOMING
                ? "active"
                : "inactive"
            }
            onClick={() => handleActivate(coverTab.INCOMING)}
          >
            <IncomingPersonSvg
              color={
                router.query.coverType === coverTab.INCOMING
                  ? bgColors.dark
                  : bgColors.yourShadow
              }
            />
          </Button>
          <Button
            className={
              router.query.coverType === coverTab.OUTGOING
                ? "active"
                : "inactive"
            }
            onClick={() => handleActivate(coverTab.OUTGOING)}
          >
            <OutgoingPersonSvg
              color={
                router.query.coverType === coverTab.OUTGOING
                  ? bgColors.dark
                  : bgColors.yourShadow
              }
            />
          </Button>
        </Left>
        <Right>
          <SelectMonth
            initValue={moment(
              `${router.query.year || moment().year()} ${
                router.query.month || moment().month() + 1
              }`,
              "YYYY MM"
            ).format("MMMM YYYY")}
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
            }
          />
          <Link href={`/finance/salary/cover-teacher/settings`}>
            <Button
              icon={<SettingsSvg width={20} height={20} />}
              style={{
                padding: "0 24px",
                color: textColors.yourShadow,
                backgroundColor: bgColors.wildSand,
                fontWeight: 700,
                borderRadius: 10,
                lineHeight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Setting
            </Button>
          </Link>
          <Button
            icon={<PlusSvg />}
            style={{
              padding: "0 24px",
              color: textColors.blueGray,
              fontWeight: 700,
              borderRadius: 10,
              lineHeight: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
            }}
            onClick={() => handleCreate()}
          >
            Create
          </Button>
        </Right>
      </FilterWrapper>
      {
        headers?.[
          (router.query?.coverType ?? coverTab.CALENDAR) as keyof typeof headers
        ]
      }
    </TopFilterWrapper>
  );
};
export default TopFilter;
