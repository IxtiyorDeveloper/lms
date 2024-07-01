import { responseMaker } from "utils/responseMaker";
import { wsCommand } from "utils/wsCommand";
import { IFileVariable } from "types";
import { getReceipt, saveReceipt } from "hooks/useCheck";
import { taxLocalStorageName } from "globals/components/taxModal";
// @ts-ignore
import window from "global/window";

export async function GetReceipt(body: any) {
  try {
    let a = window.localStorage.getItem(taxLocalStorageName);
    const variables = (a ? JSON.parse(a) : a) as IFileVariable;
    const receipt: any = await getReceipt({
      query_params: {
        income_group_id: body.income_group_id,
      },
    });
    if (!!receipt?.taxReceipt) {
      return responseMaker({ result: receipt?.taxReceipt, ok: true });
    }
    const data = await wsCommand(variables, receipt.command);
    await saveReceipt({
      query_params: {
        income_group_id: body.income_group_id,
      },
      body: data,
    });
    return responseMaker({ result: data, ok: true });
  } catch (error) {
    return responseMaker({
      ok: false,
      error,
      status_code: 400,
    });
  }
}
