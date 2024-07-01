import React from "react";
import { Inner, TopContent, Wrapper } from "./style";
import { HolidayTable } from "./components";
import { Button, PlusSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { HolidayModal, DeleteHoliday } from "globals/components";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

const Holidays = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <HolidayModal />
      <DeleteHoliday />
      <Inner>
        <TopContent>
          <div className="button">
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_manage_holiday_settings]}
            >
              <Button
                icon={<PlusSvg />}
                style={{
                  padding: "0 24px",
                  fontWeight: 700,
                  borderRadius: 10,
                }}
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "holiday",
                      data: {
                        data: {
                          type: "create",
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                Holiday
              </Button>
            </CheckPermission>
          </div>
        </TopContent>
        <HolidayTable />
      </Inner>
    </Wrapper>
  );
};

export default Holidays;
