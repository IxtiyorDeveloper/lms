import React, { FC, useEffect, useRef } from "react";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./style";
import _ from "lodash";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import moment from "moment/moment";
import { PhoneNumberFormatted } from "constants/companySettings";
import { fontSizes } from "styles/theme";
import { QRCodeSVG } from "qrcode.react";
import { iframeTest } from "components/printD";

const ReturnMoneyCheck: FC = () => {
  const dispatch = useDispatch();
  const checkRef = useRef(null);
  const user = useSelector((store: IStore) => store.user);
  const {
    returnMoneyCheckModal: { data: checkData, open },
  } = useSelector((state: IStore) => state.modals);

  const handlePrint = () => {
    iframeTest(checkRef);
    dispatch(
      toggleModal({
        key: "returnMoneyCheckModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  useEffect(() => {
    if (open) {
      if (!_.isEmpty(checkData)) {
        handlePrint();
      }
    }
  }, [open]);

  return (
    <Wrapper>
      <div>
        <div
          ref={checkRef}
          style={{ position: "relative", paddingTop: "10px" }}
        >
          <center>
            <img
              src="/logo/checkLogo.svg"
              alt="logo"
              width="180px"
              height="70px"
            />
          </center>
          {/* @ts-ignore */}
          <h2 style={{ marginTop: "0" }} className="text-center">
            <center>
              {/* @ts-ignore */}
              <font face="Arial Black, Arial Bold, Gadget, sans-serif">
                RETURN MONEY
                {/* @ts-ignore */}
              </font>
            </center>
          </h2>
          <table className="table">
            <tbody>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      Cashier:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      {user?.user?.userProfile?.firstname}{" "}
                      {user?.user?.userProfile?.lastname?.slice(0, 1)}
                      {/*   @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{ whiteSpace: "nowrap", overflowX: "hidden" }}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Student balance:{"  "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {toCurrencyFormat(
                        +Number(checkData?.old_balance)?.toFixed(0) || 0
                      )}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Returned:{"  "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {toCurrencyFormat(
                        +Number(checkData?.balance)?.toFixed(0) || 0
                      )}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{ whiteSpace: "nowrap", overflowX: "hidden" }}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Balance remaining:{"  "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {toCurrencyFormat(
                        +Number(checkData?.user?.balance)?.toFixed(0) || 0
                      )}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Date:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {moment(
                        checkData?.user?.updated_at ||
                          new Date(checkData?.user?.updated_at)
                      ).format("DD MMM YYYY HH:mm")}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ width: "100%" }}>
                  <hr
                    style={{
                      borderTop: "none",
                      borderBottom: "2px dashed #000",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Full name:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {checkData?.user?.userProfile?.firstname}{" "}
                      {checkData?.user?.userProfile?.lastname?.slice(0, 1)}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Group:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {checkData?.user?.student?.currentGroupContact
                        ? checkData?.user?.student?.currentGroupContact?.group
                            ?.name
                        : "---"}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Room:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {checkData?.user?.student?.currentGroupContact
                        ? checkData?.user?.student?.currentGroupContact?.group
                            ?.room?.name
                        : "---"}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Teacher:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {checkData?.user?.student?.currentGroupContact
                        ? checkData?.user?.student?.currentGroupContact?.group
                            ?.teacher?.user?.userProfile?.firstname
                        : "---"}{" "}
                      {checkData?.user?.student?.currentGroupContact?.group?.teacher?.user?.userProfile?.lastname?.slice(
                        0,
                        1
                      )}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ width: "30%" }}>
                  <span style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      Level:{"      "}
                      {/* @ts-ignore */}
                    </font>
                  </span>
                </td>
                <td style={{ width: "70%", textAlign: "right" }}>
                  <strong
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      {checkData?.user?.student?.currentGroupContact
                        ? checkData?.user?.student?.currentGroupContact?.group
                            ?.level?.parent?.name
                        : "---"}
                      {" | "}
                      {
                        checkData?.user?.student?.currentGroupContact?.group
                          ?.level?.name
                      }
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ width: "100%" }}>
                  <hr
                    style={{
                      borderTop: "none",
                      borderBottom: "2px dashed #000",
                    }}
                  />
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td colSpan={2}>
                  <small>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      До внесения первой оплаты за обучение Вы обязуетесь
                      ознакомиться с условиями публичной оферты
                      {/*   @ts-ignore */}
                    </font>{" "}
                  </small>
                  {/* @ts-ignore */}
                  <strong>
                    <small>
                      {/*// @ts-ignore*/}
                      <font face="Arial, Helvatica, sans-serif">
                        OOO INTEST MAX
                        {/*// @ts-ignore*/}
                      </font>
                      .
                    </small>
                  </strong>
                  <br />
                  <br />
                  <small>
                    <strong>
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        ПУБЛИЧНАЯ ОФЕРТА {/*   @ts-ignore */}
                      </font>
                    </strong>{" "}
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      опубликована на сайте <>www.inter-nation.uz</>
                      {/*   @ts-ignore */}
                    </font>
                    <br />
                    <br />
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      Пользование Персональным Кабинетом будет считаться как
                      полное и безоговорочное <strong>принятие</strong> условий
                      Публичной оферты.
                      {/*   @ts-ignore */}
                    </font>
                    <br />
                    <br />
                  </small>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      Тел: {PhoneNumberFormatted}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                  <br />
                  <br />
                  <center
                    style={{
                      marginBottom: "5px",
                      fontSize: fontSizes.f12,
                      fontWeight: 800,
                    }}
                  >
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      <strong>Application:</strong>
                      {/* @ts-ignore */}
                    </font>
                  </center>
                  <center>
                    <QRCodeSVG
                      width={120}
                      size={120}
                      value="https://student-app.inter-nation.uz"
                    />
                  </center>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <p></p>
            <span
              style={{
                fontFamily: "sans-serif !important",
                display: "flex",
                justifyContent: "flex-end",
                fontWeight: 500,
                textAlign: "right",
              }}
            >
              {/* @ts-ignore */}
              <font face="Arial, Helvatica, sans-serif">
                &copy; {moment().year()}
                {/*   @ts-ignore */}
              </font>
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReturnMoneyCheck;
