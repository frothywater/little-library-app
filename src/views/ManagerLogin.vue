<template>
  <div>
    <form-dialog title="Login via manager" :width="360" persistent :loading="loading" v-model="show" :initial="initialValue" #default="{ draft, update }" @submit="login($event)">
      <v-text-field :value="draft.username" @input="update($event, 'username')" label="User Name" type="username" :rules="[rules.required]" />
      <v-text-field :value="draft.password" @input="update($event, 'password')" label="Password" type="password" :rules="[rules.required]" />
    </form-dialog>
    <snackbar v-model="showSnackbar" :text="message" type="error" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import Snackbar from "@/components/Snackbar.vue";
import { ManagerLoginInfo } from "@/utilities/typing";
import { rules, ValidationRules } from "@/utilities/validation";
import auth from "@/store/auth";

@Component({ components: { FormDialog, Snackbar } })
export default class ManagerLogin extends Vue {
  show = true;
  loading = false;
  showSnackbar = false;
  message = "";

  readonly initialValue: ManagerLoginInfo = {
    username: "",
    password: "",
  };

  get rules(): ValidationRules {
    return rules;
  }

  async login(info: ManagerLoginInfo): Promise<void> {
    try {
      const success = await auth.managerLogin(info);
      if (success) this.$router.push("/");
      else {
        this.message = "Wrong username or password.";
        this.showSnackbar = true;
      }
    } catch (err) {
      this.message = err.message;
      this.showSnackbar = true;
    }
  }
}
</script>
