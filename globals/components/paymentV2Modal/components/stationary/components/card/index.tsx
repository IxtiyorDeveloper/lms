import React, { FC } from "react";
import { Wrapper } from "./style";
import {
  NotGivenSvg,
  PlusSvg,
  ScanBarCodeSvg,
  XMoreInfoIcon,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import BarCodeInput from "../barCodeInput";
import { useAdminProductGetByBarcode } from "hooks";
import Stack from "../stack";
import { ICalculation } from "types/ICalculation";
import { toast } from "react-toastify";
import { EStationaryTypes } from "../../../../../../../types/student/payment";

interface IProps {
  title: string;
  isActive: boolean;
  setValue: any;
  watch: any;
  type: string;
  getValues: any;
  handleClose: any;
  calculation?: ICalculation;
  onClick?: () => void;
  onBlur?: () => void;
}
const Card: FC<IProps> = ({
  title,
  isActive,
  onClick,
  onBlur,
  watch,
  setValue,
  getValues,
  type,
  handleClose,
  calculation,
}) => {
  const data1 = watch(`stationary_items-${type}`);
  const level_id = watch("tools.student.additional.paren_level_id");
  const branch_id = watch("tools.student.additional.branch_id");
  const scan = useAdminProductGetByBarcode({
    onSuccess: (data) => {
      if (
        (level_id == data?.level_id || type == EStationaryTypes.CopyBook) &&
        data.stationary_type == type
      ) {
        setValue(`stationary_items-${type}`, [
          ...(getValues(`stationary_items-${type}`) || []),
          {
            product_id: data.id,
            level_id: data?.level_id,
            new: true,
            ...data,
          },
        ]);
      } else {
        toast.error("This book is not suitable for your level!");
      }
      onBlur?.();
    },
    onError: () => {},
  });

  return (
    <Wrapper isActive={isActive}>
      <div>{title}</div>
      {isActive ? (
        <div className="scan">
          <BarCodeInput
            handleClose={handleClose}
            onInputBarCode={(e) => {
              if (!data1 || data1.length === 0) {
                scan.mutate({
                  query_params: {
                    barcode: e,
                    level_id,
                    branch_id,
                    expand:
                      "activeCount,level_id,coverFile.resolutions,stationary_type",
                  },
                });
              }
            }}
            onBlur={() => {
              onBlur?.();
            }}
          />
          <div>
            <ScanBarCodeSvg />
          </div>
          <div className="desc">Please scan the barcode on stationery</div>
        </div>
      ) : (
        <div className="scan">
          {(calculation?.stationaryHistory?.[
            type as keyof typeof calculation.stationaryHistory
          ]?.length || 0) <= 0 &&
          (!data1 || data1?.length === 0) ? (
            <>
              <NotGivenSvg />
              <div className="not_given">
                <XMoreInfoIcon width={15} height={15} color={bgColors.pop} />
                Not given
              </div>
            </>
          ) : (
            <div className="items">
              <Stack
                active={type}
                level_id={parseInt(level_id || 0)}
                data={data1}
                calculation={calculation}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          )}
          {(!data1 || data1?.length === 0) && (
            <div className="btn" onClick={onClick}>
              <PlusSvg style={{ marginRight: "-1px" }} />
            </div>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default Card;
