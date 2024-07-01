import axios from "..";
import { IData, TParams } from "../../types";

export default {
  canGetReceipt: (): any => {
    return axios.post("/integration", {
      url: "ws/can-get-receipt",
    });
  },
  getReceipt: (
    params?: TParams
  ): IData<{
    requestId: string;
    status: string;
    command: string;
    payload: {
      type: string;
      saleId: string;
      payments: {
        amount: number;
        paymentType: "Cashless" | "Cash" | "Card";
      }[];
      saleReceipt: {
        mName: string;
        mAddress: string;
        tin: string;
        date: string;
        time: string;
        saleId: string;
        zNumber: string;
        uName: string;
        operation: string;
        productList: {
          name: string;
          amount: string;
          price: string;
          totalPrice: string;
          vat: string;
          vatPercent: string;
          mxik: string;
          commissionTIN: string;
          barcode: string;
          label: string;
        }[];
        discount: string;
        amount: string;
        tVat: string;
        tCash: string;
        tCard: string;
        tAmount: string;
        sn: string;
        fmId: string;
        fSign: string;
        qr: string;
        cashback: string;
      };
      skPayReceipt: null;
    };
  }> => {
    return axios.post("/integration", {
      url: "ws/get-receipt",
      data: params?.data,
    });
  },
};
