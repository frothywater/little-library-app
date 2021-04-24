<template>
  <v-snackbar :value="value" @input="$emit('input', $event)">
    <v-icon :color="type" class="mr-2">mdi-{{ iconName }}</v-icon>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn icon v-bind="attrs" @click="$emit('input', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SnackbarType } from "@/utilities/typing";

@Component({})
export default class Snackbar extends Vue {
  @Prop(Boolean) value!: boolean;
  @Prop({ type: String, default: "" }) text: string | undefined;
  @Prop({ type: String, default: SnackbarType.info }) type: SnackbarType | undefined;

  get iconName(): string {
    switch (this.type) {
      case SnackbarType.error:
        return "close-octagon";
      case SnackbarType.success:
        return "check-circle";
      case SnackbarType.info:
      default:
        return "alert-circle";
    }
  }
}
</script>
