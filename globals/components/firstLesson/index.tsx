import * as React from "react";
import { fontSizes, textColors } from "styles/theme";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useGetOneStudentC } from "hooks";
import { expand } from "app/student/[studentId]/expand";
import { iframeTest } from "components/printD";
import moment from "moment";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { QRCodeSVG } from "qrcode.react";
import { MainPhone } from "constants/phoneTypes";
import { validationErrorHandler } from "utils";
import { PhoneNumberFormatted } from "constants/companySettings";
import { DATE_FORMAT_SHOW_DD_MMM_YYYY } from "../../../constants/dates";
import { IActualPayment } from "../../../types/actualPayment";

export const styles = {
  mainTitle: {
    fontFamily:
      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif !important",
    fontSize: fontSizes.f20,
    marginBottom: 20,
    marginTop: 0,
    color: textColors.black,
    textAlign: "center",
    fontWeight: 700,
  },
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    padding: "0",
  },
  title: {
    fontFamily: "Arial, Black, sans-serif !important",
    width: "45%",
    display: "block",
    fontSize: fontSizes.f12,
    color: textColors.black,
    paddingBottom: 0,
    marginBottom: 0,
    fontWeight: 500,
  },
  value: {
    fontFamily:
      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif !important",
    width: "100%",
    display: "block",
    fontSize: fontSizes.f14,
    color: textColors.black,
    paddingTop: 0,
    marginTop: 0,
    textAlign: "right",
    marginBottom: 7,
    fontWeight: 600,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  absoluteTitle: {
    transform: "rotate(45deg)",
    width: "55px",
    top: 0,
    right: "7px",
    position: "absolute" as any,
    borderBottom: "2px dashed black",
    borderTop: "2px dashed black",
    paddingTop: "1px",
  },
  main: {
    fontFamily:
      "'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif !important",
    padding: "18 8",
  },
  hr: {
    margin: "4px 0",
    border: "none",
    borderBottom: `2px dashed #000`,
  },
  qr: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  qr_img: {
    width: "30%",
  },
};

const FirstEntrance = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [data, setData] = useState<any>({});
  const checkRef = useRef(null);

  const useCheck = useGetOneStudentC({
    onSuccess: (checkDataC) => {
      setData(checkDataC);
      setTimeout(() => {
        iframeTest(checkRef);
        handleClose();
      }, 100);
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (router.query.firstLesson === "true") {
      setOpen(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (open) {
      useCheck.mutate({
        expand,
        id: router.query.studentId,
        type: "update",
      });
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    const query = router.query;
    delete query?.user_id;
    delete query?.group;
    delete query?.firstLesson;
    router
      .replace({
        pathname: router.pathname,
        query: query,
      })
      .then();
  };

  const date = data?.currentGroupContact?.group?.lessonDays?.filter(
    (day: any) => day >= moment(new Date()).format("YYYY-MM-DD")
  )[0];

  const time = data?.currentGroupContact?.group?.lessonTime?.time?.slice(0, 5);

  useEffect(() => {
    var debt = 0;
    data?.currentGroupContact?.actualTransfers?.map(
      (aPayment: any) => (debt += +aPayment.actualPayment.debt)
    );
    setAmount(debt);
  }, [data]);

  return (
    <div
      ref={checkRef}
      style={{
        position: "absolute",
      }}
      id="form1"
    >
      <center>
        <img
          src="/logo/checkLogo.svg"
          alt="logo"
          style={{ paddingTop: "30px" }}
          width="180px"
          height="70px"
        />
      </center>
      {/*<p style={styles.absoluteTitle}>*/}
      {/*  /!* @ts-ignore *!/*/}
      {/*  <font face="Arial, Helvatica, sans-serif">*/}
      {/*    <b>TICKET</b>*/}
      {/*    /!* @ts-ignore *!/*/}
      {/*  </font>*/}
      {/*</p>*/}
      {/* @ts-ignore */}
      <font face="Arial, Helvatica, sans-serif">
        <table className="table">
          <tbody>
            <tr>
              <td style={styles.main}>
                <h2
                  className="text-center grotesk"
                  style={{
                    ...(styles.mainTitle as any),
                  }}
                >
                  NEW STUDENT
                </h2>
                <div style={styles.flex}>
                  <span style={styles.title}>Full Name:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.user?.userProfile?.firstname +
                      " " +
                      data?.user?.userProfile?.lastname}
                  </span>
                </div>
                <hr style={styles.hr} />
                <div style={styles.flex}>
                  <span style={styles.title}>Group:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.currentGroupContact?.group?.name}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Group date:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {moment(new Date(date!)).weekday() % 2 === 0
                      ? "Odd days"
                      : "Even days"}{" "}
                    | {time}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Room:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.currentGroupContact?.group?.room?.name}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Teacher:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.currentGroupContact?.group?.teacher?.user
                      ?.userProfile?.firstname
                      ? data?.currentGroupContact?.group?.teacher?.user
                          ?.userProfile?.firstname
                      : "NO TEACHER"}{" "}
                    {data?.currentGroupContact?.group?.teacher?.user?.userProfile?.lastname?.slice(
                      0,
                      1
                    ) &&
                      data?.currentGroupContact?.group?.teacher?.user?.userProfile?.lastname?.slice(
                        0,
                        1
                      )}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Support:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.currentGroupContact?.group?.support?.user
                      ?.userProfile?.firstname
                      ? data?.currentGroupContact?.group?.support?.user
                          ?.userProfile?.firstname
                      : "NO Support"}{" "}
                    {data?.currentGroupContact?.group?.support?.user?.userProfile?.lastname?.slice(
                      0,
                      1
                    ) &&
                      data?.currentGroupContact?.group?.support?.user?.userProfile?.lastname?.slice(
                        0,
                        1
                      )}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Level:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {data?.currentGroupContact?.group?.level?.parent?.name} |{" "}
                    {data?.currentGroupContact?.group?.level?.name}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Administrator:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {
                      data?.currentGroupContact?.contactResponsibles?.filter(
                        (user: any) => user.type === 100
                      )[0]?.user?.username
                    }
                  </span>
                </div>
                <div style={styles.flex}>
                  <span style={styles.title}>Date&Time:</span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {moment(new Date(date!)).format(
                      DATE_FORMAT_SHOW_DD_MMM_YYYY
                    )}
                    &nbsp;{time}
                  </span>
                </div>
                <div style={styles.flex}>
                  <span
                    style={{
                      ...styles.title,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    For Payment:
                  </span>
                  {/* @ts-ignore */}
                  <span style={styles.value}>
                    {toCurrencyFormat(
                      +Number(
                        +data?.currentGroupContact?.actualPayment?.debt +
                          +amount
                      ).toFixed(0)
                    )}
                  </span>
                </div>
                <hr style={{ ...styles.hr, marginBottom: 5 }} />
                <p
                  style={{
                    textAlign: "left",
                    fontSize: fontSizes.f10,
                  }}
                  className="grotesk"
                >
                  <small>
                    <p style={{ textAlign: "center" }}>
                      До внесения первой оплаты за обучение Вы обязуетесь
                      ознакомиться с условиями публичной оферты{" "}
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
                  </small>
                  <small>
                    <p style={{ textAlign: "center" }}>
                      <strong>ПУБЛИЧНАЯ ОФЕРТА</strong> опубликована на сайте{" "}
                      <>www.inter-nation.uz</>
                    </p>
                  </small>
                  <small>
                    <p>
                      Внесение первой оплаты будет считаться как полное и
                      безоговорочное
                      <strong style={{}}> принятие </strong> условий Публичной
                      оферты.
                    </p>
                  </small>
                  <strong>Тел: {PhoneNumberFormatted}</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div>
                    <center>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: fontSizes.f12,
                          fontWeight: 800,
                          margin: "0 0 5px 0",
                        }}
                      >
                        Payment:
                      </p>
                    </center>
                    <div
                      style={{
                        ...(styles.qr as any),
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <br />{" "}
                      <QRCodeSVG
                        width={90}
                        height={90}
                        value={`http://qr.inter-nation.uz/p/${data?.user?.userPhones
                          ?.filter((p: any) => p.type === MainPhone)[0]
                          ?.phone_number.slice(3, 12)}`}
                      />
                    </div>
                  </div>
                  <div>
                    <center>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: fontSizes.f12,
                          fontWeight: 800,
                          margin: "0 0 5px 0",
                        }}
                      >
                        Application:
                      </p>
                    </center>
                    <div
                      style={{
                        ...(styles.qr as any),
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <QRCodeSVG
                        size={90}
                        width={90}
                        height={90}
                        value="https://student-app.inter-nation.uz"
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
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
        {/* @ts-ignore */}
      </font>
    </div>
  );
};

export default FirstEntrance;
