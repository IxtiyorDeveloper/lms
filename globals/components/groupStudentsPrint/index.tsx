import React, { FC, useEffect, useRef } from "react";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarESvg,
  ClockSvg,
  FilterSvg,
  GroupSvg,
  LocationSvg,
  RoomSvg,
} from "components";
import { bgColors } from "styles/theme";
import {
  STOPPING_STUDENT,
  TRANSFERRED_STUDENT,
} from "constants/studentStatuses";
import { PAYMENT_FULL_PAID, PAYMENT_PARTIALLY_PAID } from "constants/payment";
import { iframeTest } from "components/printD";

const PrintGroupStudents: FC = () => {
  const dispatch = useDispatch();
  const checkRef = useRef();
  const {
    groupStudentsList: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "groupStudentsList",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handlePrint = () => {
    iframeTest(checkRef);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      handlePrint();
    }
  }, [open]);

  let a = 0;

  return (
    <div
      style={{
        display: "block",
        position: "absolute",
        top: "-300%",
        padding: "10px",
      }}
    >
      <div ref={checkRef as any} id="form1">
        {/* @ts-ignore */}
        <font face="Arial Black, Arial Bold, Gadget, sans-serif">
          <h2 style={{ marginLeft: "10px" }} className="text-center">
            {data?.name}
          </h2>
          {/* @ts-ignore */}
        </font>
        <div>
          <div
            className="clas"
            style={{
              border: "2px solid #000",
              borderRadius: "10px",
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
                    {data?.groups?.name}
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
                  <FilterSvg height={22} width={22} color={bgColors.black} />{" "}
                  {/* @ts-ignore */}
                  <font
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    face="Arial, Helvatica, sans-serif"
                  >
                    {data?.groups?.level?.parent?.name} |{" "}
                    {data?.groups?.level?.name}
                    {/* @ts-ignore */}
                  </font>
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
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
                  <CalendarESvg height={22} width={22} color={bgColors.black} />{" "}
                  {/* @ts-ignore */}
                  <font face="Arial, Helvatica, sans-serif">
                    {data?.groups?.lessonDay?.name as any}
                    {/* @ts-ignore */}
                  </font>
                  {"  "}
                  <ClockSvg
                    height={22}
                    width={22}
                    color={bgColors.black}
                  />{" "}
                  {/* @ts-ignore */}
                  <font face="Arial, Helvatica, sans-serif">
                    {data?.groups?.lessonTime?.time?.slice(0, 5)}
                    {/* @ts-ignore */}
                  </font>
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                borderTop: "2px solid black",
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
                  {" "}
                  <LocationSvg
                    height={22}
                    width={22}
                    color={bgColors.black}
                  />{" "}
                  {/* @ts-ignore */}
                  <font face="Arial, Helvatica, sans-serif">
                    {data?.groups?.room?.branch?.name}
                    {/* @ts-ignore */}
                  </font>{" "}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", borderTop: "2px solid black" }}>
              <div
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                }}
              >
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
                    {data?.groups?.room?.name}
                    {/* @ts-ignore */}
                  </font>
                </p>
              </div>
            </div>
          </div>

          <div
            className="clas"
            style={{
              border: "2px solid #000",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <div style={{ display: "flex", borderBottom: "2px solid black" }}>
              <div
                style={{
                  width: "100%",
                  paddingLeft: "8px",
                }}
              >
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
                  {/* @ts-ignore */}
                  <font face="Arial, Helvatica, sans-serif">
                    <span style={{ fontWeight: 400 }}>Teacher:</span>{" "}
                    {data?.groups?.teacher?.user?.userProfile?.firstname}{" "}
                    {data?.groups?.teacher?.user?.userProfile?.lastname?.slice(
                      0,
                      1
                    )}
                    {/* @ts-ignore */}
                  </font>
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
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
                  {/* @ts-ignore */}
                  <font face="Arial, Helvatica, sans-serif">
                    <span style={{ fontWeight: 400 }}>Support:</span>{" "}
                    {data?.groups?.support?.user?.userProfile?.firstname}{" "}
                    {data?.groups?.support?.user?.userProfile?.lastname?.slice(
                      0,
                      1
                    )}
                    {/* @ts-ignore */}
                  </font>
                </p>
              </div>
            </div>
          </div>
          <ul
            style={{
              listStyle: "none",
              margin: "5px 0",
              borderRadius: "8px",
              overflow: "hidden",
              padding: "0",
              border: "2px solid #000",
            }}
          >
            {data?.groups?.allContacts?.map((student: any, index: number) => {
              if (
                String(student?.status) !== STOPPING_STUDENT &&
                String(student?.status) !== TRANSFERRED_STUDENT
              ) {
                a = a + 1;
              }
              return String(student?.status) !== STOPPING_STUDENT &&
                String(student?.status) !== TRANSFERRED_STUDENT ? (
                <li
                  key={student.user_id}
                  style={{
                    borderBottom:
                      index !== data?.groups?.allContacts?.length - 1
                        ? "2px solid #000"
                        : "",
                    gap: "5px",
                    padding: "5px",
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
                      {a}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                  <span
                    style={{
                      display: "block",
                      width: "80%",
                      whiteSpace: "nowrap",
                      overflowX: "hidden",
                      // textOverflow: "ellipsis",
                    }}
                  >
                    {/* @ts-ignore */}
                    <font size={2.5} face="Arial, Helvatica, sans-serif">
                      {student?.user?.userProfile?.firstname?.length +
                        student?.user?.userProfile?.lastname?.length >
                      15
                        ? student?.user?.userProfile?.firstname +
                          " " +
                          student?.user?.userProfile?.lastname
                        : student?.user?.userProfile?.firstname +
                          " " +
                          student?.user?.userProfile?.lastname}
                      {/* @ts-ignore */}
                    </font>{" "}
                  </span>
                  <span style={{ fontWeight: 900 }}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      [
                      {student?.actualPayment?.status === PAYMENT_FULL_PAID
                        ? "P"
                        : student?.actualPayment?.status ===
                          PAYMENT_PARTIALLY_PAID
                        ? "PP"
                        : "NP"}
                      ] {/* @ts-ignore */}
                    </font>
                  </span>
                </li>
              ) : null;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrintGroupStudents;
