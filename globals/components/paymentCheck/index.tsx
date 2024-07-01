import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { fontSizes } from "styles/theme";
import { useRouter } from "next/router";
import { useCheckDataC } from "hooks";
import moment from "moment";
import { QRCodeSVG } from "qrcode.react";
import { iframeTest } from "components/printD";
import { styles } from "../paymentCheckC/style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { PhoneNumberFormatted } from "constants/companySettings";
import { GetReceipt, validationErrorHandler } from "utils";
import { PAYMENT_MOT, paymentTypes } from "../../../constants/payment";

const PaymentIncomeCheck = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checkData, setData] = useState<any>({});
  const checkRef = useRef();

  const handleRequestForReceipt = (dataReceipt: any) => {
    setData({ ...checkData, ...dataReceipt });
    setTimeout(() => {
      iframeTest(checkRef);
      handleClose();
    }, 400);
  };

  const useCheck = useCheckDataC({
    onSuccess: (checkDataC) => {
      const paymentType = checkDataC?.payment_type;
      if (paymentType === paymentTypes[PAYMENT_MOT]) {
        handleRequestForReceipt(checkDataC);
      } else {
        GetReceipt({
          income_group_id: checkDataC?.income_group_id,
        }).then((data_check1) => {
          handleRequestForReceipt({
            ...checkDataC,
            ...data_check1?.result?.data,
          });
        });
      }
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (router.query.paymentIncomeCheck === "true") {
      setOpen(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (open) {
      useCheck.mutate({
        income_id: router.query?.income_id,
      });
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    const query = router.query;
    delete query?.income_id;
    delete query?.group;
    delete query?.paymentIncomeCheck;
    router
      .replace(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { scroll: false },
      )
      .then();
  };

  return (
    <div
      ref={checkRef as any}
      style={{ position: "absolute", paddingTop: "0" }}
    >
      <center>
        <img
          src="/logo/checkLogo.svg"
          alt="logo"
          style={{ paddingTop: "0" }}
          width="180px"
          height="70px"
        />
      </center>
      <h3
        style={{ margin: 0, marginBottom: "3px", paddingTop: 0 }}
        className="text-center"
      >
        <center>
          {/* @ts-ignore */}
          <font face="Arial Black, Arial Bold, Gadget, sans-serif">
            PAYMENT
            {/* @ts-ignore */}
          </font>
        </center>
      </h3>
      <table className="table">
        <tbody>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Full name:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.full_name?.split(" ")[0]}{" "}
                {checkData?.full_name?.split(" ")[1]}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title}>Debt:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {toCurrencyFormat(checkData?.till_this_payment) || "0 UZS"}
              </strong>
            </td>
          </tr>
          {checkData?.payment?.length ? (
            checkData?.payment?.map((payment: any) => {
              return (
                <tr key={payment?.type}>
                  <td style={styles.tdLeft30}>
                    <span style={styles.title}>{payment?.type}:</span>
                  </td>
                  <td style={styles.tdRight70}>
                    <strong style={styles.value as any}>
                      {toCurrencyFormat(+(+payment?.amount).toFixed(0))}
                    </strong>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td style={styles.tdLeft30}>
                <span style={styles.title}>
                  <span style={{ textTransform: "capitalize" }}>
                    {checkData?.payment_type}
                  </span>
                  :
                </span>
              </td>
              <td style={styles.tdRight70}>
                <strong style={styles.value as any}>
                  {toCurrencyFormat(+(+checkData?.amount).toFixed(0))}
                </strong>
              </td>
            </tr>
          )}
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title}>Current debt:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {/* @ts-ignore */}
                <font face="Arial, Helvetica, sans-serif">
                  {toCurrencyFormat(+Number(checkData?.debt)?.toFixed(0) || 0)}
                  {/* @ts-ignore */}
                </font>
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Date:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {moment(checkData?.date).format("DD MMM YYYY HH:mm")}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title}>Cashier:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.cashier?.split(" ")[0]}{" "}
                {checkData?.cashier?.split(" ")[1]?.slice(0, 1)}
                {!!checkData?.payload &&
                  `("${checkData?.payload?.saleReceipt?.uName}")`}
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
              <span style={styles.title as any}>Group:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>{checkData?.group}</strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Date & Time:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.group_day_time?.slice(
                  0,
                  checkData?.group_day_time?.length - 3,
                )}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Room:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>{checkData?.room}</strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Teacher:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.teacher?.split(" ")[0]}{" "}
                {checkData?.teacher?.split(" ")[1]?.slice(0, 1)}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Support:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.support?.split(" ")[0]}{" "}
                {checkData?.support?.split(" ")[1]?.slice(0, 1)}
              </strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title}>Level:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>{checkData?.level}</strong>
            </td>
          </tr>
          <tr>
            <td style={styles.tdLeft30}>
              <span style={styles.title as any}>Administrator:</span>
            </td>
            <td style={styles.tdRight70}>
              <strong style={styles.value as any}>
                {checkData?.administrator?.split(" ")[0]}{" "}
                {checkData?.administrator?.split(" ")[1]?.slice(0, 1)}
              </strong>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ width: "100%" }}>
              <hr style={{ borderTop: "2px dashed #000000" }} />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table
                width="100%"
                style={{ marginTop: 2, border: "2px solid #000000" }}
              >
                <tbody>
                  <tr>
                    <td style={styles.tdLeft30}>
                      <span style={styles.title}>Login:</span>
                    </td>
                    <td style={styles.tdRight70}>
                      <strong style={styles.value as any}>
                        +{checkData?.login}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style={styles.tdLeft30}>
                      <span style={styles.title}>Password:</span>
                    </td>
                    <td style={styles.tdRight70}>
                      <strong style={styles.value as any}>
                        {checkData?.password}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td colSpan={2}>
              <br />
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
                  Пользование Персональным Кабинетом будет считаться как полное
                  и безоговорочное <strong>принятие</strong> условий Публичной
                  оферты.
                  {/*   @ts-ignore */}
                </font>
                <br />
                <br />
              </small>
              <strong style={styles.value as any}>
                {/* @ts-ignore */}
                <font face="Arial, Helvatica, sans-serif">
                  Тел:{PhoneNumberFormatted}
                  {/* @ts-ignore */}
                </font>
              </strong>
              <br />
            </td>
          </tr>
          <tr>
            <td style={{ width: "100%" }}>
              <center
                style={{
                  marginBottom: "3px",
                  fontSize: fontSizes.f12,
                  fontWeight: 800,
                }}
              >
                {/* @ts-ignore */}
                <font face="Arial, Helvatica, sans-serif">
                  <strong>Payment:</strong>
                  {/* @ts-ignore */}
                </font>
              </center>
              <center>
                <QRCodeSVG
                  width={90}
                  size={90}
                  // @ts-ignore
                  value={`http://qr.inter-nation.uz/p/${checkData?.login?.slice(
                    3,
                    12,
                  )}`}
                />
              </center>
            </td>
            <td style={{ width: "100%" }}>
              <center
                style={{
                  marginBottom: "3px",
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
                  width={90}
                  size={90}
                  value="https://student-app.inter-nation.uz"
                />
              </center>
            </td>
          </tr>
          {!!checkData?.payload && (
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
                          {checkData?.payload?.saleReceipt?.mName}
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
                        {checkData?.payload?.saleReceipt?.mAddress}
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
                    {checkData?.group_type_name}
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
                  <strong style={styles.value as any}>{checkData?.spic}</strong>
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
                    {toCurrencyFormat(checkData?.payload?.saleReceipt?.amount)}
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
                  <strong style={styles.value as any}>{checkData?.tin}</strong>
                </td>
              </tr>
              <tr>
                <td style={styles.tdLeft30}>
                  <span style={styles.title}>Номер чека:</span>
                </td>
                <td style={styles.tdRight70}>
                  <strong style={styles.value as any}>
                    {checkData?.income_id}
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={styles.tdLeft30}>
                  <span style={styles.title}>Терминал S/N:</span>
                </td>
                <td style={styles.tdRight70}>
                  <strong style={styles.value as any}>
                    {checkData?.payload?.saleReceipt?.sn}
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={styles.tdLeft30}>
                  <span style={styles.title}>ФМ ID:</span>
                </td>
                <td style={styles.tdRight70}>
                  <strong style={styles.value as any}>
                    {checkData?.payload?.saleReceipt?.fmId}
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={styles.tdLeft30}>
                  <span style={styles.title}>Фискальная подпись:</span>
                </td>
                <td style={styles.tdRight70}>
                  <strong style={styles.value as any}>
                    {checkData?.payload?.saleReceipt?.fSign}
                  </strong>
                </td>
              </tr>
              <tr style={{ textAlign: "center" }}>
                <td colSpan={2} style={{ width: "100%" }}>
                  <center>
                    <QRCodeSVG
                      width={120}
                      size={120}
                      value={checkData?.payload?.saleReceipt?.qr}
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
                        {checkData?.payload?.saleReceipt?.cashback}
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
          margin: "0 0 5px 0",
        }}
      >
        <p></p>
        <span
          style={{
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
  );
};

export default PaymentIncomeCheck;
