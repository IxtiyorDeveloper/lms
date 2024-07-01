import React, { useCallback } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import {
  CheckBox,
  PrintSvg,
  SettingsSvg,
  DifferenceLastMonth,
} from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { ISalaryMain } from "types/finance/salary";
import {
  Average,
  Box,
  HighCircle,
  Icons,
  InnerWrapper,
  Left,
  LowCircle,
  Middle,
  NormalCircle,
  Right,
  Title,
  Wrapper,
  UnClearCircle,
  AWrapper,
} from "./style";
import {
  DecreaseSvg,
  EqualSvg,
  IncreaseSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import BranchFilter from "./components/branchFilter";
import { usePageDataMemo } from "hooks";

const HeadSide = ({
  data,
  header,
  control,
  watch,
}: {
  data: ISalaryMain;
  watch: any;
  header: {
    length: number | undefined;
    average: number;
    increase: number;
    decrease: number;
    equal: number;
    high: number;
    normal: number;
    low: number;
    unclear: number;
    average_difference: number;
  };
  control: any;
}) => {
  const selects = usePageDataMemo();

  const dispatch = useDispatch();

  const handleOpenModal = useCallback((data: ISalaryMain) => {
    dispatch(
      toggleModal({
        key: "financeConfig",
        data: {
          data: {
            role_id: data?.role?.id,
            shift_id: data?.shift,
            data,
          },
          open: true,
        },
      }),
    );
  }, []);

  return (
    <Wrapper>
      <Title>
        <InnerWrapper>
          <p>{data?.role?.name}</p>
          {data?.shift && <p>({data?.shift.name})</p>}
          <span className="grotesk">{header.length}</span>
        </InnerWrapper>
        <AWrapper>
          <Average>{toCurrencyFormat(header.average ?? "0")}</Average>
          <DifferenceLastMonth difference={header.average_difference} />
        </AWrapper>
      </Title>
      <Middle>
        <Box>
          <Left>
            <IncreaseSvg />
            <span>{header.increase}</span>
          </Left>
          <Right>
            <CheckBox name="increase" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <DecreaseSvg />
            <span>{header.decrease}</span>
          </Left>
          <Right>
            <CheckBox name="decrease" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <EqualSvg />
            <span>{header?.equal}</span>
          </Left>
          <Right>
            <CheckBox name="equal" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <HighCircle />
            <span>{header.high}</span>
          </Left>
          <Right>
            <CheckBox name="high" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <NormalCircle />
            <span>{header.normal}</span>
          </Left>
          <Right>
            <CheckBox name="normal" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <LowCircle />
            <span>{header.low}</span>
          </Left>
          <Right>
            <CheckBox name="low" control={control} />
          </Right>
        </Box>
        <Box>
          <Left>
            <UnClearCircle />
            <span>{header.unclear}</span>
          </Left>
          <Right>
            <CheckBox name="unclear" control={control} />
          </Right>
        </Box>
      </Middle>
      <Icons>
        <BranchFilter
          selects={selects}
          topControl={control}
          mainWatch={watch}
        />
        <CheckPermission permission={[COMPONENTS_VIEWS.can_manage_salary]}>
          <SettingsSvg
            onClick={() => handleOpenModal(data)}
            style={{ cursor: "pointer" }}
          />
        </CheckPermission>
        <div
          onClick={() => {
            dispatch(
              toggleModal({
                key: "printSalaryDetails",
                data: {
                  data: { ...data, assignments: data?.assignments },
                  open: true,
                },
              }),
            );
          }}
        >
          <PrintSvg width={21} height={21} style={{ cursor: "pointer" }} />
        </div>
      </Icons>
    </Wrapper>
  );
};

export default HeadSide;
