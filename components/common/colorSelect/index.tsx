import { FC } from "react";
import { Controller } from "react-hook-form";
import { Label, Wrapper, Content, Inner, Color } from "./style";
import ErrorLabel from "./errorLabel";
import { Type } from "./type";
import { data } from "../../../constants/colors";
import { CheckSvg, StopSvg } from "components";
import { bgColors } from "styles/theme";

const ColorSelect: FC<Type> = ({
  name,
  error = "",
  control,
  required = false,
  label = "",
  disabled = false,
  style,
  wrapperStyle,
  contentStyle,
  colorStyle,
  isGradient = false,
  heightColor,
  colors = data,
  gradients = [],
  defaultColor,
  ...args
}) => {
  return (
    <Wrapper>
      {label && (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      )}
      <Inner
        required={label ? false : required}
        error={!!error}
        style={wrapperStyle}
      >
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Content style={contentStyle}>
                {!isGradient
                  ? colors?.map((item, k) => {
                      const active =
                        item?.color.toLowerCase() ===
                        defaultColor?.toLowerCase();
                      return (
                        <Color
                          style={{ height: `${heightColor}px` }}
                          key={k}
                          className={`${
                            item?.color === field?.value ? "pd" : ""
                          }`}
                          onClick={() => field.onChange(item?.color)}
                        >
                          <div
                            className={`color ${active ? "active" : ""}`}
                            style={{
                              backgroundColor: item?.color,
                              ...colorStyle,
                            }}
                          >
                            {active && (
                              <div className="check">
                                {" "}
                                <CheckSvg />
                              </div>
                            )}
                            {item?.color === "" && (
                              <div className="abs">
                                <StopSvg color={bgColors.pop} />
                              </div>
                            )}
                          </div>
                        </Color>
                      );
                    })
                  : gradients?.map((item, k) => {
                      const active =
                        item?.from + "_" + item?.to.toLowerCase() ===
                        defaultColor?.toLowerCase();
                      return (
                        <Color
                          style={{ height: `${heightColor}px` }}
                          key={k}
                          className={`${
                            item?.from + "_" + item?.to === field?.value
                              ? "pd"
                              : ""
                          }`}
                          onClick={() =>
                            field.onChange(item?.from + "_" + item?.to)
                          }
                        >
                          <div
                            className={`color ${active ? "active" : ""}`}
                            style={{
                              background: `linear-gradient(to right bottom, ${item.from}, ${item.to})`,
                              ...colorStyle,
                            }}
                          >
                            {active && (
                              <div className="check">
                                {" "}
                                <CheckSvg />
                              </div>
                            )}
                            {item?.to === "" && (
                              <div className="abs">
                                <StopSvg color={bgColors.pop} />
                              </div>
                            )}
                          </div>
                        </Color>
                      );
                    })}
              </Content>
            );
          }}
        />
      </Inner>
      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default ColorSelect;
