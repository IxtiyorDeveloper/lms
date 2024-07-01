import { toast } from "react-toastify";

export const wsCommand = (data: { url: string; data: any }, additional?: any) =>
  new Promise((resolve, reject) => {
    const ws1 = new WebSocket(data.url);
    Promise.race([command(ws1, data, additional), timeoutPromise(15000)])
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        if ((error?.message as string)?.includes("Timeout Error:")) {
          toast.error("Time out\nPlease restart tax device!");
        }
        ws1?.close();
        reject(error);
      });
  });

function timeoutPromise(ms: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          `Timeout Error: The operation took longer than ${ms} milliseconds.`
        )
      );
    }, ms);
  });
}
export const command = (
  ws1: WebSocket,
  data: { url: string; data: any },
  additional?: any
) =>
  new Promise((resolve, reject) => {
    if (!data.url) {
      reject("Enter valid ip");
    }
    ws1.addEventListener("open", () => {
      ws1.send(
        typeof data == "object"
          ? JSON.stringify({ ...data.data, id: `${Math.random()}` })
          : ""
      );
      if (!!additional) {
        setTimeout(() => {
          ws1.send(
            typeof additional == "object" ? JSON.stringify(additional) : ""
          );
        }, 200);
      }
    });
    ws1.addEventListener("error", (e) => {
      reject(e);
    });
    ws1.addEventListener("message", (data) => {
      if (!!additional) {
        const newData = JSON.parse(data.data);
        if (
          additional?.id == newData?.requestId &&
          newData?.error != "KKMIsBusy"
        ) {
          resolve(newData);
          ws1.close();
        }
      } else {
        resolve(JSON.parse(data.data));
        ws1.close();
      }
    });
  });
