import * as icons from "components/elements/actions";
import React, { useMemo } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
function Icons() {
  const arrayFromIconsObj = useMemo(() => {
    const newItem = [];
    for (const key in icons) {
      newItem.push(key);
    }
    return newItem;
  }, []);

  return (
    <Grid container px="40px">
      {arrayFromIconsObj.map((item) => {
        // @ts-ignore
        const ItemComponent = icons[item as string];
        return (
          <Grid
            item
            key={JSON.stringify(item)}
            width="200px"
            height="200px"
            style={{
              display: "grid",
              alignItems: "center",
              justifyContent: "center",
              border: "0.5px solid black",
            }}
          >
            <Box display="flex" flex={1} justifyContent="center">
              <ItemComponent width={40} height={40} />
            </Box>
            <Typography
              onClick={() => {
                navigator.clipboard.writeText(item);
                toast("text copied");
              }}
            >
              {item}
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Icons;
