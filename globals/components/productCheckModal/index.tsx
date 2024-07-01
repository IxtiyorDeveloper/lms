import React, { FC, useEffect, useRef } from "react";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { styles, Wrapper } from "./style";
import _ from "lodash";
import { iframeTest } from "components/printD";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import moment from "moment/moment";
import { QRCodeSVG } from "qrcode.react";
import { PhoneNumberFormatted } from "constants/companySettings";

const ProductCheck: FC = () => {
  const dispatch = useDispatch();
  const checkRef = useRef(null);
  const {
    incomeProductName: { data },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "incomeProductName",
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
    setTimeout(() => {
      if (!_.isEmpty(data)) {
        handlePrint();
      }
    }, 600);
  }, [data]);

  return (
    <Wrapper>
      <div ref={checkRef}>
        <center>
          <img
            src="/logo/checkLogo.svg"
            alt="logo"
            style={{ paddingTop: "5px" }}
            width="180px"
            height="70px"
          />
        </center>
        <h2 style={{ marginTop: 0 }} className="text-center">
          <center>
            {/* @ts-ignore */}
            <font face="Arial Black, Arial Bold, Gadget, sans-serif">
              {data?.data?.product}
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
                  <font face="Arial, Helvetica, sans-serif">
                    Name:{"      "}
                    {/* @ts-ignore */}
                  </font>
                </span>
              </td>
              <td style={{ width: "70%", textAlign: "right" }}>
                <strong style={{ whiteSpace: "nowrap", overflowX: "hidden" }}>
                  {/* @ts-ignore */}
                  <font face="Arial, Helvetica, sans-serif">
                    {data?.data?.full_name}
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
                    Phone:{"      "}
                    {/* @ts-ignore */}
                  </font>
                </span>
              </td>
              <td style={{ width: "70%", textAlign: "right" }}>
                <strong style={{}}>
                  {/* @ts-ignore */}
                  <font face="Arial, Helvetica, sans-serif">
                    +{data?.data?.phone}
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
                    borderBottom: "2px dashed #000000",
                  }}
                />
              </td>
            </tr>
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
                    {data?.data?.cashier?.split(" ")[0]}{" "}
                    {data?.data?.cashier?.split(" ")[1]?.slice(0, 1)}
                    {/*   @ts-ignore */}
                  </font>
                </strong>
              </td>
            </tr>
            <tr>
              <td style={{ width: "30%" }}>
                <span style={{}}>
                  {/* @ts-ignore */}
                  <font face="Arial, Helvetica, sans-serif">
                    {data?.data?.payment_type}:{/* @ts-ignore */}
                  </font>
                </span>
              </td>
              <td style={{ width: "70%", textAlign: "right" }}>
                <strong style={{}}>
                  {/* @ts-ignore */}
                  <font face="Arial, Helvetica, sans-serif">
                    {toCurrencyFormat(+(+data?.data?.amount)?.toFixed(0))}
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
                    {moment(data?.data?.date).format("DD MMM YYYY HH:mm")}
                    {/* @ts-ignore */}
                  </font>
                </strong>
              </td>
            </tr>
            <tr style={{ textAlign: "center" }}>
              <td colSpan={2}>
                <p style={{ textAlign: "center" }}>
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
                </p>
                <small>
                  <p style={{ textAlign: "center" }}>
                    <strong>
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        ПУБЛИЧНАЯ ОФЕРТА {/*   @ts-ignore */}
                      </font>
                    </strong>{" "}
                    {/* @ts-ignore */}
                    <font face="Arial, Helvetica, sans-serif">
                      опубликована на сайте <u>www.inter-nation.uz</u>
                      {/*   @ts-ignore */}
                    </font>
                  </p>
                  <p style={{ textAlign: "center" }}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      Внесение первой оплаты будет считаться как полное и
                      безоговорочное
                      <strong style={{}}> принятие </strong> условий Публичной
                      оферты.
                      {/*   @ts-ignore */}
                    </font>
                  </p>
                </small>

                <p style={{ textAlign: "center" }}>
                  <strong style={{}}>
                    {/* @ts-ignore */}
                    <font face="Arial, Helvatica, sans-serif">
                      {PhoneNumberFormatted}
                      {/* @ts-ignore */}
                    </font>
                  </strong>
                </p>
                <center>
                  <p style={{ textAlign: "center" }}>
                    <strong>
                      {/* @ts-ignore */}
                      <font face="Arial, Helvatica, sans-serif">
                        Application:
                        {/* @ts-ignore */}
                      </font>
                    </strong>
                  </p>
                </center>
                <center>
                  <QRCodeSVG
                    width={100}
                    size={100}
                    value="https://student-app.inter-nation.uz"
                  />
                </center>
              </td>
            </tr>
            {!!data?.data?.payload && (
              <>
                <tr>
                  <td colSpan={2} style={{ width: "100%" }}>
                    <hr style={{ borderTop: "2px dashed #000000" }} />
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={2}>
                    <br />
                    <p style={{ textAlign: "center", marginBottom: 0 }}>
                      <strong>
                        <small>
                          {/*// @ts-ignore*/}
                          <font face="Arial, Helvatica, sans-serif">
                            {data?.data?.payload?.saleReceipt?.mName}
                            {/*// @ts-ignore*/}
                          </font>
                          .
                        </small>
                      </strong>
                    </p>
                    <p style={{ textAlign: "center" }}>
                      <small>
                        {/*// @ts-ignore*/}
                        <font face="Arial, Helvatica, sans-serif">
                          {data?.data?.payload?.saleReceipt?.mAddress}
                          {/*// @ts-ignore*/}
                        </font>
                        .
                      </small>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title as any}>Тариф Groups</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {data?.group_type_name}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>Без НДС</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>0 UZS</strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>ИКПУ</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>{data?.spic}</strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ width: "100%" }}>
                    <hr style={{ borderTop: "2px dashed #000000" }} />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>Итог</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {toCurrencyFormat(
                        data?.data?.payload?.saleReceipt?.amount
                      )}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} style={{ width: "100%" }}>
                    <hr style={{ borderTop: "2px dashed #000000" }} />
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>ИНН:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>{data?.tin}</strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>Номер чека:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {data?.income_id}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>Терминал S/N:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {data?.data?.payload?.saleReceipt?.sn}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>ФМ ID:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {data?.data?.payload?.saleReceipt?.fmId}
                    </strong>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>Фискальная подпись:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {data?.data?.payload?.saleReceipt?.fSign}
                    </strong>
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td colSpan={2} style={{ width: "100%" }}>
                    <center>
                      <QRCodeSVG
                        width={100}
                        size={100}
                        value={data?.data?.payload?.saleReceipt?.qr}
                      />
                    </center>
                  </td>
                </tr>
                <tr style={{ textAlign: "center" }}>
                  <td style={{ width: "100%" }} colSpan={2}>
                    <p>
                      <small>
                        {/*// @ts-ignore*/}
                        <font face="Arial, Helvatica, sans-serif">
                          {data?.data?.payload?.saleReceipt?.cashback}
                          {/*// @ts-ignore*/}
                        </font>
                        .
                      </small>
                    </p>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "20px 0",
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
    </Wrapper>
  );
};

export default ProductCheck;
