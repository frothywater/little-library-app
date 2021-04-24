import {
  adminLoginChannel,
  adminLogoutChannel,
  managerLoginChannel,
  managerLogoutChannel,
} from "@/shared/ipcChannel";
import { ask } from "@/utilities/ipc";
import {
  AdminInfo,
  AdminLoginInfo,
  ManagerInfo,
  ManagerLoginInfo,
} from "@/utilities/typing";
import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "./";

@Module({ dynamic: true, store, name: "auth" })
class Auth extends VuexModule {
  admin: AdminInfo | null = null;
  manager: ManagerInfo | null = null;

  @Mutation
  setAdmin(info: AdminInfo | null): void {
    this.admin = info;
  }

  @Mutation
  setManager(info: ManagerInfo | null): void {
    this.manager = info;
  }

  get adminAuthenticated() {
    return !!this.admin;
  }

  get managerAuthenticated() {
    return !!this.manager;
  }

  @Action
  async adminLogin(info: AdminLoginInfo): Promise<void> {
    await ask(adminLoginChannel, info);
    this.setAdmin({
      username: info.username,
      database: info.database,
    });
  }

  @Action
  async managerLogin(info: ManagerLoginInfo): Promise<boolean> {
    const result = await ask(managerLoginChannel, info);
    if (!result) return false;
    this.setManager({
      username: result.name,
      phone: result.phone,
    });
    return true;
  }

  @Action
  async adminLogout(): Promise<void> {
    await ask(adminLogoutChannel, null);
    this.setAdmin(null);
    this.setManager(null);
  }

  @Action
  async managerLogout(): Promise<void> {
    await ask(managerLogoutChannel, null);
    this.setManager(null);
  }
}

export default getModule(Auth);
