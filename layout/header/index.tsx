import React from "react";
import { Grid } from "@mui/material";
import { HeaderContainerBox } from "./style";
import SearchInput from "./global-search/index";
import Profile from "./profile";
import RouteHandler from "./components/routeHandler";
import { ComplaintSvg } from "components";
import { bgColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import TaskNotifications from "./components/notifications/task";
import CallRequestNotifications from "./components/notifications/callRequest";
import { TaxDeviceState } from "@jasurbekyuldashov/lms-web-icons";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import Call from "./components/call";

const Header = () => {
  const dispatch = useDispatch();
  const isTaxModalConnected = useSelector(
    (state: IStore) => state.check.isConnected
  );
  // const sip = useSelector((state: IStore) => state.sip.sip);

  // const operator = useSelector((state: IStore) => state.user?.user?.operator);

  // const register = () => {
  //   try {
  //     if (!!operator) {
  //       sip.ref.ua.start();
  //       dispatch(
  //         setSip({
  //           ...sip,
  //           sipStatus: "sipStatus/REGISTERED",
  //         })
  //       );
  //       dispatch(toggleDialPad(true));
  //     }
  //   } catch (e) {
  //     toast.error("Something went wrong!");
  //   }
  // };

  return (
    <HeaderContainerBox>
      <Grid container justifyContent="space-between">
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <RouteHandler />
        </Grid>
        <Grid item justifyContent="flex-end">
          <Grid
            container
            spacing="20px"
            alignItems="center"
            justifyContent="flex-end"
            display="flex"
          >
            <Grid item>
              <SearchInput />
            </Grid>
            <Grid
              item
              className="pointer"
              onClick={() =>
                dispatch(
                  toggleModal({
                    key: "complaint",
                    data: {
                      data: {},
                      open: true,
                    },
                  })
                )
              }
            >
              <ComplaintSvg />
            </Grid>
            <Call />
            {/* {operator && (
              <Popover
                trigger="click"
                title={
                  <div style={{ padding: "20px" }}>
                    <input type="text" id="phone_number" />
                    <button
                      onClick={() => {
                        sip.ref?.startCall(
                          `sip:${(document.getElementById("phone_number") as any).value as string}@${env.pbxUrl}`
                        );
                      }}
                    >
                      call
                    </button>
                  </div>
                }
              >
                <div className="actions">
                  <CallAction
                    background={bool ? bgColors.midori : bgColors.brotherBlue}
                    boxShadow={bool ? "inset 0 3.05px 6.1px #70D088" : ""}
                    // onClick={register}
                  >
                    <CallSvg width={15} height={15} />
                  </CallAction>
                </div>
              </Popover>
            )} */}
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_take_payment_student]}
            >
              <Grid item>
                <div className="tax-btn">
                  <TaxDeviceState
                    onClick={() =>
                      dispatch(
                        toggleModal({
                          key: "taxModal",
                          data: {
                            data: {},
                            open: true,
                          },
                        })
                      )
                    }
                    bgColor={isTaxModalConnected ? bgColors.midori : "#FF6A55"}
                  />
                </div>
              </Grid>
            </CheckPermission>
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_see_call_request_notification]}
            >
              <Grid item>
                <CallRequestNotifications />
              </Grid>
            </CheckPermission>
            <Grid item>
              <TaskNotifications />
            </Grid>
            <Grid item>
              <Profile />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HeaderContainerBox>
  );
};

export default Header;

//#23262F
