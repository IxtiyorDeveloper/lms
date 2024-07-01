import React, { FC, useEffect, useRef } from "react";
import {
  CalendarESvg,
  ClockSvg,
  FilterSvg,
  GroupSvg,
  LocationSvg,
  RoomSvg,
} from "components";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";
import { iframeTest } from "components/printD";
import disableScroll from "disable-scroll";

const PrintBlackList: FC = () => {
  const dispatch = useDispatch();
  const checkRef = useRef(null);
  const {
    blackListPrint: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "blackListPrint",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handlePrint = () => {
    disableScroll.on();
    iframeTest(checkRef);
    handleClose();
    setTimeout(() => {
      disableScroll.off();
    }, 400);
  };

  useEffect(() => {
    if (open) {
      handlePrint();
    }
  }, [open]);

  return (
    <Wrapper>
      <div id="form1" ref={checkRef}>
        {/* @ts-ignore */}
        <font face="Arial Black, Arial Bold, Gadget, sans-serif">
          <h2
            style={{
              margin: "0 0 10px 0",
              textAlign: "center",
              borderBottom: "1px solid gray",
            }}
            className="text-center"
          >
            Black List
          </h2>
          {/* @ts-ignore */}
        </font>
        {/* @ts-ignore */}
        <font face="Arial Black, Arial Bold, Gadget, sans-serif">
          <h2 style={{ marginLeft: "10px" }} className="text-center">
            {data?.name}
          </h2>
          {/* @ts-ignore */}
        </font>
        {data?.groups?.map((group: any) => {
          return (
            <div key={group.name}>
              <div
                className="clas"
                style={{
                  border: "2px solid #000",
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderBottom: "2px solid #000",
                  }}
                >
                  <div style={{ width: "100%", paddingLeft: "8px" }}>
                    <p
                      style={{
                        padding: 0,
                        margin: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                      }}
                    >
                      <GroupSvg height={22} width={22} color={bgColors.black} />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group.name}
                        {/* @ts-ignore */}
                      </font>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    borderBottom: "2px solid #000",
                  }}
                >
                  <div style={{ width: "100%", paddingLeft: "8px" }}>
                    <p
                      style={{
                        padding: 0,
                        margin: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                      }}
                    >
                      <FilterSvg
                        height={22}
                        width={22}
                        color={bgColors.black}
                      />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group?.level_name}
                        {/* @ts-ignore */}
                      </font>
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "100%", paddingLeft: "8px" }}>
                    <p
                      style={{
                        padding: 0,
                        margin: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                      }}
                    >
                      {" "}
                      <CalendarESvg
                        height={22}
                        width={22}
                        color={bgColors.black}
                      />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group?.day}
                        {/* @ts-ignore */}
                      </font>{" "}
                      <ClockSvg height={22} width={22} color={bgColors.black} />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group.time.slice(0, 5)}
                        {/* @ts-ignore */}
                      </font>{" "}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    borderTop: "2px solid #000",
                  }}
                >
                  <div style={{ width: "100%", paddingLeft: "8px" }}>
                    <p
                      style={{
                        padding: 0,
                        margin: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                      }}
                    >
                      <LocationSvg
                        height={22}
                        width={22}
                        color={bgColors.black}
                      />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group?.branch_name}
                        {/* @ts-ignore */}
                      </font>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    borderTop: "2px solid #000",
                  }}
                >
                  <div style={{ width: "100%", paddingLeft: "8px" }}>
                    <p
                      style={{
                        padding: 0,
                        margin: "3px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: 700,
                      }}
                    >
                      <RoomSvg height={22} width={22} color={bgColors.black} />{" "}
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        {group?.room}
                        {/* @ts-ignore */}
                      </font>
                    </p>
                  </div>
                </div>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: "10px 0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  padding: "0",
                  border: "2px solid #000",
                }}
              >
                {group?.contacts?.map((student: any, index: number) => {
                  return (
                    <li
                      key={student.user_id}
                      style={{
                        borderBottom:
                          group?.contacts?.length - 1 !== index
                            ? "2px solid #000"
                            : "none",
                        gap: "8px",
                        padding: "8px",
                        display: "flex",
                        backgroundColor:
                          (index + 1) % 2 !== 0
                            ? bgColors.whiteSmoke
                            : bgColors.brilliance,
                        fontWeight: 600,
                      }}
                    >
                      <span style={{}}>
                        {/* @ts-ignore */}
                        <font face="Arial, Helvatica, sans-serif">
                          {index + 1}
                          {/* @ts-ignore */}
                        </font>
                      </span>
                      <span style={{}}>
                        {/* @ts-ignore */}
                        <font face="Arial, Helvatica, sans-serif">
                          {student.full_name}
                          {/* @ts-ignore */}
                        </font>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div
                style={{
                  margin: "25px 0",
                  borderBottom: `3px dashed ${bgColors.black}`,
                  backgroundColor: bgColors.transparent,
                }}
              />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default PrintBlackList;
