<template>
  <v-dialog :value="value" @input="$emit('input', $event)" :max-width="width">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <slot />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancel</v-btn>
        <v-btn color="primary" text type="submit" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class FormDialog extends Vue {
  @Prop(Boolean) value!: boolean;
  @Prop({ type: String, default: "" }) title: string | undefined;
  @Prop({ type: Number, default: 500 }) width: number | undefined;
}
</script>
