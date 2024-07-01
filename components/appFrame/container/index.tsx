import React from "react";
import { Grid, Stack } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { Content, MainContainer } from "./style";
import { Footer, Header, Sidebar } from "layout";

type TProps = {
  children?: React.ReactNode;
  theme: any;
};

function Frame(props: TProps) {
  return (
    <MainContainer>
      <ThemeProvider theme={props.theme}>
        <Grid container>
          <Grid item className="sidebarContainer">
            <Sidebar />
          </Grid>
          <Grid item className="mainBlock">
            <Stack className="childContent">
              <Header />
              <Content>{props.children}</Content>
              <Footer />
            </Stack>
          </Grid>
        </Grid>
      </ThemeProvider>
    </MainContainer>
  );
}

export default Frame;
