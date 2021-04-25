import { IpcResult } from "@/shared/ipcResult";
import { ipcRenderer } from "electron";
import { IpcChannel } from "../shared/ipcChannel";

export default function ask<TArg, TResult>(
  channel: IpcChannel<TArg, TResult>,
  arg: TArg
): Promise<TResult> {
  return new Promise<TResult>((resolve, reject) => {
    ipcRenderer.on(channel.answerChannel, (_, result: IpcResult<TResult>) => {
      if (result.error) reject(result.error);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      else resolve(result.value!);
    });
    ipcRenderer.send(channel.askChannel, arg);
  });
}
