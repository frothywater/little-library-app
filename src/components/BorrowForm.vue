<template>
  <v-dialog :value="value" @input="handleInput" max-width="300">
    <v-card>
      <v-card-title>Borrow Book</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="submit" ref="form">
          <v-text-field v-model="bookID" label="Book ID" type="number" min="1" :rules="[rules.required, rules.nonNegative]" />
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
import { rules, ValidationRules } from "@/utilities/validation";

@Component
export default class AddCardForm extends Vue {
  @Prop(Boolean) value!: boolean;

  bookID = 1;

  get rules(): ValidationRules {
    return rules;
  }

  submit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((this.$refs.form as any).validate()) {
      this.$emit("submit", this.bookID);
      this.$emit("input", false);
    }
  }

  cancel(): void {
    this.bookID = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.$refs.form as any).resetValidation();
    this.$emit("input", false);
  }

  handleInput(e: boolean): void {
    if (e === false) this.cancel();
    this.$emit("input", e);
  }
}
</script>
