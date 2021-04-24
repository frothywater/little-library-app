import { LittleLibraryError } from "@/shared/error";
import { IpcChannel } from "@/shared/ipcChannel";
import { IpcResult } from "@/shared/ipcResult";
import { ipcMain } from "electron";

export function listen<TArg, TResult>(
  channel: IpcChannel<TArg, TResult>,
  handle: (arg: TArg) => Promise<TResult>
): void {
  ipcMain.on(channel.askChannel, (event, arg: TArg) => {
    handle(arg)
      .then((result) =>
        event.reply(channel.answerChannel, {
          success: true,
          value: result,
        } as IpcResult<TResult, LittleLibraryError>)
      )
      .catch((error) =>
        event.reply({
          success: false,
          error: error,
        } as IpcResult<TResult, LittleLibraryError>)
      );
  });
}
