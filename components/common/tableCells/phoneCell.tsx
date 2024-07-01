import React, { useCallback, useMemo, useState } from "react";
import { ArrowSelectSvg, LittlePhoneSvg, TickSvg } from "components";
import { PhoneCellWrapper, PhoneContainer } from "./style";
import { IUserPhone } from "types/userPhone";
import formatPhoneNumber, { formatIpPhone } from "utils/phoneNumberFormatter";
import {
  PhoneWrapper,
  Tick,
} from "app/groups/[groupId]/components/administrativeTab/style";
import { bgColors } from "styles/theme";
import { Popover, TooltipProps } from "antd";
import { usePageDataMemo } from "hooks";
import { toast } from "react-toastify";

type Props = TooltipProps & {
  value?: IUserPhone[];
  style?: React.CSSProperties;
  zIndex?: number;
  options?: {
    value: number;
    label: string;
  }[];
};

const PhoneCell = (props: Props) => {
  const [open, setValue] = useState(false);
  const hasConfirmed = useMemo(
    () =>
      props?.value?.find((p: IUserPhone) => p.is_confirmed === 1)?.phone_number,
    [props.value],
  );
  const data = useMemo(
    () =>
      hasConfirmed
        ? props?.value?.find((p: IUserPhone) => p.is_confirmed === 1)
            ?.phone_number
        : props?.value?.[0]?.phone_number,
    [hasConfirmed, props.value],
  );

  const phone = useMemo(
    () => formatPhoneNumber(data?.toString() ?? "0"),
    [data],
  );

  const selects = usePageDataMemo();

  const isValue = props.value && props.value?.length;

  const copyToClipboard = useCallback((phone: string | 0) => {
    if (!!phone)
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          toast.info("Copied to clipboard");
        })
        .catch((err) => {
          toast.error(err.message);
        });
  }, []);
  const content = () => {
    return (
      <PhoneContainer onClick={(e) => e.stopPropagation()}>
        {props?.value?.map((item, index) => {
          return (
            <PhoneWrapper
              key={index}
              style={props.style}
              onClick={() => copyToClipboard(formatIpPhone(item.phone_number))}
            >
              <p className="text" style={props.style}>
                {/*{initialData?.systemEnums?.phone_number?.types[item?.type]}*/}
                {!props.options
                  ? selects?.phone?.find(
                      (type) => type.value === `${item?.type}`,
                    )?.label ?? "Other"
                  : props.options?.find(
                      (type) => `${type.value}` === `${item?.type}`,
                    )?.label ?? "Other"}
              </p>
              <div className="phone" style={props.style}>
                {!!item.is_confirmed ? (
                  <Tick>
                    <TickSvg color={bgColors.white} />
                  </Tick>
                ) : (
                  <LittlePhoneSvg />
                )}
                <span style={props.style}>
                  {formatPhoneNumber(item.phone_number)}
                </span>
              </div>
            </PhoneWrapper>
          );
        })}
      </PhoneContainer>
    );
  };
  const handleChange = (newValue: boolean) => {
    if (isValue) {
      setValue(newValue);
    }
  };
  return (
    <Popover
      destroyTooltipOnHide
      content={isValue ? content : null}
      placement="bottom"
      open={open}
      onOpenChange={handleChange}
      zIndex={props?.zIndex}
      {...props}
    >
      {isValue ? (
        <PhoneCellWrapper
          onClick={(e) => {
            e.stopPropagation();
            copyToClipboard(formatIpPhone(data?.toString() || "0"));
          }}
        >
          {hasConfirmed && (
            <Tick>
              <TickSvg color={bgColors.white} />
            </Tick>
          )}
          <div className="name" style={props.style}>
            {phone}
          </div>
          <ArrowSelectSvg style={{ transform: "rotate(-90deg)" }} />
        </PhoneCellWrapper>
      ) : (
        "-"
      )}
    </Popover>
  );
};

export default React.memo(PhoneCell);
