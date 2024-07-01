import React, { FC, useMemo } from "react";
import { Wrapper, HeadTitle } from "./style";
import { Button, CoverTeacherSvg, PlusSvg, SelectMonth } from "components";
import { bgColors, textColors } from "styles/theme";
import InfoCard from "./components/infoCard";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import ChartFirst from "./components/chartFirst";
import ChartSecond from "./components/chartSecond";
import ThirdCardChild from "./components/thirdCardChild";
import FourthCardChild from "./components/fourthCardChild";
import FifthCardChild from "./components/fifthCardChild";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { calculateCards } from "./components/utils";
import { Interface, ISalaryTotal } from "./type";
import TaxChart from "./components/taxChart";
import { SalaryGiveSvg } from "@jasurbekyuldashov/lms-web-icons";
import GiveAllSalaryModal from "globals/components/giveAllSalary";

const TopSite: FC<Interface> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleNavigate = () => {
    router.push("/finance/salary/cover-teacher");
  };

  const handleOpenModal = () => {
    dispatch(
      toggleModal({
        key: "addBonus",
        data: {
          data: {},
          open: true,
        },
      })
    );
  };

  const handleGiveSalary = () => {
    dispatch(
      toggleModal({
        key: "giveAllSalary",
        data: {
          data: {
            main: data,
          },
          open: true,
        },
      })
    );
  };

  const total: any = useMemo(() => {
    //card larni hisoblab olamiz
    return calculateCards({ data });
  }, [data]);

  return (
    <Wrapper>
      <GiveAllSalaryModal />
      <div className="title-site">
        <HeadTitle>Statistics</HeadTitle>
        <div className="right-site">
          <SelectMonth
            initValue={moment(router.query.date?.toString()).format(
              DATE_FORMAT_MMMM_YYYY
            )}
            onChange={(e) =>
              handleNavigateMonth({ e, router, queryKey: "date" })
            }
          />
          <Button
            onClick={handleOpenModal}
            bgColor={bgColors.deep}
            textColor={textColors.white}
          >
            <PlusSvg color={textColors.white} /> Add Bonus
          </Button>
          <Button onClick={handleNavigate}>
            <CoverTeacherSvg /> &nbsp; Teacher Cover
          </Button>
          <Button
            onClick={handleGiveSalary}
            bgColor={bgColors.secondary}
            textColor={textColors.white}
          >
            <SalaryGiveSvg color={textColors.white} /> Give all salary
          </Button>
        </div>
      </div>
      <div className="flex">
        <InfoCard
          title="Total Salary"
          amount={total?.card_1?.total_salary}
          child={<ChartFirst total={total} />}
        />
        <InfoCard
          title="Total Avans"
          amount={total?.card_2?.total_avans}
          child={<ChartSecond total={total} />}
        />
        <InfoCard
          title="Total Tax"
          amount={total?.card_tax?.total_tax}
          child={<TaxChart total={total} />}
        />
        <InfoCard
          title="Total Penalty"
          amount={total?.card_3?.total_penalty}
          child={<ThirdCardChild total={total} />}
        />
        <InfoCard
          title="Total Card"
          amount={total?.card_4.total_card}
          child={<FourthCardChild total={total} data={data} />}
        />
        <InfoCard
          title="Total Cash"
          amount={total?.card_5.total_cash}
          child={<FifthCardChild total={total} />}
        />
      </div>
    </Wrapper>
  );
};

export default TopSite;
