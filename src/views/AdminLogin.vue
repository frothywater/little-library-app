<template>
  <div>
    <form-dialog title="Login via admin" :width="360" persistent :loading="loading" v-model="show" :initial="initialValue" #default="{ draft, update }" @submit="login($event)">
      <v-text-field :value="draft.username" @input="update($event, 'username')" label="User Name" type="username" :rules="[rules.required]" />
      <v-text-field :value="draft.password" @input="update($event, 'password')" label="Password" type="password" :rules="[rules.required]" />
      <v-text-field :value="draft.database" @input="update($event, 'database')" label="Database Name" :rules="[rules.required]" />
    </form-dialog>
    <snackbar v-model="showSnackbar" :text="message" type="error" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import Snackbar from "@/components/Snackbar.vue";
import { AdminLoginInfo } from "@/utilities/typing";
import { rules, ValidationRules } from "@/utilities/validation";
import auth from "@/store/auth";

@Component({ components: { FormDialog, Snackbar } })
export default class AdminLogin extends Vue {
  show = true;
  loading = false;
  showSnackbar = false;
  message = "";

  readonly initialValue: AdminLoginInfo = {
    username: "",
    password: "",
    database: "",
  };

  get rules(): ValidationRules {
    return rules;
  }

  async login(info: AdminLoginInfo): Promise<void> {
    try {
      await auth.adminLogin(info);
      this.$router.push("/managerLogin");
    } catch (err) {
      this.message = err.message;
      this.showSnackbar = true;
    }
  }
}
</script>
