import * as React from "react";
import { AntdModal } from "components";
import { fontSizes, textColors } from "styles/theme";
import { Spin } from "antd";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import { useChangePassword, useGetOneStudent } from "hooks";
import { expand } from "app/student/[studentId]/expand";
import { QRCodeSVG } from "qrcode.react";
import _ from "lodash";
import { toast } from "react-toastify";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/dates";
import { MainPhone } from "constants/phoneTypes";
import { iframeTest } from "components/printD";

export const styles = {
  mainTitle: {
    fontSize: fontSizes.f20,
    marginTop: 0,
    marginBottom: 20,
    color: textColors.black,
    textAlign: "center",
    fontWeight: 700,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "0",
  },
  title: {
    fontFamily: "Arial, Black, sans-serif !important",
    width: "100%",
    display: "block",
    fontSize: fontSizes.f10,
    color: textColors.black,
    whiteSpace: "nowrap",
    overflowX: "hidden",
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
    whiteSpace: "nowrap",
    overflowX: "hidden",
    textOverflow: "ellipsis",
    textAlign: "right",
    paddingTop: 0,
    marginTop: 0,
    marginBottom: 7,
    fontWeight: 600,
  },
  main: {
    padding: "0 5px 5px 5px",
  },
  hr: {
    margin: "4px 0",
    border: "none",
    borderBottom: "2px solid #000",
  },
  qr: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  qr_img: {
    width: "30%",
  },
};

const CredentialsCheck = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const checkRef = useRef();

  const handleClose = () => {
    setOpen(false);
    const query = router.query;
    delete query?.user_id;
    delete query?.group;
    delete query?.credentialsCheck;
    router
      .replace({
        pathname: router.pathname,
        query: query,
      })
      .then();
  };

  useEffect(() => {
    if (router.query.credentialsCheck === "true") {
      setOpen(true);
    }
  }, []);

  const { data, isLoading } = useGetOneStudent({
    expand,
    id: router.query.studentId,
    type: "update",
  });

  const changePassword = useChangePassword?.({
    onSuccess: () => {
      handlePrint();
    },
    onError: (err: any) => {
      toast.error(err.data?.client_error?.exception?.message);
    },
  });

  const handlePrint = () => {
    iframeTest(checkRef);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      if (!_.isEmpty(data)) {
        changePassword?.mutate({
          id: router.query.studentId,
          password: moment(data?.user?.userProfile?.dob).format(
            DATE_FORMAT_DD_MM_YYYY
          ),
        });
      }
    }
  }, [open]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      padding="0"
      width={350}
    >
      <Spin spinning={isLoading || changePassword?.isLoading}>
        <div>
          <div ref={checkRef as any} id="form1">
            <center>
              <img
                src="/logo/checkLogo.svg"
                alt="logo"
                style={{ paddingTop: "10px" }}
                width="180px"
                height="70px"
              />
            </center>
            {/* @ts-ignore */}
            <font face="Arial, Helvatica, sans-serif">
              <table className="table">
                <tbody>
                  <tr>
                    <td style={styles.main}>
                      <h2
                        className="text-center grotesk"
                        style={styles.mainTitle as any}
                      >
                        STUDENT LOGIN
                      </h2>
                      <div style={styles.flex}>
                        <span style={{ ...styles.title, width: "30%" } as any}>
                          Full Name:
                        </span>
                        {/* @ts-ignore */}
                        <span style={{ ...styles.value }}>
                          {data?.user?.userProfile?.firstname +
                            " " +
                            data?.user?.userProfile?.lastname}
                        </span>
                      </div>
                      <div style={styles.flex}>
                        <span style={styles.title as any}>Group:</span>
                        {/* @ts-ignore */}
                        <span style={styles.value}>
                          {data?.currentGroupContact?.group?.name}
                        </span>
                      </div>
                      <hr style={styles.hr} />
                      <div style={styles.flex}>
                        <span style={styles.title as any}>Login:</span>
                        {/* @ts-ignore */}
                        <span style={styles.value}>
                          +
                          {
                            data?.user?.userPhones?.filter(
                              (phone) => +phone.is_confirmed === 1
                            )[0]?.phone_number
                          }
                        </span>
                      </div>
                      <div style={styles.flex}>
                        <span style={styles.title as any}>Password:</span>
                        {/* @ts-ignore */}
                        <span style={styles.value}>
                          {moment(data?.user?.userProfile?.dob).format(
                            "DD.MM.YYYY"
                          )}
                        </span>
                      </div>
                      <hr style={{ ...styles.hr, marginBottom: 5 }} />
                      <p
                        style={{
                          textAlign: "center",
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
                            <strong>ПУБЛИЧНАЯ ОФЕРТА</strong> опубликована на
                            сайте <>www.inter-nation.uz</>
                          </p>
                        </small>
                        <small>
                          <p style={{ textAlign: "center" }}>
                            Пользование Персональным Кабинетом будет считаться
                            как полное и безоговорочное{" "}
                            <strong>принятие</strong> условий Публичной оферты.
                          </p>
                        </small>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
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
              {/* @ts-ignore */}
            </font>
          </div>
        </div>
      </Spin>
    </AntdModal>
  );
};

export default CredentialsCheck;
