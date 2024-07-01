import React, { FC } from "react";
import { QRCode } from "antd";
import { IStore } from "store";
import { IContacts } from "types/contact";
import { useSelector } from "react-redux";
import { MainPhone } from "constants/phoneTypes";
import { ICalculation } from "types/ICalculation";
import { bgColors, fontSizes } from "styles/theme";
import { ADDED_BY } from "constants/contactResponsibles";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

import { styles } from "../../../firstEntranceModal";
import { PhoneNumberFormatted } from "../../../../../constants";

interface IProps {
  checkRef: React.Ref<any>;
  watch: any;
  calculation?: ICalculation;
  student?: IContacts;
}
const Receipt: FC<IProps> = ({ watch, checkRef, calculation, student }) => {
  const userObj = useSelector((state: IStore) => state.user?.user);
  return (
    <div style={{ display: "none" }}>
      <div ref={checkRef} style={{ position: "relative" }}>
        <table className="table">
          <tbody>
            <tr>
              <td
                style={{
                  ...styles.main,
                  fontFamily:
                    "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                }}
              >
                <h2
                  className="text-center grotesk"
                  style={{
                    ...(styles.mainTitle as any),
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                >
                  PAYMENT
                </h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingBottom: "10px",
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Cashier:
                  </span>
                  {/* @ts-ignore */}
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {userObj?.username}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Till this month:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(calculation?.student?.debt)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Cash:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(+watch("cash") || 0)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Card:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(+watch("card") || 0)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    MOT:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(+watch("mot") || 0)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Balance:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(+watch("balance") || 0)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                >
                  <span
                    style={{
                      ...styles.title,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                    }}
                  >
                    Total:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      display: "flex",
                      justifyContent: "flex-end",
                      fontSize: fontSizes.f10,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      marginBottom: 0,
                    }}
                  >
                    {toCurrencyFormat(
                      (+watch("mot") || 0) +
                        (+watch("card") || 0) +
                        (+watch("cash") || 0) +
                        (+watch("balance") || 0)
                    )}
                  </span>
                </div>
                <hr style={{ ...styles.hr, marginBottom: 7 }} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Full name:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.user?.userProfile?.firstname}{" "}
                    {student?.user?.userProfile?.lastname}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Group No:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.group?.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Room:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.group?.room?.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Teacher:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.group?.teacher?.user?.userProfile?.firstname}{" "}
                    {student?.group?.teacher?.user?.userProfile?.lastname}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Support:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.group?.support?.user?.userProfile?.firstname}{" "}
                    {student?.group?.support?.user?.userProfile?.lastname}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Level:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {student?.group?.level?.parent?.name}{" "}
                    {student?.group?.level?.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      paddingBottom: 10,
                      width: "40%",
                    }}
                  >
                    Your administrator:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "2px",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      display: "flex",
                      justifyContent: "flex-end",
                      textAlign: "right",
                    }}
                  >
                    {
                      student?.contactResponsibles?.filter(
                        (u: any) => u.type == ADDED_BY
                      )[0]?.user?.username
                    }
                  </span>
                </div>
                <hr style={{ ...styles.hr, marginBottom: 7 }} />
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      width: "20%",
                      lineHeight: 2,
                      paddingBottom: 8,
                    }}
                  >
                    Login:
                  </span>
                  <span
                    // @ts-ignore
                    style={{
                      ...styles.value,
                      marginBottom: "0",
                      paddingBottom: "0",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      width: "100%",
                      paddingLeft: "10px",
                      textAlign: "right",
                    }}
                  >
                    {student?.user?.username}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span
                    style={{
                      ...styles.title,
                      width: "20%",
                      lineHeight: 2,
                      paddingBottom: 8,
                    }}
                  >
                    Password:
                  </span>
                  <span
                    style={{
                      // @ts-ignore
                      textAlign: "right",
                      ...styles.value,
                      marginBottom: "0",
                      paddingBottom: "0",
                      fontSize: fontSizes.f12,
                      fontFamily:
                        "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                      width: "100%",
                      paddingLeft: "10px",
                    }}
                  >
                    {student?.user?.userProfile?.dob
                      ?.split("-")
                      ?.reverse()
                      .join(".")}
                  </span>
                </div>
                <hr style={{ ...styles.hr, marginBottom: 15 }} />
                <p
                  style={{
                    textAlign: "left",
                    fontSize: fontSizes.f10,
                    fontFamily:
                      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif",
                  }}
                  className="grotesk"
                >
                  <p style={{ textAlign: "center" }}>
                    До внесения первой оплаты за обучение Вы обязуетесь
                    ознакомиться с условиями публичной оферты{" "}
                    <strong>OOO INTEST MAX </strong>.
                  </p>
                  <hr
                    style={{
                      ...styles.hr,
                      background: bgColors.transparent,
                    }}
                  />
                  <p style={{ textAlign: "center" }}>
                    <strong>ПУБЛИЧНАЯ ОФЕРТА </strong> опубликована на сайте
                    www.inter-nation.uz
                  </p>
                  <hr
                    style={{
                      ...styles.hr,
                      background: bgColors.transparent,
                    }}
                  />
                  <p style={{ textAlign: "center" }}>
                    Внесение первой оплаты будет считаться как полное и
                    безоговорочное
                    <strong> принятие </strong> условий Публичной оферты.
                  </p>
                  <hr
                    style={{
                      ...styles.hr,
                      background: bgColors.transparent,
                    }}
                  />
                </p>
                <p
                  style={{ fontStyle: "none", fontWeight: 700 }}
                  className="grotesk"
                >
                  {PhoneNumberFormatted}
                </p>
                <hr
                  style={{ ...styles.hr, background: bgColors.transparent }}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: fontSizes.f12,
                    fontWeight: 800,
                    margin: "0 0 5px 0",
                  }}
                >
                  Payment:
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...(styles.qr as any),
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <br />{" "}
                <QRCode
                  size={110}
                  value={`http://qr.inter-nation.uz/p/${student?.user?.userPhones
                    ?.filter((p: any) => p.type === MainPhone)[0]
                    ?.phone_number.slice(3, 12)}`}
                />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    fontSize: fontSizes.f12,
                    fontWeight: 800,
                    margin: "0 0 5px 0",
                  }}
                >
                  Application:
                </p>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  ...(styles.qr as any),
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <QRCode
                  size={110}
                  value="https://student-app.inter-nation.uz"
                />
                <hr
                  style={{ ...styles.hr, background: bgColors.transparent }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Receipt;
