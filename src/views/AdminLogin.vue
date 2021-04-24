<template>
  <form-dialog title="Login via admin" :width="360" persistent :loading="loading" v-model="show" :initial="initialValue" #default="{ draft, update }">
    <v-text-field :value="draft.username" @input="update($event, 'username')" label="User Name" type="username" :rules="[rules.required]" />
    <v-text-field :value="draft.password" @input="update($event, 'password')" label="Password" type="password" :rules="[rules.required]" />
    <v-text-field :value="draft.database" @input="update($event, 'database')" label="Database Name" :rules="[rules.required]" />
  </form-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormDialog from "@/components/FormDialog.vue";
import { AdminLoginInfo } from "@/utilities/typing";
import { rules, ValidationRules } from "@/utilities/validation";

@Component({ components: { FormDialog } })
export default class AdminLogin extends Vue {
  show = true;
  loading = false;

  readonly initialValue: AdminLoginInfo = {
    username: "",
    password: "",
    database: "",
  };

  get rules(): ValidationRules {
    return rules;
  }
}
</script>
