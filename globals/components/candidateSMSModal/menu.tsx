import React, { useMemo } from "react";
import { Empty } from "antd";
import { ICompany } from "types";
import { bgColors } from "styles/theme";
import { Radios, SmsEditSvg, SmsStarSvg } from "components";
import { ChildWrapper, ProfileWrapper } from "./style";

export const TemplateMenu = ({
  templates,
  control,
  errors,
}: {
  templates: (ICompany[] | undefined)[];
  control: any;
  errors: any;
}): {
  label: string;
  icon: JSX.Element;
  children: JSX.Element;
  value: string;
}[] => {
  const menu = useMemo(
    () => [
      {
        label: "My Template",
        icon: <SmsEditSvg />,
        children: (
          <ChildWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              backgroundColor: bgColors.whiteSmoke,
              borderRadius: "8px",
              padding: "10px",
            }}>
            {!templates?.[0]?.length && (
              <div className="empty-wrapper">
                <Empty description={null} />
              </div>
            )}
            {templates?.[0]?.map((template, index: number) => {
              return (
                <ProfileWrapper
                  key={index}
                  style={{
                    backgroundColor: bgColors.transparent,
                    boxShadow: "none",
                    padding: "0",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}>
                  <Radios
                    style={{
                      width: "100%",
                      boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                      backgroundColor: bgColors.white,
                      borderRadius: "8px",
                    }}
                    left={false}
                    name="template_id"
                    control={control}
                    options={[{ value: template.id, label: template.text }]}
                    error={errors?.template_id?.message}
                  />
                </ProfileWrapper>
              );
            })}
          </ChildWrapper>
        ),
        value: "0",
      },
      {
        label: "Company Templates",
        icon: <SmsStarSvg />,
        children: (
          <ChildWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              backgroundColor: bgColors.whiteSmoke,
              borderRadius: "8px",
              padding: "10px",
            }}>
            {!templates?.[1]?.length && (
              <div className="empty-wrapper">
                <Empty description={null} />
              </div>
            )}
            {templates?.[1]?.map((template, index) => {
              return (
                <ProfileWrapper
                  key={index}
                  style={{
                    backgroundColor: bgColors.transparent,
                    boxShadow: "none",
                    padding: "0",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}>
                  <Radios
                    style={{
                      width: "100%",
                      boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                      backgroundColor: bgColors.white,
                      borderRadius: "8px",
                    }}
                    left={false}
                    name="template_id"
                    control={control}
                    options={[{ value: template.id, label: template.text }]}
                    error={errors?.template_id?.message}
                  />
                </ProfileWrapper>
              );
            })}
          </ChildWrapper>
        ),
        value: "1",
      },
    ],
    [templates]
  );

  return menu;
};
