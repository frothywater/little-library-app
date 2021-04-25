import { IpcChannel } from "@/shared/ipcChannel";
import { IpcResult } from "@/shared/ipcResult";
import { ipcMain } from "electron";

// Handle error before reply, passing an object containing extra information for error handling in renderer process

export function answer<TArg, TResult>(
  channel: IpcChannel<TArg, TResult>,
  handle: (arg: TArg) => Promise<TResult>
): void {
  ipcMain.on(channel.askChannel, (event, arg: TArg) => {
    handle(arg)
      .then((result) =>
        event.reply(channel.answerChannel, {
          value: result,
        } as IpcResult<TResult>)
      )
      .catch((error) =>
        event.reply(channel.answerChannel, {
          error: error,
        } as IpcResult<TResult>)
      );
  });
}
