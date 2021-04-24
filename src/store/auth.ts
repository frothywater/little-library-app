import { IpcChannels } from "@/utilities/ipcChannels";
import { AdminLoginInfo, ManagerLoginInfo } from "@/utilities/typing";
import { ipcRenderer as ipc } from "electron-better-ipc";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "./";

@Module({ name: "auth", store, dynamic: true })
class Auth extends VuexModule {
  adminLoggedIn = false;
  managerLoggedIn = false;

  @Mutation
  private setAdmin(value: boolean): void {
    this.adminLoggedIn = value;
  }

  @Mutation
  private setManager(value: boolean): void {
    this.managerLoggedIn = value;
  }

  @Action
  async adminLogin(info: AdminLoginInfo): Promise<boolean> {
    try {
      await ipc.callMain(IpcChannels.adminLogin, info);
      this.context.commit("setAdminLogin", true);
      return true;
    } catch {
      return false;
    }
  }

  @Action
  async managerLogin(info: ManagerLoginInfo): Promise<boolean> {
    try {
      const result = await ipc.callMain(IpcChannels.managerLogin, info);
      if (!result) return false;
      this.context.commit("setManageLogin", true);
      return true;
    } catch {
      return false;
    }
  }
}

export default getModule(Auth);
