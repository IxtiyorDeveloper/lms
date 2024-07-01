import React, { FC } from "react";
import Box from "@mui/material/Box";
import { Spin } from "antd";
import { ITypeLoader } from "./type";

const Loader: FC<ITypeLoader> = (props) => {
  const { isLoading } = props;

  return isLoading ? (
    <Box
      height="100%"
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top="0"
      left="0"
    >
      <Spin spinning={isLoading} />
    </Box>
  ) : null;
};

export default Loader;
