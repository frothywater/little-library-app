<template>
  <v-card width="300">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <div>
        <v-icon :color="status ? 'success' : 'error'" class="mr-2">mdi-{{ status ? "check-circle" : "close-circle" }}</v-icon>
        {{ status ? "Logged in" : "Not logged in" }}
      </div>
      <slot />
    </v-card-text>
    <template v-if="status">
      <v-divider />
      <v-card-actions>
        <v-spacer />
        <v-btn text color="secondary" @click="$emit('logout')">
          <v-icon class="mr-2">mdi-logout-variant</v-icon>
          Logout
        </v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class LogCard extends Vue {
  @Prop(Boolean) status!: boolean;
  @Prop({ type: String, default: "" }) name: string | undefined;
}
</script>
