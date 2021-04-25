<template>
  <!-- Nice way to center element both horizontally and vertically -->
  <v-container fluid class="d-flex flex-column justify-center align-center" style="height: 95vh">
    <v-row class="flex-grow-0">
      <v-col cols="6">
        <log-card :status="adminLoggedIn" name="Admin" @logout="adminLogout">
          <div v-if="adminLoggedIn" class="mt-2">
            <strong>Username: </strong>
            <span>{{ admin.username }}</span>
            <br />
            <strong>Database Name: </strong>
            <span>{{ admin.database }}</span>
          </div>
        </log-card>
      </v-col>
      <v-col cols="6">
        <log-card :status="managerLoggedIn" name="Librarian" @logout="managerLogout">
          <div v-if="managerLoggedIn" class="mt-2">
            <strong>Username: </strong>
            <span>{{ manager.username }}</span>
            <br />
            <strong>Phone: </strong>
            <span>{{ manager.phone }}</span>
          </div>
        </log-card>
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
import { AdminInfo, ManagerInfo } from "@/utilities/typing";

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

  get admin(): AdminInfo | null {
    return auth.admin;
  }

  get manager(): ManagerInfo | null {
    return auth.manager;
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
