import Vue from "vue";
import Vuex from "vuex";
import { AuthState } from "./auth";

Vue.use(Vuex);

export interface RootState {
  auth: AuthState;
}

export default new Vuex.Store<RootState>({});
