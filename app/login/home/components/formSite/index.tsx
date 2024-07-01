import React, { FC, useState } from "react";
import {
  ArrowRight,
  EyeSvg,
  Input,
  LogoSvg,
  MainHeadWithTitle,
  SecuritySvg,
  UsernameSvg,
} from "components";
import { FormButton, FormSide, Main, SelectSite, Title } from "./style";
import { Box } from "@mui/system";
import { Spin } from "antd";
import { bgColors, textColors } from "styles/theme";

const FormSite: FC<any> = ({
  control,
  handleSubmit,
  onSubmit,
  errors,
  loading,
  active,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <SelectSite>
      <MainHeadWithTitle title="Login | LMS" />
      <div>
        <LogoSvg />
      </div>
      <Main>
        <Title>Admin</Title>
        <p>Automated chain of processes</p>
        <FormSide>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box width="100%">
              <Box mb={2}>
                <Input
                  prefix={<UsernameSvg width={24} height={24} />}
                  style={{ height: "50px", width: "100%" }}
                  placeholder="login"
                  name="iuytqwiqrtuwy1"
                  autoFocus
                  control={control}
                  error={errors?.login?.message}
                  autoComplete="off"
                />
              </Box>
              <Box>
                <Input
                  prefix={<SecuritySvg width={24} height={24} />}
                  style={
                    {
                      height: "50px",
                      width: "100%",
                      ...(showPassword ? { WebkitTextSecurity: "disc" } : {}),
                    } as any
                  }
                  placeholder="password"
                  name="kjbsldbdfjklsa2"
                  suffix={
                    <EyeSvg
                      onClick={() => setShowPassword(!showPassword)}
                      color={
                        showPassword
                          ? bgColors.sceptreBlue
                          : bgColors.brotherBlue
                      }
                      className="pointer"
                    />
                  }
                  control={control}
                  error={errors?.password?.message}
                  autoComplete="off"
                />
              </Box>
            </Box>
            <Spin style={{ marginTop: 10 }} spinning={loading}>
              <FormButton
                style={{
                  backgroundColor: !active
                    ? bgColors.wildSand
                    : bgColors.primary,
                  width: "100%",
                }}
                type="submit"
                disabled={!active}
              >
                <span
                  style={{
                    color: !active ? textColors.brotherBlue : textColors.dark,
                  }}
                >
                  Next
                </span>
                <ArrowRight
                  width={100}
                  height={20}
                  color={!active ? textColors.brotherBlue : textColors.dark}
                />
              </FormButton>
            </Spin>
          </form>
        </FormSide>
      </Main>
    </SelectSite>
  );
};

export default FormSite;
