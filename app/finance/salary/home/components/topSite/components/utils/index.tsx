import { IDepartment } from "types/department";
import { IRole, SalaryEnums, TAssignment } from "types";
import { filterDuplicate } from "utils/filterDuplicate";
import { ISalaryMain } from "types/finance/salary";

export const calculateCards = ({
  data,
}: {
  data: ISalaryMain[] | undefined;
}) => {
  let departments: IDepartment[] = [];
  let penalty: { total: number; role: IRole; num: number }[] = [];
  //barcha cardlar uchun umumiy strukturani keltirib olamiz
  let card_1 = {
    total_salary: 0,
    fixed: 0,
    kpi: 0,
    bonus: 0,
    correction: 0,
  };
  let card_2 = {
    total_avans: 0,
    avans: null,
  };
  let card_tax = {
    total_tax: 0,
    tax: null,
  };
  let card_4: {
    total_card: number;
    card: { assignment: TAssignment }[] | [];
  } = {
    total_card: 0,
    card: [],
  };
  let card_5: {
    total_cash: number;
  } = {
    total_cash: 0,
  };

  let avans: { department: IDepartment; total: number }[] = [];
  let tax: { department: IDepartment; total: number }[] = [];
  if (data) {
    for (let i = 0; i < data?.length; i++) {
      for (let j = 0; j < data?.[i]?.assignments?.length; j++) {
        const assignment = data?.[i]?.assignments[j];
        //card 1 hisoblab olamiz
        card_1 = {
          ...card_1,
          total_salary: card_1.total_salary + +(assignment?.total_salary || 0),
          fixed:
            card_1.fixed +
            assignment?.salaryComponents
              ?.filter((agg) => agg.type == SalaryEnums.FIXED_SALARY)
              ?.reduce((acc, cur) => {
                return acc + (cur?.value || 0);
              }, 0),
          kpi:
            card_1.kpi +
            assignment?.salaryComponents
              ?.filter((agg) => agg.type == SalaryEnums.KPI)
              ?.reduce((acc, cur) => {
                return acc + (cur?.value || 0);
              }, 0),
          bonus:
            card_1.bonus +
            assignment?.salaryComponents
              ?.filter((agg) => agg.type === SalaryEnums.BONUS)
              ?.reduce((acc, cur) => {
                return acc + (cur?.value || 0);
              }, 0),
          correction:
            card_1.correction +
            assignment?.salaryComponents
              ?.filter((agg) => agg.type === SalaryEnums.CORRECTION)
              ?.reduce((acc, cur) => {
                return acc + (cur?.value || 0);
              }, 0),
        };
        //card 2 ni hisoblab olamiz
        card_2 = {
          ...card_2,
          total_avans: card_2.total_avans + +(assignment?.avans || 0),
        };
        //card tax ni hisoblab olamiz
        card_tax = {
          ...card_tax,
          total_tax: card_tax.total_tax + +(assignment?.tax || 0),
        };
        //card 4 ni hisoblab olamiz
        if (!!assignment?.card) {
          card_4 = {
            ...card_4,
            total_card: card_4.total_card + +(assignment?.card || 0),
            card: [
              ...card_4.card,
              {
                assignment: assignment,
              },
            ],
          };
        }
        //card 5 ni hisoblab olamiz
        if (!!assignment?.cash) {
          card_5 = {
            ...card_5,
            total_cash: card_5.total_cash + +assignment?.cash,
          };
        }

        departments = [...departments, data[i]?.department];
      }
      //penalty ni hisoblab olamiz
      penalty = [
        ...penalty,
        {
          role: data[i]?.role,
          total: data[i]?.assignments?.reduce((acc, cur) => {
            return acc + (cur?.penalty || 0);
          }, 0),
          num: data[i]?.assignments?.reduce((acc, cur) => {
            return acc + (cur?.penalty > 0 ? 1 : 0);
          }, 0),
        },
      ];
    }
    //departments ni duplicate filter qilib olamiz
    const temp = filterDuplicate(departments);
    if (!!temp) {
      for (let i = 0; i < temp?.length; i++) {
        //avans ni hisoblab olamiz
        avans = [
          ...avans,
          {
            department: temp[i],
            total: data
              ?.filter((all) => all?.department?.id === temp[i]?.id)
              ?.map((item) =>
                item.assignments.reduce((acc, cur) => {
                  return acc + +(cur?.avans || 0);
                }, 0)
              )
              ?.reduce((acc, curr) => {
                return acc + curr;
              }, 0),
          },
        ];
        //tax ni hisoblab olamiz
        tax = [
          ...tax,
          {
            department: temp[i],
            total: data
              ?.filter((all) => all?.department?.id === temp[i]?.id)
              ?.map((item) =>
                item.assignments.reduce((acc, cur) => {
                  return acc + +(cur?.tax || 0);
                }, 0)
              )
              ?.reduce((acc, curr) => {
                return acc + curr;
              }, 0),
          },
        ];
      }
    }
  }

  return {
    card_1,
    card_2: {
      total_avans: card_2?.total_avans,
      avans: avans.sort((a, b) => b.total - a.total),
    },
    card_tax: {
      total_tax: card_tax?.total_tax,
      tax: tax.sort((a, b) => b.total - a.total),
    },
    card_3: {
      total_penalty: penalty?.reduce((acc, cur) => {
        return acc + cur?.total;
      }, 0),
      penalty: penalty.sort((a, b) => b.total - a.total),
    },
    card_4,
    card_5,
  };
};
