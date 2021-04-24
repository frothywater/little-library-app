import {
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
  adminLogin(): void {
    this.adminLoggedIn = true;
  }
  @Mutation
  adminLogout(): void {
    this.adminLoggedIn = false;
  }
  @Mutation
  managerLogin(): void {
    this.managerLoggedIn = true;
  }
  @Mutation
  managerLogout(): void {
    this.managerLoggedIn = false;
  }
}

export default getModule(Auth);
