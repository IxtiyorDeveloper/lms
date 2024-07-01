import React, { FC, useEffect, useState } from "react";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { Dropdown, MenuProps, Spin } from "antd";
import { EyeSvg, MuteSvg, ChevronDownSvg, CheckBox } from "components";
import { bgColors } from "styles/theme";
import { PhoneType, SelectScenarios, LabelWrap } from "./style";
import { IPhoneTypeC } from "./type";
import { data } from "./constants";
import { usePageDataExclusion } from "hooks";

const PhoneTypeC: FC<IPhoneTypeC> = ({
  phone,
  control,
  pageView,
  reset,
  watch,
  setValue,
  getValues,
}) => {
  const { data: pageData, isLoading: pageDataLoading } = usePageDataExclusion();
  const [red, setRed] = useState<boolean>(false);

  const [items, setItems] = useState<MenuProps["items"]>([
    {
      key: "1",
      label: (
        <LabelWrap onClick={(e) => e.stopPropagation()}>
          <CheckBox name={`${phone.phone_number}_check_all`} control={control}>
            Select All
          </CheckBox>
        </LabelWrap>
      ),
    },
  ]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        let isDef = false;
        for (let v in value[`${phone.phone_number}_check`]) {
          if (value[`${phone.phone_number}_check`][v]) {
            isDef = true;
          }
        }
        if (name !== `${phone.phone_number}_check_all`) {
          let isAll = true;
          Object?.keys(pageData!?.auto_sms_keys).map((p) => {
            const a = getValues(`${phone.phone_number}_check.${p}`);
            if (a !== true) {
              isAll = false;
            }
          });
          setValue(`${phone.phone_number}_check_all`, isAll);
        }
        setRed(() => isDef);
        if (name === `${phone.phone_number}_check_all`) {
          setRed(getValues(`${phone.phone_number}_check_all`));
          Object?.keys(pageData!?.auto_sms_keys).map((p) => {
            setValue(
              `${phone.phone_number}_check.${p}`,
              getValues(`${phone.phone_number}_check_all`)
            );
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, pageData, phone, pageView?.auto_sms?.length]);

  useEffect(() => {
    if (pageView?.auto_sms?.length > 0) {
      setRed(true);
    }

    if (pageData?.auto_sms_keys) {
      Object.keys(pageData?.auto_sms_keys).map((text) => {
        setValue(`${pageView?.phone_number}_check.${text}`, false);
      });
    }

    pageView?.auto_sms?.map((text: string) => {
      setValue(`${pageView.phone_number}_check.${text}`, true);
    });

    let isAll = true;
    Object?.keys(pageData!?.auto_sms_keys || {}).map((p) => {
      const a = getValues(`${pageView?.phone_number}_check.${p}`);
      if (a !== true) {
        isAll = false;
      }
    });
    setValue(`${pageView?.phone_number}_check_all`, isAll);
  }, [pageView?.auto_sms?.length, pageData, phone]);

  useEffect(() => {
    if (pageData) {
      Object.keys(pageData.auto_sms_keys).map((p) => {
        setItems((prev) => [
          // @ts-ignore
          ...prev,
          {
            key: p.toString(),
            label: (
              <LabelWrap onClick={(e) => e.stopPropagation()}>
                <CheckBox
                  name={`${phone.phone_number}_check.${p}`}
                  control={control}
                >
                  {p}
                </CheckBox>
              </LabelWrap>
            ),
          },
        ]);
      });
    }
  }, [pageData]);

  const Icon = data[phone.type as keyof typeof data].icon;

  return (
    <div>
      <PhoneType>
        <div className="phone-type">
          <div className="icon">
            <div className={data[phone.type as keyof typeof data].className}>
              {typeof data[phone.type as keyof typeof data].icon ===
              "string" ? (
                <img
                  src={data[phone.type as keyof typeof data].icon as any}
                  alt={phone.phone_number}
                  width={33}
                  height={33}
                />
              ) : (
                <Icon height={28} width={28} />
              )}
            </div>
          </div>
          <div>
            <p className="title-ph">
              {data[phone.type as keyof typeof data].title}
            </p>
            <p className="title-phone">
              {formatPhoneNumber(phone.phone_number)}
            </p>
          </div>
        </div>
        <Spin spinning={pageDataLoading}>
          <div className="select-scenario">
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <SelectScenarios className={red ? "chosen" : ""}>
                {red ? <MuteSvg color={bgColors.white} /> : <EyeSvg />}
                <ChevronDownSvg
                  color={red ? bgColors.white : ""}
                  height={18}
                  width={18}
                />
              </SelectScenarios>
            </Dropdown>
          </div>
        </Spin>
      </PhoneType>
    </div>
  );
};

export default PhoneTypeC;
