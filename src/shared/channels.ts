import { AdminLoginInfo, ManagerLoginInfo } from "@/utilities/typing";
import { ManagerRow } from "little-library";
import { createIpcChannel } from "./ipcChannel";

export const adminLoginChannel = createIpcChannel<AdminLoginInfo, void>(
  "admin-login"
);
export const adminLogoutChannel = createIpcChannel<never, void>("admin-logout");
export const managerLoginChannel = createIpcChannel<
  ManagerLoginInfo,
  ManagerRow | null
>("manager-login");
export const managerLogoutChannel = createIpcChannel<never, void>(
  "manager-logout"
);
