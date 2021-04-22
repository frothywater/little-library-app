<template>
  <v-app>
    <v-navigation-drawer app permanent clipped mini-variant>
      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="{ path: item.path }"
          >
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

    <v-app-bar app clipped-left color="primary" elevation="0">
      <v-toolbar-title class="white--text">Little Library</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  items = [
    { title: 'Books', icon: 'book-multiple', path: '/books' },
    { title: 'Cards', icon: 'credit-card', path: '/cards' },
    { title: 'Settings', icon: 'cog', path: '/settings' },
  ];
}
</script>
