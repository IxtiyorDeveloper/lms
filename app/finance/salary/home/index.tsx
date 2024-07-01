import React, { useEffect } from "react";
import { Wrapper } from "./style";
import { useForm } from "react-hook-form";
import DeleteCorrection from "globals/components/deleteCorrection";
import SalaryDetailsModal from "globals/components/salaryDetails";
import AddBonusModal from "globals/components/addBonusModal";
import SalaryConfigModal from "globals/components/salaryConfigModal";
import { useSalaryMain } from "hooks";
import moment from "moment/moment";
import { useRouter } from "next/router";
import PrintSalaryDetails from "globals/components/printSalaryDetails";
import { convertNumericStringsToNumbers } from "utils/changeValuesToNumber";
import { useDispatch, useSelector } from "react-redux";
import { IStore, setSalary } from "store";
import { SecondSection, TopSite } from "./components";
import { expand } from "constants/finance/salary";

const SalaryHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { control } = useForm();

  const {
    data: hookData,
    isLoading,
    isPreviousData,
    ...args
  } = useSalaryMain({
    query_params: {
      expand,
      year: moment(router?.query?.date)?.year(),
      month: moment(router?.query?.date).format("MM"),
      date: undefined,
    },
  });

  const { data: mainSalary } = useSelector((state: IStore) => state.salary);

  useEffect(() => {
    dispatch(setSalary(hookData));
  }, [hookData]);

  return (
    <Wrapper>
      <SalaryConfigModal />
      <AddBonusModal />
      <SalaryDetailsModal />
      <DeleteCorrection />
      <TopSite data={convertNumericStringsToNumbers(mainSalary)} />
      <SecondSection
        control={control}
        data={convertNumericStringsToNumbers(mainSalary)}
        args={args}
        isLoading={isLoading}
      />
      <PrintSalaryDetails />
    </Wrapper>
  );
};

export default SalaryHome;
