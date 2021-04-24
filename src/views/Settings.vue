<template>
  <v-container fluid class="d-flex flex-column justify-center align-center" style="height: 95vh">
    <v-row class="flex-grow-0">
      <v-col cols="6">
        <log-card :status="adminLoggedIn" name="Admin" />
      </v-col>
      <v-col cols="6">
        <log-card :status="managerLoggedIn" name="Librarian" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogCard from "@/components/LogCard.vue";

@Component({ components: { LogCard } })
export default class Settings extends Vue {
  adminLoggedIn = true;
  managerLoggedIn = true;
}
</script>
