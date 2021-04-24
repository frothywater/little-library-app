import { LittleLibraryError } from "@/shared/error";
import { IpcResult } from "@/shared/ipcResult";
import { IpcChannel } from "../shared/ipcChannel";

const ipcRenderer = window.ipcRenderer;

export function ask<TArg, TResult>(
  channel: IpcChannel<TArg, TResult>,
  arg: TArg
): Promise<TResult> {
  return new Promise<TResult>((resolve, reject) => {
    ipcRenderer.on(
      channel.answerChannel,
      (_, result: IpcResult<TResult, LittleLibraryError>) => {
        if (result.success) resolve(result.value);
        else reject(result.error);
      }
    );
    ipcRenderer.send(channel.askChannel, arg);
  });
}
