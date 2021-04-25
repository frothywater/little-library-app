<template>
  <v-dialog :persistent="persistent" :value="value" @input="handleInput" :max-width="width">
    <v-card :loading="loading">
      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <slot :draft="draft" :update="update" />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" v-if="!persistent">Cancel</v-btn>
        <v-btn color="primary" text type="submit" @click="submit">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default class FormDialog<T> extends Vue {
  @Prop(Boolean) value!: boolean;
  @Prop({ type: String, default: "" }) title: string | undefined;
  @Prop({ type: Number, default: 500 }) width: number | undefined;
  @Prop({ type: Boolean, default: false }) persistent: boolean | undefined;
  @Prop({ type: Boolean, default: false }) loading: boolean | undefined;
  @Prop() initial!: T;

  draft: T | null = null; // Important! Vue needs it to be instantiated null to plug in reactivity.

  created(): void {
    this.reset();
  }

  submit(): void {
    if ((this.$refs.form as any).validate()) {
      this.$emit("submit", typeof this.initial === "object" ? Object.assign({}, this.draft) : this.draft); // Get a copy without reactivity
      if (!this.persistent) {
        this.reset();
        this.$emit("input", false);
      }
    }
  }

  cancel(): void {
    this.reset();
    this.$emit("input", false);
  }

  handleInput(e: boolean): void {
    if (e === false) this.cancel();
    else this.$emit("input", e);
  }

  reset(): void {
    if (typeof this.initial === "object") this.draft = Object.assign({}, this.initial);
    else this.draft = this.initial;
    if (this.$refs.form) (this.$refs.form as any).resetValidation();
  }

  update(value: any, key: keyof T | undefined): void {
    if (key && !!this.draft) this.draft[key] = value;
    else this.draft = value;
  }
}
</script>
