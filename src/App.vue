<template>
  <v-app>
    <v-navigation-drawer app permanent mini-variant dark color="primary">
      <v-list height="100%" class="d-flex flex-column justify-center">
        <v-list-item-group>
          <v-list-item v-for="item in items" :key="item.title" :to="{ path: item.path }" class="my-8">
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  items = [
    { title: "Books", icon: "book-multiple", path: "/books" },
    { title: "Cards", icon: "credit-card", path: "/cards" },
    { title: "Settings", icon: "cog", path: "/settings" },
  ];
}
</script>

<style>
.fab-button {
  position: absolute;
  bottom: 36px;
  right: 48px;
}
</style>
