<template>
  <!-- Nice way to center element both horizontally and vertically -->
  <v-container fluid class="d-flex flex-column justify-center align-center" style="height: 95vh">
    <v-row class="flex-grow-0">
      <v-col cols="6">
        <log-card :status="adminLoggedIn" name="Admin" @logout="adminLogout" />
      </v-col>
      <v-col cols="6">
        <log-card :status="managerLoggedIn" name="Librarian" @logout="managerLogout" />
      </v-col>
    </v-row>

    <snackbar v-model="showSnackbar" :text="message" type="error" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogCard from "@/components/LogCard.vue";
import Snackbar from "@/components/Snackbar.vue";
import auth from "@/store/auth";

@Component({ components: { LogCard, Snackbar } })
export default class Settings extends Vue {
  showSnackbar = false;
  message = "";

  get adminLoggedIn(): boolean {
    return auth.adminAuthenticated;
  }
  get managerLoggedIn(): boolean {
    return auth.managerAuthenticated;
  }

  async adminLogout(): Promise<void> {
    try {
      auth.adminLogout();
    } catch (err) {
      this.message = err;
      this.showSnackbar = true;
    }
  }

  async managerLogout(): Promise<void> {
    try {
      auth.managerLogout();
    } catch (err) {
      this.message = err;
      this.showSnackbar = true;
    }
  }
}
</script>
