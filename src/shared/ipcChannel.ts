import { AdminLoginInfo, ManagerLoginInfo } from "@/utilities/typing";
import { ManagerRow } from "little-library";

export interface IpcChannel<TArg, TResult> {
  channelName: string;
  askChannel: string;
  answerChannel: string;
  arg: TArg;
  result: TResult;
}

abstract class IpcChannelClass<TArg, TResult>
  implements IpcChannel<TArg, TResult> {
  abstract channelName: string;
  arg!: TArg;
  result!: TResult;
  get askChannel(): string {
    return `${this.channelName}-ask`;
  }
  get answerChannel(): string {
    return `${this.channelName}-answer`;
  }
}

class AdminLoginChannel extends IpcChannelClass<AdminLoginInfo, void> {
  channelName = "admin-login";
}
class AdminLogoutChannel extends IpcChannelClass<never, void> {
  channelName = "admin-logout";
}
class ManagerLoginChannel extends IpcChannelClass<
  ManagerLoginInfo,
  ManagerRow | null
> {
  channelName = "manager-login";
}
class ManagerLogoutChannel extends IpcChannelClass<never, void> {
  channelName = "manager-logout";
}

export const adminLoginChannel = new AdminLoginChannel();
export const adminLogoutChannel = new AdminLogoutChannel();
export const managerLoginChannel = new ManagerLoginChannel();
export const managerLogoutChannel = new ManagerLogoutChannel();
